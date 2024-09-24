<template>
  <ExerciseBody :exercise="$data" :turing-machine="machine">
    Implementiere eine Turingmaschine, die eine Eingabe in der Form <code>Zahl+Zahl</code> erhält (z. B. <code>27+5</code>) und die das Ergebnis berechnet und auf das Band schreibt. Am Ende soll aussschließlich das Ergebnis auf dem Band stehen.
    <Example>
      Für die Eingabe <code>327+94</code> soll die Ausgabe <code>421</code> generiert werden.
    </Example>
    <Hint>Die beiden Zahlen können beliebig große natürliche Zahlen einschließlich 0 sein.</Hint>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


export const data={
  id: "tm-addieren",
  title: "Die Additionsmaschine",
  check: {
    input: ()=>{
      let array=["0+0",random(5,20)+"+0","0+"+random(5,20)];
      for(let i=0;i<3;i++){
        let a=random(5,30);
        let b=random(5,30);
        array.push(a+"+"+b);
      }
      array.push(random(70,99)+"+"+random(70,99));
      return array;
    },
    testcases: [
      {
        check: (input, output)=>{
          let s=input.split("+");
          let a=s[0]*1;
          let b=s[1]*1;
          let c=a+b;
          output=output.trim();
          return output===c+"";
        },
        info: 'Addition funktioniert'
      }
    ]
  },
  machine: {
    code: ``,
    startState: "S",
    alphabetInput: null,
    exampleInput: "5+4",
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