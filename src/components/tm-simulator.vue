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
      </template>
    </Menubar>
    
    <Splitter style="flex: 1;overflow: hidden">
      <SplitterPanel>
        <div v-show="mode==='edit'" style="display: flex; flex-direction: column; height: 100%; overflow: auto">
          <div style="position: relative; flex: 1">
            <CodeMirror ref="editor"/>
            <Button style="position: absolute; right: 0.4rem; bottom: 0.4rem;" :disabled="error" icon="pi pi-play" rounded @click="toRunView()"/>
          </div>
          <Message v-if="errors.length>0" severity="error" >
            <div v-for="(e,i) in errors">
              Z{{e.line}}: {{e.message}}
            </div>
          </Message>
        </div>
        <div v-if="mode==='run'" style="flex: 1; position: relative; overflow: hidden; display: flex; flex-direction: column;">
          <div style="display: flex">
            <OverlayBatch value="Zustand" class="top-batch" style="font-family: monospace; margin-right: 0.5rem;padding-top: 0.5ex; min-height: 3ex;height: fit-content; width: 4em; display: grid; place-content: center; font-size: 150%; border: 1pt solid white;">
              {{ runtime.state }}
            </OverlayBatch>
            <OverlayBatch value="Band" class="top-batch" style="flex: 1">
              <div id="band+pointer" style="width: 100%; font-size: 180%;font-family: monospace;height: 6ex;overflow-x: hidden;overflow-y: hidden;position: relative;">
                <div style="position: absolute; overflow-x: auto; overflow-y: hidden; left: 0; right: 0; top: 0; height: 6ex;">
                  <div ref="band" style="height: 100%; white-space: pre; min-width: fit-content;" v-html="band.contentString">
                  </div>
                </div>
                <div style="position: absolute; left: 0; right: 0; top: 0;  height: 3ex; border: 1pt solid white; width: 100%;"/>
              </div>
            </OverlayBatch>
          </div>
          <div style="margin-top: 0.5rem; margin-bottom: 0.5rem; text-align: center">
            <Button :disabled="running||runState!=='init'" icon="pi pi-play" @click="clickRun()"/>
            <Button :disabled="halted||runState!=='init'" icon="pi pi-arrow-right" @click="step()"/>
            <Button :disabled="!running || halted || runState!=='init'" icon="pi pi-stop" @click="halt()"/>
            <Button :disabled="running" icon="pi pi-refresh" @click="resetRuntime()"/>
            <template v-if="isTuringMachine">Schritte: <span style="">{{ runtime.steps }}<template v-if="maxSteps>=0">/{{ maxSteps }}</template></span></template>
            <template v-if="accepting && runState!=='init'">
              <span v-if="runState==='accepted'" style="color: green">
                Akzeptiert
              </span>
              <span v-else style="color: red">
                Nicht akzeptiert
              </span>
            </template>
          </div>
          <div v-if="accepting">
            Akzeptierende Zustände: <code style="border-width: 3pt;border-color: white; border-style: double;border-radius: 100%; padding: 0.2rem; margin: 0.2rem;" v-for="(z,i) in acceptingStatesArray">{{z}}</code>
          </div>
          <div style="flex: 1; overflow: auto; position: relative;">
            <table class="transition-table" style="text-align: center; margin: auto">
              <tr>
                <th></th>
                <th v-for="p in parts">{{p.label}}</th>
              </tr>
              <tr v-for="(c,i) in commands" style="font-family: monospace; font-size: 150%;" :class="c===runtime.command? 'active-line':''">
                <td style="width: 2rem; border: none;"><span v-if="c===runtime.command">&#8680;</span></td>
                <template v-for="(p,a) in c">
                  <td v-if="a!=='line'">{{ p.raw? p.raw:p }}</td>
                </template>
              </tr>
            </table>
            
          </div>
        </div>
        
      </SplitterPanel>
      <SplitterPanel style="overflow-y: auto">
        <Card>
          <template #title>
            Ausführen{{ exerciseData? ' und Überprüfen':'' }}
          </template>
          <template #content>
            <p v-if="isTuringMachine">Deine Turing-Maschine darf höchstens {{ maxSteps }} Schritte benötigen.</p>
            <Button :disabled="error" v-if="mode==='edit'" icon="pi pi-play" label="Ausführen" @click="toRunView()"/>
            <Button v-if="mode==='run'" icon="pi pi-pencil" label="Bearbeiten" @click="mode='edit'"/>
            <Button v-if="exerciseData" icon="pi pi-list-check" label="Überprüfen" :loading="checking" @click="check()"/>
          </template>
        </Card>
        <Card>
          <template #title>
            Einstellungen
          </template>
          <template #content>
            <div style="width: 100%; display: grid; grid-template-columns: auto minmax(0,1fr); align-items: center; gap: 0.5rem">
              <span>Startzustand:</span><InputText v-model="startState"/>
              <Message v-if="startStateError" style="grid-column: 1/3;" severity="error">{{ startStateError }}</Message>
              <template v-if="accepting">
                <span>Akzeptierende Zustände:</span><InputText v-model="acceptingStates"/>
                <Message v-if="acceptingStatesError" style="grid-column: 1/3;" severity="error">{{ acceptingStatesError }}</Message>
              </template>
              <span>Eingabe:</span><InputText :invalid="inputError!==null" v-model="input"/>
              <Message v-if="inputError" style="grid-column: 1/3;" severity="error">{{ inputError }}</Message>
              <span>Geschwindigkeit:</span><Slider :disabled="maxSpeed" v-model="speed"/>
              <span style="display: flex; align-items: center; grid-column: 1/3;">Nutze Maximale Geschwindigkeit:&nbsp;<ToggleSwitch :disabled="running" v-model="maxSpeed"/></span>
            </div>
          </template>
        </Card>
        <Card pt:body:style="padding-top: 0">
          <template #title>
            Syntax
          </template>
          <template #content>
            <div v-if="isTuringMachine" class="tm-anweisung">[Zustand] [Lesen] [Schreiben] [l/r] [neuer Zustand]</div>
            <div v-if="isFiniteStateMachine" class="tm-anweisung">[Zustand] [Lesen] [neuer Zustand]</div>
          </template>
        </Card>
        <Card pt:body:style="padding-top: 0">
          <template #title>
            Beispiele
          </template>
          <template #content>
            <ul v-if="isTuringMachine">
              <li>
                <span class="tm-anweisung">S x y r A</span>
                <p>Wenn die TM im Zustand <span style="font-family: monospace">S</span> das Zeichen <span style="font-family: monospace">x</span> liest: Maschine schreibt <span style="font-family: monospace">y</span>, geht nach rechts und wechselt in Zustand <span style="font-family: monospace">A</span>.</p>
              </li>
              <li>
                <span class="tm-anweisung">A _ a r B</span>
                <p>Wenn die TM im Zustand <span style="font-family: monospace">A</span> ein Leerzeichen liest: Maschine schreibt <span style="font-family: monospace">a</span>, geht nach rechts und wechselt in Zustand <span style="font-family: monospace">B</span>.</p>
              </li>
              <li>
                <span class="tm-anweisung">NachLinks * * l NachLinks</span>
                <p>Wenn die TM im Zustand <span style="font-family: monospace">NachLinks</span> ein beliebiges Zeichen liest: Maschine schreibt das Zeichen wieder hin, geht nach links und bleibt im Zustand <span style="font-family: monospace">NachLinks</span>.</p>
              </li>
            </ul>
            
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
import { createBoolArray, setArrayToValue } from '../other/bool-array';
import { calcPoints } from '../App.vue';
import ToggleSwitch from 'primevue/toggleswitch';
import AutoComplete from 'primevue/autocomplete';

const parts=[
    {
      key: "state",
      label: "Zustand",
      allowed: /^\w+$/
    },
    {
      key: "read",
      label: "Lesen",
    },{
      key: "write",
      label: "Schreiben",
      allowed: /^\S$/
    },{
      key: "move",
      label: "Bewegen",
      allowed: /^[rl]$/
    },{
      key: "newState",
      label: "neuer Zustand",
      allowed: /^\w+$/
    }
  ];

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
    accepting(){
      if(this.isTuringMachine) return false;
      return true;
    },
    parts(){
      let array=[];
      array.push(parts[0]);
      array.push(parts[1]);
      if(this.isTuringMachine){
        array.push(parts[2]);
        array.push(parts[3]);
      }
      array.push(parts[4]);
      return array;
    },
    isTuringMachine(){
      return this.type==="tm";
    },
    isFiniteStateMachine(){
      return this.type==="fsm";
    },
    maxSteps(){
      if(!this.machine) return 1000000;
      return (this.machine.maxSteps? this.machine.maxSteps:10000);
    },
    halted(){
      return (!this.runtime.state || this.runtime.state.toLowerCase().startsWith("halt"));
    },
    error(){
      return this.inputError || this.acceptingStatesError || this.startStateError;
    },
    inputError(){
      if(this.input.split("*").length>2){
        return "Das Zeichen * darf im Input nur höchstens 1 mal vorkommen (es legt die Startposition des Lese-/Schreibkopfes fest).";
      }
      return null;
    },
    acceptingStatesError(){
      if(!this.accepting) return null;
      if(this.acceptingStates.trim().length===0){
        return "Du musst mindestens einen akzeptierenden Zustand angeben.";
      }
      return null;
    },
    startStateError(){
      if(this.startState.trim().length===0){
        return "Du musst einen Startzustand angeben.";
      }
      return null;
    },
    sleepTime(){
      return 1001-this.speed*10;
    }
  },
  data(){
    return {
      maxSpeed: false,
      startState: "S",
      acceptingStates: "",
      acceptingStatesArray: null,
      speed: 100,
      errors: [],
      input: "",
      commands: null,
      code: "",
      mode: "edit",
      running: false,
      runState: "init",
      checking: false,
      band: {
        content: "",
        before: "",
        after: "",
        at: "",
        position: 0,
        pointerString: ""
      },
      runtime: {
        state: null,
        command: null,
        steps: 0
      }
    }
  },
  methods: {
    async check(){
      this.checking=true;
      this.createAcceptingStatesArray();
      await sleep(10);
      let check=this.exerciseData.data.check;
      let testcases=check.testcases;
      if(!this.compile()){
        setArrayToValue(this.exerciseData.correct,false);
        this.finishChecking();
        return;
      }
      let input=check.input;
      setArrayToValue(this.exerciseData.correct,true);
      let inputs=input();
      if(!Array.isArray(inputs)) inputs=[inputs];
      for(let j=0;j<inputs.length;j++){
        await sleep(10);
        let input=inputs[j]+"";
        this.resetRuntime(input);
        let ok=this.runAtMaxSpeed();
        if(!ok){
          setArrayToValue(this.exerciseData.correct,false);
          this.finishChecking();
          return;
        }
        let output;
        if(this.isTuringMachine) output=this.getBandContent();
        else output=this.runState==="accepted";
        for(let k=0;k<testcases.length;k++){
          if(this.exerciseData.correct[k]!==true) continue;
          let tc=testcases[k];
          let ok=tc.check(input,output);
          if(!ok){
            if(input.length>0){
              this.exerciseData.correct[k]="Fehler trat auf bei Input <code>"+input+"</code>";
            }else{
              this.exerciseData.correct[k]="Fehler trat auf bei leerem Input";
            }
            
          }
        }
      }
      this.finishChecking();
    },
    finishChecking(){
      calcPoints(this.exerciseData);
      this.save();
      this.$emit("exercise-submit");
      this.checking=false;
    },
    getBandContent(){
      return this.band.before+this.band.at+this.band.after;
    },
    resetRuntime(input){
      this.runState="init";
      if(input===undefined) input=this.input;
      let pos=input.indexOf("*");
      
      let s=input.split("*");
      let before,after,at;
      if(s.length>2){
        return;
      }else if(s.length===2){
        this.band.position=s[0].length;
        before=s[0];
        after=s[1];
        at=input.charAt(s[0].length+1);
      }else{
        this.band.position=0;
        before="";
        after=s[0];
        at=input.charAt(0);
      }
      if(!at) at=" ";
      after=after.substring(1);
      this.band.content=before+at+after;
      this.band.before=before;
      this.band.after=after;
      this.band.at=at;
      this.band.pointerString=getBlanks(this.band.position)+"<span id='read-write-head'>&#8679;</span>"+getBlanks(this.band.content.length-this.band.position-1);

      this.updateContentString();

      this.runtime.state=this.startState;
      this.runtime.steps=0;
      this.runtime.command=getCommand(this.commands,this.runtime.state,this.band.at);
    },
    updateContentString(){
      this.band.contentString=this.band.before+"<span id='read-write-position'><span id='read-write-band'>"+this.band.at+"</span><span id='read-write-head'>&#8679;</span></span>"+this.band.after;
    },
    scrollHead(){
      if(!this.$refs.band) return;
      let head=this.$refs.band.querySelector("#read-write-position");
      if(head) head.scrollIntoView();
    },
    save(){
      this.$emit("save");
    },
    compile(){
      let code=this.$refs.editor.getValue();
      this.code=code;
      let lines=code.split("\n");
      this.commands=[];
      this.errors=[];
      for(let i=0;i<lines.length;i++){
        let line=lines[i];
        try{
          let c=parseLine(line,this.parts);
          if(!c) continue;
          c.line=i;
          this.commands.push(c);
        }catch(e){
          this.errors.push({
            line: i+1,
            message: e
          });
        }
      }
      if(this.errors.length===0){
        return true;
      }else{
        return false;
      }
    },
    toRunView(){
      this.save();
      if(!this.compile()) return;
      this.resetRuntime();
      this.mode="run";
      this.runState="init";
      this.createAcceptingStatesArray();
      nextTick(()=>{
        this.scrollHead();
      });
    },
    undo(){

    },
    clickRun(){
      if(this.maxSpeed){
        this.runAtMaxSpeed();
        this.scrollHead();
      }else{
        this.run();
      }
    },
    async run(){
      this.running=true;
      while(this.running){
        this.step();
        await sleep(this.sleepTime);
      }
    },
    createAcceptingStatesArray(){
      this.acceptingStatesArray=[];
      let states=this.acceptingStates.trim();
      if(states.length===0) return;
      states=states.split(/\s+/);
      for(let i=0;i<states.length;i++){
        let s=states[i].trim();
        this.acceptingStatesArray.push(s);
      }
    },
    isInAcceptingState(){
      return this.acceptingStatesArray.indexOf(this.runtime.state)>=0;
    },
    runAtMaxSpeed(){
      this.running=true;
      while(this.running){
        this.step();
        if(this.runtime.steps>this.maxSteps){
          return false;
        }
      }
      return true;
    },
    halt(){
      this.running=false;
    },
    step(){
      if(!this.runtime.command){
        this.stop();
        return;
      }
      this.runtime.steps++;
      let cmd=this.runtime.command;
      let write;
      if(cmd.write===undefined){
        write=this.band.at;
      }else if(cmd.write!=="*"){
        write=cmd.write==="_"?" ":cmd.write;
        
        //this.band.content=this.band.content.substring(0,this.band.position)+write+this.band.content.substring(this.band.position+1);
      }else{
        write=this.band.at;
      }
      if(cmd.move==="l"){
        this.band.after=write+this.band.after;
        this.band.at=this.band.before.length>0? this.band.before.charAt(this.band.before.length-1) : " ";
        this.band.before=this.band.before.substring(0,this.band.before.length-1);
      }else{
        this.band.before+=write;
        this.band.at=this.band.after.length>0 ? this.band.after.charAt(0): " ";
        this.band.after=this.band.after.substring(1);
      }
      this.runtime.state=cmd.newState;
      this.runtime.command=getCommand(this.commands,this.runtime.state,this.band.at);
      this.updateContentString();
      nextTick(()=>{
        this.scrollHead();
      });
      if(this.isTuringMachine){
        if(!this.runtime.state || this.runtime.state.toLowerCase().startsWith("halt")){
          this.stop();
        }
      }else{
        if(this.band.at===" " && this.band.after.length===0){
          this.stop();
        }
      }
      
    },
    stop(){
      this.running=false;
      if(this.accepting){
        if(this.band.at===" " && this.band.after.length===0){
          if(this.isInAcceptingState()){
            this.runState="accepted";
          }else{
            this.runState="refused";
          }
        }else{
          this.runState="refused";
        }
        
      }
    },
    setUserData(data){
      if(data){
        this.startState=data.startState;
        this.code=data.code;
        if(data.acceptingStates){
          this.acceptingStates=data.acceptingStates;
        }
      }else{
        this.startState=this.machine.startState;
        this.code=this.machine.code;
        this.acceptingStates="";
      }
      this.input=this.machine.exampleInput;
      this.$refs.editor.setValue(this.code);
    },
    getUserData(){
      let machine={
        startState: this.startState,
        code: this.$refs.editor.getValue()
      };
      if(this.accepting){
        machine.acceptingStates=this.acceptingStates;
      }
      return {
        machine
      }
    }
  }
}


function parseLine(line,parts){
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
        if(words[wordIndex].allowed && !words[wordIndex].allowed.test(word)){
          throw "Unerlaubter "+words[wordIndex].label+"-Teil: "+JSON.stringify(word)
        }
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
  let r=cmd.read.raw;
  if(r==="."||r==="+"||r==="("||r===")"||r==="["||r==="]"||r==="{"||r==="}"||r==="|"){
    cmd.read.regex=new RegExp("\\"+cmd.read.raw);
  }else if(cmd.read.raw==="_"){
    cmd.read.regex=/ /;
  }else if(!cmd.read.matchesAll){
    cmd.read.regex=new RegExp(cmd.read.raw)
  }
  return cmd;
}

function getCommand(commands,state,character){
  let matchesAll=null;
  for(let i=0;i<commands.length;i++){
    let cmd=commands[i];
    if(cmd.state===state){
      if(cmd.read.matchesAll){
        matchesAll=cmd;
      }
      else if(cmd.read.regex.test(character)) return cmd;
    }
  }
  return matchesAll;
}

function getBlanks(n){
  let b="";
  for(let i=0;i<n;i++){
    b+=" ";
  }
  return b;
}

</script>

<style>
  .active-line{
    font-weight: bold;
    color: yellow;
  }
  .tm-anweisung{
    font-family: monospace;
    font-size: 130%;
  }

  #read-write-position{
    white-space: pre;
    position: relative;
  }

  #read-write-band{
    height: 3ex;
    display: inline-block;
    background-color: rgba(255,255,0,0.7);
    color: black;
  }

  #read-write-head{
    position: absolute;
    height: 3ex;
    z-index: 1;
    left: 0;
    right: 0;
    top: 110%;
  }
</style>