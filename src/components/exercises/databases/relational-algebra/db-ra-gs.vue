<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database" db-mode="algebra">
      <p>Formuliere einen Term in relationaler Algebra:</p> 
      <p>Gesucht ist eine Tabelle mit den Überschriften "Kleinere_Stadt" und "Größere_Stadt", die alle Kombinationen aus zwei Städte-Namen auflistet, bei denen die linke Stadt weniger Einwohner hat als die rechte Stadt.</p>
    </ExerciseBody>
  </template>
  
  <script>
  import { parseTerm } from "../../../../other/parse-term";
import { areResultsEqualIgnoreOrder } from "../databases/database";
  import db from "../databases/berufe";
  
  export const data={
    id: "db-ra-gs",
    title: "Einwohner-Vergleich",
    database: db,
    check: {
      testcases: [
        {
          term: parseTerm("p[Kleinere_Stadt,Größere_Stadt](r[name>Kleinere_Stadt](ort) ixi[einwohner<e] r[einwohner>e,plz>plz2,name>Größere_Stadt](Ort))"),
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