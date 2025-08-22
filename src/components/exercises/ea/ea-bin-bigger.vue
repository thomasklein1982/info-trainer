<template>
  <ExerciseBody :exercise="$data" :finite-state-machine="machine">
    Es sei L die Sprache aller Binärzahlen, die größer sind als 30. Implementiere einen endlichen Automaten, der die Sprache L akzeptiert.
  </ExerciseBody>
</template>

<script>
import { Random } from '../../../other/random';



export const data={
  id: "ea-bin-bigger",
  title: "Binärzahlen größer 30",
  check: {
    input: ()=>{
      let array=[];
      for(let i=31;i<100;i++){
        let a=i.toString(2);
        array.push(a);
      }
      for(let i=1;i<=30;i+=2){
        let a=i.toString(2);
        array.push(a);
      }
      for(let i=2;i<=10;i++){
        let a=Math.round((Math.pow(10,i))).toString(2);
        array.push(a);
      }
      return array;
    },
    testcases: [
      {
        check: (input, accepted)=>{
          let n=Number.parseInt(input,2);
          if(n<=30) return true;
          return accepted===true;
        },
        info: 'Binärzahlen größer 30 werden akzeptiert.'
      },
      {
        check: (input, accepted)=>{
          let n=Number.parseInt(input,2);
          if(n>30) return true;
          return accepted===false;
        },
        info: 'Binärzahlen kleiner-gleich 30 werden nicht akzeptiert.'
      }
    ]
  },
  machine: {
    code: ``,
    startState: "S",
    alphabetInput: null,
    exampleInput: "1011100"
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