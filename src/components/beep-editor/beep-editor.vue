<template>
  <div id="wrapper" :style="{maxHeight: editorMaxHeight}">
    <div class="no-print" id="left-side">
      <div id="editor">
        <CodeMirror 
          language="python"
          ref="editor" 
          v-model="code"
          :linter="linter"
          :autocomplete-provider="autocompleteProvider"
          @update-tree="updateTree"
          @blur="save()"
        />
      </div>
    </div>
    <div id="preview">
      <div id="controls">
        <Button icon="pi pi-play" @click="run()" :disabled="running"/>
        <Button icon="pi pi-stop" @click="stop()" :disabled="!running"/>
        <Button icon="pi pi-list-check" @click="check()" :disabled="running"/>
        <ToggleButton on-label="Schnell" off-label="Langsam" v-model="maxSpeed"/>
        <Button icon="pi pi-refresh" @click="changeTestcase()" :disabled="running"/>
      </div>
      <div>
        <GameWorld
          ref="gameworld"
          :beep="beep"
          :width="worldWidth"
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

export default{
  components: {
    CodeMirror, GameWorld, ToggleButton
  },
  emits: [
  "save", "exercise-submit"
  ],
  props: {
    exerciseData: Object,
    beep: Object,
  },
  computed: {
    worldWidth(){
      if(this.beep.worldWidth) return this.beep.worldWidth; else return "10rem";
    },
    editorMaxHeight(){
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
  },
  data(){
    return {
      tree: null,
      program: null,
      errors: [],
      scope: {},
      maxSpeed: false,
      nextStatement: 0,
      running: false,
      variables: [],
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
    changeTestcase(){
      
    },
    updateLinter(){
      this.$refs.editor.updateLinter();
    },
    async run(){
      if(this.running) return;
      await this.stop();
      this.running=true;
      this.scope={
        gameworld: this.$refs.gameworld.gameworld,
        layers: [
          {}
        ],
        blocks: [
          {
            program: this.program,
            nextStatement: 0
          }
        ]
      }
      let proceed=true;
      this.updateHighlightedLine();
      while(proceed && this.running){
        await sleep(this.speed);
        proceed=await this.step();
        this.updateHighlightedLine();
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
        this.$refs.editor.highlightLine(this.$refs.editor.getLine(st.node.from).number);
      }else{
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
    async step(){
      let block=this.scope.blocks[this.scope.blocks.length-1];
      if(!block) return false;
      let st=block.program[block.nextStatement];
      if(st && st.ignoreOnRun){
        block.nextStatement++;
        st=null;
      }
      while(!st){
        this.scope.blocks.pop();
        this.scope.layers.pop();
        block=this.scope.blocks[this.scope.blocks.length-1];
        if(!block) return false;
        st=block.program[block.nextStatement];
        if(st && st.ignoreOnRun){
          block.nextStatement++;
          st=null;
        }
      }
      let run=getRunFunction(st.type);
      let stay=run(this.scope, st);
      //block=this.scope.blocks[this.scope.blocks.length-1];
      if(stay!==true) block.nextStatement++;
      this.updateVariables();
      return true;
    },
    async stop(){
      this.running=false;
      this.$refs.gameworld.gameworld.reset();
      this.$refs.gameworld.$forceUpdate();
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
  #editor{
    height: 100%;
  }
  
</style>