<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database">
      Gesucht ist eine Liste der drei Fachbereiche mit der jeweiligen Anzahl der Fächer, die zu diesem Fachbereich gehören. Die Überschriften sollen <code>Fachbereich</code> und <code>Anzahl Fächer</code> sein. Fächer, die zu keinem Fachbereich gehören, sollen nicht in der Liste auftauchen.
    </ExerciseBody>
  </template>
  
  <script>
  import { areResultsEqualIgnoreOrder } from "../databases/database";
import schule from "../databases/schule";
  
  export const data={
    id: "db-select-fachbereiche",
    title: "Fachbereiche mit Fächeranzahl",
    database: schule,
    check: {
      testcases: [
        {
          sqlDo: "select fachbereich, count(*) as 'Anzahl Fächer' from fach where fachbereich is not null group by Fachbereich",
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