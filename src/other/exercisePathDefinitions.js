let Java={
  name: "Java",
  paths: [
    {
      label: "UI",
      icon: "ui",
      exercises: ["steck","css1","ui-tr","ui-list","ui-tab"]
    },
    {
      label: "EVA",
      icon: "eva",
      exercises: ["eva-tr"]
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
      label: "Objektorientierung",
      icon: "oo",
      exercises: ["oo-basics","oo-beziehungen","oo-person", "oo-pat"]
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
  ]
}

let Datenbanken={
  name: "Datenbanken",
  paths: [
    {
      label: "SQL-SELECT",
      icon: "",
      exercises: ["db-select-all","db-select-avg", "db-select-gehalt", "db-select-frieda", "db-select-fachbereiche", "db-select-alter", "db-select-klassenliste","db-select-berufe"]
    }
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
    }
  ]
}

let paths=[
  IKG, Grundlagen, Internet, Java, Datenbanken, TheoretischeInformatik
];

for(let i=0;i<paths.length;i++){
  let cat=paths[i];
  for(let j=0;j<cat.paths.length;j++){
    cat.paths[j].category=cat.name;
  }
}

export default paths