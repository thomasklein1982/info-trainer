<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database">
      Gesucht ist das durchschnittliche Alter der Schüler*innen der 7. Klasse.
    </ExerciseBody>
  </template>
  
  <script>
  import { areResultsEqualIgnoreOrder } from "../databases/database";
import schule from "../databases/schule";
  
  export const data={
    id: "db-select-avg",
    title: "Durchschnittsalter der Siebtklässler*innen",
    database: schule,
    check: {
      testcases: [
        {
          sqlDo: "select avg(alterJahre) from Schueler where klasse like '7%'",
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