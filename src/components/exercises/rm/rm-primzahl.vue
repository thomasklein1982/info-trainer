<template>
  <ExerciseBody :exercise="$data" :register-machine="machine">
    <p>Implementiere ein Registermaschinenprogramm, das überprüft, <em>ob der Wert von R1 eine Primzahl ist</em>. Das Ergebnis soll in <em>R2</em> geschrieben werden: <em>1</em>, falls es eine Primzahl ist, ansonsten <em>0</em>.</p>

    <Hint>
      Eine Primzahl ist eine natürliche Zahl &ge; 2, die nur durch 1 und sich selbst teilbar ist.
      <p>Die ersten Primzahlen sind 2, 3, 5, 7, 11, 13, 17, ...</p>
    </Hint>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';

function istPrim(n){
  if(n<2) return false;
  for(let t=2;t<n;t++){
    if(n%t===0) return false;
  }
  return true;
}

export const data={
  id: "rm-primzahl",
  title: "Primzahl-Check",
  check: {
    input: ()=>{
      let array=[];
      for(let i=1;i<100;i++){
        array.push([i]);
      }
      return array;
    },
    testcases: [
      {
        info: 'Primzahlen und Nicht-Primzahlen werden korrekt erkannt.',
        check: (input, output)=>{
          let prim=istPrim(input[0])? 1 : 0;
          return output[1]===prim;
        }
      }
    ]
  },
  machine: {
    code: ``,
    exampleInput: [17],
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

/*
//spezialfälle 0, 1 und 2 abhandeln:
load 1
sub #1
jzero NichtPrim
sub #1
jzero Prim
add #1
//Counter R3=n-1 für die Teiler:
store 3
//teiler testen:
schleife: load 1
div 3
mul 3
store 4 //R4=abrunden(R1/R3)*R3
load 1
sub 4
jzero NichtPrim
//counter --:
load 3
sub #1
sub #1
jzero Prim
add #1
store 3
goto schleife
NichtPrim: load #0
store 2
end
Prim: load #1
store 2
end
*/

</script>