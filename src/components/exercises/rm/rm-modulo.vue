<template>
  <ExerciseBody :exercise="$data" :register-machine="machine">
    <p>Implementiere ein Registermaschinenprogramm, das den <em>Rest der Division von R1 durch R2</em> bestimmt. Das Ergebnis soll am Ende in Register <em>R3</em> stehen.</p>
    <Example>
      Bei einer Belegung von
      <div>
        R1: 23, R2: 7
      </div>
      soll also der Rest von 23 : 7 bestimmt werden (also 2) und in R3 geschrieben werden.
    </Example>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


export const data={
  id: "rm-modulo",
  title: "Modulo",
  check: {
    input: ()=>{
      let array=[];
      for(let j=0;j<10;j++){
        let werte=[];
        for(let i=0;i<2;i++){
          werte.push(random(0,100));
        }
        array.push(werte);
      }
      return array;
    },
    testcases: [
      {
        check: (input, output)=>{
          return input[0]%input[1]===output[2];
        },
        info: 'Der Rest der Division steht am Ende in R3.'
      }
    ]
  },
  machine: {
    code: ``,
    exampleInput: [23,7],
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