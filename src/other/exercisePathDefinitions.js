let Java={
  name: "Java",
  paths: [
    {
      label: "UI",
      icon: "ui",
      exercises: ["steck","css1","ui-tr","ui-list","ui-tab"]
    },
    // {
    //   label: "EVA",
    //   icon: "eva",
    //   exercises: ["eva-tr"]
    // },
    {
      label: "EVA",
      icon: "eva",
      exercises: ["console-ausgabe", "console-ascii", "console-verdoppeln", "console-bestellung"]
    },
    {
      label: "Bee",
      icon: "bee",
      exercises: ["bee-test"]
    },
    {
      label: "Methoden",
      icon: "methods",
      exercises: ["ausgabe-ermitteln-main","hallo-welt","ascii-art","ausgabe-ermitteln", "rechnen", "ausgabe-ermitteln-params", "durchschnitt", "nullstelle", "ausgabe-ermitteln-return", "preis"]
    },
    {
      label: "if-else",
      icon: "if",
      exercises: ["out-if-1","minimum-2", "even", "roman", "monat-tage","vokal","uppercase","minimum-3","dreieck","schaltjahr","strom"]
    },
    {
      label: "Schleifen",
      icon: "loop",
      exercises: ["out-loop-1", "mehrfach-ausgabe","strichliste","prim","letters","sum-1", "teiler", "prim-2"]
    },
    {
      label: "Arrays",
      icon: "arrays",
      exercises: ["array-basics","array-erzeugen","array-swap","array-ausgabe","array-ausgabe-liste","array-summe","array-shift", "array-addieren", "array-zaehlen"]
    },
    {
      label: "Verschlüsselung",
      icon: "crypto",
      exercises: ["char","caesar", "viginere"]
    },
    {
      label: "Objektorientierung",
      icon: "oo",
      exercises: ["oo-basics","oo-pokemon","oo-person", "oo-inherit", "oo-beziehungen", "oo-pat"]
    },
    {
      label: "Rekursion",
      icon: "recursion",
      exercises: ["output-rec-1","fakultaet","fibonacci","ggt","palindrom","output-rec-2","binary-search","hanoi","damen"]
    },
    {
      label: "Datenstrukturen",
      icon: "data",
      exercises: ["list"]
    },
    {
      label: "Algorithmen",
      icon: "algorithms",
      exercises: ["iterative-suche","binary-search","bubble","merge"]
    },
    {
      label: "Apps",
      icon: "apps",
      exercises: ["app-zr","app-vt"]
    },
  ]
}

let Datenbanken={
  name: "Datenbanken",
  paths: [
    {
      label: "Abfragen mit SQL",
      icon: "database-select",
      exercises: ["db-select-all","db-select-avg", "db-select-klassenraum","db-select-gehalt", "db-select-frieda", "db-select-fachbereiche", "db-select-alter", "db-select-schueler-codd", "db-select-klassenliste", "db-select-beste","db-select-berufe"]
    },
    {
      label: "Administration mit SQL",
      icon: "database-dml",
      exercises: ["db-dml-table","db-dml-insert","db-dml-droptable","db-dml","db-dml-setup"]
    },
    {
      label: "Relationale Algebra",
      icon: "database-ra",
      exercises: ["db-ra-et1","db-ra-al","db-ra-ad","db-ra-fm","db-ra-et2","db-ra-bm","db-ra-bm2","db-ra-gs"]
    },
  ]
}

let TheoretischeInformatik={
  name: "Theoretische Informatik",
  paths: [
    {
      label: "Endliche Automaten",
      icon: "ea",
      exercises: ["ea-all","ea-min-2","ea-bin-gerade","ea-substring", "ea-zahl", "ea-enden", "ea-gleich-viele", "ea-bin-bigger"]
    },
    {
      label: "Reguläre Ausdrücke",
      icon: "regexp",
      exercises: ["re-match-1","re-passed","re-match-2","re-cool","re-int", "re-match-3", "re-even", "re-match-4", "re-date"]
    },
    {
      label: "Turingmaschinen",
      icon: "tm",
      exercises: ["tm-hi","tm-loeschen","tm-bits-kippen","tm-paritaet","tm-zaehlen-1","tm-durch-3","tm-palindrom","tm-inkrement","tm-verdoppeln","tm-zaehlen-2", "tm-addieren"]
    },
    {
      label: "Registermaschinen",
      icon: "rm",
      exercises: ["rm-addieren","rm-vertauschen","rm-schreiben","rm-shift","rm-modulo","rm-umdrehen","rm-primzahl","rm-ggt", "rm-summe", "rm-tictactoe"]
    }
  ]
}

let Internet={
  name: "Das Internet",
  paths: [
    // {
    //   label: "HTML & CSS",
    //   icon: "html",
    //   exercises: []
    // },
    {
      label: "JavaScript",
      icon: "js",
      exercises: ["js-hw", "js-tr", "js-quiz", "js-res", "js-out-if-1", "js-max","js-bmr","js-schalt"]
    }
  ]
}

let Grundlagen={
  name: "Grundlagen",
  paths: [
    {
      label: "Bits & Bytes",
      icon: "bits",
      exercises: ["umwandeln-binaer","umwandeln-binaer-2","umwandeln-stellenwertsysteme"]
    },
  ]
}

let IKG={
  name: "IKG",
  paths: [
    {
      label: "Das Internet",
      icon: "internet",
      exercises: ["iggrace","igeliz","igtim","igada","igalan"]
    },
    // {
    //   label: "Textverarbeitung",
    //   icon: "text",
    //   exercises: ["tv-num-1"]
    // }
  ]
}

let Datenschutz={
  name: "Datenschutz",
  paths: [
    {
      label: "Nichts zu verbergen?!?",
      icon: "privacy",
      exercises: ["verbergen-1","verbergen-2","verbergen-3"]
    },
    // {
    //   label: "Textverarbeitung",
    //   icon: "text",
    //   exercises: ["tv-num-1"]
    // }
  ]
}

let paths=[
  IKG, Grundlagen, Internet, Java, Datenbanken, Datenschutz, TheoretischeInformatik
];

for(let i=0;i<paths.length;i++){
  let cat=paths[i];
  for(let j=0;j<cat.paths.length;j++){
    cat.paths[j].category=cat.name;
  }
}

export default paths