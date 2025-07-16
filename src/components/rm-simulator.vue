<template>
  <div class="screen" style="display: flex; flex-direction: column">
    <Menubar
      :model="[]"
    >
      <template #start>
        <Button icon="pi pi-bars" text @click=""/>
      </template>
      <template #end>
        <Button size="small"  icon="pi pi-undo" rounded text @click="undo()"/>
        <Button size="small"  icon="pi pi-refresh" rounded text @click="redo()"/>
        <Button size="small" :disabled="error || running && !paused" icon="pi pi-play" rounded text @click="run()"/>
        <Button size="small" :disabled="error || running && !paused" icon="pi pi-arrow-right" rounded text @click="step()"/>
        <Button size="small" :disabled="error || !running" icon="pi pi-stop" rounded text @click="stop()"/>
      </template>
    </Menubar>
    <div style="display: flex; flex-direction: column; height: 100%; overflow: auto">
      <div style="flex: 1">
        <CodeMirror language="register" ref="editor"/>
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


export default{
  components: {
    Menubar,CodeMirror, Splitter, SplitterPanel, Slider, SelectButton, Message, ToggleSwitch, AutoComplete
  },
  props: {
    machine: Object,
    exerciseData: Object,
    type: String
  },
  computed: {
    error(){
      return false;
    }
  },
  data(){
    return {
      running: false,
      paused: false,
      runtime: {
        line: 0,
        registers: [0]
      }
    }
  },
  methods: {
    async check(){
      
      this.finishChecking();
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

    },
    async run(){
      this.running=true;
      while(this.running){
        this.step();
        await sleep(100);
      }
    },
    halt(){
      this.running=false;
    },
    step(){
      
      
    },
    stop(){
      this.running=false;
    },
    setUserData(data){
      if(!data){
        data=this.machine;
      }
      if(data){
        this.registers=[];
        let regs=JSON.parse(data.registers);
        for(let i=0;i<regs.length;i++){
          this.registers.push(regs[i]);
        }
        this.code=data.code;
      }
      this.$refs.editor.setValue(this.code);
    },
    getUserData(){
      let machine={
        registers: JSON.stringify(this.registers),
        code: this.$refs.editor.getValue()
      };
      return {
        machine
      }
    }
  }
}



</script>

<style>
  
</style>