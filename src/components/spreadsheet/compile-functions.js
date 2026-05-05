import { Functions } from "./functions";
import { getRowAndCol } from "./spreadsheet-editor.vue";

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

function createError(node,message){
  return {
    error: {node,message}
  };
}

export const CompileFunctions={
  Bezug: {
    parse: (node,src,cellData,valid)=>{
      let bezug=src.substring(node.from,node.to);
      let pos=getRowAndCol(bezug);
      if(pos.row>=cellData.length || pos.col>=cellData[0].length){
        throw "Ungültiger Zellbezug "+bezug;
      }
      let data=cellData[pos.row][pos.col];
      if(!valid[bezug]) return null;
      return data.v;
    }
  },
  Term: {
    parse: (node,src,cellData,valid)=>{
      let n=node.firstChild;
      let cf=getParseFunction(n);
      return cf(n,src,cellData,valid);
    }
  },
  Wert: {
    parse: (node,src,cellData,valid)=>{
      let n=node.firstChild;
      let cf=getParseFunction(n);
      return cf(n,src,cellData,valid);
    }
  },
  Zahl: {
    parse: (node,src,cellData,valid)=>{
      let x=src.substring(node.from,node.to);
      if(/^-?\d+,\d+$/.test(x)){
        x=x.replace(",",".")*1;
      }else{
        x*=1;
      }
      return x;
    }
  },
  Klammerausdruck: {
    parse: (node,src,cellData,valid)=>{
      let n=node.firstChild;
      let cf=getParseFunction(n);
      return cf(n,src,cellData,valid);
    }
  },
  UnaryExpression: {
    parse: (node,src,scope)=>{
      let fullCode=src.substring(node.from,node.to);
      let n=node.firstChild;
      let op=src.substring(n.from,n.to);
      
      if(n.type.isError || ["-"].indexOf(op)<0) return createError(n,"Mit diesem Zeichen kann ich an dieser Stelle\nnichts anfangen: '"+fullCode.trim()+"'");
      n=n.nextSibling;
      let cf=getParseFunction(n);
      let a=cf(n,src,scope);
      if(a.error) return a;
      return {
        type: node.name,
        op, a, node,
        fullCode
      };
    },
    run: (scope, statement)=>{
      let a=statement.a;
      let op=statement.op;
      a=evaluate(scope,a);
      if(op==="-"){
        return -a;
      }
    }
  },
  BinaryExpression: {
    parse: (node,src,cellData,valid)=>{
      let fullCode=src.substring(node.from,node.to);
      let n=node.firstChild;
      let cf=getParseFunction(n);
      if(cf.error) return cf;
      let a=cf(n,src,cellData,valid);
      if(a===null) return null;
      if(a?.error) return a;
      n=n.nextSibling;
      let op=src.substring(n.from,n.to);
      n=n.nextSibling;
      cf=getParseFunction(n);
      let b=cf(n,src,cellData,valid);
      if(b===null) return null;
      if(b?.error) return b;
      if(op==="+"||op==="-"||op==="*"||op==="/"||op==="^"){
        if(a==="") a=0;
        if(b==="") b=0;
        if(typeof a!=="number"){
          if(/^-?\d+,\d+$/.test(a)){
            a=a.replace(",",".")*1;
          }else{
            throw "#WERT!";
          }
        }
        if(typeof b!=="number"){
          if(/^-?\d+,\d+$/.test(b)){
            b=b.replace(",",".")*1;
          }else{
            throw "#WERT!";
          }
        }
        if(op==="+") return a+b;
        if(op==="-") return a-b;
        if(op==="*") return a*b;
        if(op==="/") return a/b;
        if(op==="^") return Math.pow(a,b);
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
          if(!cond.isBoolean){
            return {
              error: {node: n, message: "Dies ist keine Bedingung."}
            };
          }
          createHtmlCode(cond);
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
        else st.elseBranch=branch.program;
        n=n.nextSibling;
      }
      return st;
    },
    run: (scope, statement)=>{
      let branches=statement.branches;
      for(let i=0;i<branches.length;i++){
        let b=branches[i];
        let cond=evaluate(scope,b.condition);
        if(cond.value!==undefined) cond=cond.value;
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
      if(statement.elseBranch){
        scope.blocks.push({
          program: statement.elseBranch,
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
      if(!cond.isBoolean){
        return {
          error: {node: n, message: "Dies ist keine Bedingung."}
        };
      }
      createHtmlCode(cond);
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
      if(cond.value!==undefined) cond=cond.value;
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
        if(!scope.getVariable(name)) return createError(node,"unbekannte Variable");
      }
      return {
        type: node.name,
        name,
        node,
        fullCode
      }
    },
    run: (scope, statement)=>{
      let v=scope.getVariable(statement.name);
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
      if(val.value!==undefined) val=val.value;
      let v=scope.getVariable(statement.variable.name);
      if(!v){
        throw "Unbekannte Variable";
      }else{
        let old=evaluate(scope,statement.variable);
        if(old.value!==undefined) old=old.value;
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
      if(!scope.getVariable(v.name)){
        scope.addVariable(v.name);
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
      if(val.value!==undefined) val=val.value;
      let v=scope.getVariable(statement.variable.name);
      if(!v){
        scope.addVariable(statement.variable.name,val);
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
        if(a.value!==undefined) a=a.value;
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
      if(args.value!==undefined) args=args.value;
      let value=m.run(scope.gameworld,args);
      return value;
    }
  }
}

function createHtmlCode(p){
  let htmlCode=p.fullCode.replace(/!=/g,"&ne;");
  htmlCode=htmlCode.replace(/<=/g,"&le;");
  htmlCode=htmlCode.replace(/>=/g,"&ge;");
  htmlCode=htmlCode.replace(/==/g,"=");
  p.htmlCode=htmlCode;
}