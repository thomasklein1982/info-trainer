<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database">
      Gib alle Daten der Lehrkräfte aus.
    </ExerciseBody>
  </template>
  
  <script>
  import { areResultsEqualIgnoreOrder } from "../databases/database";
import schule from "../databases/schule";
  
  export const data={
    id: "db-select-all",
    title: "Alle Daten abfragen",
    database: schule,
    check: {
      testcases: [
        {
          sqlDo: "select * from Lehrkraft",
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