import { nachnamen, vornamen } from "../../../../other/names";
import { Random } from "../../../../other/random";
import { Database } from "./database";


/**
 * Datenbank mit folgendem Thema:
 * Schüler*innen gehören zu Klassen. Jede Klasse hat genau einen KL. Schulleiter sind Lehrer. Lehrer unterrichten Klassen in Fächern.
 * 
 * Relationenmodell:
 * 
 * Schueler(id, vorname, nachname, alterJahre)
 * 
 * Lehrkraft(kuerzel, vorname, nachname, alterJahre, gehalt)
 * 
 * Leitung(↑kuerzel)
 * 
 * Klasse(name, klassenraum, ↑klassenlehrkraft)
 * 
 * Fach(id, name, fachbereich)
 * 
 * unterrichtet(↑lehrkraft, ↑klasse, ↑fach)
 * 
 * Bewertung(↑schueler, ↑fach, note)
 */

let db = new Database("Schule");
db.addTable(
  "Schueler",
  ["id","vorname","nachname",{name: "AlterJahre", type: "NUMERIC"},"klasse"],
  ["id"],
  ["klasse"]
);
db.addTable(
  "Lehrkraft",
  ["kuerzel","vorname","nachname",{name: "AlterJahre", type: "NUMERIC"},{name: "gehalt", type: "numeric"}],
  ["kuerzel"]
);
db.addTable(
  "Leitung",
  ["kuerzel","amt"],
  ["kuerzel"],
  ["kuerzel"]
);
db.addTable(
  "Klasse",
  ["name",{name: "Klassenraum", type: "NUMERIC"},"klassenlehrkraft"],
  ["name"],
  ["klassenlehrkraft"]
);
db.addTable(
  "Fach",
  ["id","name","Fachbereich"],
  ["id"]
);
db.addTable(
  "unterrichtet",
  ["lehrkraft","fach"],
  ["lehrkraft","fach"],
  ["lehrkraft","fach"]
);
// db.addTable(
//   "unterrichtet",
//   ["lehrkraft","klasse","fach"]
// );
db.addTable(
  "Bewertung",
  ["schueler","fach",{name: "note", type: "NUMERIC"}],
  ["schueler","fach"],
  ["schueler","fach"]
);

db.create=function(){
  this.info="<em>Info: Die Daten in dieser Datenbank werden zufällig generiert. Namensgleichheiten mit Personen aus der echten Welt (außer einem gewissen Edgar Codd) sind rein zufällig.</em>";
  let minStufe=7;
  let maxStufe=10;
  let minAlter=12;
  let counts={
    schuelerPerClass: 15,
    lehrer: 50,
    leitung: ["Schulleiter*in","Stellvertreter*in"]
  };
  //Faecher:
  let faecher=["DEU","ENG","GES","GEO","REL","MAT","NAW","INF","SPO"];
  this.tables.Fach.insert("DEU","Deutsch","FB 1");
  this.tables.Fach.insert("ENG","Englisch","FB 1");
  // this.tables.Fach.insert("MUS","Musik","1");
  // this.tables.Fach.insert("KUN","Kunst","1");
  // this.tables.Fach.insert("POW","PoWi","2");
  this.tables.Fach.insert("GES","Geschichte","FB 2");
  this.tables.Fach.insert("GEO","Geografie","FB 2");
  this.tables.Fach.insert("REL","Religion","FB 2");
  this.tables.Fach.insert("MAT","Mathematik","FB 3");
  this.tables.Fach.insert("NAW","Naturwissenschaften","FB 3");
  this.tables.Fach.insert("INF","Informatik","FB 3");
  this.tables.Fach.insert("SPO","Sport",null);

  //Lehrkraefte & Leitung:
  let kuerzel={};
  let codd=null;
  for(let i=0;i<counts.lehrer;i++){
    let v=Random.drawFrom(vornamen,1)[0];
    let n=Random.drawFrom(nachnamen,1)[0];
    let a=Random.int(12,33)+Random.int(12,33);
    let gehalt;
    let leitung=i<counts.leitung.length;
    if(leitung){
      gehalt=Random.int(30,40)*200;
    }else{
      gehalt=Random.int(10,40)*200;
    }
    let k;
    let thisIsCodd=false;
    if(!codd && i>0 && (Random.int(1,10)<3 || i===counts.lehrer-1)){
      n="Codd";
      v="Edgar";
      k=String.fromCodePoint(Random.int(65,90))+String.fromCodePoint(Random.int(65,90));
      thisIsCodd=true;
    }else{
      k=n.charAt(0)+v.charAt(0);
    }
    let kuerz=k;
    let index=1;
    while(kuerzel[k]){
      k=kuerz+index;
      index++;
    }
    kuerzel[k]=true;
    this.tables.Lehrkraft.insert(k,v,n,a,gehalt);
    if(thisIsCodd){
      codd=k;
    }
    if(leitung){
      this.tables.Leitung.insert(k,counts.leitung[i]);
    }
    let fc;
    if(Random.int(1,5)===1) fc=3; else fc=2;
    let f=Random.drawFrom(faecher,fc);
    for(let j=0;j<f.length;j++){
      this.tables.unterrichtet.insert(k,f[j]);
    }
  }
  let lehrkraefte=[];
  for(let a in kuerzel){
    lehrkraefte.push(a);
  }

  //klassen & schueler:
  let klassen=[];
  let raeume=[];
  for(let i=0;i<(maxStufe-minStufe+1)*4;i++){
    raeume.push(i);
  }
  raeume=Random.mixArray(raeume);
  let klassenlehrer=Random.mixArray(lehrkraefte);
  let klassenIndex=0;
  let schueler={};
  let alter=minAlter;
  let friedaIn8a=false;
  let friedaIn8b=false;
  let stufeCodd=Random.int(minStufe,maxStufe);
  for(let i=minStufe;i<=maxStufe;i++){
    let classCount=Random.int(1,2)+Random.int(1,2);
    for(let j=0;j<classCount;j++){
      let n=i+String.fromCodePoint(97+j);
      let r=raeume[klassenIndex];
      let kl;
      if(i===stufeCodd && j===0){
        kl=codd;
      }else{
        kl=klassenlehrer[klassenIndex];
      }
      this.tables.Klasse.insert(n,r,kl);
      klassenIndex++;
      let schuelerCount=Math.round(counts.schuelerPerClass*Random.int(7,15)*0.1);
      let frieda=false;
      for(let s=0;s<schuelerCount;s++){
        let sid=Random.int(0,99999);
        while(schueler[sid]) sid++;
        schueler[sid]=true;
        let nn=nachnamen[Random.int(0,nachnamen.length-1)];
        let vn=vornamen[Random.int(0,vornamen.length-1)];
        let a=minAlter;
        let w=Random.int(1,10);
        if(w<3) a--;
        if(w>6) a++;
        if(w>9) a++;
        if(!frieda && (n==="8b" && s===schuelerCount-1 || Random.int(1,10)<3)){
          frieda=true;
          vn="Frieda";
        }
        this.tables.Schueler.insert(sid,vn,nn,a,n);

        //noten:
        for(let k=0;k<faecher.length;k++){
          this.tables.Bewertung.insert(sid,faecher[k],Random.int(0,1)+Random.int(0,1)+Random.int(1,3));
        }
      }
    }
    minAlter++;
  }

};

export default db;