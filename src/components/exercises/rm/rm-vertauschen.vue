<template>
  <ExerciseBody :exercise="$data" :register-machine="machine">
    <p>Implementiere ein Registermaschinenprogramm, das die Werte der Register <em>R1 und R2 miteinander vertauscht</em>.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


export const data={
  id: "rm-vertauschen",
  title: "Vertauschen",
  check: {
    input: ()=>{
      let array=[];
      for(let i=0;i<10;i++){
        let a=random(5,30);
        let b=random(5,30);
        array.push([a,b]);
      }
      return array;
    },
    testcases: [
      {
        check: (input, output)=>{
          return output[1]===input[0] && output[0] == input[1];
        },
        info: 'Beide Werte werden vertauscht.'
      }
    ]
  },
  machine: {
    code: ``,
    exampleInput: [5,3],
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