<template>
  <ExerciseBody :exercise="$data" :java="project">
    <div class="float-right">
      <AppPreview width="8rem">
        <JFrame layout="1">
          <JPanel layout="2">
            <JButton @click="currentPage=1">Zu Seite 1</JButton>
            <JButton @click="currentPage=2">Zu Seite 2</JButton>
          </JPanel>
          <JLabel>Seite {{ currentPage }}</JLabel>
        </JFrame>
      </AppPreview>
    </div>
    Es soll eine App mit zwei verschiedenen Bildschirmen programmiert werden, bei der man per Buttonklick die Seite wechseln kann. Zu Beginn soll "Seite 1" angezeigt werden.
    <p>Implementiere diese Anforderungen.</p>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "seiten1",
  currentPage: 1,
  title: "Wechseln zwischen Bildschirmen",
  check: {
    init: async ()=>{
      return {
        lSeite1: $Exercise.getComponent("JLabel",(e)=>{return e.getValue().trim()==="Seite 1"}),
        lSeite2: $Exercise.getComponent("JLabel",(e)=>{return e.getValue().trim()==="Seite 2"}),
        bSeite1: $Exercise.getComponents("JButton",(e)=>{return e.getValue().trim()==="Zu Seite 1"}),
        bSeite2: $Exercise.getComponents("JButton",(e)=>{return e.getValue().trim()==="Zu Seite 2"}),
      };
    },
    testcases: [
      {
        data: ()=>{
          return {
            test: (init)=>{
              return ($Exercise.isComponentBeforeComponent(Seite2.$self,Seite1.$self));
            }
          }
        },
        info: "Am Anfang wird Seite 1 angezeigt."
      },
      {
        data: ()=>{
          return {
            test: async (init)=>{
              Seite1.show();
              await $Exercise.sleep(200);
              //if(!$Exercise.isComponentBeforeComponent(Seite2.$self,Seite1.$self)) return false;
              init.bSeite2[1].$el.click();
              await $Exercise.sleep(200);
              return ($Exercise.isComponentBeforeComponent(Seite1.$self,Seite2.$self));
              //return ($Exercise.isComponentBeforeComponent(Seite2.$self,Seite1.$self));
            }
          }
        },
        info: "Wenn man auf Seite 1 auf den Button 'Zu Seite 2' klickt, kommt man zu Seite 2."
      },
      {
        data: ()=>{
          return {
            test: async (init)=>{
              Seite2.show();
              await $Exercise.sleep(200);
              //if(!$Exercise.isComponentBeforeComponent(Seite2.$self,Seite1.$self)) return false;
              init.bSeite1[0].$el.click();
              await $Exercise.sleep(200);
              return ($Exercise.isComponentBeforeComponent(Seite2.$self,Seite1.$self));
              //return ($Exercise.isComponentBeforeComponent(Seite2.$self,Seite1.$self));
            }
          }
        },
        info: "Wenn man auf Seite 2 auf den Button 'Zu Seite 1' klickt, kommt man zu Seite 1."
      },
      {
        data: ()=>{
          return {
            test: async (init)=>{
              Seite1.show();
              //if(!$Exercise.isComponentBeforeComponent(Seite2.$self,Seite1.$self)) return false;
              await $Exercise.sleep(200);
              init.bSeite1[1].$el.click();
              await $Exercise.sleep(200);
              return ($Exercise.isComponentBeforeComponent(Seite2.$self,Seite1.$self));
              //return ($Exercise.isComponentBeforeComponent(Seite2.$self,Seite1.$self));
            }
          }
        },
        info: "Wenn man auf Seite 1 auf den Button 'Zu Seite 1' klickt, passiert nichts (man bleibt auf Seite 1)."
      },
      {
        data: ()=>{
          return {
            test: async (init)=>{
              Seite2.show();
              //if(!$Exercise.isComponentBeforeComponent(Seite2.$self,Seite1.$self)) return false;
              await $Exercise.sleep(200);
              init.bSeite2[0].$el.click();
              await $Exercise.sleep(200);
              return ($Exercise.isComponentBeforeComponent(Seite1.$self,Seite2.$self));
              //return ($Exercise.isComponentBeforeComponent(Seite2.$self,Seite1.$self));
            }
          }
        },
        info: "Wenn man auf Seite 2 auf den Button 'Zu Seite 2' klickt, passiert nichts (man bleibt auf Seite 2)."
      },
      {
        data: ()=>{
          return {
            test: async (init)=>{
              //if(!$Exercise.isComponentBeforeComponent(Seite2.$self,Seite1.$self)) return false;
              init.bSeite1[0].$el.click();
              await $Exercise.sleep(100);
              return ($Exercise.isComponentBeforeComponent(Seite2.$self,Seite1.$self));
              //return ($Exercise.isComponentBeforeComponent(Seite2.$self,Seite1.$self));
            }
          }
        },
        info: "Wenn man auf Seite 2 auf den Button 'Zu Seite 2' klickt, passiert nichts (man bleibt auf Seite 2)."
      }
    ],
    test: async (tc,init)=>{
      console.log(init);
      if(!init.lSeite1 || !init.lSeite2 || init.bSeite1.length===0 || init.bSeite2.length===0) return false;
      return await tc.test(init);
    },
  },
  project: {
    name: "Wechseln-zwischen-Seiten",
    clazzes: [
      {
        name: "Main",
        src: `
$void main(){
  
}

$void onAction( JComponent trigger ){
  
}`,
      },  
      {
        type: "UI",
        code: {
          "name": "Seite1",
          "components":[
          {
            "type": "JPanel",
            "components": [
              {
                "type": "JButton",
                "value": "Zu Seite 1",
                "x": 50,
                "y": 50,
                "width": 100,
                "height": 100,
                "name": "",
                "actionCommand": ""
              },
              {
                "type": "JButton",
                "value": "Zu Seite 2",
                "valueType": "html",
                "onAction": true,
                "actionCommand": "",
                "disabled": false,
                "x": 50,
                "y": 50,
                "width": 100,
                "height": 100,
                "cssClass": "jbutton",
                "cssCode": "",
                "invisible": false
              }
            ],
            "template": "2",
            "onAction": false,
            "actionCommand": "",
            "hideContent": false,
            "x": 50,
            "y": 50,
            "width": 100,
            "height": 100,
            "cssClass": "jpanel",
            "cssCode": "",
            "invisible": false
          },
          {
            "type": "JLabel",
            "value": "Seite 1",
            "valueType": "html",
            "onAction": false,
            "actionCommand": "",
            "align": "center",
            "x": 50,
            "y": 50,
            "width": 100,
            "height": 100,
            "cssClass": "jlabel",
            "cssCode": "",
            "invisible": false
          }
          ]
        }
      },
      {
        type: "UI",
        code: {
          "name": "Seite2",
          "components":[
          {
            "type": "JPanel",
            "components": [
              {
                "type": "JButton",
                "value": "Zu Seite 1",
                "x": 50,
                "y": 50,
                "width": 100,
                "height": 100,
                "name": "",
                "actionCommand": ""
              },
              {
                "type": "JButton",
                "value": "Zu Seite 2",
                "valueType": "html",
                "onAction": true,
                "actionCommand": "",
                "disabled": false,
                "x": 50,
                "y": 50,
                "width": 100,
                "height": 100,
                "cssClass": "jbutton",
                "cssCode": "",
                "invisible": false
              }
            ],
            "template": "2",
            "onAction": false,
            "actionCommand": "",
            "hideContent": false,
            "x": 50,
            "y": 50,
            "width": 100,
            "height": 100,
            "cssClass": "jpanel",
            "cssCode": "",
            "invisible": false
          },
          {
            "type": "JLabel",
            "value": "Seite 2",
            "valueType": "html",
            "onAction": false,
            "actionCommand": "",
            "align": "center",
            "x": 50,
            "y": 50,
            "width": 100,
            "height": 100,
            "cssClass": "jlabel",
            "cssCode": "",
            "invisible": false
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