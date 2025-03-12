<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database">
      Wie hoch ist das Gehalt des*der Schulleiter*in?
    </ExerciseBody>
  </template>
  
  <script>
  import { areResultsEqualIgnoreOrder } from "../databases/database";
import schule from "../databases/schule";
  
  export const data={
    id: "db-select-gehalt",
    title: "Gehalt der Schulleitung",
    database: schule,
    check: {
      testcases: [
        {
          sqlDo: "select gehalt from Lehrkraft natural join Leitung where amt='Schulleiter*in'",
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