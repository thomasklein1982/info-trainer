<template>
  <ExerciseBody :exercise="$data" :turing-machine="machine">
    Implementiere eine Turingmaschine, die als Eingabe eine Zeichenkette aus 0en und 1en erhält und die alle Bits der Eingabe "kippt", d.h., aus einer 0 wird eine 1 und umgekehrt.
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


export const data={
  id: "tm-bits-kippen",
  title: "Die Bit-Kipp-Maschine",
  check: {
    input: ()=>{
      let array=[];
      for(let i=0;i<10;i++){
        let t="";
        let N=i+6;
        for(let j=0;j<N;j++){
          t+=random(0,1);
        }
        array.push(t);
      }
      return array;
    },
    testcases: [
      {
        check: (input, output)=>{
          //if(input.length!==output.length) return false;
          for(let i=0;i<input.length;i++){
            let inp=input.charAt(i);
            let out=output.charAt(i);
            if(inp==="0" && out!=="1") return false;
          }
          return true;
        },
        info: "Alle 0en werden in 1en umgewandelt."
      },
      {
        check: (input, output)=>{
          //if(input.length!==output.length) return false;
          for(let i=0;i<input.length;i++){
            let inp=input.charAt(i);
            let out=output.charAt(i);
            if(inp==="1" && out!=="0") return false;
          }
          return true;
        },
        info: "Alle 1en werden in 0en umgewandelt."
      },
      {
        check: (input, output)=>{
          output=output.trim();
          if(input.length!==output.length) return false;
          for(let i=0;i<input.length;i++){
            let inp=input.charAt(i);
            let out=output.charAt(i);
            if(inp==="1" && out!=="0") return false;
            if(inp==="0" && out!=="1") return false;
            if(inp===" " && out!==" ") return false;
          }
          return true;
        },
        info: "Sonst ändert sich nichts."
      }
    ]
  },
  machine: {
    code: ``,
    startState: "S",
    alphabetInput: "[01]",
    exampleInput: "011010",
    maxSteps: 100
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