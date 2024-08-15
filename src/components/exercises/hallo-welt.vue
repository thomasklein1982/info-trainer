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
      $Exercise.deleteMain();
      return {
        a: await $new(Aufgabe)
      }
    },
    testcases: [
        {
          info: "Der Text 'Hallo Welt!' wird angezeigt."
        }
      ],
    test: async (tc,init)=>{
      await System.console().clear();
      await init.a.halloWelt();
      let r=$Exercise.getConsoleContent().join("\n").trim();
      let t="Hallo Welt!";
      return (r===t);
    }
  },
  project: {
    clazzes: [
      {
        name: "Aufgabe",
        src: `$void halloWelt(){
          //hierhin kommt der Code
      
        }`,
        main: `Aufgabe a = new Aufgabe();\na.halloWelt();`,
        onStart: `halloWelt();`
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