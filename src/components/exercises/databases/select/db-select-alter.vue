<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database">
      Gesucht ist eine Aufstellung der Fächer aus Fachbereich 3 gemeinsam mit dem jeweils niedrigsten und höchsten Alter der Lehrkräfte, die dieses Fach unterrichten. Die Spaltenüberschriften sollen lauten <code>Fach</code>, <code>niedrigstes Alter</code>, <code>höchstes Alter</code>.
    </ExerciseBody>
  </template>
  
  <script>
  import { areResultsEqualIgnoreOrder } from "../databases/database";
import schule from "../databases/schule";
  
  export const data={
    id: "db-select-alter",
    title: "Höchstes und niedrigstes Alter",
    database: schule,
    check: {
      testcases: [
        {
          sqlDo: "select f.name as Fach, min(alterJahre) as 'niedrigstes Alter', max(alterJahre) as 'höchstes Alter' from Lehrkraft L, unterrichtet u, fach f where l.kuerzel=u.lehrkraft and u.fach=f.id and fachbereich='FB 3' group by f.name",
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