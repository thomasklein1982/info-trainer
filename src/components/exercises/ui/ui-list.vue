<template>
  <ExerciseBody :exercise="$data" :java="project">
    Es soll die dargestellte UI erstellt werden, die aus einem einzelnen <code>JLabel</code> besteht, das HTML-Code enthält.
    <div>
      <AppPreview width="12em" height="auto" style="margin: auto">
        <JFrame layout="1" style="padding: 0.2rem">
          <JLabel >
            Arten von Walen:
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
              let before;
              let ps=ul.previousSibling;
              console.log("before",ps,ps.textContent);
              if(ps.textContent.trim().length===0){
                let pe=ul.previousElementSibling;
                if(!pe) return false;
                if(pe.previousElementSibling) return false;
                if(pe.tagName!=="DIV" && pe.tagName!=="P") return false;
                before=pe.textContent;
              }else{
                before=ps.textContent;
              }
              console.log("before2",before);
              if(before.indexOf("Arten von Walen:")<0) return false;
              let p=ul.parentNode;
              while(p && p!==label.$el){
                if(p.tagName!=="DIV" && p.tagName!=="P") return false;
                p=p.parentNode;
              }
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
                let doc=dp.parseFromString(label.$value,"application/xml");
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