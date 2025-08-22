<template>
  <ExerciseBody :exercise="$data" :finite-state-machine="machine">
    Es sei L die Sprache aller Zeichenketten über dem Alphabet { <code>a</code>, <code>b</code> }, in denen mindestens vier aufeinander folgende <code>a</code> enthalten sind. Implementiere einen endlichen Automaten, der die Sprache L akzeptiert.
  </ExerciseBody>
</template>

<script>
import { Random } from '../../../other/random';



export const data={
  id: "ea-substring",
  title: "Vier aufeinander folgende a",
  check: {
    input: ()=>{
      let array=[];
      for(let i=0;i<10;i++){
        let s="";
        let l=Random.int(5,20);
        let as=0;
        for(let j=0;j<l;j++){
          let c;
          if(as<3){
            c=["a","b"][Random.int(0,1)];
            if(c==="a") as++;
          }else{
            c="b";
            as=0;
          }
          s+=c;
        }
        array.push(s);
      }
      for(let i=0;i<10;i++){
        let s=array[i];
        let index=Random.int(0,s.length);
        s=s.substring(0,index)+"aaaa"+s.substring(index);
        array.push(s);
      }
      for(let i=0;i<2;i++){
        let s=array[i];
        let index=Random.int(0,s.length);
        s=s.substring(0,index)+"aaaaa"+s.substring(index);
        array.push(s);
      }
      return array;
    },
    testcases: [
      {
        check: (input, accepted)=>{
          if(input.indexOf("aaaa")<0) return true;
          return accepted===true;
        },
        info: 'Wörter, die vier aufeinander folgende <code>a</code> enthalten, werden akzeptiert.'
      },
      {
        check: (input, accepted)=>{
          if(input.indexOf("aaaa")>=0) return true;
          return accepted===false;
        },
        info: 'Wörter, die nirgendwo vier aufeinander folende <code>a</code> enthalten, werden nicht akzeptiert.'
      }
    ]
  },
  machine: {
    code: ``,
    startState: "S",
    alphabetInput: null,
    exampleInput: "abaaabaaaab"
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