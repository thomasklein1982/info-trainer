<template>
  <ExerciseBody :exercise="$data" :finite-state-machine="machine">
    Es sei L die Sprache aller Wörter aus den Buchstaben <code>a</code>, <code>b</code> und <code>c</code>, die aus mindestens 2 Zeichen bestehen. Implementiere einen endlichen Automaten, der die Sprache L akzeptiert.
  </ExerciseBody>
</template>

<script>
import { Random } from '../../../other/random';



export const data={
  id: "ea-min-2",
  title: "Mindestlänge 2",
  check: {
    input: ()=>{
      let array=["","a","b","c","defghijklmnopqrstuvwxyz"];
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
          if(input.length<2 || input.match(/[^abc]/)!==null) return true;
          return accepted===true;
        },
        points: 2,
        info: 'Wörter aus "a", "b" und "c" mit Mindestlänge 2 werden akzeptiert.'
      },
      {
        check: (input, accepted)=>{
          if(input.length>=2) return true;
          return accepted===false;
        },
        info: 'Wörter, die zu kurz sind, werden nicht akzeptiert.'
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