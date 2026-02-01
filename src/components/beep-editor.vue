<template>
  <div id="wrapper">
    
    <CodeMirror 
      class="no-print"
      id="editor"
      language="python" 
      ref="editor" 
      v-model="code"
      :linter="linter"
      :autocomplete-provider="autocompleteProvider"
      @update-tree="updateTree"
      @blur="save()"
    />
    <div id="preview">
      <GameWorld
        ref="gameworld"
        :beep="beep"
        :width="worldWidth"
      />
      <Button @click="run()" label="Ausführen"/>
      <Button @click="stop()" label="Stopp"/>
    </div>
    
  </div>
</template>

<script>
import CodeMirror from './code-mirror.vue';
import {linter} from "@codemirror/lint";
import {syntaxTree} from "@codemirror/language";
import GameWorld from './game-world.vue';
import { calcPoints } from '../App.vue';
import {snippetCompletion} from '@codemirror/autocomplete';
import { sleep } from '../other/sleep';


export default{
  components: {
    CodeMirror, GameWorld
  },
  emits: [
  "save", "exercise-submit"
  ],
  props: {
    exerciseData: Object,
    beep: Object
  },
  computed: {
    worldWidth(){
      if(this.beep.worldWidth) return this.beep.worldWidth; else return "10em";
    }
  },
  mounted(){
    if(this.exerciseData && this.exerciseData.userProject){
      this.setUserData(this.exerciseData.userProject);
    }else{
      this.setUserData();
    }
  },
  data(){
    return {
      tree: null,
      program: null,
      errors: [],
      scope: {},
      compiled: false,
      code: "",
      autocompleteProvider: autocomplete,
      linter: linter(view => {
        let diagnostics=[];
        //console.log("errors:",this.errors);
        for(let i=0;i<this.errors.length;i++){
          let e=this.errors[i];
          let node=e.node;
          diagnostics.push({
            from: node.from,
            to: node.to,
            severity: "warning",
            message: e.message
          });
        }
        return diagnostics
      })
    }
  },
  methods: {
    updateLinter(){
      this.$refs.editor.updateLinter();
    },
    async run(){
      await this.stop();
      this.scope={
        layers: [
          {}
        ]
      }
      let gameworld=this.$refs.gameworld.gameworld;
      let nextStatement=0;
      while(nextStatement>=0 && nextStatement<this.program.length){
        let st=this.program[nextStatement];
        if(st.type==="method-call"){
          let m=st.method;
          let args=evaluate(this.scope,st.args);
          m.run(gameworld,args);
        }else if(st.type==="assignment"){
          let val=evaluate(this.scope,st.value);
          let v=getVariable(this.scope,st.variable.name);
          if(!v){
            addVariable(this.scope,st.variable.name,val);
          }else{
            v.value=val;
          }
        }else if(st.type==="update"){
          let val=evaluate(this.scope,st.value);
          let v=getVariable(this.scope,st.variable.name);
          if(!v){
            throw "Unbekannte Variable";
          }else{
            let old=evaluate(this.scope,st.variable);
            if(st.op==="+="){
              v.value=old+val;
            }else if(st.op==="-="){
              v.value=old-val;
            }else if(st.op==="*="){
              v.value=old*val;
            }else if(st.op==="/="){
              v.value=old/val;
            }
          }
        }
        nextStatement++;
      }
    },
    async stop(){
      this.$refs.gameworld.gameworld.reset();
      this.$refs.gameworld.$forceUpdate();
      await sleep(500);
    },
    updateTree(tree){
      this.tree=tree;
      this.compiled=false;
      this.compile();
    },
    compile(){
      while(this.errors.length>0) this.errors.pop();
      this.compiled=true;
      this.program=[];
      if(!this.tree || !this.tree.topNode || !this.tree.topNode.firstChild) return;
      let nodeZeile=this.tree.topNode.firstChild;
      this.program=parsePython(this.code,nodeZeile,this.errors);
      console.log(this.errors)
      this.updateLinter();
    },
    save(){
      if(!this.exerciseData) return;
      let data=this.getUserData();
      if(data.resArray){
        this.exerciseData.correct=data.resArray;
        calcPoints(this.exerciseData);
      }
      this.exerciseData.userProject=data;
      this.$root.save(this.exerciseData);
    },
    undo(){
      this.$refs.editor.undo();
    },
    redo(){
      this.$refs.editor.redo();
    },
    setUserData(data){
      if(!data){
        data={
          code: this.code
        };
      }
      this.code=data.code;
      this.$refs.editor.setValue(this.code);
    },
    getUserData(){
      let data={
        code: this.code
      };
      return data;
    }
  }
}

function evaluate(scope, p){
  if(p.type==="number" || p.type==="string") return p.value;
  if(p.type==="variable-name"){
    let v=getVariable(scope,p.name);
    if(!v) throw "Unbekannte Variable";
    return v.value;
    //return evaluate(scope,v.value);
  }
  if(p.type==="arg-list"){
    let args=[];
    for(let i=0;i<p.args.length;i++){
      let a=evaluate(scope,p.args[i]);
      args.push(a);
    }
    return args;
  }
}

function getVariable(scope,varname){
  for(let i=scope.layers.length-1;i>=0;i--){
    let layer=scope.layers[i];
    if(varname in layer){
      return layer[varname];
    }
  }
  return null;
}

function addVariable(scope,varname,value){
  scope.layers[scope.layers.length-1][varname]={name: varname, value: value};
  return null;
}

function autocomplete(){
  return (context)=>{
    let nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1)
    console.log(nodeBefore);
    console.log("autocomplete",context);
    let word = context.matchBefore(/\w*/);
    console.log("word before", word);
    if (word.from == word.to && !context.explicit)
      return null;
    let options=[];
    for(let m in Methods){
      let M=Methods[m];
      options.push(M.snippet);
    }
    return {
      from: word.from,
      options
    }
  }
}

function parsePython(src,firstLineNode,errors){
  let scope={
    layers: [
      {}
    ]
  };
  let program=[];
  let node=firstLineNode;
  while(node){
    let cf=CompileFunctions[node.name];
    if(!cf){
      errors.push({node,message: "Unbekannte Anweisung"});
      node=node.nextSibling;
      continue;
    }
    let p=cf(node,src,scope);
    if(p.error){
      errors.push(p.error);
      node=node.nextSibling;
      continue;
    }
    program.push(p);
    node=node.nextSibling;
  }
  return program;
}

const Methods={
  "move": {
    name: "move",
    args: [],
    run: (gameworld)=>{
      let bee=gameworld.objects.bee;
      bee.move();
    },
    snippet: {
      label: "move()",
      type: "function",
      info: "Bewegt die Biene um 1 Feld in Blickrichtung",
    }
  },
  "left": {
    name: "left",
    args: [],
    run: (gameworld)=>{
      let bee=gameworld.objects.bee;
      bee.turnLeft();
    },
    snippet: {
      label: "left()",
      type: "function",
      info: "Dreht die Biene um 90° nach links.",
    }
  },
  "right": {
    name: "right",
    args: [],
    run: (gameworld)=>{
      let bee=gameworld.objects.bee;
      bee.turnRight();
    },
    snippet: {
      label: "right()",
      type: "function",
      info: "Dreht die Biene um 90° nach rechts.",
    }
  },
  "print": {
    name: "print",
    args: [{name: "text"}],
    info: "Schreibt den text auf das Feld vor der Biene.",
    run: (gameworld,args)=>{
      let bee=gameworld.objects.bee;
      bee.print(args[0]);
    },
    snippet: snippetCompletion("print($text)",{
      label: "print(text)",
      type: "function",
      info: "Schreibt den text auf das Feld vor der Biene."
    })
  },
  "read": {
    name: "read",
    args: [],
    returns: true,
    run: (gameworld)=>{
      let bee=gameworld.objects.bee;
      return bee.read();
    },
    snippet: {
      label: "read()",
      type: "function",
      info: "Liest den Text, der auf dem Feld vor der Biene steht.",
    }
  }
}

const CompileFunctions={
  "ExpressionStatement": (node, src, scope)=>{
    let child=node.firstChild;
    let cf=CompileFunctions[child.name];
    if(!cf){
      return {
        error: {node, message: "Unbekannter Ausdruck"}
      };
    }
    return cf(child,src,scope);
  },
  "VariableName": (node,src,scope)=>{
    let name=src.substring(node.from,node.to);
    return {
      type: "variable-name",
      name
    }
  },
  "UpdateStatement": (node, src,scope)=>{
    let n=node.firstChild;
    if(n.name!=="VariableName"){
      return {
        error: {node: n, message: "Variabenname erwartet"}
      }
    }
    let cf=CompileFunctions[n.name];
    let v=cf(n,src,scope);
    n=n.nextSibling;
    let op=src.substring(n.from,n.to);
    if(["+=","-=","*=","/="].indexOf(op)<0){
      return {
        error: {node: n, message: "'=' erwartet"}
      };
    }
    n=n.nextSibling;
    cf=CompileFunctions[n.name];
    if(!cf){
      return {
        error: {node: n, message: "Unbekannter Ausdruck"}
      };
    }
    
    let val=cf(n,src,scope);
    return {
      type: "update",
      variable: v,
      value: val,
      op
    }
  },
  "AssignStatement": (node,src,scope)=>{
    let n=node.firstChild;
    if(n.name!=="VariableName"){
      return {
        error: {node: n, message: "Variabenname erwartet"}
      }
    }
    let cf=CompileFunctions[n.name];
    let v=cf(n,src,scope);
    n=n.nextSibling;
    let op=src.substring(n.from,n.to);
    if(["=","+=","-=","*=","/="].indexOf(op)<0){
      return {
        error: {node: n, message: "'=' erwartet"}
      };
    }
    n=n.nextSibling;
    cf=CompileFunctions[n.name];
    if(!cf){
      return {
        error: {node: n, message: "Unbekannter Ausdruck"}
      };
    }
    
    let val=cf(n,src,scope);
    return {
      type: "assignment",
      variable: v,
      value: val,
      op
    }
  },
  "ArgList": (node,src,scope)=>{
    let n=node.firstChild;
    if(n.name!=="("){
      return {
        error: {node, message: "'(' erwartet"}
      };
    }
    n=n.nextSibling;
    if(!n || n.type.isError){
      return {
        error: {node, message: "')' erwartet"}
      };
    }
    let args=[];
    while(n){
      if(n.name===")") break;
      let arg=n;
      if(!arg){
        return {
          error: {node, message: "')' erwartet"}
        };
      }
      let cf=CompileFunctions[arg.name];
      if(!cf){
        return {
          error: {node, message: "Unbekannter Ausdruck"}
        };
      }
      arg=cf(arg,src,scope);
      args.push(arg);
      n=n.nextSibling;
      if(!n || n.name!=="," && n.name!==")"){
        return {
          error: {node, message: "')' erwartet"}
        };
      }
      n=n.nextSibling;
    }
    return {
      type: "arg-list",
      args
    };
  },
  "Number": (node,src,scope)=>{
    let text=src.substring(node.from,node.to);
    return {
      type: "number",
      value: JSON.parse(text)
    };
  },
  "String": (node,src,scope)=>{
    let text=src.substring(node.from,node.to);
    return {
      type: "string",
      value: JSON.parse(text)
    };
  },
  "CallExpression": (node,src,scope)=>{
    let child=node.firstChild;
    if(child.name!=="VariableName"){
      return {
        error: {node,message: "Befehl erwartet"}
      };
    }
    let funcName=src.substring(child.from,child.to).toLowerCase();
    let method=Methods[funcName];
    if(!method){
      return {
        error: {node: child,message: "Unbekannter Befehl '"+funcName+"'.\nIch kenne nur 'move', 'left', 'right', 'print' und 'read'"}
      };
    }
    let args=child.nextSibling;
    if(args.name!=="ArgList"){
      return {
        error: {node: args,message: "( erwartet"}
      };
    }
    let cf=CompileFunctions[args.name];
    args=cf(args,src,scope);
    if(args.error) return args;
    return {
      type: "method-call",
      method,
      args
    };
  }
}
</script>

<style scoped>
  #wrapper{
    width: 100%;
    display: flex;
  }
</style>