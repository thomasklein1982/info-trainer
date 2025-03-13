<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database">
      Füge der Film-Tabelle die beiden folgenden Filme hinzu:
      <ol>
        <li>
          "Titanic" (Drama von 1997) von Regisseur James Cameron mit einer Länge von 194 Minuten.
        </li>
        <li>
          "Frozen" (Animationsfilm von 2013) von Regisseurin Jennifer Lee mit einer Länge von 101 Minuten.
        </li>
      </ol>
      Die IDs sollen <code>tita</code> bzw. <code>froz</code> sein.
    </ExerciseBody>
  </template>
  
  <script>
  import { areResultsEqualIgnoreOrder } from "../databases/database";
  import filme from "../databases/filme";
  
  export const data={
    id: "db-dml-insert",
    title: "Datensätze hinzufügen",
    database: filme,
    refreshOptions: {
      removeFilme: 2
    },
    // ["tita","Titanic","James Cameron",1997,194,"Drama"],
    // ["froz","Frozen","Chris Buck, Jennifer Lee",2013,101,"Animationsfilm"]
    check: {
      testcases: [
        {
          sqlDo: `insert into film values("tita", "Titanic", "James Cameron", 1997, 194, "Drama");
          insert into film values("froz", "Frozen", "Jennifer Lee", 2013, 101, "Animationsfilm");`,
          sqlUndo: `delete from film where id in ("froz","tita");`,
          sqlTest: `select * from film;`,
          func: areResultsEqualIgnoreOrder
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