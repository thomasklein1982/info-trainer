<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database">
      <p>Implementiere in SQL:</p>
      <ol class="teilaufgaben">
        <li>Der Lehrer Marco Engel hat geheiratet und den Namen seiner Frau angenommen. Er heißt jetzt Marco Teufel.</li>
        <li>Die Klasse 7a hat Raum Nr. 3 als einen neuen Klassenraum.</li>
        <li>Frieda aus der 9a wechselt in die 9c.</li>
        <li>Es ist ein Jahr vergangen: Alle Lehrkräfte und Schüler*innen werden ein Jahr älter.</li>
        <li>Die Lehrerin Svenja Horst (Kürzel: HS) verlässt die Schule. Ihre Daten sollen vollständig aus der Datenbank entfernt werden.</li>
        <li>Der Lehrer Gökhan Münch hat Informatik als drittes Fach berufsbegleitend studiert und darf es ab sofort unterrichten.</li>
        <li>Alle Lehrkräfte, deren Gehalt unter 4000 € liegt, erhalten eine Gehaltserhöhung von 10%.</li>
      </ol>
    </ExerciseBody>
  </template>
  
  <script>
  import schule from "../databases/schule";
  
  export const data={
    id: "db-dml",
    title: "Änderungen in der Schule",
    database: schule,
    oldData: {
      lehrkraft: null,
      schueler: null
    },
    refreshOptions: {
      seed: 100
    },
    check: {
      init: function(db_launcher){
        let oldData=db_launcher.exerciseData.data.oldData;
        oldData.lehrkraft=db_launcher.database.sql("select * from lehrkraft")[0];
        oldData.lehrkraftOhneGehalt=db_launcher.database.sql("select kuerzel,vorname,nachname,alterjahre from lehrkraft")[0];
        oldData.lehrkraftOhneAlter=db_launcher.database.sql("select kuerzel,vorname,nachname,gehalt from lehrkraft")[0];
        //nachname von Marco Engel spielt keine Rolle:
        oldData.lehrkraft.values[29][2]=undefined;
        oldData.lehrkraftOhneGehalt.values[29][2]=undefined;
        oldData.lehrkraftOhneAlter.values[29][2]=undefined;
        oldData.schueler=db_launcher.database.sql("select * from schueler")[0];
        //klasse von Frieda Kempf spielt keine Rolle:
        oldData.schueler.values[81][4]=undefined;
        return db_launcher.runSQLInput();
      },
      testcases: [
        {
          info: "a) Marco Engel heißt jetzt Marco Teufel.",
          check: function(db_launcher){
            return db_launcher.runSQLAndCheckResult("select * from Lehrkraft where kuerzel='EM'", ["EM","Marco","Teufel",undefined,undefined]);
          }
        },
        {
          info: "b) Die 7a hat Raum Nr. 3 als neuen Klassenraum.",
          check: function(db_launcher){
            return db_launcher.runSQLAndCheckResult("select * from Klasse where name='7a'", ["7a",3,"LK"]);
          }
        },
        {
          info: "c) Frieda ist nicht mehr in der 9a.",
          check: function(db_launcher){
            return db_launcher.runSQLAndCheckResult("select count(*) from Schueler where klasse='9a'", [11]);
          }
        },
        {
          info: "c) Frieda ist jetzt in der 9c.",
          check: function(db_launcher){
            return db_launcher.runSQLAndCheckResult("select * from Schueler where vorname='Frieda' and nachname='Kempf' and klasse='9c'", [37200,"Frieda","Kempf",undefined, "9c"]);
          }
        },
        {
          info: "d) Alle Lehrkräfte werden ein Jahr älter.",
          check: function(db_launcher){
            let oldData=db_launcher.exerciseData.data.oldData;
            let table=JSON.parse(JSON.stringify(oldData.lehrkraftOhneGehalt.values));
            table[29][2]=undefined;
            let ok=db_launcher.runSQLAndCheckResult("select kuerzel,vorname, nachname, AlterJahre-1 from Lehrkraft", table);
            if(ok) return true;
            table.splice(42,1);
            return db_launcher.runSQLAndCheckResult("select kuerzel,vorname, nachname, AlterJahre-1 from Lehrkraft", table);
          }
        },
        {
          info: "d) Alle Schüler*innen werden ein Jahr älter.",
          check: function(db_launcher){
            let oldData=db_launcher.exerciseData.data.oldData;
            return db_launcher.runSQLAndCheckResult("select id,vorname, nachname, AlterJahre-1, klasse from schueler", oldData.schueler.values);
          }
        },
        {
          info: "e) Svenja wird aus der Lehrkräfte-Tabelle entfernt.",
          check: function(db_launcher){
            return db_launcher.runSQLAndCheckResult("select count(*) from Lehrkraft where kuerzel='HS'", [0]);
          }
        },
        {
          info: "e) Svenja wird aus der Unterrichtet-Tabelle entfernt.",
          check: function(db_launcher){
            return db_launcher.runSQLAndCheckResult("select count(*) from unterrichtet where lehrkraft='HS'", [0]);
          }
        },
        {
          info: "f) Informatik wird als Gökhans 3. Fach hinzugefügt.",
          check: function(db_launcher){
            return db_launcher.runSQLAndCheckResult('select count(*) from unterrichtet where lehrkraft="MG" and fach="INF"', [1]);
          }
        },
        {
          info: "g) Alle Lehrkräfte mit weniger als 4000 € Gehalt, erhalten jetzt 10% mehr.",
          check: function(db_launcher){
            let oldData=db_launcher.exerciseData.data.oldData;
            let table=JSON.parse(JSON.stringify(oldData.lehrkraftOhneAlter.values));
            table[29][2]=undefined;
            for(let i=0;i<table.length;i++){
              if(table[i][3]<4000) table[i][3]*=1.1;
            }
            let ok=db_launcher.runSQLAndCheckResult("select kuerzel,vorname,nachname,gehalt from Lehrkraft", table);
            if(ok) return true;
            
            table.splice(42,1);
            return db_launcher.runSQLAndCheckResult("select kuerzel,vorname,nachname,gehalt from Lehrkraft", table);
          }
        }
      ]
    },
    code: ""
  };
  
// update lehrkraft
// set nachname="Teufel"
// where vorname="Marco" and nachname="Engel";

// update klasse
// set klassenraum=3
// where name="7a";

// update schueler
// set klasse="9c"
// where vorname="Frieda" and klasse="9a";

// update lehrkraft
// set alterjahre=alterjahre+1;

// update schueler
// set alterjahre=1+alterjahre;

// delete from lehrkraft
// where kuerzel="HS";

// delete from unterrichtet
// where lehrkraft="HS";

// insert into unterrichtet
// select l.kuerzel,f.id 
// from lehrkraft l, fach f
// where vorname="Gökhan" and nachname="Münch" and f.name="Informatik";

// select *
// from unterrichtet
// where lehrkraft="MG" and fach="INF";

// update lehrkraft
// set gehalt=gehalt*1.1
// where gehalt<4000

  export default{
    components: {
      
    },
    data() {
      return data;
    },
  }
  </script>