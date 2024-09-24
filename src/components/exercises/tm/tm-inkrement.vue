<template>
  <ExerciseBody :exercise="$data" :turing-machine="machine">
    Implementiere eine Turingmaschine, die als Eingabe eine natürliche Zahl im Dezimalsystem erhält (also z. B. <code>2049</code>) und diese Zahl um 1 erhöht.
    <Example>
      Aus <code>219</code> wird <code>220</code>
    </Example>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';
import { repeatString } from '../../../other/string-helper';



export const data={
  id: "tm-inkrement",
  title: "Um 1 erhöhen",
  check: {
    input: ()=>{
      let array=[0,random(1,8),9,random(10,90),random(2,10)*100-1,random(2,10)*10000-1, random(10000,99999)];
      return array;
    },
    testcases: [
      {
        check: (input, output)=>{
          let n=input*1;
          n++;
          let soll=n+"";
          return output.trim()===soll;
        },
        info: 'Funktioniert für jede Zahl.'
      }
    ]
  },
  machine: {
    code: ``,
    startState: "S",
    alphabetInput: null,
    exampleInput: "98",
    maxSteps: 1000000
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