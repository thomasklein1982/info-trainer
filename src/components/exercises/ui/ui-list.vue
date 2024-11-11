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
              <li>Narwal: Das Einhorn des Meeres</li>
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
              let ul=label.$el.querySelectorAll("ul");
              if(ul.length!==1) return false;
              ul=ul[0];
              if(ul.nextSibling) return false;
              console.log("test list");
              let h1=ul.previousElementSibling;
              console.log(h1);
              if(!h1 || h1.tagName!=="H1") return false;
              if(h1.innerHTML.trim()!=="Arten von Walen") return false;
              let p=ul.parentNode?.parentNode;
              if(p && p!==label.$el) return false;
              console.log("lis");
              let lis=ul.children;
              if(lis.length!==3) return false;
              let soll=["Blauwal: Eines der größten Tiere aller Zeiten", "Buckelwal: Kommt häufig in Küstennähe vor", "Narwal: Das Einhorn des Meeres"]
              for(let i=0;i<lis.length;i++){
                let li=lis[i];
                console.log(li,li.textContent,soll[i],li.tagName,li.children.length);
                if(li.tagName!=="LI") return false;
                console.log(li.textContent.trim().startsWith(soll[i]));
                if(!li.textContent.trim().startsWith(soll[i])) return false;
                if(li.children.length>0) return false;
              }
              console.log("parser")
              let dp=new DOMParser();
              try{
                console.log("parse",label.$value);
                let doc=dp.parseFromString("<xml>"+label.$value+"</xml>","application/xml");
                let error=doc.querySelector("parsererror");
                console.log("error",error)
                if(error) return false;
              }catch(e){
                console.log("error",e)
                return false;
              }
              return true;
            }
          }
        },
        points: 9,
        info: "In dem Label ist der korrekte HTML-Code"
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