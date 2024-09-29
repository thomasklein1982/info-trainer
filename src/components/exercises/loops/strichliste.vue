<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Methode <Code inline>void strichliste(int n)</Code> soll eine Strichliste der Länge <Code inline>n</Code> (aus großen "I"s, siehe Beispiele) in der Konsole ausgeben. 
    <Example>
        strichliste(6) führt zur Ausgabe
      <ConsoleOutput>IIIIII</ConsoleOutput>
    </Example>
    Implementiere diese Methode.
    <Hint>Du darfst davon ausgehen, dass <Code inline>n</Code> mindestens 0 ist.</Hint>
    <Hint> Mit <Code inline>System.out.print(...)</Code> kannst du etwas in der Konsole ausgeben, ohne dass ein Zeilenumbruch gemacht wird.</Hint>
  </ExerciseBody>
</template>

<script>
export const data={
  id: "strichliste",
  title: "Strichliste",
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
              check: async (n,a)=>{
                await a.strichliste(n);
                let out=$Exercise.getConsoleContent().join("\n").trim();
                $Exercise.clearConsole();
                let t="";
                for(let i=1;i<=n;i++){
                  t+="I";
                }
                if(out===t) return true;
                return "Fehler bei n = "+n;
              }
            };
          },
          count: 20,  
          info: 'Es werden alle Teiler ausgegeben.'
        }
      ],
    test: async (tc,init)=>{
      return await tc.check(tc.$run.index,init.a);
    }
  },
  project: {
    name: "Strichliste",
    clazzes: [{
      name: "Main",
      src: `$void strichliste (int n){
  //hierhin kommt der Code:
  
}
  
$void main(){
  strichliste(5);
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