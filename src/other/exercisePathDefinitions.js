let Java={
  name: "Java",
  paths: [
    {
      label: "Basics",
      exercises: ["hallo-welt","ascii-art","taschenrechner"]
    },
    {
      label: "Arrays",
      exercises: ["array-basics","array-erzeugen","array-swap","array-ausgabe","array-ausgabe-liste"]
    },
    {
      label: "Algorithmen I",
      exercises: ["iterative-suche"]
    },
    {
      label: "Objektorientierung",
      exercises: ["oo-basics"]
    },
  ]
}

let TheoretischeInformatik={
  name: "Theoretische Informatik",
  paths: [
    {
      label: "Turingmaschinen",
      exercises: ["tm-hi","tm-loeschen","tm-bits-kippen","tm-paritaet","tm-zaehlen-1","tm-durch-3","tm-inkrement","tm-verdoppeln","tm-zaehlen-2"]
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