<template>
  <ExerciseBody :exercise="$data" :register-machine="machine">
    <p>Implementiere ein Registermaschinenprogramm, das <em>Zahlen > 0 aufsteigend (von klein nach groß) sortiert</em>. Die Eingabe steht in den Registern R10, R11, R12, ... bis die erste 0 auftaucht. Am Ende sollen in denselben Registern die Zahlen in sortierter Reihenfolge stehen. Die Eingabe besteht immer aus mindestens einer Zahl > 0.</p>
    <Example>Für R10 = 5, R11 = 7, R12 = 6, R13 = 0, R14 = 8 ist das Ergebnis R10 = 5, R11 = 6, R12 = 7.</Example>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


export const data={
  id: "rm-sort",
  title: "Sortieren",
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
          let zahlen=[];
          let i=9;
          while(true){
            if(i>=input.length) break;
            let x=input[i];
            if(x===0) break;
            zahlen.push(x);
            i++;
          }
          zahlen.sort((a,b)=>{return a-b});
          for(let i=0;i<zahlen.length;i++){
            if(zahlen[i]!==output[9+i]) return false;
          }
          return true;
        },
        info: 'Die Register R10, R11, R12, ... werden korrekt sortiert.',
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

/*
//n = Anzahl Zahlen
//R1=n
//R7=R1
//for R2 = R1-1 to 0
  //R7--
  //for R3 = 1 to R7
    //R8=R3+9
    //R9=R8+1
    //if(R[R9]>R[R8]) R4=R[R9], R[R9]=R[R8], R[R8]=R4

//anzahl zahlen:
load #0
store 1
load #10
store 2

loop_anzahl: load *2
jzero ende_anzahl
load 1
add #1
store 1
load 2
add #1
store 2
goto loop_anzahl

ende_anzahl: goto sort_start

//R7=R1
sort_start: load 1
store 7
//R2=R1-1:
load 1
sub #1
store 2


//R7--
loop: load 7
sub #1
store 7
//R3=1:
load #1
store 3

inner_loop: load 3
add #9
store 8
add #1
store 9
//if
load *9
sub *8
jnzero weiter
//swap
load *9
store 4
load *8
store *9
load 4
store *8

weiter: load 7
sub 3
jzero ende_inner
load 3
add #1
store 3
goto inner_loop

ende_inner: load 2
sub #1
store 2
jzero ende
goto loop

ende: end
*/

export default{
  components: {
    
  },
  data() {
    return data;
  },
}
</script>