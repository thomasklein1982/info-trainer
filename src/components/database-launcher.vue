<template>
  
  <Button @click="openDialog" label="SQL-Aufgabe bearbeiten"/>
  <Dialog ref="dialog" @hide="save()" modal v-model:visible="show" class="p-dialog-maximized maximized">
    <template #header>
      <ExerciseProgress style="flex: 1" :exercise-data="exerciseData"/>
      <Button rounded text @click="showInfos=true" icon="pi pi-info"/>
    </template>
    <div :style="{height: '100%', display: 'flex', 'flex-direction': 'column'}" style="overflow: hidden">
      <p><slot></slot></p>
      <div :style="{'grid-template-columns': showResultUI? 'minmax(0,1fr) minmax(0,1fr)':'minmax(0,1fr)'}" style="flex: 1; display: grid; gap: 0.5rem; overflow: hidden;">
        <div>
          <CodeMirror
            ref="editor"
            insert-tab
            v-model="input"
          />
        </div>
        <div :style="{display: showResultUI? 'flex':'none'}" style="position: relative; flex-direction: column; overflow: auto;">
          <div style="flex: 1">
            <p style="margin-top: 0; font-style: italic" v-if="isExpectedResult">Dies wäre das erwartete Ergebnis für die aktuell generierten Daten:</p>
            <p v-else-if="lastQuery && result">Ihre SQL-Abfrage 
            <pre style="white-space: pre-wrap;">{{ lastQuery }}</pre>
            lieferte das folgende Ergebnis:
            </p>
            <div style="color: red" v-if="error">
              {{ error }}
            </div>
            <template v-else-if="!result">
              keine Abfrage
            </template>
            <template v-else-if="result.length===0">
              keine Ergebnisse gefunden
            </template>
            <template v-else>
              <table class="database-relation">
                <tr>
                  <th v-for="(c,i) in result[0].columns">{{ c }}</th>
                </tr>
                <tr v-for="(r,i) in result[0].values">
                  <td v-for="(c,j) in r">{{ (c===null||c===undefined)? 'NULL':c }}</td>
                </tr>
              </table>
              <div v-if="truncated>0" style="font-style: italic;text-align: center">
                + {{ truncated }} weitere Datensätze
              </div>
            </template>
          </div>
          <Button rounded outlined size="small" icon="pi pi-times" @click="showResultUI=false" style="position: absolute; right: 0; top: 0;"/>
        </div>
      </div>
    </div>
    <template #footer>
      <Button icon="pi pi-refresh" :disabled="checking" label="Neue Daten" @click="refreshData()"/>
      <Button icon="pi pi-search" :disabled="checking" label="Ergebnis" @click="showResult()"/>
      <Button label="Überprüfen" :loading="checking || !dbready" @click="check()"/>
      <Button icon="pi pi-play" :loading="!dbready" @click="runSQL(input)" label="Ausführen"/>
    </template>
  </Dialog>
  <Dialog ref="infos" :header="'Relationenmodell der Datenbank '+database.name+''" v-model:visible="showInfos">
    <div v-for="(r,i) in database.tables">
      {{r.name}} ( <template v-for="(c,j) in r.attributes">{{ j>0? ', ':'' }}<span :class="(c.primary?'primary':'') + (c.foreign?' foreign':'')">{{ c.name }}</span></template> )
    </div>
    <p v-html="database.info"/>
  </Dialog>
</template>

<script>
import ProgressBar from 'primevue/progressbar';
import ExerciseProgress from './exercise-progress.vue';
import { calcPoints } from "../App.vue";
import { nextTick } from 'vue';
import { RandExpSeeded } from '../other/RandExpSeeded';
import { sleep } from '../other/sleep';
import CodeMirror from './code-mirror.vue';

export default{
  components: {
    ProgressBar,ExerciseProgress, CodeMirror
  },
  watch: {
    input(){
      this.exerciseData.userProject=this.input;
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
    }
  },
  props: {
    exerciseData: Object,
    database: Object,
    code: String
  },
  data(){
    return {
      show: false,
      showInfos: false,
      showResultUI: false,
      input: "",
      lastQuery: null,
      result: null,
      truncated: 0,
      error: false,
      correct: false,
      checking: false,
      dbready: false,
      isExpectedResult: false
    }
  },
  methods: {
    runSQL(sqlCode){
      this.lastQuery=sqlCode;
      this.showResultUI=true;
      this.isExpectedResult=false;
      this.result=null;
      this.error=false;
      this.truncated=0;
      let res=null;
      //this.input=this.$refs.editor.getValue();
      try{
        res=this.database.sql(sqlCode);
        if(!res) return;
        if(res.values.length>300){
          this.truncated=res.values.length-200;
          while(res.values.length>300) res.values.pop();
        }
        this.result=JSON.parse(JSON.stringify(res));
        // if(res.length>0){
        //   let r=res[0];
        //   let neu={};
        //   for(let a in r){
        //     if(a.startsWith("'") && a.endsWith("'")) neu[a]=a.substring(1,a.length-1);
        //   }
        //   for(let a in neu){
        //     r[neu[a]]=r[a];
        //     delete r[a];
        //   }
        // }
      }catch(e){
        this.error=e;
      }
      return res;
    },
    async refreshData(){
      this.isExpectedResult=false;
      this.result=null;
      this.error=false;
      this.truncated=0;
      await this.database.refresh(this.exerciseData.data.refreshOptions);
      this.dbready=true;
    },
    showResult(){
      let tc=this.exerciseData.data.check.testcases[0];
      //let soll=this.database.sql(tc.sqlDo);
      this.runSQL(tc.sqlDo);
      if(tc.sqlUndo){
        this.database.sql(tc.sqlUndo);
      }
      this.isExpectedResult=true;
    },
    async check(){
      this.checking=true;
      await this.refreshData();
      let tc=this.exerciseData.data.check.testcases[0];
      let soll=this.database.sql(tc.sqlDo);
      if(tc.sqlTest){
        soll=this.database.sql(tc.sqlTest);
      }
      if(tc.sqlUndo){
        this.database.sql(tc.sqlUndo);
      }
      let ist=this.runSQL(this.input);
      if(tc.sqlTest){
        try{
          ist=this.database.sql(tc.sqlTest);
        }catch(e){
          this.error=e;
        }
      }
      let correct=false;
      if(this.error || ist.length!==1){
        correct=false;
      }else{
        correct=tc.func(soll[0],ist[0]);
      }
      this.exerciseData.correct=[correct];
      calcPoints(this.exerciseData);
      this.save();
      this.checking=false;
    },
    save(){
      this.$root.save(this.exerciseData);
    },
    openDialog(){
      this.checking=false;
      if(this.exerciseData.userProject){
        this.input=this.exerciseData.userProject;
      }else{
        this.input="";
      }
      this.show=true;
      this.refreshData();

    }
  }
}
</script>

<style scoped>
  .database-relation{
    text-align: center;
    border-collapse: collapse;
  }
  .database-relation tr:hover{
    background-color: #555;
  }
  .database-relation th{
    text-transform: uppercase;
  }
  .database-relation td, .database-relation th{
    border: 1pt solid white;
  }
  .primary{
    text-decoration: underline;
  }
  .foreign::before{
    content: "↑";
  }
</style>