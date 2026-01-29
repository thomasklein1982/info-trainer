<template>
  <ExerciseBody :exercise="$data" :java="project">
    <BeePreview :world="world" width="14rem" style="float: right">
      <GameObject image="bee" text="lisa" pos="B"/>
      <GameObject image="flower" text="" pos="F"/>
    </BeePreview>
    Implementiere die Methode <Code inline>void program( Bee lisa )</Code>, die das folgende Problem löst:
    <p>Die Biene Lisa muss zur Blume fliegen und dort stehen bleiben.</p>
  </ExerciseBody>
</template>

<script>
import BeePreview from '../../bee-preview.vue';
import GameObject from '../../game-object.vue';
import { createBeeClazz, GameObjectClazz, GameWorldClazz } from './clazzes';
import FlowerJSON from './graphics/flower.json';

let beeClazz=createBeeClazz();

export const data={
  id: "bee-target-1",
  cheats: ["bee"],
  title: "Erste Flügelschläge",
  world: [
    "WWWWW",
    "B...F",
    "WWWWW"
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
          info: "Biene Lisa befindet sich am Programmende auf der Blume."
        }
      ],
    test: async (tc,init)=>{
      let infos=await init.a.$appPreviewMethod();
      infos.bee.toMaxSpeed();
      await init.a.program(infos.bee);
      return (await infos.bee.isOnSameField(infos.flower));
    }
  },
  project: {
    name: "Bee",
    slowMode: true,
    exerciseData: {
      showAppPreviewWhenNotRunning: true
    },
    clazzes: [
      {
        name: "Main",
        uml: false,
        hiddenMethods: [
          {
            name: "$realMainMethod",
            jsCode: `async $realMainMethod(exerciseData){
              let infos=await this.$appPreviewMethod();
              await this.program(infos.bee);
            }`
          },
          {
            name: "$appPreviewMethod",
            jsCode: `async $appPreviewMethod(){
              
              let defString=[
                "WWWWW",
                "B...F",
                "WWWWW"
              ];
              let g=await GameWorld.createFromDefString(defString,0,0);
              let flower=await $App.asyncFunctionCall(new GameObject(),'$constructor',[null,"",g,"${FlowerJSON.dataurl}"]);
              await flower.insertAt("F");
              let bee=await $App.asyncFunctionCall(new Bee(),'$constructor',[null,"lisa",g]);
              await bee.insertAt("B");
              return {
                bee, gameworld: g, flower
              };
            }`
          }
        ],
        src: `$void program( Bee lisa ){
  //hierhin kommt der Code
  
}`
      },
      beeClazz,
      GameObjectClazz,
      GameWorldClazz  
    ]
  }
};

export default{
  components: {
    BeePreview, GameObject
  },
  data() {
      return data;
  },
}
</script>