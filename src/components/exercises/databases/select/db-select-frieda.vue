<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database">
      Gesucht ist der Notenschnitt von Frieda aus der 8b.
    </ExerciseBody>
  </template>
  
  <script>
  import { areResultsEqualIgnoreOrder } from "../databases/database";
import schule from "../databases/schule";
  
  export const data={
    id: "db-select-frieda",
    title: "Notenschnitt",
    database: schule,
    check: {
      testcases: [
        {
          sqlDo: "select avg(note) from Schueler s, bewertung b where s.id=b.schueler and vorname='Frieda' and klasse='8b'",
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