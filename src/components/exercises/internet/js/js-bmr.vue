<template>
  <ExerciseBody :exercise="$data" :java="project">
    <p>Der <strong>BMR (Basal Metabolic Rate)</strong> ist der tägliche Energiebedarf des Körpers für die Aufrechterhaltung der basalen körperlichen Funktionen wie Verdauung, Atmung, Blutkreislauf usw.. Alle Informationen zum BMR findest du unter <a href="https://www.bmr-rechner.de/" target="_blank">diesem Link</a>.</p>
    <p>Die Funktion <Code no-numbers>berechneBMR( gewicht, groesse, alter, geschlecht )</Code> soll den BMR in Abhängigkeit der Parameter berechnen und zurückgeben (gemäß der Formeln von der Seite, die oben verlinkt ist):
      <ul>
        <li><Code inline>gewicht</Code>: Gewicht der Person in kg.</li>
        <li><Code inline>groesse</Code>: Körpergröße der Person in cm.</li>
        <li><Code inline>alter</Code>: Alter der Person in Jahren.</li>
        <li><Code inline>geschlecht</Code>: Geschlecht der Person (<Code inline>"w"</Code> oder <Code inline>"m"</Code>).</li>
      </ul>
    </p>
    <p>Implementiere diese Funktion.</p>
    <Hint>Dass als Geschlecht nur weiblich und männlich in Frage kommt, hängt schlicht und ergreifend damit zusammen, dass bei der Berechnung des BMR nur zwischen diesen beiden Geschlechtern unterschieden wird. Damit ist nicht gemeint, dass es nur diese beiden Geschlechter gibt.</Hint>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "js-bmr",
  title: "Basal Metabolic Rate",
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
        data: (data)=>{
          return {
            check: (init)=>{
              let groesse=Math.random()*100+100;
              let gewicht=Math.random()*100;
              let alter=Math.round(Math.random()*100);
              let soll=10*groesse+6.25*gewicht-5*alter+5;
              let ist=init.window.berechneBMR(groesse,gewicht,alter,"m");
              //console.log(groesse,gewicht,alter,soll,ist);
              return Math.abs(ist-soll)<0.00001;
            }
          };
        },
        info: "Der BMR wird für Männer korrekt berechnet und zurückgegeben.",
        count: 10
      },
      {
        data: (data)=>{
          return {
            check: (init)=>{
              let groesse=Math.random()*100;
              let gewicht=Math.random()*100;
              let alter=Math.round(Math.random()*100);
              let soll=10*groesse+6.25*gewicht-5*alter-161;
              let ist=init.window.berechneBMR(groesse,gewicht,alter,"w");
              return Math.abs(ist-soll)<0.00001;
            }
          };
        },
        info: "Der BMR wird für Frauen korrekt berechnet und zurückgegeben.",
        count: 10
      },
    ],
    test: async (tc,init)=>{
      return tc.check(init);
    },
  },
  project: {
    name: "BMR",
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
    <input type="number" placeholder="Gewicht in kg" id="gewicht"/>
    <input type="number" placeholder="Größe in cm" id="groesse"/>
    <input type="number" placeholder="Alter in Jahren" id="alter"/>
    <select id="geschlecht">
      <option>w</option>
      <option>m</option>
    </select>
    <button onclick="ausgabe.innerHTML=berechneBMR(gewicht.value*1,groesse.value*1,alter.value*1,geschlecht.value)">BMR bestimmen</button>
    <div id="ausgabe"></div>
  </body>
</html>`
      },
      {
        type: "js",
        name: "Script",
        src: `function berechneBMR ( gewicht, groesse, alter, geschlecht ) {
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