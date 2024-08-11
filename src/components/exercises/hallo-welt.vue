<template>
  <ExerciseBody :exercise="$data">
      Implementiere die Methode <Code inline>halloWelt()</Code>, die den Satz <code>"Hallo Welt!"</code> in der Konsole ausgibt.
  </ExerciseBody>
</template>

<script>

export const data={
  id: "hallo-welt",
  title: "Hallo Welt!",
  check: {
    init: async ()=>{
      return {
        a: await $new(Aufgabe)
      }
    },
    testcases: ()=>{
      return [
        {
          info: "Der Text wird angezeigt."
        }
      ]
    },
    test: async (tc,init)=>{
      await System.console().clear();
      await init.a.halloWelt();
      let r=$Exercise.getConsoleContent();
      let t="Hallo Welt!";
      return (r===t);
    }
  },
  project: {
    name: "Mehrfach-Ausgabe",
    clazzes: [
`class Aufgabe{
  void halloWelt(){
    //hierhin kommt der Code
    
  }
}`
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