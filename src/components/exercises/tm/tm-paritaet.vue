<template>
  <ExerciseBody :exercise="$data" :turing-machine="machine">
    Implementiere eine Turingmaschine, die eine Eingabe aus lauter <code>x</code>en erhält (z. B. <code>xxxxx</code>) und entscheidet, ob es eine gerade Anzahl von Buchstaben ((Ausgabe: <code>G</code>) ist oder eine ungerade (Ausgabe: <code>U</code>).
    <Example>
      Für die Eingabe <code>xxxxx</code> soll die Ausgabe <code>U</code> generiert werden, weil es 5 <code>x</code> sind.
    </Example>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';
import { repeatString } from '../../../other/string-helper';


export const data={
  id: "tm-paritaet",
  title: "Gerade oder ungerade?",
  check: {
    input: ()=>{
      let array=[""];
      for(let i=0;i<5;i++){
        let n=random(1,20);
        array.push(repeatString("x",2*n));
        array.push(repeatString("x",2*n+1));
      }
      return array;
    },
    testcases: [
      {
        check: (input, output)=>{
          let n=input.length;
          output=output.trim();
          if(n>0) return true;
          return output==="G";
        },
        info: 'Klappt für 0.'
      },
      {
        check: (input, output)=>{
          let n=input.length;
          output=output.trim();
          if(n===0 || n%2===1) return true;
          return output==="G";
        },
        info: 'Klappt für gerade Anzahlen größer 0.'
      },
      {
        check: (input, output)=>{
          let n=input.length;
          output=output.trim();
          if(n%2===0) return true;
          return output==="U";
        },
        info: 'Klappt für ungerade Anzahlen.'
      }
    ]
  },
  machine: {
    code: ``,
    startState: "S",
    alphabetInput: null,
    exampleInput: "xxx",
    maxSteps: 10000
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