<template>
  <ExerciseBody :exercise="$data" :java="project">
    Schreibe ein Konsolenprogramm, das das folgende Bild in der Konsole ausgibt:
<ConsoleOutput> () ()
 (-.-)
<{   }>
(") (")</ConsoleOutput>
  </ExerciseBody>
</template>

<script>

export const data={
  id: "console-ascii",
  cheats: ["console"],
  title: "ASCII-Art",
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
            line: 0,
            text: " () ()",
          }
        },
        info: "Die erste Zeile (die Ohren) wird richtig angezeigt."
      },
      {
        data: ()=>{
          return {
            line: 1,
            text: " (-.-)",
          }
        },
        info: "Die zweite Zeile (das Gesicht) wird richtig angezeigt."
      },
      {
        data: ()=>{
          return {
            line: 2,
            text: "<{   }>",
          }
        },
        info: "Die dritte Zeile (Körper und Arme) wird richtig angezeigt."
      },
      {
        data: ()=>{
          return {
            line: 3,
            text: "(\") (\")",
          }
        },
        info: "Die vierte Zeile (die Füße) wird richtig angezeigt."
      }
    ],
    test: async (tc,init)=>{
      await System.console().clear();
      await init.a.main();
      let ist=$Exercise.getConsoleContent()[tc.line].trimEnd();
      let soll=tc.text;
      return (soll===ist);
    }
  },
  project: {
    clazzes: [
      {
        name: "Main",
        src: `$void main(){
  //hierhin kommt der Code:
  
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