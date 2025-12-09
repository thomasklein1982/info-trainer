<template>
  <ExerciseBody :exercise="$data" :java="project">
    <p>Schreibe ein Konsolenprogramm, bei dem der User die Stromstärke und die Spannung eingeben kann und das anschließend den Widerstand berechnet und das Ergebnis ausgibt.</p>
    <p>Das Ganze soll folgendermaßen aussehen:</p>
<ConsoleOutput>**************
* Widerstand *
**************
Gib die Stromstärke ein: <span style="color: red">2.5</span>
Gib die Spannung ein: <span style="color: red">12.5</span>

Widerstand: 5
</ConsoleOutput>
    <p>Die Stromstärke und die Spannung (die rot hervorgehobenen Zahlen) soll der User selbst eingeben können.</p>
    <Hint class="only-print">Es gilt Spannung = Widerstand &sdot; Stromstärke (U = R &sdot; I)</Hint> 
  </ExerciseBody>
</template>

<script>

export const data={
  id: "console-widerstand",
  title: "Elektrischer Widerstand",
  cheats: ["console"],
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
              text: "**************",
              line: 1
            }
          },
          info: "Zeile 1 wird ausgegeben: '**************' (14 Sternchen)",
          points: 0.5
        },
        {
          data: ()=>{
            return {
              text: "* Widerstand *",
              line: 2
            }
          },
          info: "Zeile 2 wird ausgegeben: '* Widerstand *'",
          points: 0.5
        },
        {
          data: ()=>{
            return {
              text: "**************",
              line: 3
            }
          },
          info: "Zeile 3 wird ausgegeben: '**************' (14 Sternchen)",
          points: 0.5
        },
        {
          data: ()=>{
            return {
              text: "Gib die Stromstärke ein: $0",
              line: 4,
              replace: true
            }
          },
          info: "Zeile 4 wird ausgegeben: 'Gib die Stromstärke ein: ...'"
        },
        {
          data: ()=>{
            return {
              text: "Gib die Spannung ein: $1",
              line: 5,
              replace: true
            }
          },
          info: "Zeile 5 wird ausgegeben: 'Gib die Spannung ein: ...'"
        },
        {
          data: ()=>{
            return {
              text: "",
              line: 6
            }
          },
          info: "Zeile 6 ist leer",
          points: 0.5
        },
        {
          data: ()=>{
            return {
              text: "Widerstand: $2",
              line: 7,
              replace: true
            }
          },
          info: "Zeile 7 wird ausgegeben: 'Widerstand: ...'"
        }
      ],
    test: async (tc,init)=>{
      let preise=[0.3,0.8,2.49];
      let vars=[];
      //werte: I und U
      for(let i=0;i<2;i++){
        vars.push($Exercise.random(10,1000)*0.1);
      }
      //widerstand R
      vars.push(vars[1]/vars[0]);
      Console.overrideReadCommandsIndex=0;
      Console.overrideReadCommands=[vars[0],vars[1]];
      await System.console().clear();
      await init.a.main();
      let output=$Exercise.getConsoleContent();
      //console.log("output",output);
      if(tc.text!==undefined){
        let i=tc.line-1;
        //console.log(i);
        if(i>=output.length) return false;
        let out=output[i].trim();
        let line=tc.text.trim();
        if(tc.replace){
          for(let i=0;i<vars.length;i++){
            line = line.replace(new RegExp("\\$"+i,"g"), vars[i]);
          }
        }
        //console.log(out,line, tc.text);
        return line===out;
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