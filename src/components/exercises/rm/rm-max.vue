<template>
  <ExerciseBody :exercise="$data" :register-machine="machine">
    <p>Implementiere ein Registermaschinenprogramm, das <em>das Maximum von mehreren Zahlen > 0 bestimmt</em> und in das Register <em>R1</em> schreibt. Die Eingabe steht in den Registern R10, R11, R12, ..., wobei eine 0 die Eingabe beendet. Die Eingabe besteht aus mindestens einer Zahl.</p>
    <Example>Für R10 = 5, R11 = 7, R12 = 6, R13 = 0, R14 = 8 ist das Ergebnis R1 = 7.</Example>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


export const data={
  id: "rm-max",
  title: "Maximum",
  check: {
    testcases: [
      {
        input: ()=>{
          let array=[0,0,0,0,0,0,0,0,0];
          let n=random(1,20);
          for(let i=0;i<n;i++){
            let x=random(1,100);
            array.push(x);
          }
          return [array];
        },
        check: (input, output)=>{
          let ist=output[0];
          let max=input[9];
          let i=10;
          while(true){
            if(i>=input.length) break;
            let x=input[i];
            if(x==0) break;
            if(x>max){
              max=x;
            }
            i++;
          }
          return max===ist;
        },
        info: 'R1 erhält den korrekten Wert',
        count: 3
      }
    ]
  },
  machine: {
    code: ``,
    exampleInput: [0,0,0, 0,0,0, 0,0,0,  5, 7, 6, 0, 8 ],
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