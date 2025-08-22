<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database">
      Gib alle Daten der Lehrkräfte-Tabelle aus, sortiert nach ihrem Kürzel.
    </ExerciseBody>
  </template>
  
  <script>
  import { areResultsEqual } from "../databases/database";
import schule from "../databases/schule";
  
  export const data={
    id: "db-select-all",
    title: "Alle Daten abfragen",
    database: schule,
    check: {
      testcases: [
        {
          sqlDo: "select * from Lehrkraft order by kuerzel",
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