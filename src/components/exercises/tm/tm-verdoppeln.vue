<template>
  <ExerciseBody :exercise="$data" :turing-machine="machine">
    Implementiere eine Turingmaschine, die eine Eingabe aus lauter <code>x</code>en erhält (z. B. <code>xxxxx</code>) und diese Anzahl verdoppelt.
    <Example>
      Für die Eingabe <code>xxx</code> soll die Ausgabe <code>xxxxxx</code> generiert werden.
    </Example>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';
import { repeatString } from '../../../other/string-helper';


export const data={
  id: "tm-verdoppeln",
  title: "Die Verdopplungsmaschine",
  check: {
    input: ()=>{
      let array=["","x"];
      for(let i=0;i<5;i++){
        let n=random(1,20);
        array.push(repeatString("x",n));
      }
      return array;
    },
    testcases: [
      {
        check: (input, output)=>{
          let n=input.length;
          output=output.trim();
          if(n>0) return true;
          return output==="";
        },
        info: 'Klappt, wenn die Eingabe leer ist.'
      },
      {
        check: (input, output)=>{
          let n=input.length;
          output=output.trim();
          return output===repeatString("x",2*n);
        },
        info: 'Klappt für alle Anzahlen.'
      }
    ]
  },
  machine: {
    code: ``,
    startState: "S",
    alphabetInput: null,
    exampleInput: "xxx",
    maxSteps: 100000
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