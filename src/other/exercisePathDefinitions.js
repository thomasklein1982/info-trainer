let Java={
  name: "Java",
  paths: [
    {
      label: "Basics",
      exercises: ["hallo-welt","ascii-art","taschenrechner"]
    },
    {
      label: "Arrays",
      exercises: ["array-basics","array-swap"]
    },
    {
      label: "Algorithmen I",
      exercises: ["iterative-suche"]
    },
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

let paths=[
  Java
];

for(let i=0;i<paths.length;i++){
  let cat=paths[i];
  for(let j=0;j<cat.paths.length;j++){
    cat.paths[j].category=cat.name;
  }
}

export default paths