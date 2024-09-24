<template>
  <ExerciseBody :exercise="$data" :turing-machine="machine">
    Implementiere eine Turingmaschine, die "Hi!" auf das vorher leere Band schreibt.
  </ExerciseBody>
</template>

<script>


export const data={
  id: "tm-hi",
  title: "Hi!",
  check: {
    input: ()=>{
      return "";
    },
    testcases: [
      {
        check: (input, output)=>{
          //if(input.length!==output.length) return false;
          return output.trim()==="Hi!";
        },
        info: 'Es wird "Hi!" auf das Band geschrieben.'
      }
    ]
  },
  machine: {
    code: `S _ H r A`,
    startState: "S",
    alphabetInput: null,
    exampleInput: "",
    maxSteps: 10
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