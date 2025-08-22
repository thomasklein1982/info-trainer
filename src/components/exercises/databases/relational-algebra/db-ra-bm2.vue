<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database" db-mode="algebra">
      <p>Formuliere einen Term in relationaler Algebra:</p> 
      <p>Gesucht sind die Namen der Artikel, die der Kunde Alan Turing bestellt hat und von denen keine mehr auf Lager sind.</p>
    </ExerciseBody>
  </template>
  
  <script>
  import { parseTerm } from "../../../../other/parse-term";
  import { areResultsEqualIgnoreOrder } from "../databases/database";
  import db from "../databases/marketplace";
  
  export const data={
    id: "db-ra-bm2",
    title: "Mr. Turings Bestellungen (Teil 2)",
    database: db,
    check: {
      testcases: [
        {
          term: parseTerm("p[name](s[nachname='Turing' ^ vorname='Alan' ^ lagerbestand=0](Artikel ixi BestellDetail ixi Bestellung ixi Kunde))"),
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