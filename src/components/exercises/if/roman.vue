<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Methode <Code inline>String roemischeZahl(int x)</Code> soll die Zahl <Code inline>x</Code> in eine römische Zahl umwandeln. Es reicht, wenn die Methode für <Code inline>x</Code> = 1, 2, 3, 4, 5 funktioniert. Implementiere diese Methode.
    <Example>
      <ul>
        <li>roemischeZahl(2) &rarr; "II"</li>
        <li>roemischeZahl(4) &rarr; "IV"</li>
      </ul>
    </Example>
  </ExerciseBody>
</template>

<script>
import { repeatString } from '../../../other/string-helper';

export const data={
  id: "roman",
  title: "Römische Zahlen",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {
        a: await $new(Main)
      }
    },
    testcases: [
        {
          data: ()=>{
            return {number: 1, r: "I"};
          },  
          info: 'Die 1 wird zu <code>"I"</code>.'
        },
        {
          data: ()=>{
            return {number: 2, r: "II"};
          },
          info: 'Die 2 wird zu <code>"II"</code>.'
        },
        {
          data: ()=>{
            return {number: 3, r: "III"};
          },
          info: 'Die 3 wird zu <code>"III"</code>.'
        },
        {
          data: ()=>{
            return {number: 4, r: "IV"};
          },
          info: 'Die 4 wird zu <code>"IV"</code>.'
        },
        {
          data: ()=>{
            return {number: 5, r: "V"};
          },
          info: 'Die 5 wird zu <code>"V"</code>.'
        }
      ],
    test: async (tc,init)=>{
      await System.console().clear();
      let x=tc.number;
      let r=await init.a.roemischeZahl(x);
      let soll=tc.r;
      return (r===soll);
    }
  },
  project: {
    name: "Römische Zahlen",
    clazzes: [{
      name: "Main",
      src: `String roemischeZahl (int x){
  //hierhin kommt der Code:
  
}
  
$void main(){
  String r = roemischeZahl(3);
  System.out.println( r );
}`
    }
    ]
  }
}

export default{
  components: {
    
  },
  data() {
      return data;
  },
}
</script>