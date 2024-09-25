<template>
  <ExerciseBody :exercise="$data" :java="project">
    <p>Eine <em>Permutation</em> einer Zeichenkette entsteht dadurch, dass die Zeichen der Zeichenkette in eine andere Reihenfolge gebracht werden. Z. B. sind "cab" und "bca" Permutationen von "abc".</p>

    Die Methode <Code inline>void permutationen(String s)</Code>
    soll alle Permutationen von <Code inline>s</Code> zeilenweise in der Konsole ausgeben (die Reihenfolge ist egal).
    <Example>
      <code>permutationen( "abc" )</code> sollte zum Beispiel zu folgender Ausgabe führen:
      <ConsoleOutput>
        abc
        acb
        bac
        bca
        cab
        cba
      </ConsoleOutput>
    </Example>
    <p>Implementiere diese Methode ohne Verwendung von Schleifen.</p>
    <Hint>Du darfst davon ausgehen, dass alle Zeichen von <Code inline>s</Code> verschieden sind.</Hint>
  </ExerciseBody>
</template>

<script>
//TODO: WIP

export const data={
  id: "permutations",
  title: "Permutationen ausgeben",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {a: await $new(Aufgabe)};
    },
    solve: (s)=>{
      if(s.length===1) return [s];
      if(s.length===0) return [];
      let c=s.charAt(0);
      let array2=this.solve(s.substring(1));
      let array=[];//laenge array2.length
      for(let i=0;i<array2.length;i++){
        let w=array2[i];
        //array.push(w.);
      }
      System.out.println(s);

      for(let i=0;i<s.length;i++){
        let c=s.charAt(i);
        let s1=s.substring(0,)
      }
    },
    test: async (tc,init)=>{
      let n;
      if(tc.leer){
        n=0;
      }else{
        n=tc.$run.index+1;
      }
      let start=$Exercise.random(65,80);
      let s="";
      for(let i=0;i<n;i++){
        s+=String.fromCodePoint(i+start);
      }
      await a.permutationen(s);
      let out=$Exercise.getConsoleContent();

    },
    testcases: [
      {
        data: ()=>{
          return {
            leer: true
          }
        },
        count: 1,
        info: "Die Methode funktioniert für einen leeren String.",
      },
      {
        data: ()=>{
          return {
            
          }
        },
        count: 5,
        info: "Die Methode funktioniert für nicht-leere Strings.",
      },
    ]
  },

  project: {
    name: "Permutationen",
    constraints: {
      java: {
        loops: true
      }
    },
    clazzes: [
      {
        name: "Aufgabe",
        src: `void permutationen( String s ){
  //hierhin kommt der Code:
  
}

$void main(){
  permuationen ( "abc" );
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