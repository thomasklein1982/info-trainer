<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Methode <Code inline>boolean istGross(String wort)</Code> soll prüfen, ob das Wort mit einem Großbuchstaben anfängt oder nicht. Du darfst davon ausgehen, dass das Wort nur aus Buchstaben besteht. Implementiere diese Methode.
    <Example>
      <ul>
        <li>istGross("Informatik") &rarr; <code>true</code>></li>
        <li>istGross("cool") &rarr; <code>false</code></li>
      </ul>
    </Example>
  </ExerciseBody>
</template>

<script>
export const data={
  id: "uppercase",
  cheats: ["string"],
  title: "Beginnt mit Großbuchstabe?",
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
            return {gross: true};
          },  
          info: 'Klappt für Wörter, die mit einem Großbuchstaben beginnen.'
        },
        {
          data: ()=>{
            return {gross: false};
          },
          info: 'Klappt für Wörter, die mit einem kleinen Buchstaben beginnen.'
        },
      ],
    test: async (tc,init)=>{
      let wort="";
      let n=$Exercise.random(1,7);
      for(let i=0;i<n;i++){
        wort+=String.fromCodePoint(97+$Exercise.random(0,25));
      }
      if(tc.gross) wort=wort.charAt(0).toUpperCase()+wort.substring(1);
      let ist=await init.a.istGross(wort);
      let soll=tc.gross;
      return (ist===soll);
    }
  },
  project: {
    name: "Beginn gross",
    clazzes: [{
      name: "Main",
      src: `boolean istGross (String wort){
  //hierhin kommt der Code:
  
}
  
$void main(){
  boolean g = istGross("Info");
  System.out.println( g );
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