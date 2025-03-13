<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database">
      Erzeuge eine neue Relation mit dem Namen <code>Film</code> und den Attributen <code>ID</code>, <code>Name</code>, <code>Regisseur</code>, <code>Jahr</code>, <code>Laenge</code> und <code>Genre</code>. 
    </ExerciseBody>
  </template>
  
  <script>
  import { areResultsEqual } from "../databases/database";
  import filme from "../databases/filme";
  
  export const data={
    id: "db-dml-table",
    title: "Tabelle erzeugen",
    database: filme,
    refreshOptions: {
      dontCreateTables: true
    },
    check: {
      testcases: [
        {
          sqlDo: `create table Film( id varchar(200), name varchar(200), regisseur varchar(200), jahr int, laenge int, genre varchar(200));`,
          sqlUndo: `drop table if exists film;`,
          sqlTest: `insert into film values("0","Titanic","James Cameron",1998,230,"Drama");
          select * from film;`,
          func: areResultsEqual
        }
      ]
    },
    code: ""
  };
  
  export default{
    components: {
      
    },
    data() {
      return data;
    },
  }
  </script>