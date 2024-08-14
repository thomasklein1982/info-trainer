<template>
  <ExerciseBody :exercise="$data">
      Es soll ein einfacher grafischer Taschenrechner erstellt werden, mit dem man zwei Zahlen addieren, subtrahieren, multiplizieren und dividieren kann.
      <p>Die UI soll bestehen aus:</p>
      <ul>
        <li>Einem JLabel, in dem "Taschenrechner" steht.</li>
        <li>Zwei Textfeldern namens zahl1 und zahl2, in die der User jeweils eine Zahl eingeben kann.</li>
        <li>Einem Button für jede Grundrechenart mit den Aufschriften "+", "-", "*" und ":" und den Namen plus, minus, mal und geteilt.</li>
        <li>Einem Label namens ausgabe, das zu Beginn leer ist.</li>
      </ul>
      <p>Sobald einer der Buttons geklickt wird, sollen die beiden Zahlen aus den Textfeldern miteinander verrechnet werden und das Ergebnis in dem Label ausgabe angezeigt werden.</p>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "taschenrechner",
  title: "Taschenrechner",
  check: {
    init: async ()=>{
      return {
        a: await $new(Taschenrechner)
      }
    },
    testcases: [
      {
        data: ()=>{
          return {
            id: "Label TR",
            text: " () ()",
          }
        },
        info: "Es gibt ein Label, in dem 'Taschenrechner' steht."
      },
      
    ],
    test: async (tc,init)=>{
      if(tc.id==="Label TR"){
        let root=$Exercise.getUIRoot();
        let labels=root.querySelectorAll(".jlabel");
        console.log(labels);
      }
      return false;
    },
    checker: true
  },
  project: {
    name: "Taschenrechner",
    clazzes: [
`class Taschenrechner{
  
}`
    ]
  }
};

export default{
  components: {
    
  },
  data() {
      return data;
  },
}
</script>