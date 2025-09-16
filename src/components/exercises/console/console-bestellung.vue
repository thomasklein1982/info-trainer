<template>
  <ExerciseBody :exercise="$data" :java="project">
    <p>In dem Online-Shop "Office-Ware" werden folgende Dinge verkauft:
      <ol>
        <li>Buntstifte für 0,30 € pro Stück</li>
        <li>Kugelschreiber für 0,80 € pro Stück</li>
        <li>Collegeblöcke für 2,49 € pro Stück</li>
      </ol>
    </p>
    
    Schreibe ein Konsolenprogramm, bei dem der User angeben kann, wie viele Buntstifte, wie viele Kugelschreiber und wie viele Collegeblöcke er*sie bestellen möchte und das daraufhin eine Übersicht der Bestellung erstellt. Das Ganze soll folgendermaßen aussehen:
<ConsoleOutput>Willkommen bei Office-Ware.

Geben Sie an, wie viele Artikel Sie bestellen wollen:
Buntstifte: <span style="color: red">8</span>
Kugelschreiber: <span style="color: red">2</span>
Collegeblöcke: <span style="color: red">0</span>

*****

Sehr geehrter Kunde,

wir bestätigen die folgende Bestellung:

ARTIKEL ANZAHL EINZELPREIS PREIS
Buntstifte 8 0.3€ 2.4€
Kugelschreiber 2 0.8€ 1.6€
Collegeblöcke 0 2.49€ 0€ 

Gesamtbetrag: 4€

*****
</ConsoleOutput>
  <p>Die rot hervorgehobenen Zahlen soll der User selbst eingeben können.</p>
  </ExerciseBody>
</template>

<script>

export const data={
  id: "console-bestellung",
  title: "Bestellbestätigung",
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
              text: "Willkommen bei Office-Ware.",
              line: 1
            }
          },
          info: "Zeile 1 wird ausgegeben: 'Willkommen bei Office-Ware.'"
        },
        {
          data: ()=>{
            return {
              text: "",
              line: 2
            }
          },
          info: "Zeile 2 ist leer."
        },
        {
          data: ()=>{
            return {
              text: "Geben Sie an, wie viele Artikel Sie bestellen wollen:",
              line: 3
            }
          },
          info: "Zeile 3 wird ausgegeben: 'Geben Sie an, wie viele Artikel Sie bestellen wollen:'"
        },
        {
          data: ()=>{
            return {
              text: "Buntstifte: $0",
              line: 4,
              replace: true
            }
          },
          info: "Zeile 4 wird ausgegeben: 'Buntstifte: ...'"
        },
        {
          data: ()=>{
            return {
              text: "Kugelschreiber: $1",
              line: 5,
              replace: true
            }
          },
          info: "Zeile 5 wird ausgegeben: 'Kugelschreiber: ...'"
        },
        {
          data: ()=>{
            return {
              text: "Collegeblöcke: $2",
              line: 6,
              replace: true
            }
          },
          info: "Zeile 6 wird ausgegeben: 'Collegeblöcke: ...'"
        },
        {
          data: ()=>{
            return {
              text: "",
              line: 7
            }
          },
          info: "Zeile 7 ist leer."
        },
        {
          data: ()=>{
            return {
              text: "*****",
              line: 8
            }
          },
          info: "Zeile 8 wird ausgegeben: '*****'"
        },
        {
          data: ()=>{
            return {
              text: "",
              line: 9
            }
          },
          info: "Zeile 9 ist leer."
        },
        {
          data: ()=>{
            return {
              text: "Sehr geehrter Kunde,",
              line: 10
            }
          },
          info: "Zeile 10 wird ausgegeben: 'Sehr geehrter Kunde,'"
        },
        {
          data: ()=>{
            return {
              text: "",
              line: 11
            }
          },
          info: "Zeile 11 ist leer."
        },
        {
          data: ()=>{
            return {
              text: "wir bestätigen die folgende Bestellung:",
              line: 12
            }
          },
          info: "Zeile 12 wird ausgegeben: 'wir bestätigen die folgende Bestellung:'"
        },
        {
          data: ()=>{
            return {
              text: "",
              line: 13
            }
          },
          info: "Zeile 13 ist leer."
        },
        {
          data: ()=>{
            return {
              text: "ARTIKEL ANZAHL EINZELPREIS PREIS",
              line: 14
            }
          },
          info: "Zeile 14 wird ausgegeben: 'ARTIKEL ANZAHL EINZELPREIS PREIS'"
        },
        {
          data: ()=>{
            return {
              text: "Buntstifte $0 0.3€ $3€",
              line: 15,
              replace: true
            }
          },
          info: "Zeile 15 wird mit den korrekten Werten ausgegeben: 'Buntstifte ... 0.3€ ...€'"
        },
        {
          data: ()=>{
            return {
              text: "Kugelschreiber $1 0.8€ $4€",
              replace: true,
              line: 16
            }
          },
          info: "Zeile 16 wird mit den korrekten Werten ausgegeben: 'Kugelschreiber ... 0.8€ ...€'"
        },
        {
          data: ()=>{
            return {
              text: "Collegeblöcke $2 2.49€ $5€",
              replace: true,
              line: 17
            }
          },
          info: "Zeile 17 wird mit den korrekten Werten ausgegeben: 'Collegeblöcke ... 2.49€ ...€'"
        },
        {
          data: ()=>{
            return {
              text: "",
              line: 18
            }
          },
          info: "Zeile 18 ist leer."
        },
        {
          data: ()=>{
            return {
              text: "Gesamtbetrag: $6€",
              replace: true,
              line: 19
            }
          },
          info: "Zeile 19 wird mit den korrekten Werten ausgegeben: 'Gesamtbetrag: ...€'"
        },
        {
          data: ()=>{
            return {
              text: "",
              line: 20
            }
          },
          info: "Zeile 20 ist leer.",
          line: 20
        },
        {
          data: ()=>{
            return {
              text: "*****",
              line: 21
            }
          },
          info: "Zeile 21 wird ausgegeben: '*****'"
        }
      ],
    test: async (tc,init)=>{
      let preise=[0.3,0.8,2.49];
      let vars=[];
      //Anzahlen:
      for(let i=0;i<3;i++){
        vars.push($Exercise.random(0,5));
      }
      //Gesamtpreise:
      for(let i=0;i<3;i++){
        vars.push(vars[i]*preise[i]);
      }
      //gesamt-gesamt :)
      let g=0;
      for(let i=0;i<3;i++){
        g+=vars[3+i];
      }
      vars.push(g);
      Console.overrideReadCommandsIndex=0;
      Console.overrideReadCommands=[vars[0],vars[1],vars[2]];
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
      // for(let i=0;i<20;i++){
      //   $Exercise.clearConsole();
      //   let a=$Exercise.random(1,20);
      //   Console.overrideReadCommandsIndex=0;
      //   Console.overrideReadCommands=[a];
      //   await $main.main();
      //   let content=$Exercise.getConsoleContent();
      //   let ist=content[content.length-1].trimEnd();
      //   let soll=a*2+"";
      //   if(soll!==ist) return false;
      // }
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
  Console.printLine("Willkommen bei Office-Ware.");

}

/*
Willkommen bei Office-Ware.

Geben Sie an, wie viele Artikel Sie bestellen wollen:
Buntstifte: 8
Kugelschreiber: 2
Collegeblöcke: 0

*****

Sehr geehrter Kunde,

wir bestätigen die folgende Bestellung:

ARTIKEL ANZAHL EINZELPREIS PREIS
Buntstifte 8 0.3€ 2.4€
Kugelschreiber 2 0.8€ 1.6€
Collegeblöcke 0 2.49€ 0€ 

Gesamtbetrag: 4€

*****
*/`
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