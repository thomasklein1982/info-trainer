<template>
  <ExerciseBody :exercise="$data" :java="project">
      Die angezeigte UI besteht ausschließlich aus JLabels. Implementiere die benötigten CSS-Regeln.
      <div class="float-right">
        <AppPreview width="7rem">
          <JFrame layout="1">
            <JLabel style="background-color: red">Label 1</JLabel>
            <JLabel style="color: blue">Label 2</JLabel>
            <JLabel style="text-decoration: underline; font-style: italic;">Label 3</JLabel>
            <JLabel style="font-size: 200%">Label 4</JLabel>
            <JLabel style="border: 4pt solid green; background-color: yellow">Label 5</JLabel>
            <JLabel style="font-variant: small-caps; font-weight: bold">Label 6</JLabel>
          </JFrame>
        </AppPreview>
      </div>
      Einige Anmerkungen:
      <ul>
        <li>Es werden nur die Farben <code>green</code>, <code>blue</code>, <code>yellow</code> und <code>red</code> verwendet.</li>
        <li>An einer Stelle ist die Schrift doppelt so groß wie normal.</li>
        <li>Der Rahmen hat eine Dicke von <code>4pt</code>.</li>
      </ul>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "css1",
  title: "Labels mit CSS",
  check: {
    init: async ()=>{
      let labels=[];
      for(let i=1;i<=6;i++){
        let l=$Exercise.getComponent("JLabel",(e)=>{return e.getValue().trim()==="Label "+i});
        labels.push(l);
      }
      return {
        labels
      };
    },
    testcases: [
      {
        data: ()=>{
          return {
            check: (labels)=>{
              let l=labels[0];
              if(!l) throw "Es gibt kein 'Label 1'.";
              let cs=$Exercise.getComputedStyle(l);
              if(cs.backgroundColor!=="rgb(255, 0, 0)"){
                throw "Die Hintergrundfarbe ist nicht korrekt."
              }
              return true;
            }
          }
        },
        info: "Das JLabel 'Label 1' ist korrekt."
      },
      {
        data: ()=>{
          return {
            check: (labels)=>{
              let l=labels[1];
              if(!l) throw "Es gibt kein 'Label 2'.";
              let cs=$Exercise.getComputedStyle(l);
              if(cs.color!=="rgb(0, 0, 255)"){
                throw "Die Schriftfarbe ist nicht korrekt."
              }
              return true;
            }
          }
        },
        info: "Das JLabel 'Label 2' ist korrekt."
      },
      {
        data: ()=>{
          return {
            check: (labels)=>{
              let l=labels[2];
              if(!l) throw "Es gibt kein 'Label 3'.";
              let cs=$Exercise.getComputedStyle(l);
              if(cs.fontStyle!=="italic"){
                throw "Die Schrift ist nicht kursiv."
              }
              
              if(!cs.textDecoration.startsWith("underline")){
                throw "Der Text ist nicht unterstrichen."
              }
              return true;
            }
          }
        },
        info: "Das JLabel 'Label 3' ist korrekt."
      },
      {
        data: ()=>{
          return {
            check: (labels)=>{
              let l=labels[3];
              if(!l) throw "Es gibt kein 'Label 4'.";
              let panel=l.getPanel();
              let comp=$new(JLabel,"Label 1");
              panel.add(comp);
              comp.setCSS("font-size: 200%");
              let res=$Exercise.compareStyles(l,comp,["font-size"]);
              panel.remove(comp);
              if(!res.ok){
                throw res.keys.join("; ");
              }
              return res.ok;
            }
          }
        },
        info: "Das JLabel 'Label 4' ist korrekt."
      },
      {
        data: ()=>{
          return {
            check: async (labels)=>{
              let l=labels[4];
              if(!l) throw "Es gibt kein 'Label 5'.";
              let panel=l.getPanel();
              let comp=$new(JLabel,"Label 1");
              panel.add(comp);
              comp.setCSS("border: 4pt solid green; background-color: yellow;");
              let res=$Exercise.compareStyles(l,comp,["border","background-color"]);
              panel.remove(comp);
              if(!res.ok){
                throw res.keys.join("; ");
              }
              return res.ok;
            }
          }
        },
        info: "Das JLabel 'Label 5' ist korrekt."
      },
      {
        data: ()=>{
          return {
            check: async (labels)=>{
              let l=labels[5];
              if(!l) throw "Es gibt kein 'Label 6'.";
              let panel=l.getPanel();
              let comp=$new(JLabel,"Label 1");
              panel.add(comp);
              comp.setCSS("font-weight: bold; font-variant: small-caps");
              let res=$Exercise.compareStyles(l,comp,["font-weight","font-variant"]);
              panel.remove(comp);
              if(!res.ok){
                throw res.keys.join("; ");
              }
              return res.ok;
            }
          }
        },
        info: "Das JLabel 'Label 6' ist korrekt."
      },
    ],
    test: async (tc,init)=>{
      return await tc.check(init.labels);
    },
  },
  project: {
    name: "Steckbrief",
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
          "name": "Labels",
          "components":[
            {
              "type": "JLabel",
              "value": "Label 1",
            },
            {
              "type": "JLabel",
              "value": "Label 2",
            },
            {
              "type": "JLabel",
              "value": "Label 3",
            },
            {
              "type": "JLabel",
              "value": "Label 4",
            },
            {
              "type": "JLabel",
              "value": "Label 5",
            },
            {
              "type": "JLabel",
              "value": "Label 6",
            }
          ]
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