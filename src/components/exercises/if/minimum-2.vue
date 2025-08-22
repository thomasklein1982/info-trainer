<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Methode <Code inline>int minimum(int a, int b)</Code> soll das Minimum der beiden Zahlen (die Kleinere der beiden Zahlen) zurückgeben. Implementiere diese Methode.
    <Example>
      <ul>
        <li>minimum(19, 3) &rarr; 3</li>
        <li>minimum(4, 4) &rarr; 4</li>
      </ul>
    </Example>
  </ExerciseBody>
</template>

<script>
export const data={
  id: "minimum-2",
  title: "Minimum von 2 Zahlen",
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
            return {
              a, b
            };
          },  
          count: 3,
          info: 'Funktioniert, wenn <code>a</code> kleiner als <code>b</code> ist.'
        },
        {
          data: ()=>{
            let b=$Exercise.random(-100,100);
            let a=b+$Exercise.random(1,100);
            return {
              a, b
            };
          },  
          count: 3,
          info: 'Funktioniert, wenn <code>b</code> kleiner als <code>a</code> ist.'
        },
        {
          data: ()=>{
            let a=$Exercise.random(-100,100);
            let b=a;
            return {
              a, b
            };
          },  
          count: 3,
          info: 'Funktioniert, wenn <code>a</code> und <code>b</code> gleich sind.'
        },
      ],
    test: async (tc,init)=>{
      let a=tc.a;
      let b=tc.b;
      let m=await init.a.minimum(a,b);
      let soll=Math.min(a,b);
      return (m===soll);
    }
  },
  project: {
    name: "Minimum von 2",
    clazzes: [{
      name: "Main",
      src: `int minimum (int a, int b){
  //hierhin kommt der Code:
  
}
  
$void main(){
  int m = minimum(9,6);
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