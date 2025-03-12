<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database">
      Gesucht ist eine Liste der besten Schüler*innen der einzelnen Klassen, das heißt, es soll eine Liste aller Klassen gemeinsam mit dem Nachnamen, dem Vornamen und dem Notenschnitt des*der Schüler*in ausgegeben werden, der*die in dieser Klasse den besten Notendurchschnitt hat.
      <p>Die Ergebnistabelle soll die Spaltennamen <code>Klasse</code>, <code>Vorname</code>, <code>Nachname</code>, <code>Schnitt</code> haben.</p>
    </ExerciseBody>
  </template>
  
  <script>
  import { areResultsEqualIgnoreOrder } from "../databases/database";
import schule from "../databases/schule";
  
  export const data={
    id: "db-select-beste",
    title: "Die besten Schüler*innen",
    database: schule,
    check: {
      testcases: [
        {
          sqlDo: "select klasse, vorname, nachname, schnitt from (select S.vorname, S.nachname, S.id, avg(note) as schnitt, Klasse from Schueler S join Bewertung B on S.id=B.schueler group by S.id order by 5,4) group by klasse",
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