<template>
  <ExerciseBody :exercise="$data" :java="project">
    <p>Die <em>Fakultät von n</em> ist das Produkt aller Zahlen von 1 bis n, d.h.
      <div>1 &sdot; 2 &sdot; 3 &sdot; 4 &sdot; ... &sdot; n</div>
    </p>

    Die Methode <Code inline>int fakultaet(int n)</Code>
    soll die Fakultät von <Code inline>n</Code> berechnen und zurückgeben (<Code inline>n</Code> &ge; 1).
    <Example>
      <code>fakultaet( 5 )</code> &rarr; 120 (1 &sdot; 2 &sdot; 3 &sdot; 4 &sdot; 5 = 120)
    </Example>
    <p>Implementiere diese Methode ohne Verwendung von Schleifen.</p>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "fakultaet",
  title: "Fakultät",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {a: await $new(Aufgabe)};
    },
    test: async (tc,init)=>{
      let n=tc.$run.index+1;
      let soll=1;
      for(let i=2;i<=n;i++){
        soll*=i;
      }
      let ist=await init.a.fakultaet(n);
      if(soll===ist) return true;
      throw "Problem bei n = "+n;
    },
    testcases: [
        {
          data: ()=>{
            return {
              
            }
          },
          count: 13,
          info: "Die Methode funktioniert.",
        }
      ]
  },

  project: {
    name: "Fakultaet",
    constraints: {
      java: {
        loops: true
      }
    },
    clazzes: [
      {
        name: "Aufgabe",
        src: `int fakultaet( int n ){
  //hierhin kommt der Code:
  
}

$void main(){
  int f = fakultaet ( 5 );
  System.out.println(f);
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