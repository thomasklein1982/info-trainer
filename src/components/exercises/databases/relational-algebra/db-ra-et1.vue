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
            <RelationTable :relation="r.data"/>
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
import RelationTable from "../../../relation-table.vue";


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
        term: "p[Name,Einwohner](Ort)",
        useTerm: 'p[name,Einwohner](Ort)'
      }
    ]
  };
  
  export default{
    components: {
      InputCheckRelation, RelationTable
    },
    data() {
      return data;
    },
    methods: {
      async create(Random, resArray){
        await db.refresh({smallTables: true, columns: {Person: [true,true,true,true,false,false,false,"Wohnort"]}, Ort: true});
        //db.sql("update Person set Beruf='Landwirt*in' where beruf is NULL and id=(select id from person limit 1);");
        finishCreation(Random,resArray,this.relations,this.tasks);
      },
      check(){
        return check(this.tasks,{ignoreRowOrder: true});
      }
    }
  }

  export function finishCreation(Random,resArray,relations,tasks){
    for(let i=0;i<relations.length;i++){
      let r=relations[i];
      let res=db.sql("select "+r.columns+" from "+r.name)[0];
      r.data=res;
    }
    for(let i=0;i<tasks.length;i++){
      let t=tasks[i];
      t.correct=resArray? resArray[i]: false;
      t.checked=resArray? true: false;
      let term=t.term;
      let useTerm=t.useTerm;
      if(!useTerm) useTerm=term;
      if(t.data){
        let data=[];
        for(let j=0;j<t.data.length;j++){
          let d=t.data[j];
          let res=db.sql(d)[0];
          let index=Random.int(0,res.values.length-1);
          res=res.values[index][0];
          let re=new RegExp("\\$"+j,"g");
          term=term.replace(re,res);
          useTerm=useTerm.replace(re,res);
        }
      }
      t.realTerm=term;
      t.parsedTerm=parseTerm(term);
      let parsedUseTerm=parseTerm(useTerm);
      t.result=evaluateTerm(parsedUseTerm.upn,db);
      if(t.input) t.input.reset();
    }
  }

  export function check(tasks,options){
    let resArray=[];
    for(let i=0;i<tasks.length;i++){
      let t=tasks[i];
      t.checked=true;
      t.correct=t.input.check(options);
      resArray.push(t.correct);
    }
    return resArray;
  }
  </script>