<template>
  <ExerciseBody :exercise="$data" :register-machine="machine">
    <p>Implementiere ein Registermaschinenprogramm, das die Werte der Register <em>R3, R4, R5, ... aufsummiert</em>, wobei der Wert von Register <em>R1</em> angibt, <em>wie viele Register addiert werden sollen</em>. Das Ergebnis soll in Register <em>R2</em> gespeichert werden.</p>
    <p>Es reicht, wenn das Programm für die Eingaben R1 = 0 bis R1 = 15 funktioniert.</p>
    <Example>
      Bei der Belegung
      <p>R1 = 4, R2 = 0, R3 = 4, R4 = 8, R5 = 1, R6 = 3, R7 = 10</p>
      sollen 4 Register ab R3 addiert werden, also R3 + R4 + R5 + R6 = 4 + 8 + 1 + 3 = 16.
    </Example>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


export const data={
  id: "rm-summe",
  title: "Summe beliebig vieler Zahlen",
  check: {
    input: ()=>{
      let array=[];
      for(let n=0;n<15;n++){
        let reg=[n,0];
        for(let i=3;i<20;i++){
          reg.push(random(0,20));
        }
        array.push(reg);
      }
      return array;
    },
    testcases: [
      {
        check: (input, output)=>{
          let n=input[0];
          let s=0;
          for(let i=0;i<n;i++){
            s+=input[3-1+i];
          }
          return output[1]===s;
        },
        info: 'Die Summe wird korrekt berechnet und in R2 gespeichert.'
      }
    ]
  },
  machine: {
    code: ``,
    exampleInput: [4,0,4,8,1,3,10],
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