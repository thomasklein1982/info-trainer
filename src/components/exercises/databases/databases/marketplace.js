import { fillZeroes } from "../../../../other/fillZeroes";
import { nachnamen, vornamen } from "../../../../other/names";
import { Random } from "../../../../other/random";
import { Database } from "./database";


/**
 * Datenbank mit folgendem Thema:
 * Firmen liefern Artikel für einen Online-Händler. Kunden geben Bestellungen auf, die Artikel in beliebiger Anzahl enthalten können.
 * 
 * Relationenmodell:
 * 
 * Artikel(Artikelnummer, Name, Preis, Lagerbestand)
 * 
 * Firma(Firmennummer, Name, AnzahlMitarbeiter)
 * 
 * Bestellung(Bestellnummer, ↑Kundennummer, Datum)
 * 
 * Bestelldetails(↑Bestellnummer, ↑Artikelnummer, Einzelpreis, Anzahl)
 * 
 * Lieferung(↑Firmennummer, ↑Artikelnummer)
 */

let db = new Database("Online-Marktplatz");
db.addTable(
  "Artikel",
  [{name: "Artikelnummer", type: "NUMERIC"},"Name",{name: "Preis", type: "NUMERIC"},{name: "Lagerbestand", type: "NUMERIC"}],
  ["Artikelnummer"]
);
db.addTable(
  "Firma",
  [{name: "Firmennummer", type: "NUMERIC"},"Name",{name: "AnzahlMitarbeiter", type: "NUMERIC"}],
  ["Firmennummer"]
);
db.addTable(
  "Kunde",
  [{name: "Kundennummer", type: "NUMERIC"},"Nachname","Vorname"],
  ["Kundennummer"]
);
db.addTable(
  "Bestellung",
  [{name: "Bestellnummer", type: "NUMERIC"},{name: "Kundennummer", type: "NUMERIC"}, {name: "Datum", type: "DATE"}],
  ["Bestellnummer"],
  ["Kundennummer"]
);
db.addTable(
  "BestellDetail",
  [{name: "Bestellnummer", type: "NUMERIC"},{name: "Artikelnummer", type: "NUMERIC"}, {name: "Einzelpreis", type: "NUMERIC"},{name: "Anzahl", type: "NUMERIC"}],
  ["Bestellnummer","Artikelnummer"],
  ["Bestellnummer","Artikelnummer"]
);
db.addTable(
  "Lieferung",
  [{name: "Firmennummer", type: "NUMERIC"},{name: "Artikelnummer", type: "NUMERIC"}, {name: "Datum", type: "DATE"}],
  ["Firmennummer","Artikelnummer","Datum"],
  ["Firmennummer","Artikelnummer"]
);

db.create=function(){
  this.info="<em>Info: Die Daten in dieser Datenbank werden zufällig generiert. Namensgleichheiten mit Personen, Artikeln oder Firmen aus der echten Welt sind rein zufällig.</em>";
  
  let adjektiv=["super","mega","ultra","edel","prima","giga","deluxe","dufte","epic","fresh","hammer","chic","tasty","longlife","maxi","premium","big"];
  let artikelNamen=[["Flakes",2],["Sneakers",20],["Cookies",2],["Shirt",10],["Hose",50], ["Lichterkette",10],["Shorts",5],["Reinigungsmilch",8],["Motoröl",50],["Toilettenpapier",5],["Waschpulver",10],["Kopierpapier",15],["Klebeband",5],["Kugelschreiber",1],["Etikettendrucker",25],["Waschmaschine",500]];

  let alanTuring={
    exists: false,
    alanExists: false,
    turingExists: false,
    kundennummer: null,
    bestellnummer: null,
    artikel: null
  }

  let anr=Random.int(100,1000);
  let artikelCount=Random.int(20,30);
  let artikelNummern=[];
  let artikelPreise={};
  for(let i=0;i<artikelCount;i++){
    let acount=Random.int(1,2);
    let name=[];
    for(let i=0;i<acount;i++){
      let a=Random.drawFrom(adjektiv,1)[0];
      name.push(a);
    }
    for(let i=0;i<name.length;i++)
      name[i]=name[i].charAt(0).toUpperCase()+name[i].substring(1);
    name=name.join("-");
    let artikel=Random.drawFrom(artikelNamen,1)[0];
    name=name+"-"+artikel[0];
    let preis=artikel[1];
    let percent=Random.int(8,12)*10;
    preis=(preis*percent/100).toFixed(2)*1;
    let bestand=Random.int(0,100);
    if(alanTuring.artikel===null && (Random.int(1,10)===1 || i===artikelCount-1)){
      alanTuring.artikel=anr;
      bestand=0;
    }
    this.tables.Artikel.insert(anr,name,preis,bestand);
    artikelNummern.push(anr);
    artikelPreise[anr]=artikel[1];
    anr+=Random.int(1,10);
  }

  let fnr=Random.int(100,1000);
  let firmenNummern=[];
  let firmenCount=Random.int(10,20);
  let firmennamen=["Company","Enterprises","Studios","GmbH","Tech","Outlet","Agency","Association","Business","Syndicate","Corporation","GbR"];
  for(let i=0;i<firmenCount;i++){
    let name=Random.drawFrom(adjektiv,1);
    name.push(Random.drawFrom(firmennamen,1)[0]);
    name[0]=name[0].charAt(0).toUpperCase()+name[0].substring(1);
    name=name.join(" ");
    let mitarbeiter=Random.int(10,500);
    this.tables.Firma.insert(fnr,name,mitarbeiter);
    firmenNummern.push(fnr);
    fnr+=Random.int(1,10);
  }

  let knr=Random.int(100,1000);
  let kundenCount=Random.int(60,80);
  let kundenNummern=[];
  for(let i=0;i<kundenCount;i++){
    let vor=Random.drawFrom(vornamen,1)[0];
    let nach=Random.drawFrom(nachnamen,1)[0];
    if(!alanTuring.exists && (Random.int(1,10)===1 || i===kundenCount-1)){
      vor="Alan";
      nach="Turing";
      alanTuring.exists=true;
      alanTuring.kundennummer=knr;
    }else if(!alanTuring.alanExists && (Random.int(1,10)===1 || i===kundenCount-8)){
      alanTuring.alanExists=true;
      vor="Alan";
    }else if(!alanTuring.turingExists && (Random.int(1,10)===1 || i===kundenCount-20)){
      alanTuring.turingExists=true;
      nach="Turing";
    }
    this.tables.Kunde.insert(knr,nach,vor);
    kundenNummern.push(knr);
    knr+=Random.int(1,100);
  }

  let lieferungenCount=Random.int(50,60);
  let year=(new Date()).getFullYear();
  for(let i=0;i<lieferungenCount;i++){
    let f=Random.drawFrom(firmenNummern,1)[0];
    let a=Random.drawFrom(artikelNummern,1)[0];
    let y=Random.int(year-15,year);
    let m=fillZeroes(Random.int(1,12),2);
    let d=fillZeroes(Random.int(1,28),2);
    this.tables.Lieferung.insert(f,a,y+"-"+m+"-"+d);
  }

  let bestellungCount=Random.int(50,60);
  let bnr=Random.int(100,1000);
  let bestellNummern=[];
  for(let i=0;i<bestellungCount;i++){
    let k=Random.drawFrom(kundenNummern,1)[0];
    if(k===alanTuring.kundennummer || alanTuring.bestellnummer===null && (Random.int(1,8)===1 || i===bestellungCount-1)){
      k=alanTuring.kundennummer;
      alanTuring.bestellnummer=bnr;
    }
    let y=Random.int(year-15,year);
    let m=fillZeroes(Random.int(1,12),2);
    let d=fillZeroes(Random.int(1,28),2);
    this.tables.Bestellung.insert(bnr,k,y+"-"+m+"-"+d);
    bestellNummern.push(bnr);
    bnr+=Random.int(1,100);
  }

  for(let i=0;i<bestellungCount;i++){
    let count=Random.int(1,3);
    let bnr=bestellNummern[i];
    let anr;
    if(bnr===alanTuring.bestellnummer){
      count=3;
      anr=Random.int(0,count-1);
    }
    let artikel=Random.drawFrom(artikelNummern,count);
    for(let j=0;j<count;j++){
      let a=artikel[j];
      if(anr===j){
        a=alanTuring.artikel;
      }
      let anzahl=Random.int(1,10);
      let preis=artikelPreise[a];
      let percent=Random.int(8,12)*10;
      preis=(preis*percent/100).toFixed(2)*1;
      this.tables.BestellDetail.insert(bnr,a,preis,anzahl);
    }
  }

};

export default db;