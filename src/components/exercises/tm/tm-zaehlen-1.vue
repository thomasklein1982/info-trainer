<template>
  <ExerciseBody :exercise="$data" :turing-machine="machine">
    Implementiere eine Turingmaschine, die als Eingabe einen String aus 0 bis 4 <code>x</code> erhält (also z. B. <code>xxx</code>) und als Ausgabe die Anzahl der <code>x</code> auf das Band schreibt (das Band soll ansonsten leer sein).
    <Example>
      Aus <code>xxx</code> wird <code>3</code>
    </Example>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "tm-zaehlen-1",
  title: "Bis 4 zählen",
  check: {
    input: ()=>{
      return [
        "","x","xx","xxx","xxxx"
      ];
    },
    testcases: [
      {
        check: (input, output)=>{
          //if(input.length!==output.length) return false;

          return output.trim()===input.length+"";
        },
        info: 'Die richtige Zahl steht auf dem Band (und sonst nichts).'
      }
    ]
  },
  machine: {
    code: ``,
    startState: "S",
    alphabetInput: null,
    exampleInput: "",
    maxSteps: 1000
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