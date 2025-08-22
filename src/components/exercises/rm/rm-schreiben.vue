<template>
  <ExerciseBody :exercise="$data" :register-machine="machine">
    Implementiere ein Registermaschinenprogramm <em>mit maximal {{ machine.lineLimit }} Befehlen</em>, das in die Register <em>R1 bis R20</em> die Zahlen <em>1 bis 20</em> schreibt.
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


export const data={
  id: "rm-schreiben",
  title: "Zahlen schreiben",
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
            if(output[i]!==i+1) return false;
          }
          return true;
        },
        info: 'In R1 steht 1, in R2 steht 2, in R3 steht 3, ..., in R20 steht 20.'
      }
    ]
  },
  machine: {
    code: ``,
    exampleInput: [0,0,0,0,0,0,0,0,0,0],
    maxSteps: 100000,
    lineLimit: 35
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