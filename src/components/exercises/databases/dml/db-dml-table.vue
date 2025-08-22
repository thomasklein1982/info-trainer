<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database">
      Es soll eine neue Relation mit dem Namen <code>Film</code> und den Attributen <code>ID</code> (als Primärschlüssel), <code>Name</code>, <code>Regisseur</code>, <code>Jahr</code>, <code>Laenge</code> und <code>Genre</code> angelegt werden.
      <p>Implementiere die dazu notwendigen SQL-Anweisungen.</p> 
    </ExerciseBody>
  </template>
  
  <script>
  import empty from "../databases/empty";
  
  export const data={
    id: "db-dml-table",
    title: "Tabelle erzeugen",
    database: empty,
    refreshOptions: {},
    check: {
      init: function(db_launcher){
        return db_launcher.runSQLInput();
      },
      testcases: [
        {
          info: "Es gibt eine Tabelle 'Film'",
          check: function(db_launcher){
            return db_launcher.existsTable("Film");
          }
        },
        {
          info: "Die Tabelle hat die richtigen Attribute in der richtigen Reihenfolge.",
          check: function(db_launcher){
            return db_launcher.hasCorrectAttributeNames("Film",["id","name","regisseur","jahr","laenge","genre"]);
          }
        },
        {
          info: "Die Attribute haben geeignete Datentypen.",
          check: function(db_launcher){
            return db_launcher.hasCorrectDatatypes("Film",[["numeric","text"],"text","text","numeric","numeric","text"]);
          }
        },
        {
          info: "Der Primärschlüssel wurde korrekt implementiert.",
          check: function(db_launcher){
            return db_launcher.hasCorrectPrimaryKey("Film",["id"]);
          }
        }
        // {
        //   sqlDo: `create table Film( id varchar(200), name varchar(200), regisseur varchar(200), jahr int, laenge int, genre varchar(200));`,
        //   sqlUndo: `drop table if exists film;`,
        //   sqlTest: `insert into film values("0","Titanic","James Cameron",1998,230,"Drama");
        //   select * from film;`,
        //   func: areResultsEqual
        // }
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