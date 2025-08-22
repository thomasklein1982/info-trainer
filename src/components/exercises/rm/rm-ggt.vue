<template>
  <ExerciseBody :exercise="$data" :register-machine="machine">
    <p>Implementiere ein Registermaschinenprogramm, das den <em>größten gemeinsamen Teiler (ggT)</em> der Werte der beiden Register <em>R1</em> und <em>R2</em> berechnet und in <em>R3</em> speichert.</p>
    <Hint>Wenn beide Register R1 und R2 den Wert 0 haben, soll 0 in R3 gespeichert werden.</Hint>
    <Example>
      Bei der Belegung
      <p>R1 = 18, R2 = 12</p>
      soll der ggT von 18 und 12 berechnet werden und das ist 6.
    </Example>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


export const data={
  id: "rm-ggt",
  title: "Der größte gemeinsame Teiler",
  check: {
    testcases: [
      {
        input: ()=>{
          let array=[];
          for(let i=0;i<100;i++){
            let f=random(1,5);
            let a=random(1,50)*f;
            let b=random(1,50)*f;
            array.push([a,b]);
          }
          return array;
        },
        check: (input, output)=>{
          let a=input[0];
          let b=input[1];
          let n=Math.min(a,b);
          let g=1;
          for(let d=n;d>1;d--){
            if(a%d===0 && b%d===0){
              g=d;
              break;
            }
          }
          return output[2]===g;
        },
        info: 'Funktioniert, wenn beide Zahlen > 0 sind.'
      },
      {
        input: ()=>{
          let array=[[0,random(1,20)], [random(1,20),0], [0, 0]];
          return array;
        },
        check: (input, output)=>{
          let a=input[0];
          let b=input[1];
          let g=Math.max(a,b);
          if(a===0 && b===0) g=0;
          return output[2]===g;
        },
        info: 'Funktioniert, wenn mindestens eine der beiden Zahlen 0 ist.'
      }
    ]
  },
  machine: {
    code: ``,
    exampleInput: [18,12],
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