<template>
  <ExerciseBody :exercise="$data" :java="project">
    Es soll eine Webseite erstellt werden, die dem User Additionsaufgaben stellt, die dieser lösen muss:
    <div class="float-right">
      <AppPreview height="auto" width="20em"  resetable @reset="example.reset()">
        <JFrame style="padding: 0.2rem;">
          <h2>Rechentrainer</h2>
          <p>Punktestand: <span id="punkteStand">{{ example.punkte }}</span></p>
          <div><span>{{ example.zahl1 }}</span> + <span>{{example.zahl2}}</span></div>
          <div>
            = <input style="width: 4em" type="number" v-model="example.input"/> <span>{{ example.feedback }}</span>
          </div>
          <button :disabled="example.feedback.length>0" @click="example.check()">Prüfen</button>
          <button :disabled="example.feedback.length===0" @click="example.newExercise()">Weiter</button>
        </JFrame>
      </AppPreview>
    </div>
    <p>Hier einige Details:</p>
    <ul>
      <li>Die erste Aufgabe lautet immer '1 + 2' (mit Leerzeichen dazwischen).</li>
      <li>Bei den nächsten Aufgaben sollen die beiden Zahlen jeweils zufällige ganze Zahlen zwischen 0 und 20 sein. Mit <Code no-numbers>Math.round(Math.random()*20)</Code> erzeugt man eine ganze Zufallszahl zwischen 0 und 20.</li>
      <li>Zu Beginn ist der 'Weiter'-Button deaktiviert.</li> 
      <li>Wenn auf den 'Prüfen'-Button geklickt wird, wird die Antwort des Users überprüft und ggf. der Punktestand um 1 erhöht. Es wird 'Richtig' oder 'Falsch' angezeigt. Außerdem wird der 'Prüfen'-Button deaktiviert und der 'Weiter'-Button aktiviert.</li>
      <li>Wenn auf den 'Weiter'-Button geklickt wird, wird eine neue zufällige Aufgabe generiert. Außerdem wird der 'Prüfen'-Button deaktiviert und der 'Weiter'-Button aktiviert.</li>
    </ul>
    <p>Implementiere diese Webseite.</p>
  </ExerciseBody>
</template>

<script>



export const data={
  id: "js-quiz",
  title: "Rechentrainer",
  example: {
    punkte: 0,
    zahl1: 1,
    zahl2: 2,
    input: "",
    feedback: "",
    reset(){
      this.punkte=0;
      this.zahl1=1;
      this.zahl2=2;
      this.input="";
      this.feedback="";
    },
    newExercise(){
      this.zahl1=Math.round(Math.random()*20);
      this.zahl2=Math.round(Math.random()*20);
      this.input="";
      this.feedback="";
    },
    check(){
      if(this.zahl1+this.zahl2===this.input*1){
        this.punkte++;
        this.feedback="Richtig!"; 
      }else{
        this.feedback="Falsch!";
      }
    }
  },
  check: {
    init: async ()=>{
      let page=$Exercise.getSingleHtmlPage();
      if(!page) return;
      let z1=page.querySelector("*",(e)=>{
        return e.textContent.trim()==="1";
      });
      let z2=page.querySelector("*",(e)=>{
        return e.textContent.trim()==="2";
      });
      let z;
      if(!z1 && !z2){
        z=page.querySelector("*",(e)=>{
          return e.textContent.trim()==="1 + 2";
        });
      }
      let punkteStand=page.querySelector("*",(e)=>{
        return e.textContent.trim()==="0" || e.textContent.trim()==="Punktestand: 0";
      });
      let data= {
        page,
        weiter: page.querySelector("button",(el)=>{return el.textContent==="Weiter"}),
        pruefen: page.querySelector("button",(el)=>{return el.textContent==="Prüfen"}),
        input: page.querySelector("input"),
        punkteStand
      };
      data.zahlen=z;
      data.zahl1=z1;
      data.zahl2=z2;
      data.uiOK=(data.zahlen || data.zahl1 && data.zahl2) && data.weiter && data.pruefen && data.input && data.punkteStand;
      console.log("init ",data);
      return data;
    },
    testcases: [
      {
        data: ()=>{
          return {
            check: async (init)=>{
              console.log(init);
              return init.zahlen!==null || init.zahl1!==null && init.zahl2!==null;
            }
          };
        },
        info: "Die Aufgabe <code>1 + 2</code> wird zu Beginn angezeigt."
      },
      {
        data: ()=>{
          return {
            check: async (init)=>{
              return init.punkteStand!==null;
            }
          };
        },
        info: "Der Punktestand wird angezeigt."
      },
      {
        data: ()=>{
          return {
            check: async (init)=>{
              return init.pruefen!==null;
            }
          };
        },
        info: "Es gibt einen Button mit der Aufschrift 'Prüfen'"
      },
      {
        data: ()=>{
          return {
            check: async (init)=>{
              return init.weiter!==null;
            }
          };
        },
        info: "Es gibt einen Button mit der Aufschrift 'Weiter'"
      },
      {
        data: ()=>{
          return {
            check: async (init)=>{
              return init.input!==null;
            }
          };
        },
        info: "Es gibt ein Eingabefeld für das Ergebnis."
      },
      {
        data: ()=>{
          return {
            check: async (init)=>{
              if(!init.uiOK) return false;
              let p;
              p=init.punkteStand.textContent;
              if(p.startsWith("Punktestand:")){
                p=p.split(":")[1]*1;
              }else{
                p=p*1;
              }
              let pStart=p;
              let a,b;
              if(init.zahlen){
                let s=init.zahlen.textContent.split("+");
                a=s[0]*1;
                b=s[1]*1;
              }else{
                a=init.zahl1.textContent*1;
                b=init.zahl2.textContent*1;
              }
              let c=a+b;
              console.log(a,b,c);
              init.input.value=c;
              init.pruefen.click();
              await $Exercise.sleep(100);
              let richtig=init.page.querySelector("*",(e)=>{
                return e.textContent.trim()==="Richtig";
              });
              let falsch=init.page.querySelector("*",(e)=>{
                return e.textContent.trim()==="Falsch";
              });
              console.log(richtig,falsch);
              if(falsch || !richtig) return false;
              p=init.punkteStand.textContent;
              if(p.startsWith("Punktestand:")){
                p=p.split(":")[1]*1;
              }else{
                p=p*1;
              }
              if(p!==pStart+1) return false;
              return true;
            }
          };
        },
        info: "Wenn man die richtige Antwort eingibt und auf 'Prüfen' klickt, wird 'Richtig' angezeigt und man erhält einen Punkt.",
        count: 3
      },
      {
        data: ()=>{
          return {
            check: async (init)=>{
              if(!init.uiOK) return false;
              let p;
              p=init.punkteStand.textContent;
              if(p.startsWith("Punktestand:")){
                p=p.split(":")[1]*1;
              }else{
                p=p*1;
              }
              let pStart=p;
              let a,b;
              if(init.zahlen){
                let s=init.zahlen.textContent.split("+");
                a=s[0]*1;
                b=s[1]*1;
              }else{
                a=init.zahl1.textContent*1;
                b=init.zahl2.textContent*1;
              }
              let c=a+b;
              init.input.value=c+1;
              init.pruefen.click();
              await $Exercise.sleep(100);
              let richtig=init.page.querySelector("*",(e)=>{
                return e.textContent.trim()==="Richtig";
              });
              let falsch=init.page.querySelector("*",(e)=>{
                return e.textContent.trim()==="Falsch";
              });
              if(richtig || !falsch) return false;
              p=init.punkteStand.textContent;
              if(p.startsWith("Punktestand:")){
                p=p.split(":")[1]*1;
              }else{
                p=p*1;
              }
              console.log("punkte",p,pStart,p===pStart)
              if(p!==pStart) return false;
              return true;
            }
          };
        },
        info: "Wenn man die falsche Antwort eingibt und auf 'Prüfen' klickt, wird 'Falsch' angezeigt und man erhält keinen Punkt."
      },
      {
        data: ()=>{
          return {
            check: async (init)=>{
              console.log("test weiter",init)
              if(!init.uiOK) return false;
              let p;
              p=init.punkteStand.textContent;
              if(p.startsWith("Punktestand:")){
                p=p.split(":")[1]*1;
              }else{
                p=p*1;
              }
              let pStart=p;
              let a,b;
              if(init.zahlen){
                let s=init.zahlen.textContent.split("+");
                a=s[0]*1;
                b=s[1]*1;
              }else{
                a=init.zahl1.textContent*1;
                b=init.zahl2.textContent*1;
              }
              let aAlt=a; let bAlt=b;
              
              init.weiter.click();
              await $Exercise.sleep(100);
              
              if(init.zahlen){
                let s=init.zahlen.textContent.split("+");
                a=s[0]*1;
                b=s[1]*1;
              }else{
                a=init.zahl1.textContent*1;
                b=init.zahl2.textContent*1;
              }
              console.log(a,b,aAlt,bAlt);
              if(a===aAlt && b === bAlt) return false;

              let richtig=init.page.querySelector("*",(e)=>{
                return e.textContent.trim()==="Richtig";
              });
              let falsch=init.page.querySelector("*",(e)=>{
                return e.textContent.trim()==="Falsch";
              });
              console.log(richtig,falsch)
              if(richtig || falsch) return false;
              p=init.punkteStand.textContent;
              if(p.startsWith("Punktestand:")){
                p=p.split(":")[1]*1;
              }else{
                p=p*1;
              }
              console.log("punkte",p,pStart,p===pStart)
              if(p!==pStart) return false;
              return true;
            }
          };
        },
        info: "Wenn man auf 'Weiter' klickt, wird eine neue Aufgabe angezeigt. Richtig/Falsch wird wieder ausgeblendet."
      },
    ],
    test: async (tc,init)=>{
      return await tc.check(init);
    },
  },
  project: {
    name: "Rechentrainer",
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