let Java={
  name: "Java",
  paths: [
    {
      label: "UI",
      exercises: ["steck","taschenrechner"]
    },
    {
      label: "Methoden",
      exercises: ["ausgabe-ermitteln-main","hallo-welt","ascii-art","ausgabe-ermitteln", "rechnen", "ausgabe-ermitteln-params", "durchschnitt", "nullstelle", "ausgabe-ermitteln-return", "preis"]
    },
    {
      label: "if-else",
      exercises: []
    },
    {
      label: "Schleifen",
      exercises: []
    },
    {
      label: "Arrays",
      exercises: ["array-basics","array-erzeugen","array-swap","array-ausgabe","array-ausgabe-liste","array-summe","array-shift", "array-addieren", "array-zaehlen"]
    },
    {
      label: "Algorithmen I",
      exercises: ["iterative-suche"]
    },
    {
      label: "Objektorientierung",
      exercises: ["oo-basics","oo-funktion"]
    },
  ]
}

let TheoretischeInformatik={
  name: "Theoretische Informatik",
  paths: [
    {
      label: "Turingmaschinen",
      exercises: ["tm-hi","tm-loeschen","tm-bits-kippen","tm-paritaet","tm-zaehlen-1","tm-durch-3","tm-palindrom","tm-inkrement","tm-verdoppeln","tm-zaehlen-2", "tm-addieren"]
    }
  ]
}

let Html={
  name: "Html",
  paths: [
    {
      label: "Bla",
      exercises: ["hallo-welt","array-swap"]
    },
    {
      label: "Blub",
      exercises: ["array-swap"]
    }
  ]
}

let Grundlagen={
  name: "Grundlagen",
  paths: [
    {
      label: "Bits & Bytes",
      exercises: ["umwandeln-binaer","umwandeln-binaer-2","umwandeln-stellenwertsysteme"]
    },
  ]
}

let paths=[
  Grundlagen, Java, TheoretischeInformatik
];

for(let i=0;i<paths.length;i++){
  let cat=paths[i];
  for(let j=0;j<cat.paths.length;j++){
    cat.paths[j].category=cat.name;
  }
}

export default paths