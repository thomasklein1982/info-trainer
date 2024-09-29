<template>
  <ExerciseBody :exercise="$data" :finite-state-machine="machine">
    Es sei L die Sprache aller Binärzahlen, die auf 1011 enden. Implementiere einen endlichen Automaten, der die Sprache L akzeptiert.
  </ExerciseBody>
</template>

<script>
import { Random } from '../../../other/random';



export const data={
  id: "ea-enden",
  title: "Binärzahlen, die auf 1011 enden",
  check: {
    input: ()=>{
      let array=[];
      for(let i=0;i<10;i++){
        let a=i.toString(2);
        array.push(a);
      }
      for(let i=10;i<20;i++){
        let a=i.toString(2)+"1011";
        array.push(a);
      }
      for(let i=10;i<20;i++){
        let a=i.toString(2)+"101011";
        array.push(a);
      }
      for(let i=10;i<20;i++){
        let a=i.toString(2)+"1011011";
        array.push(a);
      }
      return array;
    },
    testcases: [
      {
        check: (input, accepted)=>{
          let end=input.substring(input.length-4);
          if(end!=="1011") return true;
          return accepted===true;
        },
        info: 'Binärzahlen, die auf 1011 enden, werden akzeptiert.'
      },
      {
        check: (input, accepted)=>{
          let end=input.substring(input.length-4);
          if(end==="1011") return true;
          return accepted===false;
        },
        info: 'Binärzahlen, die nicht auf 1011 enden, werden nicht akzeptiert.'
      }
    ]
  },
  machine: {
    code: ``,
    startState: "S",
    alphabetInput: null,
    exampleInput: "101011011"
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