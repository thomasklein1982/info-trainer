<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database">
      Es sollen die beiden folgenden Tabellen erzeugt werden (inklusive der Datensätze und inklusive Primär- und Fremdschlüsseln):
      
      <div>
        Tabelle <code>Webseite</code>
        <table class="database-relation">
          <tr>
            <th class="primary">URL</th>
            <th>LetzterAufruf</th>
            <th>AnzahlAufrufe</th>
            <th>Beschreibung</th>
            <th class="foreign">Betreiber</th>
          </tr>
          <tr>
            <td>mathe-info.com</td>
            <td>2025-04-23 01:38:57</td>
            <td>65049</td>
            <td>Materialien zu Mathe und Informatik</td>
            <td>thomaskl</td>
          </tr>
          <tr>
            <td>beauty-tipps.de</td>
            <td>2023-11-05 12:02:05</td>
            <td>954803</td>
            <td>Tipps und Tricks für deine Schönheit</td>
            <td>sari930</td>
          </tr>
        </table>

        Tabelle <code>User</code>
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
      </div>
    </ExerciseBody>
  </template>
  
  <script>
  import { areResultsEqual } from "../databases/database";
  import empty from "../databases/empty";
  
  export const data={
    id: "db-dml-setup",
    title: "Tabellen erzeugen und befüllen",
    database: empty,
    refreshOptions: {
      dontCreateTables: true
    },
    check: {
      // <td>mathe-info.com</td>
      //       <td>2025-04-23 01:38:57</td>
      //       <td>65049</td>
      //       <td>Materialien zu Mathe und Informatik</td>
      //       <td>thomaskl</td>
      //     </tr>
      //     <tr>
      //       <td>beauty-tipps.de</td>
      //       <td>2023-11-05 12:02:05</td>
      //       <td>954803</td>
      //       <td>Tipps und Tricks für deine Schönheit</td>
      //       <td>sari930</td>
      testcases: [
        {
          sqlDo: `create table Website( url varchar(200) primary key, letzteraufruf datetime, anzahlaufrufe numeric, beschreibung varchar(500), betreiber, foreign key (betreiber) references User(username) );
          create table User( username varchar(200) primary key, name varchar(200), geburtstag date);
          insert into Website values ("mathe-info.com", "2025-04-23 01:38:57", 65049, "Materialien zu Mathe und Informatik", "thomaskl");
          insert into Website values ("beauty-tipps.de", "2023-11-05 12:02:05", 954803, "Tipps und Tricks für deine Schönheit", "sari930");`,
          sqlUndo: `drop table if exists Website; drop table if exists user;`,
          sqlTest: `select * from Website;`,
          func: areResultsEqual
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