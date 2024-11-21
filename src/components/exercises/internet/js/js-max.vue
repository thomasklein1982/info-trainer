<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Funktion <Code no-numbers>maximum(a, b, c)</Code> soll die größte Zahl unter den drei Zahlen <Code inline>a</Code>, <Code inline>b</Code> und <Code inline>c</Code> finden und zurückgeben.
    <p>Implementiere diese Funktion.</p>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "js-max",
  title: "Maximum",
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
            get: ()=>{
              let z3=Math.random()*100-50;
              let z2=z3-Math.random()*5;
              let z1=z3-Math.random()*5;
              return [z3,z1,z2];
            },
            info: "a"
          };
        },
        info: "Klappt, wenn a die größte Zahl ist.",
        count: 4
      },
      {
        data: (data)=>{
          return {
            get: ()=>{
              let z3=Math.random()*100-50;
              let z2=z3-Math.random()*5;
              let z1=z3-Math.random()*5;
              return [z1,z3,z2];
            },
            info: "b"
          };
        },
        info: "Klappt, wenn b die größte Zahl ist.",
        count: 4
      },
      {
        data: (data)=>{
          return {
            get: ()=>{
              let z3=Math.random()*100-50;
              let z2=z3-Math.random()*5;
              let z1=z3-Math.random()*5;
              return [z2,z1,z3];
            },
            info: "c"
          };
        },
        info: "Klappt, wenn c die größte Zahl ist.",
        count: 4
      }
    ],
    test: async (tc,init)=>{
      let z=tc.get();
      let soll=Math.max.apply(null,z);
      let ist=init.window.maximum.apply(null,z);
      return soll===ist;
    },
  },
  project: {
    name: "Maximum",
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
    <input type="number" id="a"/>
    <input type="number" id="b"/>
    <input type="number" id="c"/>
    <button onclick="ausgabe.innerHTML=maximum(a.value*1,b.value*1,c.value*1)">Maximum bestimmen</button>
    <div id="ausgabe"></div>
  </body>
</html>`
      },
      {
        type: "js",
        name: "Script",
        src: `function maximum ( a, b, c ) {
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