<template>
  <ExerciseBody :exercise="$data" :java="project">
    Es soll die dargestellte UI erstellt werden, die aus einem einzelnen <code>JLabel</code> besteht, das HTML-Code enthält.
    <div>
      <AppPreview width="100%" height="auto" style="margin: auto">
        <JFrame layout="1" style="padding: 0.2rem">
          <JLabel >
            <table>
              <tr>
                <th>Land</th><th>Einwohner</th><th>Hauptstadt</th><th>CO2 pro Kopf</th>
              </tr>
              <tr>
                <td>England</td><td>54 Mio.</td><td>London</td><td>4,72 t</td>
              </tr>
              <tr>
                <td>Deutschland</td><td>84 Mio.</td><td>Berlin</td><td>7,26 t</td>
              </tr>
              <tr>
                <td>Kenia</td><td>55 Mio.</td><td>Nairobi</td><td>0,37 t</td>
              </tr>
            </table>
          </JLabel>
        </JFrame>
      </AppPreview>
    </div>
  </ExerciseBody>
</template>

<script>

export const data={
  id: "ui-tab",
  title: "HTML - Länder im Vergleich",
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
              let table=label.$el.querySelectorAll("table");
              if(table.length!==1) return false;
              table=table[0];
              if(table.nextSibling) return false;
              if(table.previousElementSibling) return false;
              if(table.previousSibling?.textContent.trim().length>0) return false;
              if(!table || table.tagName!=="TABLE") return false;
              if(table.children.length===0) return false;
              let trs=table.children[0].children;
              if(trs.length!==4) return false;
              let soll=[
                ["Land","Einwohner","Hauptstadt","CO2 pro Kopf"], 
                ["England","54 Mio.","London","4,72 t"], 
                ["Deutschland", "84 Mio.", "Berlin", "7,26 t"],
                ["Kenia", "55 Mio.", "Nairobi", "0,37 t"]
              ];
              for(let i=0;i<trs.length;i++){
                let tr=trs[i];
                if(tr.tagName!=="TR") return false;
                if(tr.children.length!==soll[i].length) return false;
                for(let j=0;j<tr.children.length;j++){
                  let td=tr.children[j];
                  if(i===0 && td.tagName!=="TH" || i>0 && td.tagName!=="TD") return false;
                  if(td.innerHTML.trim()!==soll[i][j]) return false;
                }
              }
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
        points: 9,
        info: "In dem Label ist der korrekte HTML-Code."
      }
    ],
    test: async (tc,init)=>{
      let label=init.label;
      if(!label) return false;
      return await tc.test(label);
    },
  },
  project: {
    name: "HTML-Tabelle",
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