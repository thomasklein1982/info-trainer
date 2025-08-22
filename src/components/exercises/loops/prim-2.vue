<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Methode <Code inline>void allePrimzahlen(int n)</Code> soll nacheinander alle Primzahlen im Bereich von 2 bis <Code inline>n</Code> ausgeben (von klein nach groß). Implementiere diese Methode.
    <Example>
      <Code inline>allePrimzahlen ( 30 )</Code> soll die folgende Ausgae liefern:
      <ConsoleOutput>
        2
        3
        5
        7
        11
        13
        17
        19
        23
        29
      </ConsoleOutput>
    </Example>
  </ExerciseBody>
</template>

<script>
export const data={
  id: "prim-2",
  title: "Alle Primzahlen",
  check: {
    init: async ()=>{
      
    },
    testcases: [
        {
          data: ()=>{
            return {
              n: [1,2,3,1000]
            };
          },
          count: 4,  
          info: 'Es werden alle Primzahlen (und sonst keine!) ausgegeben.'
        }
      ],
    test: async (tc,init)=>{
      $Exercise.clearConsole();
      let numbers=[];
      let n=tc.n[tc.$run.index];
      for(let i=2;i<=n;i++){
        numbers.push(i);
      }
      for(let i=0;i<numbers.length;i++){
        let x=numbers[i];
        if(x<0) continue;
        System.out.println(x);
        for(let j=i;j<=n;j+=x){
          numbers[j]=-1;
        }
      }
      let soll=$Exercise.getConsoleContent().join(" ").trim();
      $Exercise.clearConsole();
      await $main.allePrimzahlen(n);
      let ist=$Exercise.getConsoleContent().join(" ").trim();
      return soll===ist;
    }
  },
  project: {
    name: "Alle-Primzahlen",
    clazzes: [{
      name: "Main",
      src: `void allePrimzahlen (int n){
  //hierhin kommt der Code:
  
}
  
$void main(){
  allePrimzahlen(30);
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