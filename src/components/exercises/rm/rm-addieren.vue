<template>
  <ExerciseBody :exercise="$data" :register-machine="machine">
    Implementiere eine Registermaschine, die die beiden Zahlen aus den Registern R1 und R2 addiert und das Ergebnis in R3 schreibt.
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


export const data={
  id: "rm-addieren",
  title: "Die Additionsmaschine",
  check: {
    input: ()=>{
      let array=[[0,0],[random(5,20),0],[0,random(5,20)]];
      for(let i=0;i<3;i++){
        let a=random(5,30);
        let b=random(5,30);
        array.push([a,b]);
      }
      return array;
    },
    testcases: [
      {
        check: (input, output)=>{
          return output[2]===input[0]+input[1];
        },
        info: 'R3 erhält den korrekten Wert'
      }
    ]
  },
  machine: {
    code: ``,
    exampleInput: [2,3],
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