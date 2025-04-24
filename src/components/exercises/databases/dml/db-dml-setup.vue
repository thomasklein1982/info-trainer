<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database">
      <p>Implementiere in SQL:</p>
      Es sollen die folgenden Tabellen erzeugt werden (inklusive der Datensätze und inklusive Primär- und Fremdschlüsseln):
      
      <div>
        <Card class="overflow-x">
          <template #title>Tabelle <code>Website</code></template>
          <template #content>
            <table class="database-relation">
              <tr>
                <th class="primary">URL</th>
                <th>Beschreibung</th>
                <th class="foreign">Betreiber</th>
              </tr>
              <tr>
                <td>mathe-info.com</td>
                <td>Materialien zu Mathe und Informatik</td>
                <td>thomaskl</td>
              </tr>
              <tr>
                <td>beauty-tipps.de</td>
                <td>Tipps und Tricks für deine Schönheit</td>
                <td>sari930</td>
              </tr>
            </table>
          </template>
        </Card>
        <Card class="overflow-x">
          <template #title>Tabelle <code>User</code></template>
          <template #content>
            <table class="database-relation">
              <tr>
                <th class="primary">Username</th>
                <th>Name</th>
                <th>Geburtstag</th>
              </tr>
              <tr>
                <td>greatness67</td>
                <td>Emma</td>
                <td>2007-07-13</td>
              </tr>
              <tr>
                <td>sari930</td>
                <td>Sarah</td>
                <td>2004-09-30</td>
              </tr>
              <tr>
                <td>thomaskl</td>
                <td>Thomas</td>
                <td>1982-12-13</td>
              </tr>
            </table>
          </template>
        </Card>
        <Card class="overflow-x">
          <template #title>Tabelle <code>Aufruf</code></template>
          <template #content>
            <table class="database-relation">
              <tr>
                <th class="primary foreign">Username</th>
                <th class="primary foreign">Website</th>
                <th class="primary">Zeitpunkt</th>
              </tr>
              <tr>
                <td>greatness67</td>
                <td>mathe-info.com</td>
                <td>2023-11-05 12:02:05</td>
              </tr>
              <tr>
                <td>greatness67</td>
                <td>mathe-info.com</td>
                <td>2025-01-19 20:10:00</td>
              </tr>
            </table>
          </template>
        </Card>
      </div>
    </ExerciseBody>
  </template>
  
  <script>
  import Card from "primevue/card";
  import empty from "../databases/empty";
  
  export const data={
    id: "db-dml-setup",
    title: "Tabellen erzeugen und befüllen",
    database: empty,
    refreshOptions: {
      dontCreateTables: true
    },
    check: {
      init: function(db_launcher){
        return db_launcher.runSQLInput();
      },
      testcases: [
        {
          info: "Es gibt eine Tabelle Website.",
          check: function(db_launcher){
            return db_launcher.existsTable("Website");
          },
          
        },
        {
          info: "Die Website-Tabelle hat die korrekten Attribute und Datentypen.",
          check: function(db_launcher){
            return db_launcher.hasCorrectAttributes("Website",["url","beschreibung","betreiber"],["text","text","text"]);
          }
        },
        {
          info: "Die Website-Tabelle hat den korrekten Primärschlüssel.",
          check: function(db_launcher){
            return db_launcher.hasCorrectPrimaryKey("Website",["url"]);
          },
        },
        {
          info: "Die Website-Tabelle hat die korrekten Fremdschlüssel.",
          check: function(db_launcher){
            return db_launcher.hasCorrectForeignKeys("Website",[["betreiber","user","username"]]);
          },
        },
        {
          info: "Die Website-Tabelle hat die richtigen Datensätze.",
          check: function(db_launcher){
            return db_launcher.runSQLAndCheckResult("select * from Website order by url desc", [["mathe-info.com", "Materialien zu Mathe und Informatik", "thomaskl"], ["beauty-tipps.de", "Tipps und Tricks für deine Schönheit", "sari930"]]);
          }
        },
        {
          info: "Es gibt eine Tabelle User.",
          check: function(db_launcher){
            return db_launcher.existsTable("User");
          },
        },
        {
          info: "Die User-Tabelle hat die korrekten Attribute und Datentypen.",
          check: function(db_launcher){
            return db_launcher.hasCorrectAttributes("User",["username","name","geburtstag"],["text","text","date"]);
          },
        },
        {
          info: "Die User-Tabelle hat den korrekten Primärschlüssel.",
          check: function(db_launcher){
            return db_launcher.hasCorrectPrimaryKey("User",["username"]);
          },
        },
        {
          info: "Die User-Tabelle hat die korrekten Fremdschlüssel (nämlich keine).",
          check: function(db_launcher){
            return db_launcher.hasCorrectForeignKeys("User",[]);
          },
        },
        {
          info: "Die User-Tabelle hat die richtigen Datensätze.",
          check: function(db_launcher){
            return db_launcher.runSQLAndCheckResult("select * from User order by username", [["greatness67","Emma","2007-07-13"], ["sari930","Sarah","2004-09-30"], ["thomaskl","Thomas","1982-12-13"]]);
          }
        },
        {
          info: "Es gibt eine Tabelle Aufruf.",
          check: function(db_launcher){
            return db_launcher.existsTable("Aufruf");
          },
        },
        {
          info: "Die Aufruf-Tabelle hat die korrekten Attribute und Datentypen.",
          check: function(db_launcher){
            return db_launcher.hasCorrectAttributes("Aufruf",["username","website","zeitpunkt"],["text","text","datetime"]);
          },
        },
        {
          info: "Die Aufruf-Tabelle hat den korrekten Primärschlüssel.",
          check: function(db_launcher){
            return db_launcher.hasCorrectPrimaryKey("Aufruf",["username","website","zeitpunkt"]);
          },
        },
        {
          info: "Die Aufruf-Tabelle hat die korrekten Fremdschlüssel.",
          check: function(db_launcher){
            return db_launcher.hasCorrectForeignKeys("Aufruf",[["username","user","username"],["website","website","url"]]);
          },
        },
        {
          info: "Die Aufruf-Tabelle hat die richtigen Datensätze.",
          check: function(db_launcher){
            return db_launcher.runSQLAndCheckResult("select * from Aufruf order by zeitpunkt", [["greatness67","mathe-info.com","2023-11-05 12:02:05"], ["greatness67","mathe-info.com","2025-01-19 20:10:00"]]);
          }
        },
      ]
    },
    code: ""
  };
  
// create table Website( 
// 	url varchar(200) primary key, 
//     beschreibung varchar(500), 
//     betreiber varchar(200), 
//     foreign key (betreiber) references User(username) 
// );
// create table User( 
// 	username varchar(200) primary key, 
//     name varchar(200), 
//     geburtstag date
// );
// create table aufruf(
// 	username varchar(200),
//     website varchar(200),
//     zeitpunkt datetime,
//     primary key (username,website,zeitpunkt),
//     foreign key (username) references User(username),
//     foreign key (website) references Website(url)
// );
// insert into Website values 
// ("mathe-info.com", "Materialien zu Mathe und Informatik", "thomaskl");
// insert into Website values 
// ("beauty-tipps.de", "Tipps und Tricks für deine Schönheit", "sari930");

// insert into user
// values("greatness67","Emma","2007-07-13");
// insert into user
// values ("thomaskl","Thomas","1982-12-13");
// insert into user
// values ("sari930","Sarah","2004-09-30");

// insert into aufruf
// values ("greatness67","mathe-info.com","2023-11-05 12:02:05");
// insert into aufruf
// values ("greatness67","mathe-info.com","2025-01-19 20:10:00");

  export default{
    components: {
      Card
    },
    data() {
      return data;
    },
  }
  </script>