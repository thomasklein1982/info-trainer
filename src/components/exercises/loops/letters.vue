<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Methode <Code inline>void zeilenweise(String text)</Code> soll den String <Code inline>text</Code> Zeichen für Zeichen untereinander in der Konsole ausgeben. Implementiere diese Methode.
    <Example>
      <code>zeilenweise( "Hallo" )</code> führt zur Ausgabe
      <ConsoleOutput>H
a
l
l
o
      </ConsoleOutput>

    </Example>
  </ExerciseBody>
</template>

<script>
import ConsoleOutput from '../../console-output.vue';

export const data={
  id: "letters",
  cheats: ["string"],
  title: "Zeile für Zeile",
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
            
          };
        },
        count: 20,  
        info: 'Die Methode funktioniert.'
      }
    ],
    test: async (tc,init)=>{
      let text=$Exercise.getRandomString($Exercise.random(5,20));
      await init.a.zeilenweise(text);
      let ist=$Exercise.getConsoleContent().join("\n").trim();
      let soll=text.split("").join("\n").trim();
      return ist===soll;
    }
  },
  project: {
    name: "Text buchstabenweise ausgeben",
    clazzes: [{
      name: "Main",
      src: `$void zeilenweise (String text){
  //hierhin kommt der Code:
  
}
  
$void main(){
  zeilenweise("Hallo");
}`
    }
    ]
  }
}

export default{
  components: {
    ConsoleOutput
  },
  data() {
      return data;
  },
}
</script>