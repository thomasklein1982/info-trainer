import { berufe } from "../../../../other/berufe";
import { cities } from "../../../../other/cities";
import { nachnamen, vornamen } from "../../../../other/names";
import { Random } from "../../../../other/random";
import { Database } from "./database";

function fillZero(n){
  if(n<10) return "0"+n;
  else return n+"";
}

/**
 * Datenbank mit folgendem Thema:
 * Personen haben Berufe und wohnen in Orten.
 * 
 * Relationenmodell:
 * 
 * Person(id, vorname, nachname, beruf, geburtstag, groesse, gewicht, beruf, ↑wohnort)
 * 
 * Ort(PLZ, name, einwohner)
 */

let db = new Database();
db.addTable(
  "Person",
  ["id","nachname","vorname","beruf",{name: "geburtstag", type: "DATE"},{name: "groesse", type: "NUMERIC"},{name: "gewicht", type: "NUMERIC"}, "plz"],
  ["id"],
  ["wohnort"]
);
db.addTable(
  "Ort",
  ["plz","name",{name: "einwohner", type: "NUMERIC"}],
  ["plz"]
);

db.create=function(){
  this.name="Personen";
  this.info="<em>Info: Die Daten der Personen werden zufällig generiert. Namensgleichheiten mit Personen aus der echten Welt sind rein zufällig.</em>";
  let r=Random;
  let staedte=r.drawFrom(cities,6);
  let jobs=r.drawFrom(berufe,10);
  for(let i=0;i<staedte.length;i++){
    let s=staedte[i];
    this.tables.Ort.insert(s.plz,s.name,s.einwohner);
  }
  let pids={};
  for(let i=0;i<100;i++){
    let nn=nachnamen[r.int(0,nachnamen.length-1)];
    let vn=vornamen[r.int(0,vornamen.length-1)];
    let alter=(Math.random()+Math.random())*50;
    let now=Date.now();
    let geb=new Date(now-alter*365*24*3600*1000);
    geb=geb.getFullYear()+"-"+fillZero(geb.getMonth()+1)+"-"+fillZero(geb.getDate());
    let w=r.int(0,jobs.length);
    let beruf;
    if(w===jobs.length) beruf=null;
    else beruf=jobs[w];
    let groesse=Math.round((Math.random()+Math.random()+Math.random()+Math.random())*25+120);
    let gewicht=Math.round((groesse-100)*(Math.random()+0.5));
    let id=r.int(1,1000);
    let stadt=staedte[r.int(0,staedte.length-1)];
    while(pids[id]) id++;
    pids[id]=true;
    this.tables.Person.insert(id,nn,vn,beruf,geb,groesse,gewicht,stadt.plz);
  }
};

export default db;