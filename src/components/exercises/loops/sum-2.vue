<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Methode <Code inline>int quadratSumme(int von, int bis)</Code> soll alle Quadratzahlen von <Code inline>von²</Code> bis <Code inline>bis²</Code> addieren und das Ergebnis zurückgeben. 
    <Example>
      <Code inline>quadratSumme(3, 7)</Code> &rarr; 3² + 4² + 5² + 6² + 7² = 135
    </Example>
    Implementiere diese Methode.
    <Hint>Du darfst davon ausgehen, dass <Code inline>von</Code> immer kleiner oder gleich <Code inline>bis</Code> ist.</Hint>
  </ExerciseBody>
</template>

<script>
export const data={
  id: "sum-2",
  title: "Summe aller Quadratzahlen in einem Bereich",
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
                let von=$Exercise.random(1,10);
                let bis=von+$Exercise.random(0,20);
                let ist=await a.quadratSumme(von,bis);
                let soll=(bis*(bis+1)*(2*bis+1)-(von-1)*(von)*(2*von-1))/6;
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
      src: `int quadratSumme ( int von, int bis ){
  //hierhin kommt der Code:
  
}
  
$void main(){
  int s = quadratSumme( 3, 7 );
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