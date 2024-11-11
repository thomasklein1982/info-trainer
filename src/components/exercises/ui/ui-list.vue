<template>
  <ExerciseBody :exercise="$data" :java="project">
    Es soll die dargestellte UI erstellt werden, die aus einem einzelnen <code>JLabel</code> besteht, das HTML-Code enthält.
    <div>
      <AppPreview width="12em" height="auto" style="margin: auto">
        <JFrame layout="1" style="padding: 0.2rem">
          <JLabel >
            <h1>Arten von Walen</h1>
            <ul>
              <li>Blauwal: Eines der größten Tiere aller Zeiten.</li>
              <li>Buckelwal: Kommt häufig in Küstennähe vor.</li>
              <li>Narwal: Das Einhorn des Meeres.</li>
            </ul>
          </JLabel>
        </JFrame>
      </AppPreview>
    </div>
  </ExerciseBody>
</template>

<script>

export const data={
  id: "ui-list",
  title: "HTML - Eine Liste von Walen",
  check: {
    init: async ()=>{
      let comps=$Exercise.getComponents("JComponent");
      let label=null;
      if(comps.length===2) label=comps[1];
      if(!(label instanceof JLabel)) label=null;
      return {
        label
      };
    },
    testcases: [
      {
        data: ()=>{
          return {
            test: async (label)=>{
              return label!==null;
            }
          }
        },
        info: "Die gesamte UI besteht nur aus einem einzelnen JLabel."
      },
      {
        data: ()=>{
          return {
            test: async(label)=>{
              let h1=label.$el.querySelector("h1");
              if(!h1) return false;
              return h1.textContent.trim()==="Arten von Walen";
            }
          }
        },
        info: "Es gibt eine Überschrift mit dem richtigen Text."
      },
      {
        data: ()=>{
          return {
            test: async(label)=>{
              let ul=label.$el.querySelector("ul");
              let lis=ul.children;
              if(lis.length!==3) return false;
              let soll=["Blauwal: Eines der größten Tiere aller Zeiten", "Buckelwal: Kommt häufig in Küstennähe vor", "Narwal: Das Einhorn des Meeres"]
              for(let i=0;i<lis.length;i++){
                let li=lis[i];
                if(li.tagName!=="LI") return false;
                // console.log(li.textContent.trim().startsWith(soll[i]));
                // if(!li.textContent.trim().startsWith(soll[i])) return false;
                // if(li.children.length>0) return false;
              }
              return true;
            }
          }
        },
        info: "Es gibt eine Liste mit 3 Unterpunkten."
      },
      {
        data: ()=>{
          return {
            test: async(label)=>{
              let ul=label.$el.querySelector("ul");
              let lis=ul.children;
              if(lis.length!==3) return false;
              let soll=["Blauwal: Eines der größten Tiere aller Zeiten.", "Buckelwal: Kommt häufig in Küstennähe vor.", "Narwal: Das Einhorn des Meeres."]
              for(let i=0;i<lis.length;i++){
                let li=lis[i];
                if(!li.innerHTML.trim()===(soll[i])) return false;
                // if(li.children.length>0) return false;
              }
              return true;
            }
          }
        },
        info: "In den Unterpunkten der Liste stehen die richtigen Texte."
      },
      {
        data: ()=>{
          return {
            test: async(label)=>{
              let dp=new DOMParser();
              try{
                let doc=dp.parseFromString("<xml>"+label.$value+"</xml>","application/xml");
                let error=doc.querySelector("parsererror");
                if(error) return false;
              }catch(e){
                return false;
              }
              return true;
            }
          }
        },
        info: "Der HTML-Code ist syntaktisch korrekt, d.h., die Tags werden korrekt geöffnet und geschlossen."
      },
      {
        data: ()=>{
          return {
            test: async(label)=>{
              let ul=label.$el.querySelector("ul");
              let h1=label.$el.querySelector("h1");
              if(h1.nextElementSibling!==ul) return false;
              if(ul.nextElementSibling) return false;
              if(h1.previousElementSibling) return false;
              // let complete=label.$el.textContent.trim();
              // if(complete.startsWith())
              return true;
            }
          }
        },
        info: "Die Elemente stehen in der richtigen Reihenfolge und es gibt keine zusätzlichen Elemente."
      }
    ],
    test: async (tc,init)=>{
      let label=init.label;
      if(!label) return false;
      return await tc.test(label);
    },
  },
  project: {
    name: "HTML-Liste",
    clazzes: [
      {
        name: "Main",
        src: `
$void main(){
  
}`,
      }, 
      {
        type: "UI",
        code: {
          "name": "UI",
          "components":[]
        }
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