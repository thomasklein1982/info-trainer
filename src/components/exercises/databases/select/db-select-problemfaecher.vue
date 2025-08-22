<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database">
      Gesucht sind, Kürzel, Vor- und Nachnamen aller Lehrkräfte, die ein Fach unterrichten, das einen Notendurchschnitt von schlechter als 3.5 hat.
    </ExerciseBody>
  </template>
  
  <script>
  import { areResultsEqualIgnoreOrder } from "../databases/database";
import schule from "../databases/schule";
  
  export const data={
    id: "db-select-problemfaecher",
    title: "Problemfächer",
    database: schule,
    check: {
      testcases: [
        {
          sqlDo: "select kuerzel, vorname, nachname from lehrkraft l, unterrichtet u, Bewertung b where l.kuerzel=u.lehrkraft and u.fach=b.fach group by u.fach having avg(note)>3.0",
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