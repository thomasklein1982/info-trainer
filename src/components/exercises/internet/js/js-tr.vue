<template>
  <ExerciseBody :exercise="$data" :java="project">
    <p>Es soll eine Website erstellt werden, die einen einfachen Taschenrechner enthält (siehe Abbildung).</p>
    <div class="float-right">
      <AppPreview height="auto" width="20em"  resetable @reset="example.ergebnis='Ergebnis'">
        <JFrame style="padding: 0.2rem;">
          <h2>Taschenrechner</h2>
          <p>Geben Sie zwei Zahlen ein und klicken Sie auf die gewünschte Rechenoperation:</p>
          <div>
            Zahl 1: <input style="width: 4em" type="number" v-model="example.a"/>
            Zahl 2: <input style="width: 4em" type="number" v-model="example.b"/>
          </div>
          <div>
            <button @click="example.ergebnis=example.a+example.b">+</button>
            <button @click="example.ergebnis=example.a-example.b">-</button>
            <button @click="example.ergebnis=example.a*example.b">*</button>
            <button @click="example.ergebnis=example.a/example.b">:</button>
          </div>
          <div>{{ example.ergebnis }}</div>
        </JFrame>
      </AppPreview>
    </div> 
    Beachte dabei die folgenden Details:
    <ul>
      <li>Die Seite muss genau zwei Eingabefelder für die beiden Zahlen enthalten.</li>
      <li>Die Seite muss vier Buttons enthalten, mit den Aufschriften '+', '-', '*' und ':'.</li>
      <li>Wenn auf einen der Buttons geklickt wird, sollen die beiden eingegebenen Zahlen miteinander verrechnet werden und das Ergebnis in einem DIV-Element angezeigt.</li>
      <li>In dem DIV-Element, in dem das Ergebnis angezeigt wird, muss zu Beginn 'Ergebnis' stehen.</li>
    </ul>
    <p>Implementiere diese Webseite.</p>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "js-tr",
  title: "Taschenrechner",
  example: {
    a: 0,
    b: 0,
    ergebnis: "Ergebnis"
  },
  showText: false,
  check: {
    init: async ()=>{
      let page=$Exercise.getSingleHtmlPage();
      if(!page) return null;
      let div=page.querySelector("div",(d)=>{
        return d.textContent.toLowerCase().trim()==='ergebnis';
      });
      let buttons=page.querySelectorAll("button");
      let actionButtons={"+": null,"-": null,"*": null, ":": null};
      for(let i=0;i<buttons.length;i++){
        let b=buttons[i];
        if(b.textContent in actionButtons){
          actionButtons[b.textContent]=b;
        }
      }
      let inputs=page.querySelectorAll("input");
      let ok=true;
      if(!div) ok=false;
      if(inputs.length!==2) ok=false;
      console.log("gefunden",div, inputs);
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
              return $Exercise.doubleEquals(init.ausgabe.textContent.trim()*1,a+b);
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
              return $Exercise.doubleEquals(init.ausgabe.textContent.trim()*1,a-b);
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
              return $Exercise.doubleEquals(init.ausgabe.textContent.trim()*1,a*b);
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
              return $Exercise.doubleEquals(init.ausgabe.textContent.trim()*1,a/b);
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