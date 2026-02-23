<template>
  
  <Button @click="openDialog" :label="buttonLabel"/>
  <Dialog ref="dialog" @hide="save()" modal v-model:visible="show" class="p-dialog-maximized maximized">
    <template #header>
      <template v-if="exerciseData">
        <ExerciseProgress style="flex: 1" :exercise-data="exerciseData"/>
      </template>
      <template v-else>
        Datenbank-Playground
      </template>
      <Button rounded text @click="showInfos=true" icon="pi pi-info"/>
    </template>
    <div :style="{height: '100%', display: 'flex', 'flex-direction': 'column'}" style="position: relative;overflow: hidden">
      <div :style="{'grid-template-columns': showResultUI? 'minmax(0,1fr) minmax(0,1fr)':'minmax(0,1fr)'}" style="flex: 1; display: grid; gap: 0.5rem; overflow: hidden;">
        <div style="overflow: auto">
          <template v-if="realMode==='sql'">
            <CodeMirror
              ref="editor"
              insert-tab
              v-model="input"
            />
          </template>
          <template v-else>
            <CodeMirror
              ref="editor"
              insert-tab
              v-model="input"
            />
          </template>
        </div>
        <div :style="{display: showResultUI? 'flex':'none'}" style="position: relative; flex-direction: column; overflow: auto;">
          <div style="flex: 1">
            <p style="margin-top: 0; font-style: italic" v-if="isExpectedResult">Dies wäre das erwartete Ergebnis für die aktuell generierten Daten:</p>
            <p v-else-if="lastQuery">
              <template v-if="realMode==='sql'">Die SQL-Abfrage</template> 
              <template v-else>Der Term</template>
              <pre style="white-space: pre-wrap;font-family: monospace,monospace" v-html="lastQuery"></pre>
              <template v-if="result">lieferte das folgende Ergebnis:</template>
              <template v-else-if="error">führte zu folgendem Fehler:</template>
            </p>
            <div style="color: red" v-if="error">
              {{ error }}
            </div>
            <template v-else-if="!result">
              keine Abfrage
            </template>
            <template v-else-if="result.length===0">
              leere Tabelle
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
        </div>
        <Button v-show="showResultUI" rounded outlined size="small" icon="pi pi-times" @click="showResultUI=false" style="position: absolute; right: 0; top: 0;"/>
      </div>
      <div style="background-color: rgb(24,24,27); width: 100%; height: auto" v-if="realMode==='algebra'" id="ra-preview">
        <div :style="{display: 'flex'}">
          <div :style="{flex: 1}">
            <div style="font-size: 120%; font-family: monospace, monospace;">Term: <span v-html="parsedInput.display"></span></div>
            <div style="color: red; height: 2em;">{{ parsedInput.error }}</div>
          </div>
          <div>
            <Button rounded text icon="pi pi-question" @click="toggleAlgebraHelp"/>
            <Popover ref="algebraHelp">
              <div style="max-height: 70vh; overflow: auto">
                <h2>Terme in relationaler Algebra</h2>
                <table class="wertetabelle">
                  <tr><th>Term</th><th>Eingabe</th></tr>
                  <tr v-for="(e,i) in examples">
                    <td v-html="e.display"></td>
                    <td>{{ e.input }}</td>
                  </tr>
                </table>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button v-if="exerciseData" icon="pi pi-refresh" :disabled="checking" label="Neue Daten" @click="refreshData()"/>
      <Button v-if="showShowResultButton" icon="pi pi-search" :disabled="checking" label="Ergebnis" @click="showResult()"/>
      <Button v-if="exerciseData" label="Überprüfen" :loading="checking || !dbready" @click="check()"/>
      <SelectButton v-if="allowChooseMode" :options="['sql','algebra']" v-model="realMode"/>
      <Button icon="pi pi-play" :loading="!dbready" @click="clickPlay()" label="Ausführen"/>
    </template>
  </Dialog>
  <Dialog ref="infos" :header="headerInfos" v-model:visible="showInfos" @hide="onCloseInfoDialog">
    <Card v-if="exerciseData">
      <template #title>Aufgabe</template>
      <template #content>
        <slot></slot>
      </template>
    </Card>
    <div v-if="allowChooseDatabase">
      <Select v-model="db" :options="possibleDatabases" option-label="name" placeholder="Wähle eine Datenbank"/>
    </div>
    <Card v-if="tableCount>0">
      <template #title>Relationenmodell der Datenbank {{ db.name }}</template>
      <template #content>
        <div v-for="(r,i) in db.tables">
          {{r.name}} ( <template v-for="(c,j) in r.attributes">{{ j>0? ', ':'' }}<span :class="(c.primary?'primary':'') + (c.foreign?' foreign':'')">{{ c.name }}</span></template> )
        </div>
        <div style="margin-top: 0.5rem" v-html="db.info"></div>
      </template>
    </Card>
    <Card v-if="exerciseData">
      <template #title>Teilaufgaben</template>
      <template #content>
        <Message :icon="'pi pi-'+(completed || exerciseData.correct[i]===true?'check':'times')" :severity="(completed || exerciseData.correct[i]===true?'success':'error')" v-for="(t,i) in exerciseData.data.check.testcases">
          <span v-if="t.info" v-html="t.info"/><span v-else>Die Abfrage ist korrekt.</span>
          <span v-if="exerciseData.correct[i].substring" v-html="'('+exerciseData.correct[i]+')'"/>
        </Message>
      </template>
    </Card>
    
    
    
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
import { evaluateTerm, parseTerm, parseDisplay } from '../other/parse-term';
import Message from 'primevue/message';
import { isCompletelyTrue } from '../other/bool-array';
import Card from 'primevue/card';
import { Random } from '../other/random';
import DBBerufe from '../components/exercises/databases/databases/berufe';
import DBFilme from '../components/exercises/databases/databases/filme';
import DBSchule from '../components/exercises/databases/databases/schule';
import DBMarketplace from '../components/exercises/databases/databases/marketplace';
import DBEmpty from '../components/exercises/databases/databases/empty';
import Select from 'primevue/select';
import SelectButton from 'primevue/selectbutton';
import Popover from 'primevue/popover';


export default{
  components: {
    ProgressBar,ExerciseProgress, CodeMirror, Message, Card, Select, SelectButton, Popover
  },
  watch: {
    db(nv,ov){
      this.refreshDatabaseOnCloseDialog=true;
    },
    input(){
      if(this.realMode==="algebra"){
        if(this.input.trim().length===0){
          this.parsedInput.display="";
          this.parsedInput.error=null;
        }else{
          let p=parseDisplay(this.input);
          if(p.display){
            this.parsedInput.display=p.display;
            this.parsedInput.error=p.error;
          }
        }
      }
      if(!this.exerciseData) return;
      this.exerciseData.userProject=this.input;
      this.save();
    }
  },
  computed: {
    buttonLabel(){
      if(!this.exerciseData) return "DB-Playgroud";
      if(this.realMode==="sql") return 'SQL-Aufgabe bearbeiten';
      return 'Aufgabe bearbeiten';
    },
    hasUserData(){
      return this.exerciseData.userData!==undefined;
    },
    completed(){
      return this.exerciseData?.correct===true||isCompletelyTrue(this.exerciseData?.correct);
    },
    headerInfos(){
      if(this.completed){
        return "Vollständig gelöst";
      }else{
        return "Noch nicht gelöst";
      }
    },
    tableCount(){
      let c=0;
      for(let t in this.db.tables){
        c++;
      }
      return c;
    },
    showShowResultButton(){
      if(!this.exerciseData) return false;
      let tc=this.exerciseData.data.check.testcases[0];
      if(!tc) return false;
      if(tc.sqlDo || tc.term) return true;
      return false;
    }
  },
  props: {
    exerciseData: Object,
    database: Object,
    code: String,
    mode: {
      type: String,
      default: "sql"
    },
    allowChooseMode: {
      type: Boolean,
      default: false
    },
    allowChooseDatabase: {
      type: Boolean,
      default: false
    },
    showFromStart: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      show: this.showFromStart,
      showInfos: false,
      showResultUI: false,
      input: "",
      parsedInput: {
        display: "",
        error: null
      },
      lastQuery: null,
      result: null,
      truncated: 0,
      error: false,
      correct: false,
      checking: false,
      dbready: false,
      db: this.database,
      isExpectedResult: false,
      possibleDatabases: [DBEmpty,DBBerufe,DBFilme,DBMarketplace,DBSchule],
      refreshDatabaseOnCloseDialog: false,
      realMode: this.mode,
      examples: this.generateExamples()
    }
  },
  methods: {
    generateExamples(){
      let examples=["A u B","A n B", "A \\ B", "A x B", "A ixi B", "A ixi[V=W] B", "p[V,W](A)","s[B=b ^ C=c v D=d](A)","r[V>R,W>S](A)"];
      for(let i=0;i<examples.length;i++){
        let e=examples[i];
        examples[i]={
          input: e,
          display: parseDisplay(e).display
        };
      }
      return examples;
    },
    toggleAlgebraHelp(event){
      this.$refs.algebraHelp.toggle(event)
    },
    onCloseInfoDialog(){
      if(this.refreshDatabaseOnCloseDialog){
        this.refreshData();
      }
      this.refreshDatabaseOnCloseDialog=false;
    },
    /** soll may be array with values or array of arrays*/
    runSQLAndCheckResult(cmd,soll){
      let multiple=soll && Array.isArray(soll[0]);
      if(!multiple) soll=[soll];
      try{
        let res=this.db.sql(cmd)[0];
        if(res.values.length!==soll.length) return false;
        for(let j=0;j<soll.length;j++){
          for(let i=0;i<res.values[j].length;i++){
            if(soll[j][i]===undefined) continue;
            let c=res.values[j][i];
            if(c!==soll[j][i]){
              return false;
            }
          }
        }
      }catch(e){
        return false;
      }
      return true;
    },
    runSQLInput(){
      try{
        this.db.sql(this.input);
      }catch(e){
        return e;
      }
    },
    existsTable(tablename){
      let res=this.db.sql("pragma table_info("+tablename+")");
      if(res.length===0) return false;
      return true;
    },
    hasCorrectForeignKeys(tablename,foreignKeys){
      let fk=foreignKeys;
      fk.sort((a,b)=>{
        return a[0]>=b[0]? 1 : -1;
      });

      let res=this.db.sql("pragma foreign_key_list('"+tablename+"')")[0];
      if(!res && fk.length===0) return true;
      if(!res || res.values.length!==fk.length) return false;
      if(fk.length===0) return true;
      let fkeys=[];
      for(let i=0;i<res.values.length;i++){
        let v=res.values[i];
        fkeys.push([v[3].toLowerCase(),v[2].toLowerCase(),v[4].toLowerCase()]);
      }
      fkeys.sort((a,b)=>{
        return a[0]>=b[0]? 1 : -1;
      });
      for(let i=0;i<fk.length;i++){
        let soll=fk[i];
        let ist=fkeys[i];
        for(let j=0;j<soll.length;j++){
          if(ist[j]!==soll[j]) return false;
        }
      }
      return true;
    },
    hasCorrectPrimaryKey(tablename,primaryKey){
      let res=this.db.sql("pragma table_info("+tablename+")");
      if(res.length===0) return false;
      res=res[0];
      for(let i=0;i<res.values.length;i++){
        let name=res.values[i][1].toLowerCase();
        let soll=primaryKey.indexOf(name)+1;
        let c=res.values[i][5];
        if(c!==soll){
          return false;
        }
      }
      return true;
    },
    hasCorrectAttributes(tablename,names,datatypes){
      let ok=this.hasCorrectAttributeNames(tablename,names);
      if(!ok) return false;
      return this.hasCorrectDatatypes(tablename,datatypes);
    },
    hasCorrectAttributeNames(tablename,names){
      let res=this.db.sql("pragma table_info("+tablename+")");
      if(res.length===0) return false;
      res=res[0];
      if(res.values.length<names.length) return false;
      for(let i=0;i<res.values.length;i++){
        let c=res.values[i][1].toLowerCase();
        if(c!==names[i]){
          return false;
        }
      }
      return true;
    },
    hasCorrectDatatypes(tablename,types){
      let res=this.db.sql("pragma table_info("+tablename+")");
      if(res.length===0) return false;
      res=res[0];
      for(let i=0;i<res.values.length;i++){
        let c=res.values[i][2].toLowerCase();
        if(!this.areTypesCompatible(types[i],c)){
          return false;
        }
      }
      return true;
    },
    areTypesCompatible(soll, ist){
      ist=ist.toLowerCase();
      if(Array.isArray(soll)){
        for(let i=0;i<soll.length;i++){
          if(this.areTypesCompatible(soll[i],ist)){
            return true;
          }
        }
        return false;
      }
      let reList={
        text: [/^varchar\(\d+\)$/,/^tinytext$/,/^text\(\d+\)$/,/^mediumtext$/,/^longtext$/],
        numeric: [/^smallint(\(\d+\))?$/,/^mediumint(\(\d+\))?$/,/^int(\(\d+\))?$/,/^integer(\(\d+\))?$/,/^bigint(\(\d+\))?$/,/^float(\(\d+\))?$/,/^double(\(\d+,\d+\))?$/,/^numeric(\(\d+,\d+\))?$/],
        date: [/^date$/],
        datetime: [/^datetime$/],
        time: [/^time$/]
      }[soll];
      if(!reList){
        return soll===ist;
      }
      for(let i=0;i<reList.length;i++){
        let re=reList[i];
        if(re.test(ist)) return true;
      }
      return false;
    },
    clickPlay(){
      if(this.realMode==="sql") this.runSQL(this.input);
      else this.runRelationalAlgebra(this.input);
    },
    runRelationalAlgebra(termInput){
      this.showResultUI=true;
      this.isExpectedResult=false;
      this.result=null;
      this.error=false;
      this.truncated=0;
      let res=null;
      console.log("run relational",termInput);
      let term;
      if(termInput.upn){
        term=JSON.parse(JSON.stringify(termInput));
      }else{
        term=parseTerm(termInput);
      }
      this.lastQuery=term.display;
      if(term.error){
        this.error=term.error;
        return;
      }
      res=evaluateTerm(term.upn,this.db);
      if(res.error){
        this.error=res.error;
        return;
      }
      res=res.relation;
      if(res && res.values.length>300){
        this.truncated=res.values.length-200;
        while(res.values.length>300) res.values.pop();
      }
      if(!res){
        this.result=[];
      }else{
        this.result=[JSON.parse(JSON.stringify(res))];
      }
      return this.result;
    },
    runSQL(sqlCode){
      this.lastQuery=sqlCode;
      this.showResultUI=true;
      this.isExpectedResult=false;
      this.result=null;
      this.error=false;
      this.truncated=0;
      let res=null;
      //this.input=this.$refs.editor.getValue();
      if(sqlCode===undefined) return res;
      try{
        res=this.db.sql(sqlCode);
        if(!res) return;
        if(res.values.length>300){
          this.truncated=res.values.length-200;
          while(res.values.length>300) res.values.pop();
        }
        this.result=JSON.parse(JSON.stringify(res));
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
      if(this.exerciseData){
        if(this.exerciseData.data.refreshOptions && this.exerciseData.data.refreshOptions.seed){
          Random.setSeed(this.exerciseData.data.refreshOptions.seed);
        }
        await this.db.refresh(this.exerciseData.data.refreshOptions);
      }else if(this.db && this.db.refresh){
        await this.db.refresh();
      }
      this.dbready=true;
    },
    showResult(){
      let tc=this.exerciseData.data.check.testcases[0];
      //let soll=this.db.sql(tc.sqlDo);
      if(tc.sqlDo){
        this.runSQL(tc.sqlDo);
        if(tc.sqlUndo){
          this.db.sql(tc.sqlUndo);
        }
      }else{
        this.runRelationalAlgebra(tc.term);
      }
      this.isExpectedResult=true;
    },
    async check(){
      this.lastQuery=this.input;
      this.showResultUI=false;
      this.isExpectedResult=false;
      this.result=null;
      this.error=false;
      this.truncated=0;
      this.checking=true;
      await this.refreshData();
      let correctList=[];
      for(let i=0;i<this.exerciseData.data.check.testcases.length;i++){
        correctList.push(false);
      }
      if(this.exerciseData.data.check.init){
        let e=this.exerciseData.data.check.init(this);
        if(e){
          this.error=e;
          this.showResultUI=true;
          this.isExpectedResult=false;
          this.result=null;
          this.truncated=0;
        }
      }
      if(!this.error){
        for(let i=0;i<this.exerciseData.data.check.testcases.length;i++){
          let tc=this.exerciseData.data.check.testcases[i];
          if(tc.check){
            let res=tc.check(this);
            if(res===true||res===false) res={correct: res};
            if(res.error){
              this.error=res.error;
              this.showResultUI=true;
              this.isExpectedResult=false;
              this.result=null;
              this.truncated=0;
              correctList[i]=false;
              break;
            }
            correctList[i]=res.correct;
          }else{
            let soll, ist;
            if(tc.term){
              let upn=JSON.parse(JSON.stringify(tc.term.upn));
              soll=evaluateTerm(upn,this.db);
              soll=[soll.relation];
              try{
                let term=parseTerm(this.input);
                if(term.error){
                  throw term.error;
                }
                ist=evaluateTerm(term.upn,this.db);
                if(ist.error){
                  throw ist.error;
                }
                ist=[ist.relation];
              }catch(e){
                this.error=e;
              }
              if(this.error){
                this.parsedInput.error=this.error;
              }
            }else{
              soll=this.db.sql(tc.sqlDo);
              if(tc.sqlTest){
                soll=this.db.sql(tc.sqlTest);
              }
              if(tc.sqlUndo){
                this.db.sql(tc.sqlUndo);
              }
              ist=this.runSQL(this.input);
              if(tc.sqlTest){
                try{
                  ist=this.db.sql(tc.sqlTest);
                }catch(e){
                  this.error=e;
                }
              }
            }
            let correct=false;
            if(this.error || !ist || ist.length!==1){
              correct=false;
            }else{
              correct=tc.func(soll[0],ist[0]);
            }
            correctList[i]=correct;
          }
        }
      }
      this.exerciseData.correct=correctList;
      calcPoints(this.exerciseData);
      this.save();
      this.checking=false;
    },
    save(){
      this.$root.save(this.exerciseData);
    },
    openDialog(){
      this.showResultUI=false;
      this.checking=false;
      if(this.exerciseData && this.exerciseData.userProject){
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