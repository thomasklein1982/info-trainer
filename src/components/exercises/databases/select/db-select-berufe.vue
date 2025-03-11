<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database">
      Gib eine Liste aller Berufe aus.
    </ExerciseBody>
  </template>
  
  <script>
  import { areResultsEqualIgnoreOrder } from "../databases/database";
  import berufe from "../databases/berufe";
  
  export const data={
    id: "db-select-berufe",
    title: "Welche Berufe gibt es?",
    database: berufe,
    check: {
      testcases: [
        {
          sqlDo: "select distinct beruf from Person where beruf is not null",
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