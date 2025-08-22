<template>
  <ExerciseBody :exercise="$data" :register-machine="machine">
    <p>Implementiere ein Registermaschinenprogramm <em>mit maximal {{ machine.lineLimit }} Befehlen</em>, das die Werte der Register <em>R1 bis R10 um eine Position nach rechts verschiebt</em>. Der Wert von <em>R10</em> soll in <em>R1</em> verschoben werden.</p>
    <Example>
      Die Belegung
      <div>
        R1: 1, R2: 2, R3: 3, R4: 4, R5: 5, R6: 6, R7: 7, R8: 8, R9: 9, R10: 10
      </div>
      soll am Ende folgendermaßen aussehen:
      <div>
        R1: 10, R2: 1, R3: 2, R4: 3, R5: 4, R6: 5, R7: 6, R8: 7, R9: 8, R10: 9
      </div>
    </Example>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


export const data={
  id: "rm-shift",
  title: "Verschieben",
  check: {
    input: ()=>{
      let array=[];
      for(let j=0;j<10;j++){
        let werte=[];
        for(let i=0;i<10;i++){
          werte.push(random(0,100));
        }
        array.push(werte);
      }
      return array;
    },
    testcases: [
      {
        check: (input, output)=>{
          for(let i=0;i<9;i++){
            if(input[i]!==output[i+1]) return false;
          }
          return true;
        },
        info: 'Die Werte der Register R1 bis R9 werden um 1 nach rechts verschoben.'
      },
      {
        check: (input, output)=>{
          return output[0]===input[9];
        },
        info: 'Der Wert von R10 steht in R1.'
      }
    ]
  },
  machine: {
    code: ``,
    exampleInput: [1,2,3,4,5,6,7,8,9,10],
    maxSteps: 100000,
    lineLimit: 30
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