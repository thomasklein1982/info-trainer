<template>
  <ExerciseBody :exercise="$data" :java="project">
      Implementiere den abgebildeten Steckbrief von <a href="https://de.wikipedia.org/wiki/Grace_Hopper" target="_blank">Grace Hopper</a>.
      <div class="float-right">
        <AppPreview width="14rem">
          <JFrame layout="1">
            <JPanel layout="2">
              <JLabel>Grace Hopper</JLabel>
              <JImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Grace_Hopper.jpg/330px-Grace_Hopper.jpg"/>
              <JLabel>Geboren:</JLabel><JLabel>09.12.1906</JLabel>
              <JLabel>Hobbys:</JLabel><JLabel>Computer, Seefahrt</JLabel>
            </JPanel>
          </JFrame>
        </AppPreview>
      </div>
      <p>Einige Details:</p>
      <ul>
        <li>Es dürfen nur Labels, Images und Panels verwendet werden.</li>
        <li>Das Bild <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Grace_Hopper.jpg/330px-Grace_Hopper.jpg" target="_blank">findest du hier</a>. <Button class="clipboard" size="small" text data-clipboard-text="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Grace_Hopper.jpg/330px-Grace_Hopper.jpg" icon="pi pi-copy"/></li>
      </ul>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "steck",
  title: "Steckbrief",
  check: {
    init: async ()=>{
      return {
        name: $Exercise.getComponent("JLabel",(e)=>{return e.getValue().trim()==="Grace Hopper"}),
        geboren: $Exercise.getComponent("JLabel",(e)=>{return e.getValue().trim()==="Geboren:"}),
        geburtstag: $Exercise.getComponent("JLabel",(e)=>{return e.getValue().trim()==="09.12.1906"}),
        image: $Exercise.getComponent("JImage",(e)=>{return e.getValue().trim()==="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Grace_Hopper.jpg/330px-Grace_Hopper.jpg"}),
        hobbys: $Exercise.getComponent("JLabel",(e)=>{return e.getValue().trim()==="Hobbys:"}),
        hobbysWert: $Exercise.getComponent("JLabel",(e)=>{return e.getValue()==="Computer, Seefahrt"})
      };
    },
    testcases: [
      {
        data: ()=>{
          return {
            id: "name",
          }
        },
        info: "Es gibt ein JLabel, in dem 'Grace Hopper' steht."
      },
      {
        data: ()=>{
          return {
            id: "image"
          }
        },
        info: "Es gibt ein JImage, in dem das Bild mit der URL 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Grace_Hopper.jpg/330px-Grace_Hopper.jpg' angezeigt wird."
      },
      {
        data: ()=>{
          return {
            id: "geboren"
          }
        },
        info: "Es gibt ein JLabel, in dem 'Geboren:' steht."
      },
      {
        data: ()=>{
          return {
            id: "geburtstag"
          }
        },
        info: "Es gibt ein JLabel, in dem '09.12.1906' steht."
      },
      {
        data: ()=>{
          return {
            id: "hobbys"
          }
        },
        info: "Es gibt ein JLabel, in dem 'Hobbys:' steht."
      },
      {
        data: ()=>{
          return {
            id: "hobbysWert"
          }
        },
        info: "Es gibt ein JLabel, in dem 'Computer, Seefahrt' steht."
      },
      {
        data: ()=>{
          return {
            id: "layout"
          }
        },
        info: "Die Komponenten sind korrekt angeordnet."
      },
    ],
    test: async (tc,init)=>{
      if(tc.id==="layout"){
        console.log("test layout");
        if(!$Exercise.isLeftRight(init.name,init.image)){
          throw "Das Bild ist nicht rechts vom Namen.";
        }
        console.log("bild, name");
        if(!$Exercise.isLeftRight(init.geboren,init.geburtstag)){
          throw "Der Geburtstag ist nicht rechts von 'Geboren:'.";
        }
        console.log("geburtstag");
        if(!$Exercise.isTopBottom(init.name,init.geboren,init.hobbys)){
          throw "Name, 'Geboren:' und 'Hobbys' stehen nicht übereinander.";
        }
        console.log("linke spalte");
        if(!$Exercise.isTopBottom(init.image,init.geburtstag,init.hobbysWert)){
          throw "Bild, Geburtstag und Hobbys sind nicht übereinander.";
        }
        console.log("passt");
        return true;
      }else{
        return (init[tc.id]!==null);
      }
    },
  },
  project: {
    name: "Steckbrief",
    clazzes:  [
      {
        name: "Main",
        src: `
$void main(){
  
}`,
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