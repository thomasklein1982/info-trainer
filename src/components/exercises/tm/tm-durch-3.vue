<template>
  <ExerciseBody :exercise="$data" :turing-machine="machine">
    Implementiere eine Turingmaschine, die eine Eingabe aus lauter <code>x</code>en erhält (z. B. <code>xxxxx</code>) und entscheidet, ob die Anzahl der Buchstaben durch drei teilbar ist ((Ausgabe: <code>J</code>) oder nicht (Ausgabe: <code>N</code>).
    <Example>
      Für die Eingabe <code>xxxxxx</code> soll die Ausgabe <code>J</code> generiert werden, weil es 6 <code>x</code> sind.
    </Example>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';
import { repeatString } from '../../../other/string-helper';


export const data={
  id: "tm-durch-3",
  title: "Durch 3 teilbar?",
  check: {
    input: ()=>{
      let array=["","x","xx","xxx"];
      for(let i=0;i<3;i++){
        let n=random(1,20);
        array.push(repeatString("x",3*n));
        array.push(repeatString("x",3*n+1));
        array.push(repeatString("x",3*n+2));
      }
      return array;
    },
    testcases: [
      {
        check: (input, output)=>{
          let n=input.length;
          output=output.trim();
          if(n>0) return true;
          return output==="J";
        },
        info: 'Klappt für 0.'
      },
      {
        check: (input, output)=>{
          let n=input.length;
          output=output.trim();
          if(n===0 || n%3!==0) return true;
          return output==="J";
        },
        info: 'Klappt für Anzahlen größer 0, die durch 3 teilbar sind.'
      },
      {
        check: (input, output)=>{
          let n=input.length;
          output=output.trim();
          console.log("fall 3",output,input);
          if(n%3===0) return true;
          return output==="N";
        },
        info: 'Klappt für Anzahlen, die nicht durch 3 teilbar sind.'
      }
    ]
  },
  machine: {
    code: ``,
    startState: "S",
    alphabetInput: null,
    exampleInput: "xxxxxx",
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