<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database" db-mode="algebra">
      Gib alle Kürzel der Lehrkräfte aus.
    </ExerciseBody>
  </template>
  
  <script>
  import { areResultsEqualIgnoreOrder } from "../databases/database";
  import schule from "../databases/schule";
  
  export const data={
    id: "db-ra-lk",
    title: "Kürzel der Lehrkräfte",
    database: schule,
    check: {
      testcases: [
        {
          sqlDo: "select kuerzel from Lehrkraft",
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