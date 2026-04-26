<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database" db-mode="algebra">
      <p>Formuliere einen Term in relationaler Algebra:</p> 
      <p>Gesucht ist eine einspaltige Tabelle mit der Überschrift "PLZ" und den Postleitzahlen aller Städte, in denen kein*e Fotograf*in wohnt.</p>
    </ExerciseBody>
  </template>
  
  <script>
  import { parseTerm } from "../../../../other/parse-term";
import { areResultsEqualIgnoreOrder } from "../databases/database";
  import db from "../databases/berufe";
  
  export const data={
    id: "db-ra-so",
    title: "Städte ohne Fotograf*in",
    database: db,
    check: {
      testcases: [
        {
          term: parseTerm('p[plz](Person) \\ p[plz](s[beruf="Fotograf*in"](Person))'),
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