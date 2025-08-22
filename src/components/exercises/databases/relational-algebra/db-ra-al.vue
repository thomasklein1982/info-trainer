<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database" db-mode="algebra">
      <p>Formuliere einen Term in relationaler Algebra:</p> 
      <p>Gesucht sind die Artikelnummern und Namen aller Artikel.</p>
    </ExerciseBody>
  </template>
  
  <script>
  import { parseTerm } from "../../../../other/parse-term";
import { areResultsEqualIgnoreOrder } from "../databases/database";
  import db from "../databases/marketplace";
  
  export const data={
    id: "db-ra-al",
    title: "Artikelliste",
    database: db,
    check: {
      testcases: [
        {
          term: parseTerm("p[artikelnummer,name](Artikel)"),
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