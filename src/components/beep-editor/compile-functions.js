import { Methods } from "./methods";
import { getVariable, addVariable } from "./scope";

export function evaluate(scope, p){
  let run=getRunFunction(p.type);
  return run(scope,p);
}

export function getParseFunction(node){
  if(node.type.isError){
    return {
      error: {node: node, message: "Syntax-Fehler"}
    };
  }
  let cf=CompileFunctions[node.name];
  if(!cf){
    return {
      error: {node: node, message: "Unbekannter Ausdruck\n"+node.name}
    };
  }
  return cf.parse;
}

export function getRunFunction(type){
  return CompileFunctions[type].run;
}

function createError(node,message){
  return {
    error: {node,message}
  };
}

export const CompileFunctions={
  Comment: {
    parse: (node,src,scope)=>{
      let fullCode=src.substring(node.from,node.to);
      let text=src.substring(node.from,node.to);
      return {
        type: node.name,
        text,
        ignoreOnRun: true,
        fullCode
      };
    }
  },
  ParenthesizedExpression: {
    parse: (node,src,scope)=>{
      let fullCode=src.substring(node.from,node.to);
      let n=node.firstChild;
      if(n.name!=="(") return createError(n,"'(' erwartet");
      n=n.nextSibling;
      let cf=getParseFunction(n);
      if(cf.error) return cf;
      let v=cf(n,src,scope);
      return v;
    }
  },
  BinaryExpression: {
    parse: (node,src,scope)=>{
      let fullCode=src.substring(node.from,node.to);
      let n=node.firstChild;
      let cf=getParseFunction(n);
      if(cf.error) return cf;
      let a=cf(n,src,scope);
      if(a.error) return a;
      n=n.nextSibling;
      let op=src.substring(n.from,n.to);
      if(n.type.isError || ["==","!=","<",">","<=",">=","+","-","*","/","%"].indexOf(op)<0) return createError(n,"Rechenzeichen erwartet:\n== != < > <= >= + - * /");
      n=n.nextSibling;
      cf=getParseFunction(n);
      let b=cf(n,src,scope);
      if(b.error) return b;
      return {
        type: node.name,
        op, a, b, node,
        fullCode
      };
    },
    run: (scope, statement)=>{
      let a=statement.a;
      let b=statement.b;
      let op=statement.op;
      a=evaluate(scope,a);
      b=evaluate(scope,b);
      if(op==="+"){
        return a+b;
      }else if(op==="-"){
        return a-b;
      }else if(op==="*"){
        return a*b;
      }else if(op==="/"){
        return a/b;
      }else if(op==="%"){
        return a%b;
      }else if(op==="=="){
        return a==b;
      }else if(op==="!="){
        return a!=b;
      }else if(op==="<"){
        return a<b;
      }else if(op===">"){
        return a>b;
      }else if(op==="<="){
        return a<=b;
      }else if(op===">="){
        return a>=b;
      }
    }
  },
  Body: {
    parse: (node,src,scope)=>{
      let fullCode=src.substring(node.from,node.to);
      let n=node.firstChild;
      if(n.name!==":") return createError(n,"':' erwartet");
      let program=[];
      n=n.nextSibling;
      let errors=scope.errors;
      scope.layers.push({});
      while(n){
        let cf=getParseFunction(n);
        if(cf.error){
          errors.push(cf.error);
          n=n.nextSibling;
          continue;
        }
        let p=cf(n,src,scope);
        if(p.error){
          errors.push(p.error);
          n=n.nextSibling;
          continue;
        }
        program.push(p);
        n=n.nextSibling;
      }
      scope.layers.pop();
      return {
        type: node.type,
        program, node,
        fullCode
      }
    },
    run: (scope,statement)=>{

    }
  },
  IfStatement: {
    parse: (node,src,scope)=>{
      let fullCode=src.substring(node.from,node.to);
      //if binaryexpression body else body
      let st={
        fullCode,
        type: node.name,
        node,
        branches: [],
        else: null
      };
      let n=node.firstChild;
      let expectCondition=true;
      while(n){
        if(n.name!=="if" && n.name!=="else" && n.name!=="elif"){
          return {
            error: {node: n, message: "'else' oder 'elif' erwartet"}
          };
        }
        let branch={type: n.name, program: [], condition: null};
        if(n.name==="else") expectCondition=false;
        if(expectCondition){
          n=n.nextSibling;
          let cf=getParseFunction(n);
          if(cf.error) return cf;
          let cond=cf(n,src,scope);
          if(cond.error) return cond;
          branch.condition=cond;
        }
        n=n.nextSibling;
        if(n.name!=="Body") return createError(n, "':' erwartet");
        let cf=getParseFunction(n);
        if(cf.error) return cf;
        let block=cf(n,src,scope);
        if(block.error) return block;
        branch.program=block.program;
        if(expectCondition) st.branches.push(branch);
        else st.else=branch.program;
        n=n.nextSibling;
      }
      return st;
    },
    run: (scope, statement)=>{
      let branches=statement.branches;
      for(let i=0;i<branches.length;i++){
        let b=branches[i];
        let cond=evaluate(scope,b.condition);
        if(cond!==true && cond!==false) throw createError(statement.node,"Bedingung muss True oder False sein,\nsie ist aber "+cond);
        if(cond){
          scope.blocks.push({
            program: b.program,
            nextStatement: 0
          });
          scope.layers.push({});
          return;
        }
      }
      if(statement.else){
        scope.blocks.push({
          program: statement.else,
          nextStatement: 0
        });
      }
    }
  },
  WhileStatement: {
    parse: (node,src,scope)=>{
      let fullCode=src.substring(node.from,node.to);
      //if binaryexpression body else body
      let st={
        type: node.name,
        node,
        condition: null,
        program: [],
        fullCode
      };
      let n=node.firstChild;
      if(n.name!=="while"){
        return {
          error: {node: n, message: "'while' erwartet"}
        };
      }
      n=n.nextSibling;
      let cf=getParseFunction(n);
      if(cf.error) return cf;
      let cond=cf(n,src,scope);
      if(cond.error) return cond;
      st.condition=cond;
      
      n=n.nextSibling;
      if(n.name!=="Body") return createError(n, "':' erwartet");
      cf=getParseFunction(n);
      if(cf.error) return cf;
      let block=cf(n,src,scope);
      if(block.error) return block;
      st.program=block.program;
      return st;
    },
    run: (scope, statement)=>{
      let cond=evaluate(scope,statement.condition);
      if(cond!==true && cond!==false) throw createError(statement.node,"Bedingung muss True oder False sein,\nsie ist aber "+cond);
      if(cond){
        scope.blocks.push({
          program: statement.program,
          nextStatement: 0
        });
        scope.layers.push({});
        return true;
      }else{
        return false;
      }
    }
  },
  ExpressionStatement: {
    parse: (node, src, scope)=>{
      let child=node.firstChild;
      let cf=getParseFunction(child);
      if(cf.error) return cf;
      return cf(child,src,scope);
    },
    run: (scope, statement)=>{
      
    }
  },
  VariableName: {
    parse: (node,src,scope, mustNotBeDefined)=>{
      let fullCode=src.substring(node.from,node.to);
      let name=src.substring(node.from,node.to);
      if(!mustNotBeDefined){
        if(!getVariable(scope,name)) return createError(node,"unbekannte Variable");
      }
      return {
        type: node.name,
        name,
        node,
        fullCode
      }
    },
    run: (scope, statement)=>{
      let v=getVariable(scope,statement.name);
      if(!v) throw "Unbekannte Variable";
      return v.value;
    }
  },
  "UpdateStatement": {
    parse: (node, src,scope)=>{
      let fullCode=src.substring(node.from,node.to);
      let n=node.firstChild;
      if(n.name!=="VariableName") return createError(n, "Variabenname erwartet");
      let cf=getParseFunction(n);
      if(cf.error) return cf;
      let v=cf(n,src,scope);
      n=n.nextSibling;
      let op=src.substring(n.from,n.to);
      if(["+=","-=","*=","/="].indexOf(op)<0) return createError(n,"'=' erwartet");
      n=n.nextSibling;
      cf=getParseFunction(n);
      if(cf.error) return cf;
      
      let val=cf(n,src,scope);
      return {
        type: node.name,
        variable: v,
        value: val,
        op,node,
        fullCode
      }
    },
    run: (scope, statement)=>{
      let val=evaluate(scope,statement.value);
      let v=getVariable(scope,statement.variable.name);
      if(!v){
        throw "Unbekannte Variable";
      }else{
        let old=evaluate(scope,statement.variable);
        if(statement.op==="+="){
          v.value=old+val;
        }else if(statement.op==="-="){
          v.value=old-val;
        }else if(statement.op==="*="){
          v.value=old*val;
        }else if(statement.op==="/="){
          v.value=old/val;
        }
      }
    }
  },
  AssignStatement: {
    parse: (node,src,scope)=>{
      let fullCode=src.substring(node.from,node.to);
      let n=node.firstChild;
      if(n.name!=="VariableName") return createError(n,"Variabenname erwartet");
      let cf=getParseFunction(n);
      if(cf.error) return cf;
      let v=cf(n,src,scope, true);
      if(v.error) return v;
      n=n.nextSibling;
      let op=src.substring(n.from,n.to);
      if(op!=="=") createError(n,"'=' erwartet");
      n=n.nextSibling;
      cf=getParseFunction(n);
      if(cf.error) return cf;
      if(!getVariable(scope,v.name)){
        addVariable(scope,v.name);
      }
      let val=cf(n,src,scope);
      return {
        type: node.name,
        variable: v,
        value: val,
        op, node,
        fullCode
      }
    },
    run: (scope, statement)=>{
      let val=evaluate(scope,statement.value);
      let v=getVariable(scope,statement.variable.name);
      if(!v){
        addVariable(scope,statement.variable.name,val);
      }else{
        v.value=val;
      }
    }
  },
  "ArgList": {
    parse: (node,src,scope)=>{
      let fullCode=src.substring(node.from,node.to);
      let n=node.firstChild;
      if(n.name!=="(") return createError(node,"'(' erwartet");
      n=n.nextSibling;
      if(!n || n.type.isError) return createError(node,"')' erwartet");
      let args=[];
      while(n){
        if(n.name===")") break;
        let arg=n;
        if(!arg) return createError(node,"')' erwartet");
        let cf=getParseFunction(arg);
        if(cf.error) return cf;
        arg=cf(arg,src,scope);
        if(arg.error) return arg;
        args.push(arg);
        n=n.nextSibling;
        if(!n || n.name!=="," && n.name!==")") return createError(node,"')' erwartet");
        n=n.nextSibling;
      }
      return {
        type: node.name,
        args, node,
        fullCode
      };
    },
    run: (scope,statement)=>{
      let args=[];
      for(let i=0;i<statement.args.length;i++){
        let a=evaluate(scope,statement.args[i]);
        args.push(a);
      }
      return args;
    }
  },
  "Number": {
    parse: (node,src,scope)=>{
      let fullCode=src.substring(node.from,node.to);
      let text=src.substring(node.from,node.to);
      return {
        type: node.name,
        value: JSON.parse(text),
        node,
        fullCode
      };
    },
    run: (scope,statement)=>{
      return statement.value;
    }
  },
  "String": {
    parse: (node,src,scope)=>{
      let fullCode=src.substring(node.from,node.to);
      let text=src.substring(node.from,node.to);
      return {
        type: node.name,
        value: JSON.parse(text),
        node,
        fullCode
      };
    },
    run: (scope,statement)=>{
      return statement.value;
    }
  },
  "CallExpression": {
    parse: (node,src,scope)=>{
      let fullCode=src.substring(node.from,node.to);
      let child=node.firstChild;
      if(child.name!=="VariableName") return createError(child,"Befehl erwartet");
      let funcName=src.substring(child.from,child.to).toLowerCase();
      let method=Methods[funcName];
      if(!method) return createError(child,"Unbekannter Befehl '"+funcName+"'.\nIch kenne nur 'move', 'left', 'right', 'print' und 'read'");
      if(funcName==="move") scope.moveCount++;
      let args=child.nextSibling;
      if(args.name!=="ArgList") return createError(args, "( erwartet");
      let cf=getParseFunction(args);
      if(cf.error) return cf;
      args=cf(args,src,scope);
      if(args.error) return args;
      return {
        type: node.name,
        method,
        args, node,
        fullCode
      };
    },
    run: (scope, statement)=>{
      let m=statement.method;
      let args=evaluate(scope,statement.args);
      let value=m.run(scope.gameworld,args);
      return value;
    }
  }
}