<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database">
      Was ist der Klassenraum der Klasse von Herrn Codd?
    </ExerciseBody>
  </template>
  
  <script>
  import { areResultsEqualIgnoreOrder } from "../databases/database";
import schule from "../databases/schule";
  
  export const data={
    id: "db-select-klassenraum",
    title: "Klassenraum von Herrn Codd",
    database: schule,
    check: {
      testcases: [
        {
          sqlDo: "select klassenraum from Lehrkraft L join Klasse K on L.kuerzel=K.klassenlehrkraft where L.nachname='Codd'",
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