<template>
  <ExerciseBody :exercise="$data" :java="project">
    <BeePreview :world="world" width="10rem" style="float: right">
      <GameObject image="bee" text="lisa" pos="B"/>
      <GameObject image="" text="16" pos="G" align="center" style="background-color: yellow"/>
      <GameObject image="" text="" pos="R" style="background-color: red"/>
    </BeePreview>
    Implementiere die Methode <Code inline>void program( Bee lisa )</Code>, die das folgende Problem löst:
    <p>Auf dem gelben Feld (oben) steht irgendeine ganze Zahl. Die Biene Lisa soll das <strong>Doppelte dieser Zahl</strong> auf das rote Feld (unten) schreiben.</p>

    <Hint>Speichere die Zahl im gelben Feld erst einmal in einer Variablen.</Hint>
  </ExerciseBody>
</template>

<script>
import BeePreview from '../../bee-preview.vue';
import GameObject from '../../game-object.vue';
import { createBeeClazz, GameObjectClazz, GameWorldClazz } from './clazzes';
import FlowerJSON from "./graphics/flower.json";


export const data={
  id: "bee-double",
  cheats: ["bee"],
  title: "Die doppelte Biene",
  world: [
    "WWWW",
    "B.GW",
    "...W",
    "W.RW",
    "WWWW"
  ],
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {
        a: await $new(Main)
      }
    },
    testcases: [
      {
        info: "Auf dem roten Feld steht das Doppelte der Zahl auf dem gelben Feld.",
        count: 10
      }
    ],
    test: async (tc,init)=>{
      let random=new Random();
      await random.$constructor();
      number=await random.nextInt(20);
      console.log(number);
      let infos=await init.a.$appPreviewMethod({seed: 1},number);
      infos.bee.toMaxSpeed();
      await init.a.program(infos.bee);
      let v=await infos.rot.getValue();
      return (v*1===number*2);
    }
  },
  project: {
    name: "Bee",
    exerciseData: {
      showAppPreviewWhenNotRunning: true,
      seed: 100
    },
    clazzes: [
      {
        name: "Main",
        uml: false,
        hiddenMethods: [
          {
            name: "$realMainMethod",
            jsCode: `async $realMainMethod(exerciseData){
              let infos=await this.$appPreviewMethod(exerciseData);
              await this.program(infos.bee);
            }`
          },
          {
            name: "$appPreviewMethod",
            jsCode: `async $appPreviewMethod(exerciseData, number){
              let defString=[
    "WWWW",
    "B.GW",
    "...W",
    "W.RW",
    "WWWW"
  ];
              if(number===undefined){
                let random=new Random();
                await random.$constructor(exerciseData.seed);
                number=await random.nextInt(20);
              }
              let g=await GameWorld.createFromDefString(defString, 4, 5);
              let bee=await $App.asyncFunctionCall(new Bee(),'$constructor',[null,"lisa",g]);
              await bee.insertAt("B");
              let gelb=await g.getNamedField("G");
              await gelb.setValue(number);
              await gelb.setStyle("background-color","yellow");
              let rot=await g.getNamedField("R");
              await rot.setStyle("background-color","red");
              return {
                bee, gameworld: g, gelb, rot
              };
            }`
          }
        ],
        src: `$void program( Bee lisa ){
  //hierhin kommt der Code
  
}`
      },
      createBeeClazz(),
      GameObjectClazz,
      GameWorldClazz  
    ]
  }
};

export default{
  components: {
    GameObject, BeePreview
  },
  data() {
      return data;
  },
}
</script>