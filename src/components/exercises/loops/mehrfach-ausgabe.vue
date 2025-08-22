<template>
  <ExerciseBody :exercise="$data" :project="project" :id="id" :java="project">
      Implementiere die Methode <Code inline>mehrfachAusgabe()</Code>, die 100 mal den Satz "Informatik ist cool!" in der Konsole ausgibt:
      <Code no-numbers>Informatik ist cool!
Informatik ist cool!
...
Informatik ist cool!</Code>
  </ExerciseBody>
</template>

<script>
export const data={
  id: "mehrfach-ausgabe",
  title: "Mehrfache Ausgabe",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {
        a: await $new(Main)
      }
    },
    testcases: [
        {
          info: 'Der Text "Informatik ist cool!" wird 100 mal ausgegeben.'
        }
      ],
    test: async (tc,init)=>{
      await System.console().clear();
      await init.a.mehrfachAusgabe();
      let r=$Exercise.getConsoleContent().join("\n").trim();
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
    clazzes: [{
      name: "Main",
      src: `$void mehrfachAusgabe(){
  ///hierhin kommt der Code:
  
}
  
$void main(){
  mehrfachAusgabe();
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