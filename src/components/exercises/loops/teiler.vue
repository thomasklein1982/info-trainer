<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Methode <Code inline>void alleTeiler(int n)</Code> soll alle Teiler der Zahl <Code inline>n</Code> der Größe nach aufsteigend zeilenweise in der Konsole ausgeben (und sonst nichts). Implementiere diese Methode.
    <Example>
      <code>alleTeiler( 30 )</code> führt zur Ausgabe
      <ConsoleOutput>1
2
3
5
6
10
15
30
      </ConsoleOutput>

    </Example>
    <Hint>Du darfst davon ausgehen, dass <Code inline>n</Code> mindestens 1 ist.</Hint>
  </ExerciseBody>
</template>

<script>
export const data={
  id: "teiler",
  title: "Alle Teiler bestimmen",
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
                await a.alleTeiler(n);
                let out=$Exercise.getConsoleContent().join("\n").trim();
                $Exercise.clearConsole();
                for(let i=1;i<=n;i++){
                  if(n%i===0) System.out.println(i);
                }
                let out2=$Exercise.getConsoleContent().join("\n").trim();
                if(out===out2) return true;
                return "Fehler bei n = "+n;
              }
            };
          },
          count: 20,  
          info: 'Es werden alle Teiler ausgegeben.'
        }
      ],
    test: async (tc,init)=>{
      return await tc.check(init.a);
    }
  },
  project: {
    name: "Alle Teiler",
    clazzes: [{
      name: "Main",
      src: `$void alleTeiler (int n){
  //hierhin kommt der Code:
  
}
  
$void main(){
  alleTeiler(30);
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