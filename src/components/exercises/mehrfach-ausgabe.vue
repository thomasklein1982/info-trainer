<template>
  <Exercise title="Mehrfach-Ausgabe" :exercise="$data" :project="project" :id="id">
    <template #exercise>
      Implementiere die Methode <Code inline>mehrfachAusgabe()</Code>, die 100 mal den Satz "Informatik ist cool!" in der Konsole ausgibt:
      <Code no-numbers>Informatik ist cool!
Informatik ist cool!
...
Informatik ist cool!</Code>
    </template>
  </Exercise>
</template>

<script>


export default{
  components: {
    
  },
  data() {
      return {
        id: "mehrfachausgabe",
        title: "Mehrfache Ausgabe",
        check: {
          init: async ()=>{
            return {
              a: await $new(MehrfachAusgabe)
            }
          },
          testcases: ()=>{
            return [
              {
                info: "Text wird so oft ausgegeben wie verlangt"
              }
            ]
          },
          test: async (tc,init)=>{
            await System.console().clear();
            await init.a.mehrfachAusgabe();
            let r=$Exercise.getConsoleContent();
            let t="";
            for(let i=0;i<100;i++){
              t+="Informatik ist cool!\n";
            }
            t=t.trim();
            return (r===t);
          }
        },
        project: {
          name: "Mehrfach-Ausgabe",
          clazzes: [
`class MehrfachAusgabe{
  void mehrfachAusgabe(){
    //hierhin kommt der Code
  }
}`
          ]
        }
      };
  },
}
</script>