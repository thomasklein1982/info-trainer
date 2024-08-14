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
        labelTR: $Exercise.getComponent("JLabel","Taschenrechner"),
        buttonPlus: $Exercise.getComponent("JButton","+"),
        buttonMinus: $Exercise.getComponent("JButton","-"),
        buttonMal: $Exercise.getComponent("JButton","*"),
        buttonGeteilt: $Exercise.getComponent("JButton",":"),
        labelResult: $Exercise.getComponent("JLabel",""),
        
      };
    },
    testcases: [
      {
        data: ()=>{
          return {
            id: "labelTR",
            type: "exists"
          }
        },
        info: "Es gibt ein JLabel, in dem 'Taschenrechner' steht."
      },
      {
        data: ()=>{
          return {
            id: "buttonPlus",
            type: "exists"
          }
        },
        info: "Es gibt einen JButton, in dem '+' steht."
      },
      {
        data: ()=>{
          return {
            id: "buttonMinus",
            type: "exists"
          }
        },
        info: "Es gibt einen JButton, in dem '-' steht."
      },
      {
        data: ()=>{
          return {
            id: "buttonMal",
            type: "exists"
          }
        },
        info: "Es gibt einen JButton, in dem '*' steht."
      },
      {
        data: ()=>{
          return {
            id: "buttonGeteilt",
            type: "exists"
          }
        },
        info: "Es gibt einen JButton, in dem ':' steht."
      },
    ],
    test: async (tc,init)=>{
      if(tc.type==="exists"){
        return (init[tc.id]!==null);
      }
      return false;
    },
  },
  project: {
    name: "Taschenrechner",
    clazzes: [
      {
        name: "Taschenrechner",
        src: ``,
        main: `new Taschenrechner();`,
        onStart: ` `
      }
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