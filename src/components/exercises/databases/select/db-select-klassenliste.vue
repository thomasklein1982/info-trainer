<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database">
      Gesucht ist eine Liste aller Klassen, zu denen mindestens 15 Schüler*innen gehören. Für jede Klasse soll die Anzahl der dazugehörigen Schüler*innen als <code>Anzahl</code> sowie das Kürzel der Klassenlehrkraft als <code>KL</code> ausgegeben werden.
      <div>Die Liste soll nach der Anzahl der Schüler*innen absteigend sortiert werden.</div>
    </ExerciseBody>
  </template>
  
  <script>
  import { areResultsEqual } from "../databases/database";
import schule from "../databases/schule";
  
  export const data={
    id: "db-select-klassenliste",
    title: "Große Klassen",
    database: schule,
    check: {
      testcases: [
        {
          sqlDo: "select k.name, count(*) as Anzahl, klassenlehrkraft as KL from Klasse k, schueler s where k.name=s.klasse group by k.name having Anzahl>=15 order by 2 desc",
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