<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Methode <Code inline>boolean istGerade(int n)</Code> soll entscheiden, ob die Zahl <Code inline>n</Code> gerade ist (<Code inline>true</Code>) oder ungerade (<Code inline>false</Code>). Implementiere diese Methode.
    <Example>
      <ul>
        <li>istGerade(18) &rarr; true</li>
        <li>istGerade(307) &rarr; false</li>
      </ul>
    </Example>
  </ExerciseBody>
</template>

<script>
export const data={
  id: "even",
  title: "Gerade oder Ungerade",
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
              n: $Exercise.random(0,2000)*2
            };
          },
          count: 20,  
          info: 'Funktioniert für gerade Zahlen.'
        },
        {
          data: ()=>{
            return {
              n: $Exercise.random(0,2000)*2+1
            };
          },
          count: 20,  
          info: 'Funktioniert für ungerade Zahlen.'
        },
      ],
    test: async (tc,init)=>{
      let n=tc.n;
      let ist=await init.a.istGerade(n);
      let soll=n%2===0;
      return (ist===soll);
    }
  },
  project: {
    name: "Gerade oder Ungerade",
    clazzes: [{
      name: "Main",
      src: `boolean istGerade (int n){
  //hierhin kommt der Code:
  
}
  
$void main(){
  boolean g = istGerade(17);
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