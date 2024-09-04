<template>
  <ExerciseBody :exercise="$data" :java="project">
    Bei einem Freizeitpark kostet der Eintritt für Erwachsene 17 € und für Kinder 25 €.
    <p>Die Methode <Code inline>int gesamtPreis(int e, int k)</Code> soll den Eintrittspreis für <Code inline>e</Code> Erwachsene und <Code inline>k</Code> Kinder berechnen und zurückgeben.</p>
    <Example>
      Für e = 3 und k = 5 ergeben sich 176 €.
    </Example>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "preis",
  title: "Eintritt für den Freizeitpark",
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
            check: (e,k,ist)=>{
              let soll=e*17+k*25;
              return soll===ist;
            }
          };
        },
        count: 50,
        info: "Funktioniert für beliebige Anzahlen von Erwachsenen und Kindern."
      }
    ],
    test: async (tc,init)=>{
      
      let e=$Exercise.random(0,10)*10;
      let k=$Exercise.random(0,10)*10;
      let ist = await init.a.gesamtPreis(e,k);
      return tc.check(e,k,ist);
    }
  },
  project: {
    clazzes: [
      {
        name: "Main",
        src: `int gesamtPreis(int e, int k){
  //hierhin kommt der Code:
  
}
  
$void main(){
  int preis = gesamtPreis(3,5);
  System.out.println( preis );
}`
      }
    ]
  }
};

export default{
  components: {
    
  },
  data() {
      return data;
  },
}
</script>