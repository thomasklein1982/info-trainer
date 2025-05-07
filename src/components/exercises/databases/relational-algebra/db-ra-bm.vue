<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database" db-mode="algebra">
      <p>Formuliere einen Term in relationaler Algebra:</p> 
      <p>Gesucht sind die Bestellnummern aller Bestellungen, die der Kunde Alan Turing aufgegeben hat.</p>
    </ExerciseBody>
  </template>
  
  <script>
  import { parseTerm } from "../../../../other/parse-term";
  import { areResultsEqualIgnoreOrder } from "../databases/database";
  import db from "../databases/marketplace";
  
  export const data={
    id: "db-ra-bm",
    title: "Mr. Turings Bestellungen",
    database: db,
    check: {
      testcases: [
        {
          term: parseTerm("p[Bestellnummer](s[nachname='Turing' ^ vorname='Alan'](Bestellung ixi Kunde))"),
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