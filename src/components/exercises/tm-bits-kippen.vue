<template>
  <ExerciseBody :exercise="$data" :turing-machine="machine">
    Implementiere eine Turingmaschine, die als Eingabe eine Zeichenkette aus 0en und 1en erhält und die alle Bits der Eingabe "kippt", d.h., aus einer 0 wird eine 1 und umgekehrt.
  </ExerciseBody>
</template>

<script>

export const data={
  id: "tm-bits-kippen",
  title: "Die Bit-Kipp-Maschine",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {
        a: await $new(Aufgabe)
      }
    },
    testcases: [
      {
        data: ()=>{
          
        },
        info: "Alle 0en werden in 1en umgewandelt."
      }
      ],
    test: async (tc,init)=>{
      
    }
  },
  machine: {
    code: `S 0 1 r S`,
    startState: "S",
    alphabetInput: "[01]",
    exampleInput: "01110"
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