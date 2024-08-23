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
        <Button size="small" :disabled="inputError" v-if="mode==='edit'" icon="pi pi-play" rounded text @click="toRunView()"/>
        <Button size="small" v-if="mode==='run'" icon="pi pi-pencil" rounded text @click="mode='edit'"/>
      </template>
    </Menubar>
    <div v-if="mode==='run'">
      <OverlayBatch value="Band" class="top-batch">
        <div id="band+pointer" style="font-size: 150%;position: relative;font-family: monospace;min-height: 1rem;overflow-x: auto;">
          <div ref="band" style="white-space: pre; border: 1pt solid white; min-width: fit-content;">
            {{ band.content }}
          </div>
          <div ref="pointer" style="white-space: pre; position: normal; width: 100%; height: 100%; left: 0; top: 0;" v-html="band.pointerString">
          </div>
        </div>
      </OverlayBatch>
      <div style="margin-top: 0.5rem; margin-bottom: 0.5rem; text-align: center">
        <Button :disabled="running" icon="pi pi-play" @click="run()"/>
        <Button :disabled="halted" icon="pi pi-arrow-right" @click="step()"/>
        <Button :disabled="!running || halted" icon="pi pi-stop" @click="stop()"/>
        <Button :disabled="running" icon="pi pi-refresh" @click="resetRuntime()"/>
        Zustand: <span style="font-family: monospace; font-size: 130%;">{{ runtime.state }}</span>
      </div>
      <table class="transition-table" style="text-align: center; margin: auto">
        <tr><th></th><th>Zustand</th><th>Lesen</th><th>Schreiben</th><th>Bewegen</th><th>neuer Zustand</th></tr>
        <tr v-for="(c,i) in commands" style="font-family: monospace; font-size: 150%;" :class="c===runtime.command? 'active-line':''">
          <td style="width: 2rem; border: none;"><span v-if="c===runtime.command">&#8680;</span></td>
          <td>{{ c.state }}</td>
          <td>{{ c.read.raw }}</td>
          <td>{{ c.write }}</td>
          <td>{{ c.move }}</td>
          <td>{{ c.newState }}</td>
        </tr>
      </table>
    </div>
    <Splitter v-show="mode==='edit'" style="flex: 1;overflow: hidden">
      <SplitterPanel>
        <div style="height: 100%; overflow: auto">
          <CodeMirror ref="editor"/>
        </div>
      </SplitterPanel>
      <SplitterPanel>
        <Card>
          <template #title>
            Einstellungen
          </template>
          <template #content>
            <div style="width: 100%; display: grid; grid-template-columns: auto minmax(0,1fr); align-items: center; gap: 0.5rem">
              <span>Startzustand:</span><InputText v-model="startState"/>
              <span>Eingabe:</span><InputText :invalid="inputError!==null" v-model="input"/>
              <Message v-if="inputError" style="grid-column: 1/3;" severity="error">{{ inputError }}</Message>
              <span>Geschwindigkeit:</span><Slider v-model="speed"/>
            </div>
          </template>
        </Card>
      </SplitterPanel>
    </Splitter>
    
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

const parts=[
    {
      key: "state",
      label: "Zustand",
      allowed: /\w/
    },
    {
      key: "read",
      label: "Lesen",
      allowed: "regexp"
    },{
      key: "write",
      label: "Schreiben",
      allowed: /\S/
    },{
      key: "move",
      label: "Bewegen",
      allowed: /[rl]/
    },{
      key: "newState",
      label: "neuer Zustand",
      allowed: /\w/
    }
  ];

export default{
  components: {
    Menubar,CodeMirror, Splitter, SplitterPanel, Slider, SelectButton, Message
  },
  props: {
    machine: Object
  },
  computed: {
    halted(){
      console.log("check halt",this.runtime.state)
      return (!this.runtime.state || this.runtime.state.toLowerCase().startsWith("halt"));
    },
    inputError(){
      if(this.input.length===0){
        return "Die Eingabe darf nicht leer sein.";
      }
      if(!this.inputParts){
        return "Das Zeichen * darf im Input nur höchstens 1 mal vorkommen (es legt die Startposition des Lese-/Schreibkopfes fest).";
      }
      return null;
    },
    inputParts(){
      let s=this.input.split("*");
      if(s.length>2){
        return null;
      }else if(s.length===2){
        this.band.position=s[0].length;
        return {
          before: s[0],
          at: this.input.charAt(s[0].length),
          after: s[1]
        };
      }else{
        this.band.position=0;
        return {
          before: "",
          at: this.input.charAt(0),
          after: s[0]
        };
      }
    },
    sleepTime(){
      return 2010-this.speed*20;
    }
  },
  data(){
    return {
      startState: "S",
      speed: 100,
      input: "",
      commands: null,
      code: "",
      mode: "edit",
      running: false,
      parts: parts,
      band: {
        content: "",
        position: 0,
        pointerString: ""
      },
      runtime: {
        state: null,
        command: null,
        steps: 0,
        character: null
      }
    }
  },
  methods: {
    resetRuntime(){
      let pos=this.input.indexOf("*");
      if(pos>=0){
        this.band.position=pos;
      }else{
        this.band.position=0;
      }
      this.band.content=this.inputParts.before+this.inputParts.after;
      this.band.pointerString=getBlanks(this.band.position)+"<span id='read-write-head'>&#8679;</span>"+getBlanks(this.band.content.length-this.band.position-1);

      this.runtime.state=this.startState;
      this.runtime.steps=0;
      this.runtime.character=this.inputParts.at;
      this.runtime.command=getCommand(this.commands,this.runtime.state,this.runtime.character);
    },
    scrollHead(){
      let head=this.$refs.pointer.querySelector("#read-write-head");
      head.scrollIntoView();
    },
    save(){
      this.$emit("save");
    },
    toRunView(){
      this.save();
      let code=this.$refs.editor.getValue();
      this.code=code;
      let lines=code.split("\n");
      this.commands=[];
      for(let i=0;i<lines.length;i++){
        let line=lines[i];
        try{
          let c=parseLine(line)
          if(!c) continue;
          c.line=i;
          this.commands.push(c);
        }catch(e){
          alert("Fehler in Zeile "+(i+1)+"\n"+e);
          return;
        }
      }
      this.resetRuntime();
      this.mode="run";

      nextTick(()=>{
        this.scrollHead();
      });
    },
    undo(){

    },
    async run(){
      this.running=true;
      while(this.running){
        this.step();
        await sleep(this.sleepTime);
        if(this.runtime.state.toLowerCase().startsWith("halt")){
          this.running=false;
        }
      }
    },
    halt(){
      this.running=false;
    },
    step(){
      if(!this.runtime.command){
        this.halt();
        return;
      }
      this.runtime.steps++;
      let cmd=this.runtime.command;
      if(cmd.write!=="*"){
        let write=cmd.write==="_"?" ":cmd.write;
        this.band.content=this.band.content.substring(0,this.band.position)+write+this.band.content.substring(this.band.position+1);
      }
      if(cmd.move==="r"){
        this.band.position++;
        this.band.pointerString=" "+this.band.pointerString;
        if(this.band.position>=this.band.content.length){
          this.band.content+=" ";
        }
      }else{
        if(this.band.position>0){
          this.band.position--;
          this.band.pointerString=this.band.pointerString.substring(1);
        }else{
          this.band.content=" "+this.band.content;
        }
      }
      this.runtime.state=cmd.newState;
      this.runtime.character=this.band.content.charAt(this.band.position);
      this.runtime.command=getCommand(this.commands,this.runtime.state,this.runtime.character);
      this.scrollHead();
    },
    stop(){
      this.running=false;
    },
    setUserData(data){
      if(data){
        this.startState=data.startState;
        this.code=data.code;
      }else{
        this.startState=this.machine.startState;
        this.code=this.machine.code;
      }
      this.input=this.machine.exampleInput;
      this.$refs.editor.setValue(this.code);
    },
    getUserData(){
      return {
        machine: {
          startState: this.startState,
          code: this.$refs.editor.getValue()
        }
      }
    }
  }
}


function parseLine(line){
  let state,read,write,move,newState;
  let words=parts;
  let cmd={};
  for(let i=0;i<words.length;i++){
    cmd[words[i].key]=null;
  }
  if(line.startsWith("//")) return null;
  line=line.trim()+" ";
  if(line.length===1) return null;
  let wordIndex=0;
  let word="";
  for(let i=0;i<line.length;i++){
    let c=line.charAt(i);
    if(/\s/.test(c)){
      if(word.length>0){
        cmd[words[wordIndex].key]=word;
        wordIndex++;
        word="";
        if(wordIndex>words.length){
          throw "Zu viele Teile";
        }
      }
    }else{
      //kein whitespace:
      word+=c;
    }
  }
  for(let i=0;i<words.length;i++){
    if(cmd[words[i].key]===null) throw "Unvollständige Zeile ("+words[i].label+" fehlt)";
  }
  cmd.read={
    raw: cmd.read,
    regex: null,
    matchesAll: (cmd.read==="*")
  };
  if(cmd.read.raw==="."){
    cmd.read.regex=/\./;
  }else if(cmd.read.raw==="_"){
    cmd.read.regex=/ /;
  }else if(!cmd.read.matchesAll){
    cmd.read.regex=new RegExp(cmd.read.raw)
  }
  return cmd;
}

function getCommand(commands,state,character){
  for(let i=0;i<commands.length;i++){
    let cmd=commands[i];
    if(cmd.state===state){
      if(cmd.read.matchesAll) return cmd;
      if(cmd.read.regex.test(character)) return cmd;
    }
  }
  return null;
}

function getBlanks(n){
  let b="";
  for(let i=0;i<n;i++){
    b+=" ";
  }
  return b;
}

</script>

<style scoped>
.active-line{
  font-weight: bold;
  color: yellow;
}
</style>