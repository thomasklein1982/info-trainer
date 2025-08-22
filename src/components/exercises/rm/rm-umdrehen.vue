<template>
  <ExerciseBody :exercise="$data" :register-machine="machine">
    <p>Implementiere ein Registermaschinenprogramm <em>mit maximal {{ machine.lineLimit }} Befehlen</em>, das die Werte der Register <em>R1 bis R10 umdreht</em>.</p>

    <Example>
      Die Belegung
      <div>
        R1: 1, R2: 2, R3: 3, R4: 4, R5: 5, R6: 6, R7: 7, R8: 8, R9: 9, R10: 10
      </div>
      soll am Ende folgendermaßen aussehen:
      <div>
        R1: 10, R2: 9, R3: 8, R4: 7, R5: 6, R6: 5, R7: 4, R8: 3, R9: 2, R10: 1
      </div>
    </Example>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


export const data={
  id: "rm-umdrehen",
  title: "Umdrehen",
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
          for(let i=0;i<10;i++){
            if(input[i]!==output[9-i]) return false;
          }
          return true;
        },
        info: 'Alle Werte werden umgedreht.'
      }
    ]
  },
  machine: {
    code: ``,
    exampleInput: [1,2,3,4,5,6,7,8,9,10],
    maxSteps: 100000,
    lineLimit: 28
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