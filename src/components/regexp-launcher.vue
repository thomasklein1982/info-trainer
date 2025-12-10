<template>
  
  <Button @click="openDialog" label="Aufgabe bearbeiten"/>
  <Dialog ref="dialog" @hide="save()" modal v-model:visible="show" :closable="true" maximizable>
    <template #header>
      {{ exerciseData.data.title }} <ExerciseProgress style="flex: 1" :exercise-data="exerciseData"/>
    </template>
    <slot></slot>
    <p>
      <InputText style="font-family:'Courier New', Courier, monospace" :disabled="checking" placeholder="Gib den regulären Ausdruck ein" fluid v-model="input"/>
      <div class="error" v-if="error">Deine Eingabe ist fehlerhaft.</div>
    </p>
    
    <table>
      <tr>
        <th style="text-align: left">Testfall</th>
        <th>Soll passen</th>
        <th>Passt</th>
        <th></th>
      </tr>
      <tr v-for="(t,i) in texts">
        <td><code class="code"><template v-if="t.match">{{t.text.substring(0,t.match.index)}}<span style="background-color: cyan">{{t.text.substring(t.match.index,t.match.index+t.match[0].length)}}</span>{{ t.text.substring(t.match.index+t.match[0].length) }}</template><template v-else>{{t.text}}</template></code></td>
        <td  style="text-align: center">
          {{ t.shouldMatch? 'Ja':'Nein' }}
        </td>
        <td  style="text-align: center">
          <span v-if="re">{{ t.matches? 'Ja':'Nein' }}</span>
        </td>
        <td  style="padding-left: 0.2rem">
          <template v-if="!error && re">
            <span v-if="t.matches===t.shouldMatch" class="pi pi-check" style="color: green"/>
            <span v-else class="pi pi-times" style="color: red"/>
          </template>
        </td>
      </tr>
    </table>
    <p>
      <Button icon="pi pi-refresh" :disabled="checking" label="Neue Testfälle" @click="newExamples()"/>
      <Button label="Überprüfen" :disabled="!re" :loading="checking" @click="checkComplete()"/>
    </p>
  </Dialog>
</template>

<script>
import ProgressBar from 'primevue/progressbar';
import ExerciseProgress from './exercise-progress.vue';
import { calcPoints } from "../App.vue";
import { nextTick } from 'vue';
import { RandExpSeeded } from '../other/RandExpSeeded';
import { sleep } from '../other/sleep';

export default{
  components: {
    ProgressBar,ExerciseProgress
  },
  watch: {
    input(){
      this.exerciseData.userProject=this.input;
      this.error=false;
      if(this.input.length===0){
        this.re=null; 
      }else{
        try{
          this.re=new RegExp(this.exerciseData.userProject);
        }catch(e){
          this.error=true;
          this.re=null;
        }
      }
      this.check();
      this.save();
    }
  },
  computed: {
    hasUserData(){
      return this.exerciseData.userData!==undefined;
    },
    completed(){
      if(!this.exerciseData) return false;
      return this.exerciseData.correct===true;
    },
    matching(){
      let array=[];
      for(let i=0;i<this.regexp.match.length;i++){
        array.push(new RandExpSeeded(this.regexp.match[i],null,10));
      }
      return array;
    },
    skipping(){
      let array=[];
      for(let i=0;i<this.regexp.skip.length;i++){
        array.push(new RandExpSeeded(this.regexp.skip[i],null,10));
      }
      return array;
    }
  },
  props: {
    exerciseData: Object,
    regexp: Object
  },
  data(){
    return {
      show: false,
      texts: [],
      input: "",
      error: false,
      re: null,
      correct: false,
      checking: false
    }
  },
  methods: {
    newExamples(){
      this.correct=false;
      while(this.texts.length>0) this.texts.pop();
      for(let i=0;i<this.matching.length;i++){
        let m=this.matching[i];
        let text=m.gen();
        let shouldMatch=this.regexp.solution.test(text);
        this.texts.push({
          text,
          matches: undefined,
          shouldMatch
        });
      }
      for(let i=0;i<this.skipping.length;i++){
        let m=this.skipping[i];
        let text=m.gen();
        let shouldMatch=this.regexp.solution.test(text);
        this.texts.push({
          text,
          matches: undefined,
          shouldMatch
        });
      }
      this.check();
    },
    check(){
      this.correct=true;
      for(let i=0;i<this.texts.length;i++){
        let m=this.texts[i];
        m.match=this.re? m.text.match(this.re):undefined;
        m.matches=this.re? m.match!==null :undefined;
        if(m.shouldMatch!==m.matches){
          this.correct=false;
        }
      }
      
    },
    async checkComplete(){
      let r=0;
      this.checking=true;
      for(let i=0;i<10;i++){
        await sleep(300);
        this.newExamples();
        if(!this.correct){
          this.checking=false;
          this.exerciseData.correct=[false];
          calcPoints(this.exerciseData);
          this.save();
          return;
        }
        r++;
      }
      this.exerciseData.correct=[true];
      calcPoints(this.exerciseData);
      this.checking=false;
      this.save();
    },
    save(){
      // if(data.resArray){
      //   this.exerciseData.correct=data.resArray;
      //   calcPoints(this.exerciseData);
      // }
      // this.exerciseData.userProject=data.machine;
      this.$root.save(this.exerciseData);
    },
    openDialog(){
      if(!this.$refs.dialog.maximized){
        this.$refs.dialog.maximize();
      }
      if(this.exerciseData.userProject){
        this.input=this.exerciseData.userProject;
      }else{
        this.input="";
      }
      this.newExamples();
      this.show=true;
    }
  }
}
</script>