<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Funktion <Code>widerstand(stromstaerke,spannung)</Code> soll den elektrischen Widerstand berechnen und zurückgeben bei einer Stromstärke von <Code inline>stromstaerke</Code> Ampere und einer Spannung von <Code inline>spannung</Code> Volt.
    <p>Implementiere diese Funktion.</p>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "js-res",
  title: "Elektrischer Widerstand",
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
              let I=Math.random()*100;
              let U=Math.random()*100;
              let R=U/I;
              let ist=init.window.widerstand(I,U);
              return Math.abs(ist-R)<0.00001;
            }
          };
        },
        info: "Der Widerstand wird korrekt berechnet und zurückgegeben.",
        count: 10
      },
    ],
    test: async (tc,init)=>{
      return tc.check(init);
    },
  },
  project: {
    name: "Elektrischer Widerstand",
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
    <input type="number" placeholder="Stromstärke in Ampere" id="stromstaerke"/>
    <input type="number" placeholder="Spannung in Volt" id="spannung"/>
    <button onclick="ausgabe.innerHTML=widerstand(stromstaerke.value*1,spannung.value*1)">Widerstand bestimmen</button>
    <div id="ausgabe"></div>
  </body>
</html>`
      },
      {
        type: "js",
        name: "Script",
        src: `function widerstand ( stromstaerke, spannung ) {
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