
import { Database } from "./database";


/**
 * leere Datenbank für Playground
 */

let db = new Database();


db.create=function(options){
  this.name="EmptyDB";
  
};

export default db;