<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database" db-mode="algebra">
      <p>Formuliere einen Term in relationaler Algebra:</p> 
      <p>Gesucht ist eine Tabelle mit den Überschriften "Firma" und "AnzahlMitarbeiter", die alle Firmen auflistet.</p>
    </ExerciseBody>
  </template>
  
  <script>
  import { parseTerm } from "../../../../other/parse-term";
import { areResultsEqualIgnoreOrder } from "../databases/database";
  import db from "../databases/marketplace";
  
  export const data={
    id: "db-ra-fm",
    title: "Mitarbeiter nach Firmen",
    database: db,
    check: {
      testcases: [
        {
          term: parseTerm("r[name>Firma](p[Name,AnzahlMitarbeiter](Firma))"),
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