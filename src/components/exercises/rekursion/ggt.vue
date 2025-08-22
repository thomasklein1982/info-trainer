<template>
  <ExerciseBody :exercise="$data" :java="project">
    <p>Der größte gemeinsame Teiler (ggT) zweier natürlicher Zahlen n und m ist die größte natürliche Zahl, durch die man sowohl n als auch m glatt teilen kann. Euklid von Alexandria ersann vor über 2000 Jahren den folgenden euklidischen Algorithmus:</p>
    <ol>
      <li>Gegeben: Zwei natürliche Zahlen n und m &ge; 1</li>
      <li>Berechne den Rest r der Division von n : m.</li>
      <li>Falls r = 0: Fertig, das Ergebnis ist m.</li>
      <li>Setze n auf m und m auf r.</li>
      <li>Zurück zu Schritt 2.</li>
    </ol>

    Implementiere die Methode <Code inline>int ggT(int n, int m)</Code>
    die den ggT von <Code inline>n</Code> und <Code inline>m</Code> zurückgibt.
    <Example>
      <ul>
        <li><code>ggT ( 6, 8 )</code> &rarr; 2</li>
        <li><code>ggT ( 42, 12 )</code> &rarr; 6</li>
      </ul>
    </Example>
    <p>Implementiere diese Methode ohne Verwendung von Schleifen.</p>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "ggt",
  title: "Der größte gemeinsame Teiler (rekursiv)",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {a: await $new(Aufgabe)};
    },
    test: async (tc,init)=>{
      let g=$Exercise.random(1,20);
      let n=$Exercise.random(1,1000)*g;
      let m=$Exercise.random(1,1000)*g;
      let ist=await init.a.ggT(n,m);
      let soll;
      let N=n;
      let M=m;
      let r;
      do{
        r=n%m;
        n=m;
        m=r;
      }while(r>0);
      soll=n;
      if(soll===ist) return true;
      throw "Problem bei n = "+N +" und m = "+M;
    },
    testcases: [
        {
          data: ()=>{
            return {
              
            }
          },
          count: 20,
          info: "Die Methode funktioniert.",
        }
      ]
  },

  project: {
    name: "ggt",
    constraints: {
      java: {
        loops: true
      }
    },
    clazzes: [
      {
        name: "Aufgabe",
        src: `int ggT( int n, int m ){
  //hierhin kommt der Code:
  
}

$void main(){
  int g = ggT ( 42, 12 );
  System.out.println(g);
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