<template>
  <ExerciseBody :exercise="$data" :java="project">
    <p>Es soll eine Website erstellt werden mit einem Eingabefeld, einem Button und einem <code>div</code>-Element (siehe Abbildung.</p>
    <div class="float-right">
      <AppPreview height="auto" width="20em"  resetable @reset="example.ergebnis='Ergebnis'">
        <JFrame style="padding: 0.2rem;">
          <h2>Verdoppeln</h2>
          <p>Gib die Zahl ein, die du verdoppeln willst:</p>
          <input style="width: 4em" type="number" v-model="example.a"/>
          <button @click="example.ergebnis=example.a*2">Verdoppeln</button>
          <div>{{ example.ergebnis }}</div>
        </JFrame>
      </AppPreview>
    </div> 
    Sobald der Button geklickt wird, soll die Zahl, die der*die User eingegeben hat, verdoppelt werden und das Ergebnis in dem <code>div</code>-Element angezeigt werden. 
    
    <p>Beachte dabei die folgenden Details:</p>
    <ul>
      <li>Die Seite muss genau ein Eingabefeld enthalten.</li>
      <li>Die Seite muss einen Button mit der Aufschrift 'Verdoppeln' enthalten.</li>
      <li>In dem DIV-Element, in dem das Ergebnis angezeigt wird, muss zu Beginn 'Ergebnis' stehen.</li>
    </ul>
    <p>Implementiere diese Webseite.</p>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "js-io",
  title: "Input und Output",
  example: {
    a: 0,
    ergebnis: "Ergebnis"
  },
  check: {
    init: async ()=>{
      let page=$Exercise.getSingleHtmlPage();
      if(!page){
        return null;
      }
      
      let doc=pages[0].contentWindow.document;
      let divs=doc.querySelectorAll("div");
      let div=null;
      for(let i=0;i<divs.length;i++){
        let d=divs[i];
        if(d.textContent.toLowerCase().trim()==='ergebnis'){
          div=d;
          break;
        }
      }
      let buttons=doc.querySelectorAll("button");
      let actionButtons={"+": null,"-": null,"*": null, ":": null};
      for(let i=0;i<buttons.length;i++){
        let b=buttons[i];
        if(b.textContent in actionButtons){
          actionButtons[b.textContent]=b;
        }
      }
      let inputs=doc.querySelectorAll("input");
      console.log(inputs);
      let ok=true;
      if(!div) ok=false;
      if(inputs.length!==2) ok=false;
      if(ok){
        for(let a in actionButtons){
          if(!actionButtons[a]){
            ok=false;
            break;
          }
        }
      }
      return {
        buttons: actionButtons,
        ausgabe: div,
        inputs,
        ok
      };
    },
    testcases: [
      {
        data: ()=>{
          return {
            test: (init)=>{
              if(!init || init.inputs.length!==2) return false;
              return true;
            }
          }
        },
        info: "Es gibt genau zwei Eingabefelder."
      },
      {
        data: ()=>{
          return {
            test: (init)=>{
              if(!init || !init.buttons["+"]) return false;
              return true;
            }
          }
        },
        info: "Es gibt einen '+'-Button."
      },
      {
        data: ()=>{
          return {
            test: (init)=>{
              if(!init || !init.buttons["-"]) return false;
              return true;
            }
          }
        },
        info: "Es gibt einen '-'-Button."
      },
      {
        data: ()=>{
          return {
            test: (init)=>{
              if(!init || !init.buttons["*"]) return false;
              return true;
            }
          }
        },
        info: "Es gibt einen '*'-Button."
      },
      {
        data: ()=>{
          return {
            test: (init)=>{
              if(!init || !init.buttons[":"]) return false;
              return true;
            }
          }
        },
        info: "Es gibt einen ':'-Button."
      },
      {
        data: ()=>{
          return {
            test: (init)=>{
              if(!init || !init.ausgabe) return false;
              return true;
            }
          }
        },
        info: "Es gibt ein <code>div</code>-Element, in dem zu Beginn 'Ergebnis' steht."
      },
      {
        data: ()=>{
          return {
            test: async (init)=>{
              if(!init || !init.ok) return false;
              let a =Math.random()*100;
              let b=Math.random()*100;
              init.inputs[0].value=a;
              init.inputs[1].value=b;
              await $Exercise.sleep(100);
              init.buttons['+'].click();
              await $Exercise.sleep(100);
              if(init.ausgabe.textContent.trim()===(a+b)+"") return true;
              return false;
            }
          }
        },
        info: "Wenn man auf den Button '+' klickt, werden die beiden eingegebenen Zahlen korrekt addiert und das Ergebnis angezeigt."
      },
      {
        data: ()=>{
          return {
            test: async (init)=>{
              if(!init || !init.ok) return false;
              let a =Math.random()*100;
              let b=Math.random()*100;
              init.inputs[0].value=a;
              init.inputs[1].value=b;
              await $Exercise.sleep(100);
              init.buttons['-'].click();
              await $Exercise.sleep(100);
              if(init.ausgabe.textContent.trim()===(a-b)+"") return true;
              return false;
            }
          }
        },
        info: "Wenn man auf den Button '-' klickt, werden die beiden eingegebenen Zahlen korrekt subtrahiert und das Ergebnis angezeigt."
      },
      {
        data: ()=>{
          return {
            test: async (init)=>{
              if(!init || !init.ok) return false;
              let a =Math.random()*100;
              let b=Math.random()*100;
              init.inputs[0].value=a;
              init.inputs[1].value=b;
              await $Exercise.sleep(100);
              init.buttons['*'].click();
              await $Exercise.sleep(100);
              if(init.ausgabe.textContent.trim()===(a*b)+"") return true;
              return false;
            }
          }
        },
        info: "Wenn man auf den Button '*' klickt, werden die beiden eingegebenen Zahlen korrekt multipliziert und das Ergebnis angezeigt."
      },
      {
        data: ()=>{
          return {
            test: async (init)=>{
              if(!init || !init.ok) return false;
              let a =Math.random()*100;
              let b=Math.random()*100;
              init.inputs[0].value=a;
              init.inputs[1].value=b;
              await $Exercise.sleep(100);
              init.buttons[':'].click();
              await $Exercise.sleep(100);
              if(init.ausgabe.textContent.trim()===(a/b)+"") return true;
              return false;
            }
          }
        },
        info: "Wenn man auf den Button ':' klickt, werden die beiden eingegebenen Zahlen korrekt dividiert und das Ergebnis angezeigt."
      },
    ],
    test: async (tc,init)=>{
      return await tc.test(init);
    },
  },
  project: {
    name: "Taschenrechner",
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
    
  </head>
  <body>
    
  </body>
</html>`
      },
      {
        type: "js",
        name: "Script",
        src: ``
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