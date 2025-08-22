<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database">
      Es soll eine Liste aller Schüler*innen (Nachname und Vorname) aus Herrn Codds Klasse ausgegeben werden. Die Liste soll aufsteigend alphabetisch nach Nachname sortiert werden (bei gleichem Nachnamen sollen die Vornamen entscheiden).
    </ExerciseBody>
  </template>
  
  <script>
  import { areResultsEqual } from "../databases/database";
import schule from "../databases/schule";
  
  export const data={
    id: "db-select-schueler-codd",
    title: "Die Schüler*innen aus Herrn Codds Klasse",
    database: schule,
    check: {
      testcases: [
        {
          sqlDo: "select S.nachname,S.vorname from Lehrkraft L join Klasse K on L.kuerzel=K.klassenlehrkraft join Schueler S on S.klasse=K.name where L.nachname='Codd' order by 1,2",
          func: areResultsEqual
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