<template>
  <div class="screen" style="display: flex; flex-direction: column; overflow: hidden">
    <Menubar
      :model="[]"
    >
      <template #start>
        <Button size="small" :disabled="error || state==='running' || state==='halted'" icon="pi pi-play" rounded text label="Run" @click="run()"/>
        <Button size="small" :disabled="error || state==='running' || state==='halted'" icon="pi pi-arrow-right" rounded label="Step" text @click="step()"/>
        <Button size="small" :disabled="error || state==='blank'" icon="pi pi-stop" rounded text @click="stop()" label="Stop"/>
        <Button v-if="exerciseData" icon="pi pi-list-check" label="Überpüfen" :loading="checking" @click="check()" text/>
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
          <CodeMirror language="register" ref="editor" v-model="code" @update-tree="updateTree"/>
        </div>
      </div>
      <div class="sidebar">
        
        <div class="register">
          <div style="font-weight: bold">Akku:</div>
          <div><InputNumber fluid v-model="runtime.akkumulator"/></div>
        </div>
        <div class="registers">
          <div class="register" v-for="(r,i) in runtime.registers">
            <div>R{{ i+1 }}:</div>
            <div><InputNumber fluid v-model="runtime.registers[i]"/></div>
          </div>
          <div>
            <Button icon="pi pi-plus" text @click="runtime.registers.push(0)"/>
            <Button icon="pi pi-minus" text @click="runtime.registers.pop()"/>
          </div>
        </div>
        <div>
          <Button icon="pi pi-undo" fluid label="Reset" @click="resetMachine()"/>
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

export default{
  components: {
    Menubar,CodeMirror, Splitter, SplitterPanel, Slider, SelectButton, Message, ToggleSwitch, AutoComplete, InputNumber
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
      state: "blank",
      tree: null,
      compiled: false,
      code: "",
      checking: false,
      maxSpeed: false,
      sprungmarken: {},
      zeilen: [],
      runtime: {
        zeileIndex: 0,
        akkumulator: 0,
        registers: [0]
      }
    }
  },
  mounted(){
//     this.code=`LOAD #1	// Initialisierung mit Ergebnis = 1
//  	STORE 3	 
// M1:	LOAD 2	// lade Exponent
//  	JZERO Ende	// m = 0, Berechnung fertig
//  	SUB #1	// m = m - 1
//  	STORE 2	 
//  	LOAD 3	 
//  	MUL 1	// Ergebnis = Ergebnis * n
//  	STORE 3	 
//  	GOTO M1	// nächster Schleifendurchlauf
// Ende:	END`;
//     this.$refs.editor.setValue(this.code);
    this.reset();
    this.resetMachine();
  },
  methods: {
    updateTree(tree){
      this.tree=tree;
      this.compiled=false;
    },
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
      if(this.maxSpeed){
        this.runAtMaxSpeed();
        return;
      }
      if(this.state!=="running"){
        this.state="running";
      }
      while(this.state==="running"){
        this.step();
        await sleep(100);
      }
    },
    runAtMaxSpeed(){
      if(this.state!=="running"){
        this.state="running";
      }
      while(this.state==="running"){
        this.step();
      }
    },
    halt(){
      this.state="halted";
      this.setHighlightedLineNumber(0);
    },
    resetMachine(){
      this.runtime.akkumulator=0;
      this.runtime.registers=[0,0,0,0,0,0,0,0,0,0];
    },
    reset(){
      this.state="blank";
      this.runtime.zeileIndex=0;
      this.setHighlightedLineNumber(1);
    },
    setHighlightedLineNumber(lineNo){
      this.$refs.editor.highlightLine(lineNo);
    },
    compile(){
      this.sprungmarken={};
      this.zeilen=[];
      this.compiled=true;
      if(!this.tree || !this.tree.topNode || !this.tree.topNode.firstChild) return;
      let nodeZeile=this.tree.topNode.firstChild;
      let line=1;
      while(nodeZeile){
        console.log("Zeile "+line+":",nodeZeile.toString())
        let node=nodeZeile.firstChild;
        let zeile={
          marke: null,
          line: line,
          command: null,
          argument: null,
          ziel: null,
          node: nodeZeile
        };
        nodeZeile=nodeZeile.nextSibling;
        if(nodeZeile) nodeZeile=nodeZeile.nextSibling;
        if(nodeZeile && nodeZeile.name!=="Zeile") nodeZeile=nodeZeile.nextSibling;
        line++;

        if(!node) continue;

        if(node.name==="Marke"){
          let m={
            label: this.code.substring(node.from,node.to-1),
            zeile: zeile
          };
          this.sprungmarken[m.label]=m;
          zeile.marke=m;
          node=node.nextSibling;
        }
        if(node.name==="Anweisung"){
          let cmdType=node.firstChild;
          zeile.command=this.code.substring(cmdType.from,cmdType.to).toUpperCase();
          let arg=cmdType.nextSibling;
          if(arg){
            if(arg.name==="VALUE"){
              arg=arg.firstChild;
              let offset=arg.name==="DIREKT"? 0:1;
              zeile.argument={
                type: arg.name,
                value: this.code.substring(arg.from+offset,arg.to)*1
              };
            }else{
              zeile.ziel=this.code.substring(arg.from,arg.to);
            }
          }
          zeile.index=this.zeilen.length;
          this.zeilen.push(zeile);
        }
        
      }

    },
    step(){
      if(!this.compiled){
        this.compile();
      }
      if(this.state==="blank"){
        this.state="stepping";
      }
      let zeile=this.zeilen[this.runtime.zeileIndex];
      this.runtime.zeileIndex++;
      let naechsteZeile=this.zeilen[this.runtime.zeileIndex];

      if(!zeile) {
        this.halt();
        return;
      }
      if(zeile.command==="END"){
        this.halt();
      }else if(zeile.command==="LOAD"){
        let v=this.getValue(zeile.argument);
        this.runtime.akkumulator=v;
      }else if(zeile.command==="STORE"){
        let r=this.setValue(zeile.argument,this.runtime.akkumulator);
        if(!r){
          alert("Bei STORE darf keine Konstante verwendet werden");
        }
      }else if(zeile.command==="ADD"){
        let v=this.getValue(zeile.argument);
        this.runtime.akkumulator+=v;
      }else if(zeile.command==="SUB"){
        let v=this.getValue(zeile.argument);
        this.runtime.akkumulator-=v;
        if(this.runtime.akkumulator<0) this.runtime.akkumulator=0;
      }else if(zeile.command==="MUL"){
        let v=this.getValue(zeile.argument);
        this.runtime.akkumulator*=v;
      }else if(zeile.command==="DIV"){
        let v=this.getValue(zeile.argument);
        if(v===0) this.halt();
        this.runtime.akkumulator=Math.floor(this.runtime.akkumulator/v);
      }else if(zeile.command==="GOTO"){
        let m=this.sprungmarken[zeile.ziel];
        if(!m){
          alert("Es gibt keine Sprungmarke "+zeile.ziel);
          return;
        }
        this.runtime.zeileIndex=m.zeile.index;
        naechsteZeile=m.zeile;
      }else if(zeile.command==="JZERO"){
        if(this.runtime.akkumulator===0){
          let m=this.sprungmarken[zeile.ziel];
          if(!m){
            alert("Es gibt keine Sprungmarke "+zeile.ziel);
            return;
          }
          this.runtime.zeileIndex=m.zeile.index;
          naechsteZeile=m.zeile;
        }
      }else if(zeile.command==="JNZERO"){
        if(this.runtime.akkumulator!==0){
          let m=this.sprungmarken[zeile.ziel];
          if(!m){
            alert("Es gibt keine Sprungmarke "+zeile.ziel);
            return;
          }
          this.runtime.zeileIndex=m.zeile.index;
          naechsteZeile=m.zeile;
        }
      }
      if(naechsteZeile && !this.maxSpeed){
        this.setHighlightedLineNumber(naechsteZeile.line);
      }else{
        this.setHighlightedLineNumber(0);
      }
      if(!naechsteZeile) this.halt();
    },
    getValue(arg){
      if(arg.type==="KONSTANTE"){
        return arg.value;
      }
      let regs=this.runtime.registers;
      if(arg.type==="DIREKT"){
        return arg.value-1>=regs.length? 0: regs[arg.value-1];
      }else if(arg.type==="INDIREKT"){
        let reg=arg.value-1>=regs.length? 0: regs[arg.value-1];
        if(reg-1>=regs.length || reg===0) return 0;
        return regs[reg-1];
      }
    },
    setValue(arg,value){
      if(arg.type==="KONSTANTE"){
        return false;
      }
      let regs=this.runtime.registers;
      let reg;
      if(arg.type==="DIREKT"){
        reg=arg.value;
      }else if(arg.type==="INDIREKT"){
        reg=arg.value>=regs.length? 0: regs[arg.value];
      }
      while(reg-1>=regs.length){
        regs.push(0);
      }
      regs[reg-1]=value;
      return true;
    },
    stop(){
      this.reset();
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
</style>