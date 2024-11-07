<template>
  <ExerciseBody :exercise="$data" :java="project">
      Die Methode <Code inline>int summe(int[] array)</Code>
      soll alle Elemente des Arrays addieren und die Summe zurückgeben.
      <Example>
        summe([3,5,-1]) ergibt 3 + 5 + (-1) = 7 
      </Example>
      <p>Implementiere diese Methode.</p>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "array-summe",
  title: "Summe aller Zahlen im Array",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {a: await $new(Aufgabe)};
    },
    test: async (tc,init)=>{
      let N;
      if(tc.length!==undefined){
        N=tc.length;
      }else{
        N=$Exercise.random(7,15);
      } 
      let array=$Exercise.getRandomIntArray(N);
      let sum=0;
      for(let i=0;i<array.length;i++){
        sum+=array[i];
      }
      $Exercise.clearConsole();
      let ist=await init.a.summe(array);
      return ist===sum;
    },
    testcases: [
        {
          data: ()=>{
            return {
              length: 0
            }
          },
          info: "Methode funktioniert für leere Arrays.",
        },
        {
          data: ()=>{
            return {
            }
          },
          points: 9,
          count: 10,
          info: "Methode funktioniert für nicht-leere Arrays.",
        },
      ]
  },

  project: {
    name: "Array-Summe",
    clazzes: [
      {
        name: "Aufgabe",
        src: `int summe(int[] array){
  //hierhin kommt der Code:
  
}

$void main(){
  int s = summe(new int[]{3, 5, -1}); 
  System.out.println(s);
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