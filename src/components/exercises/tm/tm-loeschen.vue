<template>
  <ExerciseBody :exercise="$data" :turing-machine="machine">
    Implementiere eine Turingmaschine, die eine Eingabe aus den Zeichen <code>x</code> und <code>y</code> erhält (z. B. <code>xyyxxy</code>) und alle <code>y</code> löscht (d.h., durch Leerzeichen ersetzt).
    <Example>
      Für die Eingabe <code>xyyxxyx</code> soll die Ausgabe <code>x__xx_x</code> generiert werden.
    </Example>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


export const data={
  id: "tm-loeschen",
  title: "Kille die Ypsilons",
  check: {
    input: ()=>{
      let array=[""];
      for(let i=0;i<5;i++){
        let n=random(10,20);
        let t="";
        for(let i=0;i<n;i++){
          if(random(0,1)===0) t+="x";
          else t+="y";
        }
        array.push(t);
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
          output=output.trim();
          let soll=input.replace(/y/g," ").trim();
          return output===soll;
        },
        points: 9,
        info: 'Klappt für alle Strings aus x und y.'
      }
    ]
  },
  machine: {
    code: ``,
    startState: "S",
    alphabetInput: null,
    exampleInput: "yxxxyyxxyx",
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