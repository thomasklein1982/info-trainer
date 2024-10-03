<template>
  <ExerciseBody :exercise="$data" :finite-state-machine="machine">
    Es sei L die Sprache aller Zeichenketten über dem Alphabet { <code>a</code>, <code>b</code> }, in denen gleich viele <code>a</code> und <code>b</code> vorkommen. Implementiere einen endlichen Automaten, der die Sprache L akzeptiert. <em>Es reicht, wenn der Automat für Wörter der Länge &le; 12 funktioniert.</em>
    <ExtraExercise>Warum ist die Einschränkung mit der Länge notwendig?</ExtraExercise>
    
  </ExerciseBody>
</template>

<script>
import { Random } from '../../../other/random';
import { countInString } from '../../../other/string-helper';
import ExtraExercise from '../../extra-exercise.vue';



export const data={
  id: "ea-gleich-viele",
  title: "Gleich viele a und b",
  check: {
    input: ()=>{
      let array=[];
      for(let i=1;i<6;i++){
        let s=[];
        for(let j=0;j<i;j++){
          s.push("a");
          s.push("b");
        }
        array.push(Random.mixArray(s));
        array.push(Random.mixArray(s));
        array.push(Random.mixArray(s));
        let index=Random.int(0,s.length-1);
        s[index]=s[index]==="a"?"b":"a";
        array.push(Random.mixArray(s));
        s.splice(index,1);
        array.push(Random.mixArray(s));
      }
      for(let i=0;i<array.length;i++){
        array[i]=array[i].join("");
      }
      return array;
    },
    testcases: [
      {
        check: (input, accepted)=>{
          let a=countInString(input,"a");
          let b=countInString(input,"b");
          if(a!==b) return true;
          return accepted===true;
        },
        info: 'Wörter mit gleich vielen a und b der Maximallänge 12 werden akzeptiert.'
      },
      {
        check: (input, accepted)=>{
          let a=countInString(input,"a");
          let b=countInString(input,"b");
          if(a===b) return true;
          return accepted===false;
        },
        info: 'Wörter mit ungleich vielen a und b werden nicht akzeptiert.'
      }
    ]
  },
  machine: {
    code: ``,
    startState: "S",
    alphabetInput: null,
    exampleInput: "aababbabba"
  }
};

export default{
  components: {
    ExtraExercise
  },
  data() {
    return data;
  },
}
</script>