<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database">
      <p>Implementiere in SQL:</p>
      Die Tabelle <Code inline>Schueler</Code> soll aus der Datenbank entfernt werden.
    </ExerciseBody>
  </template>
  
  <script>
  import schule from "../databases/schule";
  
  export const data={
    id: "db-dml-droptable",
    title: "Tabelle entfernen",
    database: schule,
    refreshOptions: {seed:100},
    check: {
      init: function(db_launcher){
        return db_launcher.runSQLInput();
      },
      testcases: [
        {
          info: "Die Tabelle 'Schueler' wird gelöscht.",
          check: function(db_launcher){
            return !db_launcher.existsTable("Schueler");
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