<template>
  <ExerciseBody :exercise="$data" :java="project">
    <BeePreview :world="world" width="10rem" style="float: right">
      <GameObject image="bee" text="lisa" pos="B"/>
      <GameObject image="flower" text="" pos="F"/>
    </BeePreview>
    Die Biene Lisa muss zur Blume fliegen.
  </ExerciseBody>
</template>

<script>
import BeePreview from '../../bee-preview.vue';
import GameObject from '../../game-object.vue';
import { createBeeClazz, GameObjectClazz, GameWorldClazz } from './clazzes';
import FlowerJSON from './graphics/flower.json';

let beeClazz=createBeeClazz();

export const data={
  id: "bee-target",
  title: "Biene Lisa muss zur Blume",
  world: [
    "....",
    ".WWF",
    ".WWW",
    "B...",
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
                "....",
                ".WWF",
                ".WWW",
                "B...",
              ];
              let g=await GameWorld.createFromDefString(defString, 4, 4);
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