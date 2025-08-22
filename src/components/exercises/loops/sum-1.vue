<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Methode <Code inline>int summe(int n)</Code> soll alle Zahlen von 1 bis <Code inline>n</Code> addieren und das Ergebnis zurückgeben. 
    <Example>
        <Code inline>summe(6)</Code> &rarr; 21 (1 + 2 + 3 + 4 + 5 + 6 = 21)
    </Example>
    Implementiere diese Methode.
    <Hint>Du darfst davon ausgehen, dass <Code inline>n</Code> mindestens 1 ist.</Hint>
  </ExerciseBody>
</template>

<script>
export const data={
  id: "sum-1",
  title: "Summe aller Zahlen bis n",
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
              check: async (a)=>{
                let n=$Exercise.random(1,1000);
                let ist=await a.summe(n);
                let soll=n*(n+1)/2;
                if(soll===ist) return true;
                return "Fehler bei n = "+n;
              }
            };
          },
          count: 20,  
          info: 'Die Summe wird korrekt berechnet und zurückgegeben.'
        }
      ],
    test: async (tc,init)=>{
      return await tc.check(init.a);
    }
  },
  project: {
    name: "Summe",
    clazzes: [{
      name: "Main",
      src: `int summe (int n){
  //hierhin kommt der Code:
  
}
  
$void main(){
  int s = summe(6);
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