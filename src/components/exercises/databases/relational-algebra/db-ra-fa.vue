<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database" db-mode="algebra">
      <p>Formuliere einen Term in relationaler Algebra:</p> 
      <p>Gesucht ist eine einspaltige Tabelle mit der Überschrift "Name", die die Namen aller Firmen und Artikel enthält.</p>
    </ExerciseBody>
  </template>
  
  <script>
  import { parseTerm } from "../../../../other/parse-term";
import { areResultsEqualIgnoreOrder } from "../databases/database";
  import db from "../databases/marketplace";
  
  export const data={
    id: "db-ra-fa",
    title: "Die Namensliste",
    database: db,
    check: {
      testcases: [
        {
          term: parseTerm('p[name](Artikel) u p[name](Firma)'),
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