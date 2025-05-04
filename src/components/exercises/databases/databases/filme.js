import { nachnamen, vornamen } from "../../../../other/names";
import { Random } from "../../../../other/random";
import { Database } from "./database";


/**
 * Datenbank mit folgendem Thema:
 * Filme werden von Regisseuren gedreht. Schauspieler*innen spielen in Filmen mit
 * 
 * Relationenmodell:
 * 
 * Film(id, name, regisseur, jahr, laenge, genre)
 * 
 * Schauspieler(id, nachname, vorname, geburtsjahr)
 * 
 * spielt_in(film, schauspieler, hauptrolle)
 */

let db = new Database("Filme");
db.addTable(
  "Film",
  ["id","name","regisseur",{name: "jahr", type: "NUMERIC"},{name: "laenge", type: "NUMERIC"}, "genre"],
  ["id"]
);
db.addTable(
  "Schauspieler",
  ["id","nachname","vorname",{name: "Geburtsjahr", type: "NUMERIC"}],
  ["id"]
);
db.addTable(
  "spielt_in",
  ["film","schauspieler","hauptrolle"],
  ["film","schauspieler"],
  ["film","schauspieler"]
);

db.create=function(options){
  let filme=[
    ["pate","Der Pate","Francis Ford Coppola",1972,175,"Mafiafilm"],
    ["leni","Goodbye, Lenin!","Wolfgang Becker",2003,121,"Tragikomödie"],
    ["tita","Titanic","James Cameron",1997,194,"Drama"],
    ["froz","Frozen","Jennifer Lee",2013,101,"Animationsfilm"]
  ];
  if(options?.removeFilme){
    for(let i=0;i<options.removeFilme;i++){
      filme.pop();
    }
  }
  for(let i=0;i<filme.length;i++){
    let f=filme[i];
    this.tables.Film.insert(f[0],f[1],f[2],f[3],f[4],f[5]);
  }
};

export default db;