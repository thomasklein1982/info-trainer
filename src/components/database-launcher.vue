<template>
  
  <Button @click="openDialog" label="SQL-Aufgabe bearbeiten"/>
  <Dialog ref="dialog" @hide="save()" modal v-model:visible="show" class="p-dialog-maximized maximized">
    <template #header>
      <ExerciseProgress style="flex: 1" :exercise-data="exerciseData"/>
      <Button rounded text @click="showInfos=true" icon="pi pi-info"/>
    </template>
    <div :style="{height: '100%', display: 'flex', 'flex-direction': 'column'}" style="overflow: hidden">
      <slot></slot>
      <div style="flex: 1; display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); overflow: hidden;">
        <div>
          <CodeMirror
            ref="editor"
            insert-tab
          />
        </div>
        <div style="display: flex; flex-direction: column; overflow: auto;">
          <div style="flex: 1">
            <template v-if="result">
              <div v-if="result.length===0">
                Keine Ergebnisse.
              </div>
              <table v-else class="database-relation">
                <tr>
                  <th v-for="(c,i) in result[0]">{{ i }}</th>
                </tr>
                <tr v-for="(r,i) in result">
                  <td v-for="(c,j) in r">{{ c }}</td>
                </tr>
              </table>
              <div v-if="truncated>0" style="font-style: italic;text-align: center">
                + {{ truncated }} weitere Datensätze
              </div>
            </template>
            <div style="color: red" v-else-if="error">
              {{ error }}
            </div>
            <template v-else>
              keine Abfrage
            </template>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button icon="pi pi-refresh" :disabled="checking" label="Neue Daten" @click="refreshData()"/>
      <Button label="Überprüfen" :loading="checking" @click="check()"/>
      <Button icon="pi pi-play" @click="runSQL()" label="Ausführen"/>
    </template>
  </Dialog>
  <Dialog ref="infos" header="Relationenmodell" v-model:visible="showInfos">
    <div v-for="(r,i) in database.tables">
      {{r.name}} ( <template v-for="(c,j) in r.attributes">{{ j>0? ', ':'' }}<span :class="(c.primary?'primary':'') + (c.foreign?' foreign':'')">{{ c.name }}</span></template> )
    </div>
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
      input: "",
      result: null,
      truncated: 0,
      error: false,
      correct: false,
      checking: false
    }
  },
  methods: {
    runSQL(){
      this.result=null;
      this.error=false;
      this.truncated=0;
      this.input=this.$refs.editor.getValue();
      try{
        let res=this.database.sql(this.input);
        if(!res) return;
        if(res.length>300){
          this.truncated=res.length-200;
          while(res.length>300) res.pop();
        }
        this.result=res;
      }catch(e){
        this.error=e;
      }
    },
    refreshData(){
      this.result=null;
      this.error=false;
      this.truncated=0;
      this.database.refresh();
    },
    check(){
      this.refreshData();
      let tc=this.exerciseData.data.check.testcases[0];
      let soll=this.database.sql(tc.sqlDo);
      if(tc.sqlUndo){
        this.database.sql(tc.sqlUndo);
      }
      this.runSQL();
      let correct=false;
      if(this.error){
        correct=false;
      }else{
        correct=tc.func(soll,this.result);
      }
      this.exerciseData.correct=[correct];
      calcPoints(this.exerciseData);
      this.save();
    },
    save(){
      this.$root.save(this.exerciseData);
    },
    openDialog(){
      if(this.exerciseData.userProject){
        this.input=this.exerciseData.userProject;
      }else{
        this.input="";
      }
      this.refreshData();
      this.show=true;
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