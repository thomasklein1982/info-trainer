<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database">
      <p>Implementiere in SQL:</p> 
      Der Film-Tabelle sollen die beiden folgenden Filme hinzugefügt werden:
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
  import filme from "../databases/filme";
  
  export const data={
    id: "db-dml-insert",
    title: "Datensätze hinzufügen",
    database: filme,
    refreshOptions: {
      removeFilme: 2
    },
    check: {
      init: function(db_launcher){
        return db_launcher.runSQLInput();
      },
      testcases: [
        {
          info: "Der Film Titanic wird korrekt hinzugefügt.",
          check: function(db_launcher){
            return db_launcher.runSQLAndCheckResult("select * from Film where id='tita'", ["tita","Titanic","James Cameron",1997,194,"Drama"]);
          }
          // insert into film values("tita", "Titanic", "James Cameron", 1997, 194, "Drama");
        },
        {
          info: "Der Film Frozen wird korrekt hinzugefügt.",
          check: function(db_launcher){
            return db_launcher.runSQLAndCheckResult("select * from Film where id='froz'", ["froz","Frozen","Jennifer Lee",2013,101,"Animationsfilm"]);
          }
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