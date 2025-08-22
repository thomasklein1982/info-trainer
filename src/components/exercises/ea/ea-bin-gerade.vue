<template>
  <ExerciseBody :exercise="$data" :finite-state-machine="machine">
    Es sei L die Sprache aller geraden Binärzahlen. Implementiere einen endlichen Automaten, der die Sprache L akzeptiert.
  </ExerciseBody>
</template>

<script>
import { Random } from '../../../other/random';



export const data={
  id: "ea-bin-gerade",
  title: "Gerade Binärzahlen",
  check: {
    input: ()=>{
      let array=[];
      for(let i=0;i<30;i++){
        let a=i.toString(2);
        array.push(a);
      }
      return array;
    },
    testcases: [
      {
        check: (input, accepted)=>{
          let last=input.charAt(input.length-1);
          if(last!=="0") return true;
          return accepted===true;
        },
        info: 'Gerade Binärzahlen werden akzeptiert.'
      },
      {
        check: (input, accepted)=>{
          let last=input.charAt(input.length-1);
          if(last==="0") return true;
          return accepted===false;
        },
        info: 'Ungerade Binärzahlen werden nicht akzeptiert.'
      }
    ]
  },
  machine: {
    code: ``,
    startState: "S",
    alphabetInput: null,
    exampleInput: "101"
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