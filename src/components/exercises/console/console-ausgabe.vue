<template>
  <ExerciseBody :exercise="$data" :java="project">
    Schreibe ein Konsolenprogramm, das den folgenden Text in der Konsole ausgibt:
    <pre><code>Die erfolgreichsten Filme:
1. Avatar
2. Avengers
3. Titanic
    </code></pre>
  </ExerciseBody>
</template>

<script>

export const data={
  id: "console-ausgabe",
  title: "Die erfolgreichsten Filme",
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
              text: "Die erfolgreichsten Filme:",
            }
          },
          info: "Die erste Zeile wird richtig angezeigt."
        },
        {
          data: ()=>{
            return {
              line: 1,
              text: "1. Avatar",
            }
          },
          info: "Die zweite Zeile wird richtig angezeigt."
        },
        {
          data: ()=>{
            return {
              line: 2,
              text: "2. Avengers",
            }
          },
          info: "Die dritte Zeile wird richtig angezeigt."
        },
        {
          data: ()=>{
            return {
              line: 3,
              text: "3. Titanic",
            }
          },
          info: "Die vierte Zeile wird richtig angezeigt."
        },
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
  Console.printLine("Die erfolgreichsten ...");
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