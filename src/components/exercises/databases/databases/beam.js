import { nachnamen, vornamen } from "../../../../other/names";
import { Random } from "../../../../other/random";
import { Database } from "./database";
import { formatDate } from "../../../../other/formatDate";

/**
 * Datenbank mit folgendem Thema:
 * 
 * 
 * Relationenmodell:
 * 
 * User(benutzername, vorname, nachname, passwort)
 * befreundet(user1, user2)
 * Moderator(!Benutzername, !Kategorie)
 * Spiel(ID, Titel, Preis, !Kategorie)
 * besitzt(!User, !Spiel, letztesSpiel, spielzeit)
 * Bundle(ID, Name, Preis)
 * enthaelt(!Bundle, !Spiel)
 */

let db = new Database("Beam");
db.addTable(
  "User",
  ["benutzername","vorname","nachname","passwort"],
  ["benutzername"]
);
db.addTable(
  "befreundet",
  ["user1","user2"],
  ["user1","user2"],
  ["user1","user2"]
);
db.addTable(
  "besitzt",
  ["user","spiel",{name: "letztesSpiel", type: "DATE"}, {name: "spielzeit", type: "NUMERIC"}],
  ["user","spiel"],
  ["user","spiel"]
);
db.addTable(
  "Moderator",
  ["benutzername","kategorie"],
  ["benutzername"],
  ["benutzername","kategorie"]
);
db.addTable(
  "Spiel",
  ["ID","Titel",{name: "preis", type: "NUMERIC"},"kategorie"],
  ["ID"],
  ["kategorie"]
);
db.addTable(
  "Kategorie",
  ["ID","name"],
  ["ID"]
);
db.addTable(
  "Bundle",
  ["ID","Name",{name: "preis", type: "NUMERIC"}],
  ["ID"]
);
db.addTable(
  "enthaelt",
  ["Bundle","Spiel"],
  ["Bundle","Spiel"],
  ["Bundle","Spiel"]
);

db.create=function(options){
  this.info="<em>Info: Die Daten in dieser Datenbank werden zufällig generiert. Namensgleichheiten mit Personen oder Spielen aus der echten Welt sind rein zufällig.</em>";
  let usernames=[
    "ShadowSlayer",
    "NoobMaster69",
    "lI_DarkKnight_Il",
    "PixelPanda",
    "ToxicViper",
    "IronGladiator",
    "LunaTick",
    "SniperWolf_92",
    "GhostRider_DE",
    "CyberPunk_01",
    "DragonHeart",
    "SilentAssassin",
    "BlazeFury",
    "TheLastPaladin",
    "MistakeMaker",
    "InfiniteChaos",
    "FrostByte",
    "ZenithMaster",
    "RogueOne",
    "GamerGod_LP"
  ];
  let titles=[
    "Neon Protocol: Zero",
    "Chronicles of Aethelgard",
    "Dust & Diesel",
    "Whispers of the Void",
    "Pixel Harvest Moon",
    "Project: Overclock",
    "Shadow of the Monolith",
    "Starlight Odyssey",
    "Cyber-Samurai: Redux",
    "The Last Ember",
    "Gravity Drift 3000",
    "Fable of the Forgotten Sun",
    "Mecha-Mayhem: Arena",
    "Echoes of the Deep",
    "Kingdom of Gears",
    "Spectral Hunt",
    "Rogue Signal",
    "Aether Punk: Skyward",
    "Hidden Relics of Maya",
    "Infinite Dungeon Crawler",
    "Bio-Hazard: Quarantine",
    "Titan's Wake",
    "Mystic Gardens",
    "Iron Skies: Frontline",
    "Lunar Colony 7",
    "The Alchemist's Burden",
    "Glitched Reality",
    "Viking Blood: Valhalla",
    "Synthwave Racer",
    "Forgotten Isle: Survival"
  ];
  let pwds=[
    "SonneMond2024!",
    "p4ssW0rd_Gamer!",
    "DunklerRitter#88",
    "Blue-Pizza-99",
    "Geheimnis?Nein!",
    "1234-Pass-Wort",
    "CyberPunk_2077!",
    "KaffeeJunkie85",
    "ZockerAbend#26",
    "L33tH4ck3r_2026",
    "DrachenFeuer!1",
    "WinterIsComing#1",
    "Admin_Login_99",
    "BananaSplit-42",
    "ThunderStrike-00",
    "MausTastatur2024",
    "PixelArt_Lover!",
    "SuperMario_64#",
    "WLAN-Kabel-GmbH",
    "LetMeIn_Please!"
  ];
  let categories=[
    ["Rollenspiel","RPG"],
    ["Action-Adventure","AAD"],
    ["Strategie","STR"],
    ["Simulation","SIM"],
    ["Rennspiel","RUN"],
  ];
  let bundlenames=[
    "Ultimate Indie Treasures",
    "Cyber-City Survival Pack",
    "Legends of Lore: RPG Collection",
    "Adrenaline Rush: Racing Bundle",
    "Retro Revival: 16-Bit Edition",
    "Galactic Conquest Anthology",
    "Hidden Gems & Forgotten Tales",
    "Tactical Warfare: Elite Ops",
    "Cozy Cabin Essentials",
    "The Dark Abyss: Horror Suite"
  ];
  let userCount=Random.int(usernames.length-5,usernames.length);
  let gameCount=Random.int(titles.length-5,titles.length);
  let bundleCount=Random.int(bundlenames.length-3,bundlenames.length);
  let moderatorCount=Random.int(categories.length,8);
  let nnamen=Random.drawFrom(nachnamen,userCount);
  let vnamen=Random.drawFrom(vornamen,nnamen.length);
  usernames=Random.drawFrom(usernames,userCount);
  usernames[Random.int(0,usernames.length-1)]="thomaskl";
  let gameTitles=Random.drawFrom(titles,gameCount);
  pwds=Random.drawFrom(pwds,userCount);
  for(let i=0;i<categories.length;i++){
    this.tables.Kategorie.insert(categories[i][1],categories[i][0]);
  }
  let id=0;
  let games=[];
  for(let i=0;i<gameCount;i++){
    id+=Random.int(1,50);
    let kat=Random.int(0,categories.length-1);
    let g={
      id: "S"+id,
      title: gameTitles[i],
      price: Random.int(5,40),
      category: categories[kat][1]
    };
    games.push(g);
    this.tables.Spiel.insert(g.id,g.title,g.price,g.category);
  }
  let moderators=Random.drawFrom(usernames,moderatorCount);
  for(let i=0;i<moderators.length;i++){
    let kat=Random.int(0,categories.length-1);
    this.tables.Moderator.insert(moderators[i],categories[kat][1]);
  }
  for(let i=0;i<userCount;i++){
    this.tables.User.insert(usernames[i],vnamen[i],nnamen[i],pwds[i]);
    let friends=Random.drawFrom(usernames,Random.int(0,5));
    for(let j=0;j<friends.length;j++){
      let un=friends[j];
      if(un===usernames[i]) continue;
      this.tables.befreundet.insert(usernames[i],un);
      if(Random.int(1,10)<=7){
        this.tables.befreundet.insert(un,usernames[i]);
      }
    }
    let ownedGames=Random.drawFrom(games,Random.int(2,games.length));
    for(let j=0;j<ownedGames.length;j++){
      let g=ownedGames[j];
      let now=Date.now();
      let oneYearAgo=Date.now()-365*24*60*60*1000;
      let time=new Date(Random.int(oneYearAgo,now));
      let date=formatDate(time,"YYYY-MM-DD");
      let spielzeit=Random.int(0,100);
      if(Random.int(1,10)===1){
        date=null;
        spielzeit=0;
      }
      this.tables.besitzt.insert(usernames[i],g.id,date,spielzeit);
    }
  }
  
  bundlenames=Random.drawFrom(bundlenames,bundleCount);
  id=0;
  let bundles=[];
  for(let i=0;i<bundlenames.length;i++){
    id+=Random.int(1,10);
    let count=Random.int(3,8);
    let content=Random.drawFrom(games,count);
    let b={
      id: "B"+id,
      name: bundlenames[i]
    };
    bundles.push(b);
    let preis=0;
    for(let j=0;j<content.length;j++){
      let g=content[j];
      preis+=g.price;
      this.tables.enthaelt.insert(b.id,g.id);
    }
    let p=Math.floor((Random.randomSeeded()*0.8+0.1)*preis);
    this.tables.Bundle.insert(b.id,b.name,Random.int(5,preis-1));
  }

};

export default db;