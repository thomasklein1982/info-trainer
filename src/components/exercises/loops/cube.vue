<template>
  <ExerciseBody :exercise="$data" :java="project">
    Implementiere die Methode <Code inline>void printKubikzahlen(int n)</Code>. Diese soll alle Kubikzahlen von <Code inline>1</Code> bis <Code inline>n</Code> in folgender Form ausgeben (Beispiel für <code>n = 5</code>):
    <ConsoleOutput>Dies sind alle Kubikzahlen von 1 bis 5:
1 hoch 3 = 1
2 hoch 3 = 2
3 hoch 3 = 27
4 hoch 3 = 64
5 hoch 3 = 125</ConsoleOutput> 
  </ExerciseBody>
</template>

<script>
export const data={
  id: "cube",
  title: "Liste der Kubikzahlen",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {
        a: await $new(Main),
        ns: $Exercise.randomFrom($Exercise.getRange(1,100),10)
      }
    },
    testcases: [
        {
          info: 'Zeile 1 "Dies sind alle Kubikzahlen von 1 bis ...:" wird richtig ausgegeben.',
          data: ()=>{
            return {
              check: async (out,n)=>{
                let ist=out[0].toLowerCase();
                let soll="dies sind alle kubikzahlen von 1 bis "+n+":";
                return ist===soll;
              }
            };
          },
          count: 3,
        },
        {
          info: 'Die übrigen Zeilen der Form "... hoch 3 = ..." werden richtig ausgegeben.',
          points: 3,
          data: ()=>{
            return {
              check: async (out,n)=>{
                if(out.length!==n+1) return "Falsche Zeilenanzahl in der Ausgabe";
                for(let i=1;i<=n;i++){
                  let ist=out[i].trim().toLowerCase();
                  let soll=i+" hoch 3 = "+(i*i*i);
                  if(ist!==soll) return false;
                }
                return true;
              }
            };
          },
          count: 10,
        }
      ],
    test: async (tc,init)=>{
      let n=init.ns[tc.$run.index];
      await System.console().clear();
      await init.a.printKubikzahlen(n);
      let output=$Exercise.getConsoleContent();
      return await tc.check(output,n);
    }
  },
  project: {
    name: "Kubikzahlen",
    clazzes: [{
      name: "Main",
      src: `void printKubikzahlen ( int n ){
  //hierhin kommt der Code:
  
}
  
$void main(){
  printKubikzahlen( 8 );
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