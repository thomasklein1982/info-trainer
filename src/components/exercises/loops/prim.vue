<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Methode <Code inline>boolean istPrimzahl(int n)</Code> soll entscheiden, ob die Zahl <Code inline>n</Code> eine Primzahl ist (<Code inline>true</Code>) oder nicht (<Code inline>false</Code>). Implementiere diese Methode.
    <Example>
      <ul>
        <li>istPrimzahl(18) &rarr; false (Zahl ist durch 2 teilbar)</li>
        <li>istPrimzahl(23) &rarr; true (Zahl ist nur durch 1 und 23 teilbar)</li>
        <li>istPrimzahl(1) &rarr; false (Die Zahl 1 ist nach Definition keine Primzahl)</li>
      </ul>
    </Example>
    <Hint>Du darfst davon ausgehen, dass <Code inline>n</Code> mindestens 1 ist.</Hint>
  </ExerciseBody>
</template>

<script>

export const data={
  id: "prim",
  title: "Primzahl-Check",
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
            return {
              n: [2,3,5,7,11,13,37,89,101,151,239,769,1259,2399,6563,9007,20887],
              prime: true
            };
          },
          count: 1,  
          info: 'Funktioniert für Primzahlen.'
        },
        {
          data: ()=>{
            return {
              n: [1,4],
              prime: false
            };
          },
          count: 1,  
          info: 'Funktioniert für Zahlen, die keine Primzahlen sind.'
        },
      ],
    test: async (tc,init)=>{
      let soll=tc.prime;
      for(let i=0;i<tc.n.length;i++){
        let n=tc.n[i];
        let ist=await init.a.istPrimzahl(n);
        if(ist!==soll) return false;
      }
      if(!soll){
        for(let i=0;i<20;i++){
          let n=$Exercise.random(2,100)*$Exercise.random(2,100);
          let ist=await init.a.istPrimzahl(n);
          if(ist!==soll) return false;
        }
      }
      return true;
    }
  },
  project: {
    name: "Primzahl oder nicht?",
    clazzes: [{
      name: "Main",
      src: `boolean istPrimzahl (int n){
  //hierhin kommt der Code:
  
}
  
$void main(){
  boolean g = istPrimzahl(17);
  System.out.println( g );
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