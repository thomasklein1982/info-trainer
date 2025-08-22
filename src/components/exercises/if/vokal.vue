<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Methode <Code inline>boolean istVokal(String buchstabe)</Code> soll entscheiden, ob <Code inline>buchstabe</Code> ein Vokal ist oder nicht. Du darfst davon ausgehen, dass <Code inline>buchstabe</Code> auf jeden Fall ein einzelner kleiner Buchstabe von a bis z ist. Implementiere diese Methode.
    <Example>
      <ul>
        <li>istVokal("e") &rarr; <code>true</code></li>
        <li>istVokal("k") &rarr; <code>false</code></li>
      </ul>
    </Example>
  </ExerciseBody>
</template>

<script>

export const data={
  id: "vokal",
  title: "Vokal vs. Konsonant",
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
          return {vokal: true};
        },
        count: 5,
        info: 'Funktioniert für alle Vokale.'
      },
      {
        data: ()=>{
          return {vokal: false};
        },
        count: 21,
        info: 'Funktioniert für alle Konsonanten.'
      },
    ],
    test: async (tc,init)=>{
      let index=tc.$run.index;
      let letter;
      if(tc.vokal){
        letter=["a","e","i","o","u"][index];
      }else{
        letter=["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z"][index];
      }
      let ist=await init.a.istVokal(letter);
      let soll=tc.vokal;
      return (ist===soll);
    }
  },
  project: {
    name: "Vokale vs Konsonanten",
    clazzes: [{
      name: "Main",
      src: `boolean istVokal (String buchstabe){
  //hierhin kommt der Code:
  
}
  
$void main(){
  boolean v = istVokal("u");
  System.out.println( v );
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