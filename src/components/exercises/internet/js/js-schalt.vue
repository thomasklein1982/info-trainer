<template>
  <ExerciseBody :exercise="$data" :java="project">
    <p>Alle vier Jahre gibt es ein <strong>Schaltjahr</strong>, d.h., das Jahr hat einen Tag mehr. Was viele nicht wissen: Ist die Jahreszahl durch 100 teilbar, so ist es doch kein Schaltjahr, außer, wenn die Jahreszahl auch durch 400 teilbar ist.</p>
    <p>Die Funktion <Code no-numbers>anzahlTage( jahr )</Code> soll anhand der Jahreszahl <Code inline>jahr</Code> entscheiden, wie viele Tage das Jahr hat. Implementiere diese Funktion.</p>
    <Example>
      <p>Das Jahr 2024 ist ein Schaltjahr, weil es durch 4 teilbar ist und nicht durch 100.</p>
      <p>Das Jahr 1900 ist kein Schaltjar. Es ist zwar durch 4 teilbar, aber es ist auch durch 100 teilbar und nicht durch 400!</p>
      <p>Das Jahr 2000 ist ein Schaltjar. Es ist durch 4 teilbar, aber auch durch 100, womit es erst einmal KEIN Schaltjahr wäre. Da 2000 aber auch durch 400 teilbar ist, ist es doch ein Schaltjahr.</p>
    </Example>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "js-schalt",
  title: "Schaltjahr oder nicht?",
  check: {
    init: async ()=>{
      let page=$Exercise.getSingleHtmlPage();
      if(!page) return;
      return {
        window: page.$el.contentWindow
      };
    },
    testcases: [
      {
        data: ()=>{
          let rest=$Exercise.random(1,2)===1? 0: $Exercise.random(1,3);
          let jahr=$Exercise.random(101,1000)*4+rest;
          while(jahr%100===0 || jahr%400===0){
            jahr=$Exercise.random(101,1000)*4+rest;
          }
          return {
            jahr
          };
        }, 
        count: 50, 
        info: 'Funktioniert "im Normalfall".'
      },
      {
        data: ()=>{
          let jahr=$Exercise.random(100,1000)*100;
          while(jahr%400===0){
            jahr=$Exercise.random(100,1000)*100;
          }
          return {
            jahr
          };
        },
        count: 5,
        info: 'Funktioniert bei den Ausnahmejahren.'
      },
      {
        data: ()=>{
          let jahr=$Exercise.random(10,100)*400;
          return {
            jahr
          };
        },
        count: 5,
        info: 'Funktioniert bei den Ausnahmen der Ausnahmen.'
      }
    ],
    test: async (tc,init)=>{
      let jahr=tc.jahr;
      let ist=init.window.anzahlTage(jahr);
      let soll;
      if(jahr%400===0) soll=366;
      else if(jahr%100===0) soll=365;
      else if(jahr%4===0) soll=366;
      else soll=365;
      return (ist===soll);
    },
  },
  project: {
    name: "Schaltjahre",
    clazzes: [
      {
        name: "Main",
        src: `$void main(){
  
}`,
      },  
      {
        type: "html",
        name: "Webseite",
        src: `<!doctype html>
<html>
  <head>
    <script src="Script.js">\x3C/script>
  </head>
  <body>
    <input type="number" placeholder="Gib die Jahreszahl ein" id="jahreszahl"/>
    <button onclick="ausgabe.innerHTML=anzahlTage(jahreszahl.value*1)">Anzahl Tage des Jahres bestimmen</button>
    <div>Dieses Jahr hat <span id="ausgabe"></span> Tage.</div>
  </body>
</html>`
      },
      {
        type: "js",
        name: "Script",
        src: `function anzahlTage ( jahr ) {
  //Hierhin kommt der Code

}`
      },
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