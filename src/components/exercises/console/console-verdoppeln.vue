<template>
  <ExerciseBody :exercise="$data" :java="project">
    Schreibe das folgende Konsolenprogramm:
    <ol>
      <li>Der User soll eine beliebige ganze Zahl eingeben können.</li>
      <li>Das Programm soll die Zahl verdoppeln und das Ergebnis in der Konsole ausgeben.</li>
    </ol>
    <Hint>Die Ergebniszahl muss die letzte Ausgabe sein, die das Programm macht und sie muss in einer eigenen Zeile stehen.</Hint>
  </ExerciseBody>
</template>

<script>

export const data={
  id: "console-verdoppeln",
  title: "Das Verdopplungsprogramm",
  check: {
    init: async ()=>{
      return {};
    },
    testcases: [
        {
          data: ()=>{
            return {
              
            }
          },
          info: "Die eingegebene Zahl wird verdoppelt und ausgegeben."
        },
      ],
    test: async (tc,init)=>{
      for(let i=0;i<20;i++){
        $Exercise.clearConsole();
        let a=$Exercise.random(1,20);
        Console.overrideReadCommandsIndex=0;
        Console.overrideReadCommands=[a];
        await $main.main();
        let content=$Exercise.getConsoleContent();
        let ist=content[content.length-1].trimEnd();
        let soll=a*2+"";
        if(soll!==ist) return false;
      }
      return true;
    }
  },
  project: {
    clazzes: [
      {
        name: "Main",
        hiddenMethods: [
          {
            name: "$realMainMethod",
            jsCode: `async $realMainMethod(){
              if(window.isChecking) return;
              await this.main();
            }`
          }
        ],
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