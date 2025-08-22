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
import { check, finishCreation } from "./db-ra-et1.vue";


  export const data={
    id: "db-ra-et2",
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
        term: 'p[ID,Name](Person ixi[Wohnort=PLZ] Ort)',
        useTerm: 'p[ID,Name](r[PLZ>Wohnort](Person) ixi[Wohnort=PLZ] Ort)'
      },
      {
        term: 'p[Wohnort,Name](s[Beruf="$2"](Person) ixi[Wohnort=PLZ] s[Einwohner=$0 v PLZ=$1](Ort))',
        useTerm: 'p[Wohnort,Name](s[Beruf="$2"](r[PLZ>Wohnort](Person)) ixi[Wohnort=PLZ] s[Einwohner=$0 v PLZ=$1](Ort))',
        data: ["select einwohner from ort order by einwohner limit 2,1","select plz from ort natural join person order by einwohner limit 1", "select beruf from Person where plz=(select plz from ort natural join person order by einwohner limit 1) limit 1"]
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

  
  </script>