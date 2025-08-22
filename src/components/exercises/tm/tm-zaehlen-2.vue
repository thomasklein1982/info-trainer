<template>
  <ExerciseBody :exercise="$data" :turing-machine="machine">
    Implementiere eine Turingmaschine, die als Eingabe einen String aus beliebig vielen <code>x</code> erhält (also z. B. <code>xxxx</code>) und als Ausgabe die Anzahl der <code>x</code> auf das Band schreibt (das Band soll ansonsten leer sein).
    <Example>
      Aus <code>xxxxxxxxxxxx</code> wird <code>12</code>
    </Example>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';
import { repeatString } from '../../../other/string-helper';



export const data={
  id: "tm-zaehlen-2",
  title: "Beliebig weit zählen",
  check: {
    input: ()=>{
      let array=[0,1,2,random(7,9),random(11,99),random(200,300)];
      for(let i=0;i<array.length;i++){
        array[i]=repeatString("x",array[i]);
      }
      return array;
    },
    testcases: [
      {
        check: (input, output)=>{
          let n=input.length;
          if(n>0) return true;
          if(!(output.trim()===n+"")){
            console.log("falsch",input,output);
          }
          return output.trim()===n+"";
        },
        info: 'Funktioniert für 0.'
      },
      {
        check: (input, output)=>{
          let n=input.length;
          if(n>=10) return true;
          return output.trim()===n+"";
        },
        info: 'Funktioniert für einstellige Zahlen.'
      },
      {
        check: (input, output)=>{
          let n=input.length;
          if(n>=100) return true;
          return output.trim()===n+"";
        },
        info: 'Funktioniert für zweistellige Zahlen.'
      },
      {
        check: (input, output)=>{
          let n=input.length;
          return output.trim()===n+"";
        },
        info: 'Funktioniert für beliebige Zahlen.'
      }
    ]
  },
  machine: {
    code: ``,
    startState: "S",
    alphabetInput: null,
    exampleInput: "xxxxxxxxxxxxxxx",
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