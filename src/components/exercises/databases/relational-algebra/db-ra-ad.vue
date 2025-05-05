<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database" db-mode="algebra">
      <p>Formuliere einen Term in relationaler Algebra:</p> 
      <p>Gesucht sind alle Daten des Kunden Alan Turing.</p>
    </ExerciseBody>
  </template>
  
  <script>
  import { parseTerm } from "../../../../other/parse-term";
import { areResultsEqualIgnoreOrder } from "../databases/database";
  import db from "../databases/marketplace";
  
  export const data={
    id: "db-ra-ad",
    title: "Alle Daten eines Kunden",
    database: db,
    check: {
      testcases: [
        {
          term: parseTerm("s[nachname='Turing' ^ vorname='Alan'](Kunde)"),
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