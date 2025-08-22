<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Methode <Code inline>int minimum(int a, int b, int c)</Code> soll das Minimum der drei Zahlen <Code inline>a</Code>, <Code inline>b</Code> und <Code inline>c</Code> bestimmen und zurückgeben. Implementiere diese Methode.
    <Example>
      <ul>
        <li>minimum (-5, -2, -8) &rarr; -8</li>
        <li>minimum (5, 9, 5) &rarr; 5</li>
      </ul>
    </Example>
  </ExerciseBody>
</template>

<script>
export const data={
  id: "minimum-3",
  title: "Minimum von drei Zahlen",
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
          let a=$Exercise.random(-100,100);
          let b=a+$Exercise.random(1,100);
          let c=a+$Exercise.random(1,100)
          return {
            a, b, c
          };
        },  
        count: 5,
        info: 'Funktioniert, wenn <code>a</code> das Minimum ist.'
      },
      {
        data: ()=>{
          let a=$Exercise.random(-100,100);
          let b=a+$Exercise.random(1,100);
          let c=a+$Exercise.random(1,100)
          return {
            a:b, b:a, c
          };
        },  
        count: 5,
        info: 'Funktioniert, wenn <code>b</code> das Minimum ist.'
      },
      {
        data: ()=>{
          let a=$Exercise.random(-100,100);
          let b=a+$Exercise.random(1,100);
          let c=a+$Exercise.random(1,100)
          return {
            a:b, b:c, c:a
          };
        },  
        count: 5,
        info: 'Funktioniert, wenn <code>a</code> das Minimum ist.'
      },
    ],
    test: async (tc,init)=>{
      let a=tc.a;
      let b=tc.b;
      let c=tc.c;
      let m=await init.a.minimum(a,b,c);
      let soll=Math.min(a,b,c);
      return (m===soll);
    }
  },
  project: {
    name: "Minimum 3 Zahlen",
    clazzes: [{
      name: "Main",
      src: `int minimum (int a, int b, int c){
  //hierhin kommt der Code:
  
}
  
$void main(){
  int m = minimum(41, 13, 34);
  System.out.println( m );
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