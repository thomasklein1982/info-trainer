<template>
  <div>
    <Hint v-if="beep.maxMoveCount">Du darfst höchstens {{ beep.maxMoveCount }} Move-Befehle verwenden.</Hint>
    <div id="wrapper" :style="{maxHeight: editorMaxHeight}">
      <div :class="reverse? '':'invisible-at-print'" id="left-side">
        <div id="editor-wrapper">
          <div class="editor" v-show="language==='python'">
            <CodeMirror 
              language="python"
              class="print-friendly"
              ref="editor"
              v-model="code"
              :linter="linter"
              :autocomplete-provider="autocompleteProvider"
              @update-tree="updateTree"
              @blur="save()"
            />
            <div id="meta-infos" :style="{color: moveCount>beep.maxMoveCount? 'red':'inherit'}" v-if="beep.maxMoveCount">
              {{ moveCount }} / {{ beep.maxMoveCount }} Move-Befehle
            </div>
            <div id="overlay" v-if="reverse"/>
          </div>
          <div class="editor" v-if="language==='struktogramm'">
            <Struktogramm :python-program="program" :scope="parseScope" :highlighted-statement="highlightedStatement"/>
          </div>
        </div>
      </div>
      <div id="preview">
        <div id="controls" class="no-print" v-if="!reverse">
          <Button icon="pi pi-play" @click="run()" :disabled="running"/>
          <Button icon="pi pi-stop" @click="stop()" :disabled="!running"/>
          <Button icon="pi pi-list-check" @click="check()" :disabled="running"/>
          <ToggleButton on-label="Schnell" off-label="Langsam" v-model="maxSpeed"/>
          <Button icon="pi pi-refresh" @click="changeTestcase()" :disabled="running"/>
        </div>
        <div>
          <GameWorld
            :class="maxSpeed? 'max-speed':'slow-speed'"
            style="border: 2pt solid gray"
            ref="gameworld"
            :beep="beep"
            :width="worldWidth"
            :force-writable="writable"
          />
        </div>
        <div id="variables" v-if="running">
          <table>
            <tr>
              <th>Variable</th>
              <th>Wert</th>
            </tr>
            <tr v-for="(v,i) in variables">
              <td>{{v.name}} </td>
              <td>{{v.value}}</td>
            </tr>
          </table>
        </div>
        
      </div>
    </div>
    <Message v-if="runtimeError" severity="error">{{ runtimeError }}</Message>
    <div v-if="reverse" class="no-print">
      <Message :icon="'pi pi-'+(completed || exerciseData.correct[i]===true?'check':(exerciseChecked? 'times': 'question'))" :severity="(completed || exerciseData.correct[i]===true?'success':(exerciseChecked? 'error': 'secondary'))" v-for="(t,i) in exerciseData.data.tasks">
        <span v-html="t.info"/>
      </Message>
      <Button :disabled="running" v-if="!exerciseChecked" icon="pi pi-list-check" label="Überprüfen" @click="checkReverseExercise()"/>
      <Button v-else icon="pi pi-refresh" label="Neue Aufgabe" @click="refreshReverseExercise()"/>
    </div>
    <div v-else-if="exerciseData" class="no-print">
      Ziele:
      <Message :icon="'pi pi-'+(completed || exerciseData.correct[i]===true?'check':'times')" :severity="(completed || exerciseData.correct[i]===true?'success':'error')" v-for="(t,i) in exerciseData.data.check.testcases">
        <span v-html="t.info"/>
      </Message>
    </div>
    <Dialog header="Zu viele Move-Befehle" v-model:visible="showTooManyCommands" :closable="true">
      Dein Programm verwendet {{ moveCount }} Move-Befehle, du darfst aber nur höchstens {{ beep.maxMoveCount }} Move-Befehle verwenden.
      <p>Vielleicht musst du noch mal neu über die Aufgabe nachdenken?</p>
    </Dialog>
  </div>
</template>

<script>
import CodeMirror from '../code-mirror.vue';
import {linter} from "@codemirror/lint";
import {syntaxTree} from "@codemirror/language";
import GameWorld from '../game-world.vue';
import { calcPoints } from '../../App.vue';

import { sleep } from '../../other/sleep';
import { Methods } from './methods';
import { CompileFunctions, getRunFunction } from './compile-functions';
import { parsePython } from './parsePython';
import ToggleButton from 'primevue/togglebutton';
import Message from 'primevue/message';
import { random } from '../../other/random';
import { isCompletelyTrue } from '../../other/bool-array';
import Struktogramm from '../struktogramm.vue';
import { BeepScope } from './BeepScope';

export default{
  components: {
    CodeMirror, GameWorld, ToggleButton, Message, Struktogramm
  },
  emits: [
    "save", "exercise-submit", "check-reverse", "refresh-reverse"
  ],
  props: {
    exerciseData: Object,
    beep: Object,
    writable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    language(){
      return this.beep.language? this.beep.language: "python";
    },
    exerciseChecked(){
      return this.exerciseData?.userProject!==undefined;
    },
    reverse(){
      return this.beep.reverse? true: false;
    },
    completed(){
      return this.exerciseData?.correct===true||isCompletelyTrue(this.exerciseData?.correct);
    },
    worldWidth(){
      if(this.beep.worldWidth) return this.beep.worldWidth; else return "10rem";
    },
    editorMaxHeight(){
      if(this.reverse) return "1000rem";
      if(this.beep.editorMaxHeight) return this.beep.editorMaxHeight; else return "20rem";
    },
    speed(){
      if(this.maxSpeed) return 10;
      else return 500;
    }
  },
  mounted(){
    if(this.exerciseData && this.exerciseData.userProject){
      this.setUserData(this.exerciseData.userProject);
    }else{
      this.setUserData();
    }
    this.$refs.editor.setValue(this.code);
  },
  data(){
    return {
      tree: null,
      id: random(1,10000),
      program: null,
      parseScope: null,
      moveCount: 0,
      highlightedStatement: null,
      errors: [],
      runtimeError: null,
      scope: {},
      maxSpeed: false,
      nextStatement: 0,
      testCaseIndex: 0,
      showTooManyCommands: false,
      running: false,
      checking: false,
      variables: [],
      compiled: false,
      code: this.beep.code? this.beep.code.trim(): "",
      autocompleteProvider: autocomplete,
      linter: linter(view => {
        let diagnostics=[];
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
    getFieldValues(){
      let values={};
      for(let i=0;i<this.$refs.gameworld.gameworld.fields.length;i++){
        let row=this.$refs.gameworld.gameworld.fields[i];
        for(let j=0;j<row.length;j++){
          let f=row[j];
          values[f.x+","+f.y]={
            field: f,
            text: f.text+""
          };
        }
      }
      return values;
    },
    async checkReverseExercise(){
      let valuesBefore=this.getFieldValues();
      await this.run();
      this.running=false;
      let valuesAfter=this.getFieldValues();
      let valuesUser=this.$refs.gameworld.values;
      let correct=true;
      for(let a in valuesAfter){
        let v=valuesAfter[a];
        let before=valuesBefore[a];
        if(before.text.length>0){
          if(v.text!==before.text){
            correct=false;
            continue;
          }
        }
        if(v.text.length>0){
          if(!(a in valuesUser)){
            correct = false;
            continue;
          }
          let user=(valuesUser[a]+"").trim();
          if(user!==v.text){
            correct = false;
            continue;
          }
        }else{
          if(a in valuesUser){
            let user=(valuesUser[a]+"").trim();
            if(user!=="B" && user.length>0){
              correct = false;
              continue;
            }
          }
        }
      }
      this.$emit("check-reverse",{correct,soll: valuesAfter, ist: valuesUser, gameworld: this.$refs.gameworld.gameworld});
      this.highlightedStatement=null;
    },
    refreshReverseExercise(){
      this.$emit("refresh-reverse");
    },
    changeTestcase(){
      this.testCaseIndex++;
      this.$refs.gameworld.gameworld.reset(this.testCaseIndex);
    },
    updateLinter(){
      this.$refs.editor.updateLinter();
    },
    async check(){
      let testcases=this.exerciseData.data.check.testcases;
      if(this.beep.maxMoveCount && this.moveCount>this.beep.maxMoveCount){
        this.showTooManyCommands=true;
        this.exerciseData.correct=[];
        for(let i=0;i<testcases.length;i++){
          this.exerciseData.correct.push(false);
        }
        calcPoints(this.exerciseData);
        this.save();
        return;
      }
      this.exerciseData.correct=[];
      for(let i=0;i<testcases.length;i++){
        this.exerciseData.correct.push(true);
      }
      
      this.checking=true;
      let count=this.beep.testdata.count;
      let testData;
      try{
        for(let i=0;i<count;i++){
          testData=this.$refs.gameworld.gameworld.reset(i);
          await this.run(testData);
          this.stop();
        }
      }catch(e){
        for(let i=0;i<testcases.length;i++){
          this.exerciseData.correct[i]=false;
        }
      }
      calcPoints(this.exerciseData);
      this.save();
      this.checking=false;
      this.stop();
    },
    initializeScope(){
      this.scope=new BeepScope(this.$refs.gameworld.gameworld, this.program);
      
    },
    runImmediately(testData){
      if(this.running) return;
      this.stop();
      this.running=true;
      this.initializeScope();
      let proceed=true;
      while(proceed && this.running){
        proceed=this.step();
      }
      this.running=false;
    },
    async run(testData){
      if(this.running ||!this.program) {
        if(this.exerciseData && this.checking){
          let testcases=this.exerciseData.data.check.testcases;
          this.exerciseData.correct=[];
          for(let i=0;i<testcases.length;i++){
            this.exerciseData.correct.push(false);
          }
        }
        return;
      }
      this.stop();
      this.running=true;
      this.initializeScope();
      let proceed=true;
      let globalCorrect=this.exerciseData?.correct;
      let correct;
      if(this.checking){
        correct=[];
        let testcases=this.exerciseData.data.check.testcases;
        for(let i=0;i<testcases.length;i++){
          correct.push(false);
        }
      }else this.updateHighlightedLine();
      while(proceed && this.running){
        if(!this.checking) await sleep(this.speed);
        proceed=this.step();
        if(this.checking) this.checkTestCases(testData,false,correct);
        else this.updateHighlightedLine();
      }
      if(this.checking){
        //letzter Check am Programmende:
        this.checkTestCases(testData,true,correct);
        for(let i=0;i<globalCorrect.length;i++){
          if(!globalCorrect[i]) continue;
          globalCorrect[i]=correct[i];
        }
      }else this.updateHighlightedLine();

    },
    checkTestCases(testData,isProgramOver,correctArray){
      let testcases=this.exerciseData.data.check.testcases;
      for(let i=0;i<testcases.length;i++){
        if(correctArray[i]) continue;
        let tc=testcases[i];
        correctArray[i]=tc.check(this.$refs.gameworld.gameworld,testData, isProgramOver, this.scope);
      }
    },
    updateHighlightedLine(){
      let st=this.getNextStatement();
      // let block=this.scope.blocks[this.scope.blocks.length-1];
      // let st=null;
      // if(block){
      //   st=block.program[block.nextStatement];
      // }
      if(st){
        this.highlightedStatement=st;
        this.$refs.editor.highlightLine(this.$refs.editor.getLine(st.node.from).number);
      }else{
        this.highlightedStatement=null;
        this.$refs.editor.highlightLine(-1);
      }
    },
    getNextStatement(){
      let block=this.scope.blocks[this.scope.blocks.length-1];
      if(!block) return null;
      let st=block.program[block.nextStatement];
      if(st && st.ignoreOnRun){
        block.nextStatement++;
        st=null;
      }
      let i=1;
      while(!st){
        block=this.scope.blocks[this.scope.blocks.length-i];
        if(!block) return null;
        st=block.program[block.nextStatement];
        if(st && st.ignoreOnRun){
          block.nextStatement++;
          st=null;
        }else{
          i++;
        }
      }
      return st;
    },
    updateVariables(){
      this.variables=[];
      for(let i=0;i<this.scope.layers.length;i++){
        let l=this.scope.layers[this.scope.layers.length-i-1];
        for(let a in l){
          this.variables.push({
            name: a,
            value: JSON.stringify(l[a].value)
          });
        }
      }
    },
    step(){
      let block=this.scope.blocks[this.scope.blocks.length-1];
      if(!block) return false;
      let st=block.program[block.nextStatement];
      // if(st && st.ignoreOnRun){
      //   block.nextStatement++;
      //   st=null;
      // }
      while(!st){
        this.scope.blocks.pop();
        if(this.scope.layers.length>1) this.scope.layers.pop();
        block=this.scope.blocks[this.scope.blocks.length-1];
        if(!block) return false;
        st=block.program[block.nextStatement];
      }
      let stay=false;
      if(!st.ignoreOnRun){
        let run=getRunFunction(st.type);
        try{
          stay=run(this.scope, st);
        }catch(e){
          this.runtimeError=e;
          if(this.checking) throw e;
          return false;
        }
      }
      if(stay!==true) block.nextStatement++;
      this.updateVariables();
      return true;
    },
    stop(){
      this.highlightedStatement=null;
      this.running=false;
      this.runtimeError=null;
      this.$refs.gameworld.gameworld.reset();
      this.$refs.gameworld.$forceUpdate();
    },
    updateTree(tree){
      this.tree=tree;
      this.compiled=false;
      this.compile();
      if(this.reverse && this.exerciseChecked){
        this.runImmediately();
        
      }
    },
    compile(){
      while(this.errors.length>0) this.errors.pop();
      this.compiled=true;
      this.program=[];
      this.moveCount=0;
      if(!this.tree || !this.tree.topNode || !this.tree.topNode.firstChild || this.code.trim().length===0) return;
      let nodeZeile=this.tree.topNode.firstChild;
      let res=parsePython(this.code,nodeZeile,this.errors);
      this.program=res.program;
      this.parseScope=res.scope;
      this.moveCount=res.scope.moveCount;
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
      if(this.reverse) return;
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






</script>

<style scoped>
  #wrapper{
    width: 100%;
    display: grid;
    height: 100%;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr auto;
  }
  #left-side{
    overflow: hidden;
  }
  #editor-wrapper{
    height: 100%;
  }
  .editor{
    height: 100%;
    position: relative;
  }
  #meta-infos{
    position: absolute;
    bottom: 0;
    right: 16px;
    font-size: small;
    pointer-events: none;
  }
  #overlay{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
</style>