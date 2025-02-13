import { Database } from "./database";

let db = new Database();
db.addTable(
  "Kunde",
  ["Kundennr","Nachname","Vorname","AlterJahre","verheiratetMit","Groesse","Gewicht","Beruf"]
);

db.create=function(){
  
};