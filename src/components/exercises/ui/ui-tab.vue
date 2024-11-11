<template>
  <ExerciseBody :exercise="$data" :java="project">
    Implementiere die folgende UI mit Hilfe von HTML. Es darf nur ein einzelnes <code>JLabel</code> verwendet werden.
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
      let doc=null;
      if(label){
        let dp=new DOMParser();
        try{
          doc=dp.parseFromString("<xml>"+label.$value+"</xml>","application/xml");
        }catch(e){
          
        }
      }
      return {
        label, doc
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
              return true;
            }
          }
        },
        info: "Es gibt genau ein Tabellenelement."
      },
      {
        data: ()=>{
          return {
            test: async(label,doc)=>{
              let table=doc.querySelectorAll("table");
              if(table.length!==1) return false;
              table=table[0];
              console.log(table.children);
              if(table.children.length!==4) return false;
              for(let i=0;i<table.children.length;i++){
                let tr=table.children[i];
                console.log("tr",tr,tr.tagName);
                if(tr.tagName.toUpperCase()!=="TR") return false;
              }
              return true;
            }
          }
        },
        info: "Die Tabelle hat genau vier Zeilen."
      },
      {
        data: ()=>{
          return {
            test: async(label)=>{
              let table=label.$el.querySelectorAll("table");
              if(table.length!==1) return false;
              table=table[0];
              let tr=table.children[0].children[0];
              if(!tr) return false;
              if(tr.children.length!==4) return false;
              let soll=["Land","Einwohner","Hauptstadt","CO2 pro Kopf"];
              for(let i=0;i<soll.length;i++){
                let td=tr.children[i];
                if(td.innerHTML.trim()!==soll[i]) return false;
                if(td.tagName!=="TH") return false;
              }
              return true;
            }
          }
        },
        info: "Die erste Zeile der Tabelle ist korrekt."
      },
      {
        data: ()=>{
          return {
            test: async(label)=>{
              let table=label.$el.querySelectorAll("table");
              if(table.length!==1) return false;
              table=table[0];
              let tr=table.children[0].children[1];
              if(!tr) return false;
              if(tr.children.length!==4) return false;
              let soll=["England","54 Mio.","London","4,72 t"];
              for(let i=0;i<soll.length;i++){
                let td=tr.children[i];
                if(td.innerHTML.trim()!==soll[i]) return false;
                if(td.tagName!=="TD") return false;
              }
              return true;
            }
          }
        },
        info: "Die zweite Zeile der Tabelle ist korrekt."
      },
      {
        data: ()=>{
          return {
            test: async(label)=>{
              let table=label.$el.querySelectorAll("table");
              if(table.length!==1) return false;
              table=table[0];
              let tr=table.children[0].children[2];
              if(!tr) return false;
              if(tr.children.length!==4) return false;
              let soll=["Deutschland", "84 Mio.", "Berlin", "7,26 t"];
              for(let i=0;i<soll.length;i++){
                let td=tr.children[i];
                if(td.innerHTML.trim()!==soll[i]) return false;
                if(td.tagName!=="TD") return false;
              }
              return true;
            }
          }
        },
        info: "Die dritte Zeile der Tabelle ist korrekt."
      },
      {
        data: ()=>{
          return {
            test: async(label)=>{
              let table=label.$el.querySelectorAll("table");
              if(table.length!==1) return false;
              table=table[0];
              let tr=table.children[0].children[3];
              if(!tr) return false;
              if(tr.children.length!==4) return false;
              let soll=["Kenia", "55 Mio.", "Nairobi", "0,37 t"];
              for(let i=0;i<soll.length;i++){
                let td=tr.children[i];
                if(td.innerHTML.trim()!==soll[i]) return false;
                if(td.tagName!=="TD") return false;
              }
              return true;
            }
          }
        },
        info: "Die vierte Zeile der Tabelle ist korrekt."
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
              let table=label.$el.querySelectorAll("table");
              if(table.length!==1) return false;
              table=table[0];
              if(table.nextSibling) return false;
              if(table.previousElementSibling) return false;
              if(table.previousSibling?.textContent.trim().length>0) return false;
              return true;
            }
          }
        },
        info: "Es gibt außer der Tabelle keine weiteren Elemente."
      }
    ],
    test: async (tc,init)=>{
      let label=init.label;
      if(!label) return false;
      return await tc.test(label,init.doc);
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