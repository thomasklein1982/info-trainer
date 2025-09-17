<template>
  <ExerciseBody :exercise="$data" :java="project">
    Schreibe das folgende Konsolenprogramm:
    <ol>
      <li>Der User soll eine beliebige ganze Zahl eingeben können.</li>
      <li>Das Programm soll die Zahl verdoppeln und das Ergebnis in der Konsole ausgeben.</li>
    </ol>
    <p>Das Ganze soll folgendermaßen aussehen:</p>
<ConsoleOutput>Gib eine ganze Zahl ein: <span style="color: red">17</span>

Das Doppelte der Zahl ist: 34
</ConsoleOutput>
    <p>Die rot hervorgehobene Zahl soll der User selbst eingeben können.</p>
  </ExerciseBody>
</template>

<script>

export const data={
  id: "console-verdoppeln",
  title: "Das Verdopplungsprogramm",
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
              text: "Gib eine ganze Zahl ein: $0",
              line: 1,
              replace: true
            }
          },
          info: "Zeile 1 wird ausgegeben: 'Gib eine ganze Zahl ein: ...'"
        },
        {
          data: ()=>{
            return {
              text: "",
              line: 2
            }
          },
          info: "Zeile 2 ist leer"
        },
        {
          data: ()=>{
            return {
              text: "Das Doppelte der Zahl ist: $1",
              line: 3,
              replace: true
            }
          },
          info: "Zeile 3 wird ausgegeben: 'Das Doppelte der Zahl ist: ...'"
        }
      ],
    test: async (tc,init)=>{
      let vars=[];
      vars.push($Exercise.random(-10,10));
      vars.push(vars[0]*2);
      Console.overrideReadCommandsIndex=0;
      Console.overrideReadCommands=[vars[0]];
      await System.console().clear();
      await init.a.main();
      let output=$Exercise.getConsoleContent();
      //console.log("output",output);
      if(tc.text!==undefined){
        let i=tc.line-1;
        console.log(i);

        if(i>=output.length) return false;
        let out=output[i].trim();
        let line=tc.text.trim();
        if(tc.replace){
          for(let i=0;i<vars.length;i++){
            line = line.replace(new RegExp("\\$"+i,"g"), vars[i]);
          }
        }
        console.log(out,line, tc.text);
        return line===out;
      }
      return true;
    }
    // testcases: [
    //     {
    //       data: ()=>{
    //         return {
              
    //         }
    //       },
    //       info: "Die eingegebene Zahl wird verdoppelt und ausgegeben."
    //     },
    //   ],
    // test: async (tc,init)=>{
    //   for(let i=0;i<20;i++){
    //     $Exercise.clearConsole();
    //     let a=$Exercise.random(1,20);
    //     Console.overrideReadCommandsIndex=0;
    //     Console.overrideReadCommands=[a];
    //     await $main.main();
    //     let content=$Exercise.getConsoleContent();
    //     let ist=content[content.length-1].trimEnd();
    //     let soll=a*2+"";
    //     if(!ist.endsWith(soll)) return false;
    //   }
    //   return true;
    // }
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