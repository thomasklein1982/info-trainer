<template>
  <ExerciseBody :exercise="$data" :java="project">
    <p>Es soll eine Website erstellt werden, die einen Button mit der Aufschrift "Sage Hallo" und ein <code>div</code>-Element ohne Text mit der ID <code>ausgabe</code> enthält.</p>
    <div class="float-right">
      <AppPreview width="10rem" resetable @reset="showText=false">
        <JFrame style="padding: 0.2rem;">
          <button @click="showText=true">Sage Hallo</button>
          <div>{{ showText? 'Hallo Welt':'' }}</div>
        </JFrame>
      </AppPreview>
    </div> 
    <p>Wenn auf den Button geklickt wird, soll der Text <code class="code">Hallo Welt</code> in dem <code>div</code>-Element angezeigt werden.</p>
    <p>Implementiere diese Webseite.</p>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "js-hw",
  title: "Hallo Welt",
  showText: false,
  check: {
    init: async ()=>{
      let page=$Exercise.getSingleHtmlPage();
      if(!page){
        return null;
      }
      let button=page.querySelector("button");
      let ausgabe=page.querySelector("div#ausgabe");
      return {
        button,
        ausgabe
      };
    },
    testcases: [
      {
        data: ()=>{
          return {
            test: (init)=>{
              if(!init || !init.button) return false;
              if(init.button.textContent!=='Sage Hallo') return false;
              return true;
            }
          }
        },
        info: "Es gibt ein <code>button</code>-Element mit der Aufschrift 'Sage Hallo'."
      },
      {
        data: ()=>{
          return {
            test: (init)=>{
              if(!init || !init.ausgabe) return false;
              if(init.ausgabe.textContent.trim().length>0) return false;
              return true;
            }
          }
        },
        info: "Es gibt ein <code>div</code>-Element, das zu Beginn leer ist und die ID <code>ausgabe</code> besitzt."
      },
      {
        data: ()=>{
          return {
            test: async (init)=>{
              if(!init || !init.ausgabe || !init.button) return false;
              init.button.click();
              await $Exercise.sleep(100);
              if(init.ausgabe.textContent.trim()==="Hallo Welt") return true;
              return false;
            }
          }
        },
        info: "Wenn man auf den Button klickt, wird 'Hallo Welt' angezeigt."
      },
    ],
    test: async (tc,init)=>{
      return await tc.test(init);
    },
  },
  project: {
    name: "Hallo Welt",
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