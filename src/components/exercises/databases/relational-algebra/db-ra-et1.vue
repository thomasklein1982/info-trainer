<template>
    <ExerciseBody :exercise="$data">
      Bestimme die Ergebnis-Relation des Terms.
      <template #exercise>
        <ol class="teilaufgaben" style="padding-left: 0.5rem">
          <li v-for="(t,i) in tasks"><span v-html="t.parsedTerm.display"/>
            <div style="overflow-x: auto">
              = <InputCheckRelation :task="t"/>
            </div>
          </li>
        </ol>
        für die Relationen
        <Card class="overflow-x" v-for="(r,i) in relations">
          <template #title>Tabelle <code>{{ r.name }}</code></template>
          <template #content>
            <table class="database-relation" v-if="r.data">
              <tr>
                <th v-for="(c,j) in r.data.columns">{{ c }}</th>
              </tr>
              <tr v-for="(t,j) in r.data.values">
                <td v-for="(c,k) in t">{{ (c===null||c===undefined)? 'NULL':c }}</td>
              </tr>
            </table>
          </template>
        </Card>
      </template>
    </ExerciseBody>
  </template>
  
  <script>
  import { evaluateTerm, parseTerm } from "../../../../other/parse-term";
  import { areResultsEqualIgnoreOrder } from "../databases/database";
  import db from "../databases/berufe";
import InputCheckRelation from "../../../InputCheckRelation.vue";


  export const data={
    id: "db-ra-et1",
    title: "Ergebnis eines Terms bestimmen",
    database: db,
    relations: [
      {
        name: "Person", data: null, columns: "ID,Nachname,Vorname,Beruf,PLZ as Wohnort"
      },
      {
        name: "Ort", data: null, columns: "*"
      }
    ],
    tasks: [
      {
        term: 's[Beruf="$0"](Person)',
        useTerm: 'r[PLZ>Wohnort](s[Beruf="$0"](p[ID,Nachname,Vorname,Beruf,PLZ](Person)))',
        data: ["select beruf from Person limit 2,1"]
      },
      {
        term: "p[ID,Name](Person ixi[Wohnort=PLZ] Ort)"
      }
    ]
  };
  
  export default{
    components: {
      InputCheckRelation
    },
    data() {
      return data;
    },
    methods: {
      async create(Random, resArray){
        await db.refresh({smallTables: true, columns: {Person: [true,true,true,true,false,false,false,"Wohnort"]}, Ort: true});
        for(let i=0;i<this.relations.length;i++){
          let r=this.relations[i];
          let res=db.sql("select "+r.columns+" from "+r.name)[0];
          r.data=res;
        }
        for(let i=0;i<this.tasks.length;i++){
          let t=this.tasks[i];
          t.correct=resArray? resArray[i]: false;
          t.checked=resArray? true: false;
          let term=t.term;
          let useTerm=t.useTerm;
          if(t.data){
            let data=[];
            for(let j=0;j<t.data.length;j++){
              let d=t.data[j];
              let res=db.sql(d)[0].values[0][0];
              let re=new RegExp("\\$"+j,"g");
              term=term.replace(re,res);
              useTerm=useTerm.replace(re,res);
            }
          }
          t.realTerm=term;
          t.parsedTerm=parseTerm(term);
          useTerm=parseTerm(useTerm);
          t.result=evaluateTerm(useTerm.upn,db);
        }
      },
      check(){
        let resArray=[];
        for(let i=0;i<this.tasks.length;i++){
          let t=this.tasks[i];
          t.checked=true;
          t.input.check();
          resArray.push(t.correct);
        }
        return resArray;
      }
    }
  }
  </script>