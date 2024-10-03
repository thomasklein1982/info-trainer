<template>
  <ExerciseBody :exercise="$data" :finite-state-machine="machine">
    Es sei L die Sprache aller Wörter, die aus beliebig vielen <code>a</code>, <code>b</code> und <code>c</code> bestehen. Implementiere einen endlichen Automaten, der die Sprache L akzeptiert.
  </ExerciseBody>
</template>

<script>
import { Random } from '../../../other/random';



export const data={
  id: "ea-all",
  title: "Beliebig viele a, b und c",
  check: {
    input: ()=>{
      let array=["","a","b","c",Random.string("d","z",1)];
      for(let i=0;i<5;i++){
        let a=Random.string("a","c",Random.int(20,40));
        array.push(a);
      }
      for(let i=0;i<5;i++){
        let a=Random.string("d","z",Random.int(10,20));
        array.push(a);
      }
      return array;
    },
    testcases: [
      {
        check: (input, accepted)=>{
          if(input.match(/[^abc]/)) return true;
          return accepted===true;
        },
        info: 'Wörter, die nur aus <code>abc</code> bestehen, werden akzeptiert.'
      },
      {
        check: (input, accepted)=>{
          if(!input.match(/[^abc]/)) return true;
          return accepted===false; 
        },
        info: 'Wörter, die andere Zeichen enthalten, werden nicht akzeptiert.'
      }
    ]
  },
  machine: {
    code: ``,
    startState: "S",
    alphabetInput: null,
    exampleInput: "aabbacbcbcaa"
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