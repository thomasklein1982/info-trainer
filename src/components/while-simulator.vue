<template>
  <div class="screen" style="display: flex; flex-direction: column; overflow: hidden">
    <Drawer v-model:visible="helpVisible" position="right" header="Hilfe zu WHILE-Programmen">
        
    </Drawer>
    <Menubar
      :model="[]"
    >
      <template #start>
        <Button size="small" :disabled="error || state==='running' || state==='halted'" icon="pi pi-play" rounded text label="Run" @click="run()"/>
        <Button size="small" :disabled="error || state==='running' || state==='halted'" icon="pi pi-arrow-right" rounded label="Step" text @click="step()"/>
        <Button size="small" :disabled="error || state==='blank'" icon="pi pi-stop" rounded text @click="stop()" label="Stop"/>
        <Button v-if="exerciseData" icon="pi pi-list-check" label="Überpüfen" :loading="checking" @click="check()" text />
      </template>
      <template #end>
        <label style="vertical-align: middle; display: inline-flex; align-items: center"><ToggleSwitch v-model="maxSpeed"/> Max. Speed</label>
        <Button size="small"  icon="pi pi-undo" rounded text @click="undo()"/>
        <Button size="small"  icon="pi pi-refresh" rounded text @click="redo()"/>
        
      </template>
    </Menubar>
    <div style="display: flex; flex: 1; overflow: hidden">
      <div style="flex: 1; display: flex; flex-direction: column; height: 100%; overflow: auto">
        <div style="flex: 1">
          <CodeMirror 
            language="while" 
            ref="editor" 
            v-model="code" 
            :linter="linter"
            @update-tree="updateTree"
          />
        </div>
      </div>
      <div class="sidebar">
        <div class="registers">
          <div class="register" v-for="i in runtime.maxVariableNumber">
            <div>x{{ i }}:</div>
            <div><InputNumber placeholder="0" fluid v-model="runtime.variables[i]"/></div>
          </div>
          <div>
            <Button icon="pi pi-plus" text @click="addVariable()"/>
            <Button icon="pi pi-minus" text @click="removeVariable()"/>
          </div>
        </div>
        <div>
          <Button icon="pi pi-undo"  label="Reset" @click="resetMachine()"/>
          <Button icon="pi pi-question"  label="Hilfe" @click="showHelp()"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menubar from 'primevue/menubar';
import CodeMirror from './code-mirror.vue';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Slider from 'primevue/slider';
import SelectButton from 'primevue/selectbutton';
import { nextTick } from 'vue';
import { sleep } from '../other/sleep';
import Message from 'primevue/message';
import { createBoolArray, setArrayToValue } from '../other/bool-array';
import { calcPoints } from '../App.vue';
import ToggleSwitch from 'primevue/toggleswitch';
import AutoComplete from 'primevue/autocomplete';
import InputNumber from 'primevue/inputnumber';
import Drawer from 'primevue/drawer';

import {syntaxTree} from "@codemirror/language"
import {linter} from "@codemirror/lint"

function walkTree(node, enter, isFirstChild){
  if(!node) return;
  let goOn=enter(node);
  if(!goOn) return;
  if(node.firstChild){
    walkTree(node.firstChild,enter,true);
  }
  if(isFirstChild){
    while(node.nextSibling){
      node=node.nextSibling;
      walkTree(node,enter,false);
    }
  }
}



export default{
  components: {
    Menubar,CodeMirror, Splitter, SplitterPanel, Slider, SelectButton, Message, ToggleSwitch, AutoComplete, InputNumber, Drawer
  },
  props: {
    machine: Object,
    exerciseData: Object,
    type: String
  },
  computed: {
    pasteVariables(){
      let regs=[];
      let s=this.dialogPaste.input.trim().split(",");
      for(let i=0;i<s.length;i++){
        let r=s[i]*1;
        if(isNaN(r)) return null;
        regs.push(r);
      }
      return regs;
    },
    error(){
      return this.errors.length>0;
    }
  },
  data(){
    return {
      state: "blank",
      tree: null,
      compiled: false,
      code: "",
      checking: false,
      maxSpeed: false,
      helpVisible: false,
      program: null,
      errors: [],
      preventLinting: true,
      dialogPaste: {
        input: "",
        show: false
      },
      runtime: {
        currentStatement: null,
        variables: {},
        maxVariableNumber: 0,
        scope: [],
        lastLineNumber: 0
      },
      linter: linter(view => {
        if(this.preventLinting) return [];
        let diagnostics=[];
        //console.log("errors:",this.errors);
        for(let i=0;i<this.errors.length;i++){
          let e=this.errors[i];
          diagnostics.push({
            from: e.from,
            to: e.to,
            severity: "warning",
            message: e.message
          });
        }
        return diagnostics
      })
    }
  },
  mounted(){
    this.reset();
    this.resetMachine();
  },
  methods: {
    addVariable(){
      this.setVariable(this.runtime.maxVariableNumber+1,0);
    },
    removeVariable(){
      delete this.runtime.variables[this.runtime.maxVariableNumber];
      this.runtime.maxVariableNumber--;
    },
    pasteIntoRegisters(){
      let regs=this.pasteVariables;
      if(!regs) return;
      this.resetMachine(regs);
      this.dialogPaste.show=false;
    },
    showHelp(){
      this.helpVisible=true;
    },
    updateTree(tree){
      this.tree=tree;
      this.compiled=false;
      this.compile();
    },
    async check(){
      this.checking=true;
      await sleep(10);
      let check=this.exerciseData.data.check;
      if(!this.compile()){
        setArrayToValue(this.exerciseData.correct,false);
        this.finishChecking();
        return;
      }
      let input=check.input;
      setArrayToValue(this.exerciseData.correct,true);
      if(input){
        await this.checkWithGlobalInputs(input());
      }else{
        await this.checkWithLocalInputs();
      }
      this.finishChecking();
    },
    async checkWithGlobalInputs(inputs){
      let check=this.exerciseData.data.check;
      let testcases=check.testcases;
      if(!Array.isArray(inputs)) inputs=[inputs];
      for(let j=0;j<inputs.length;j++){
        await sleep(10);
        let input=inputs[j];
        this.resetRuntime(input);
        let ok=this.runAtMaxSpeed();
        if(!ok){
          setArrayToValue(this.exerciseData.correct,false);
          this.finishChecking();
          return;
        }
        let output=this.runtime.registers;
        for(let k=0;k<testcases.length;k++){
          if(this.exerciseData.correct[k]!==true) continue;
          let tc=testcases[k];
          let ok=tc.check(input,output);
          if(!ok){
            if(input.length>0){
              this.exerciseData.correct[k]=input+"";
            }else{
              this.exerciseData.correct[k]="";
            } 
          }
        }
      }
    },
    async checkWithLocalInputs(){
      let check=this.exerciseData.data.check;
      let testcases=check.testcases;
      for(let k=0;k<testcases.length;k++){
        await sleep(10);
        if(this.exerciseData.correct[k]!==true) continue;
        let tc=testcases[k];
        let inputs=tc.input();
        if(!Array.isArray(inputs)) inputs=[inputs];
        for(let i=0;i<inputs.length;i++){
          let input=inputs[i];
          this.resetRuntime(input);
          let ok=this.runAtMaxSpeed();
          if(!ok){
            this.exerciseData.correct[k]=false;
            continue;
          }
          let output=this.runtime.registers;
          ok=tc.check(input,output);
          if(!ok){
            if(input.length>0){
              this.exerciseData.correct[k]=input+"";
            }else{
              this.exerciseData.correct[k]="";
            } 
          }
        }
      }
    },
    finishChecking(){
      calcPoints(this.exerciseData);
      this.save();
      this.$emit("exercise-submit");
      this.checking=false;
    },
    save(){
      this.$emit("save");
    },
    undo(){
      this.$refs.editor.undo();
    },
    redo(){
      this.$refs.editor.redo();
    },
    async run(){
      if(this.maxSpeed){
        this.runAtMaxSpeed();
        return;
      }
      if(this.state!=="running"){
        this.state="running";
        this.runtime.currentStatement=this.program;
        this.setHighlightedLineNumber(this.runtime.currentStatement.line);
        await sleep(100);
      }
      while(this.state==="running"){
        this.step();
        await sleep(100);
      }
      this.state="blank";
      return false;
    },
    runAtMaxSpeed(){
      let steps=0;
      let maxSteps=this.machine?.maxSteps || 1000000;
      if(this.state!=="running"){
        this.state="running";
        this.runtime.currentStatement=this.program;
      }
      while(this.state==="running"){
        this.step();
        steps++;
        if(steps>=maxSteps) return false;
      }
      return true;
    },
    halt(){
      this.state="halted";
      this.runtime.lastLineNumber=0;
      this.runtime.scope=[];
      this.setHighlightedLineNumber(0);
    },
    resetRuntime(variables){
      this.reset();
      this.resetMachine(variables);
    },
    resetMachine(variables){
      if(variables){
        this.runtime.variables={};
        let max=0;
        for(let a in variables){
          this.runtime.variables[a]=variables[a];
          if(max<a){
            max=a;
          }
        }
        this.runtime.maxVariableNumber=max;
      }else{
        if(this.machine?.exampleInput){
          this.resetMachine(this.machine.exampleInput);
        }else{
          this.runtime.variables={1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
          this.runtime.maxVariableNumber=5;
        }
      }
    },
    reset(){
      this.runtime.scope=[];
      this.runtime.currentStatement=null;
      this.runtime.lastLineNumber=0;
      this.setHighlightedLineNumber(0);
      this.state="blank";
    },
    setHighlightedLineNumber(lineNo){
      this.$refs.editor.highlightLine(lineNo);
    },
    compile(){
      while(this.errors.length>0) this.errors.pop();
      this.compiled=true;
      if(!this.tree || !this.tree.topNode || !this.tree.topNode.firstChild) return;
      let node=this.tree.topNode.firstChild;
      this.program=compileProgram(this.$refs.editor,this.code,node,null,this.errors);

      this.preventLinting=false;
      this.$refs.editor.updateLinter();
      this.preventLinting=true;
      return true;
    },
    step(){
      if(!this.compiled){
        this.compile();
      }
      if(this.state==="blank"){
        if(!this.program) return;
        this.state="stepping";
        this.runtime.currentStatement=this.program;
        this.setHighlightedLineNumber(this.runtime.currentStatement.line);
        return;
      }
      let s=this.runtime.currentStatement;
      if(!s) {
        this.halt();
        return;
      }
      if(s.type==="Assignment"){
        let value=this.getVariable(s.v2);
        value=s.op==="+"? value + s.c: value - s.c;
        this.setVariable(s.v1,value);
        if(s.next) this.runtime.currentStatement=s.next;
        else {
          this.runtime.currentStatement=s.parent;
          if(s.parent){
            this.runtime.currentStatement=s.parent;
          }
        }
      }else if(s.type==="While"){
        let value=this.getVariable(s.v);
        if(value===0){
          if(s.next) this.runtime.currentStatement=s.next;
          else{
            this.runtime.currentStatement=s.parent;
            if(s.parent){
              this.runtime.currentStatement=s.parent;
            }
          } 
        }else{
          this.runtime.currentStatement=s.program;
          this.runtime.scope.push(-1);
        }
      }else if(s.type==="Loop"){
        let value;
        if(s.line<this.runtime.lastLineNumber){
          //ruecksprung zum schleifenanfang
          value=this.runtime.scope.pop();
        }else{
          value=this.getVariable(s.v);
        }
        if(value===0){
          if(s.next) this.runtime.currentStatement=s.next;
          else {
            this.runtime.currentStatement=s.parent;
            if(s.parent){
              this.runtime.currentStatement=s.parent;
            }
          }
        }else{
          this.runtime.currentStatement=s.program;
          this.runtime.scope.push(value-1);
        }
      }
      if(this.runtime.currentStatement && (!this.maxSpeed || this.state==="stepping")){
        this.setHighlightedLineNumber(this.runtime.currentStatement.line);
      }else{
        this.setHighlightedLineNumber(0);
      }
      this.runtime.lastLineNumber=s.line;
    },
    getVariable(number){
      let v=this.runtime.variables[number];
      if(!v) return 0; else return v;
    },
    setVariable(number,value){
      if(!value) value=0;
      if(value<0) value=0;
      this.runtime.variables[number]=value;
      if(this.runtime.maxVariableNumber<number) this.runtime.maxVariableNumber=number;
    },
    stop(){
      this.reset();
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
      return {
        machine: data
      };
    }
  }
}

function compileProgram(editor,code,node,parent,errors){
  let list=null;
  let last=null;
  node=node.firstChild;
  while(node){
    checkError(node,errors,"Syntax-Fehler");
    if(node.name==="Statement"){
      let s=compileStatement(editor,code,node,parent,errors);
      if(s){
        if(!list) list=s;
        else last.next=s;
        last=s;
      }
    }
    node=node.nextSibling;
  }
  return list;
}

function checkError(node,errors,message){
  if(node.type.isError){
    errors.push({
      from: node.from,
      to: node.to,
      severity: "warning",
      message
    });
    return true;
  }else return false;
}

function compileStatement(editor,code,node,parent,errors){
  let line=editor.getLine(node.from).number;
  node=node.firstChild;
  if(node.name==="Assignment"){
    let v=node.firstChild;
    let n=v.firstChild;
    if(checkError(n,errors,"Variable erwartet")) return;
    let v1=code.substring(n.from,n.to)*1;
    v=v.nextSibling;
    if(checkError(v,errors,"':=' erwartet")) return;
    v=v.nextSibling;
    if(checkError(v,errors,"Variable erwartet")) return;
    n=v.firstChild;
    if(checkError(n,errors,"Variable erwartet")) return;
    let v2=code.substring(n.from,n.to)*1;
    v=v.nextSibling;
    if(checkError(v,errors,"'+' oder '-' erwartet")) return;
    let op=code.substring(v.from,v.to);
    v=v.nextSibling;
    if(checkError(v,errors,"Konstante erwartet")) return;
    n=v.firstChild;
    if(checkError(n,errors,"Konstante erwartet")) return;
    let v3=code.substring(n.from,n.to)*1;

    return {
      type: "Assignment",
      op, v1, v2, c: v3, line, parent
    };
  }else if(node.name==="WhileStatement"){
    //WhileStatement { While Variable NotEqual "0" Do Program End  }
    let s={
      type: "While",line, parent
    };
    let v=node.firstChild;
    if(checkError(v,errors,"'WHILE' erwartet")) return;
    v=v.nextSibling;
    if(checkError(v,errors,"Variable erwartet")) return;
    let n=v.firstChild;
    if(checkError(n,errors,"Variable erwartet")) return;
    let v1=code.substring(n.from,n.to)*1;
    v=v.nextSibling;
    if(checkError(v,errors,"'!=' erwartet")) return;
    v=v.nextSibling;
    if(checkError(v,errors,"'DO' erwartet")) return;
    v=v.nextSibling;
    let program=compileProgram(editor,code,v,s,errors);
    v=v.nextSibling;
    if(checkError(v,errors,"'END' erwartet")) return;
    s.v=v1;
    s.program=program;
    return s;
  }else if(node.name==="LoopStatement"){
    //LoopStatement { Loop Variable Do Program End  }
    let s={
      type: "Loop",line, parent
    };
    let v=node.firstChild;
    if(checkError(v,errors,"'LOOP' erwartet")) return;
    v=v.nextSibling;
    if(checkError(v,errors,"Variable erwartet")) return;
    let n=v.firstChild;
    if(checkError(n,errors,"Variable erwartet")) return;
    let v1=code.substring(n.from,n.to)*1;
    v=v.nextSibling;
    if(checkError(v,errors,"'DO' erwartet")) return;
    v=v.nextSibling;
    let program=compileProgram(editor,code,v,s,errors);
    v=v.nextSibling;
    if(checkError(v,errors,"'END' erwartet")) return;
    s.v=v1;
    s.program=program;
    return s;
  }
}


</script>

<style scoped>
  .sidebar{
    width: auto;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
  }
  .registers{
    overflow: auto;
    flex: 1;
  }

  .register{
    display: flex;
    align-items: center;
  }
  .register>div{
    width: 3rem;
  }
  .register>div:nth-child(2){
    flex: 1;
  }
  table{
    border-collapse: collapse;
  }
  table td, table th{
    border: 1pt solid white;
    padding: 0.2rem;
    text-align: left;
  }
  h1{
    font-size: large;
  }
</style>