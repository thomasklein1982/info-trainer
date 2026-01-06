<template>
  <ExerciseBody :exercise="$data" :java="project">
    <BeePreview :world="world" width="14rem" style="float: right">
      <GameObject image="flower" pos="B"/>
      <GameObject image="flower" pos="R" style="filter: hue-rotate(125deg)"/>
      <GameObject image="bee" text="lisa" pos="1"/>
      <GameObject image="bee" text="fee" pos="2" :rotation="180"/>
    </BeePreview>
    Biene Lisa muss zur rechten Blume und Biene Fee muss zur linken Blume.
  </ExerciseBody>
</template>

<script>
import BeePreview from '../../bee-preview.vue';
import GameObject from '../../game-object.vue';
import { createBeeClazz, GameObjectClazz, GameWorldClazz } from './clazzes';
import FlowerJSON from './graphics/flower.json';

let beeClazz=createBeeClazz();

export const data={
  id: "bee-target-3",
  title: "Gegenverkehr",
  world: [
    "WWWWWW",
    "WW.WWW",
    "B1..2R",
    "WWWWWW",
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
          info: "Biene Lisa befindet sich am Programmende auf der rechten Blume.",
          data: {
            bee: "lisa",
            flower: "fr"
          }
        },
        {
          info: "Biene Fee befindet sich am Programmende auf der linken Blume.",
          data: {
            bee: "fee",
            flower: "fl"
          }
        }
      ],
    test: async (tc,init)=>{
      let infos=await init.a.$appPreviewMethod();
      infos.lisa.toMaxSpeed();
      infos.fee.toMaxSpeed();
      await init.a.program(infos.lisa,infos.fee);
      return (await infos[tc.bee].isOnSameField(infos[tc.flower]));
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
              await this.program(infos.lisa,infos.fee);
            }`
          },
          {
            name: "$appPreviewMethod",
            jsCode: `async $appPreviewMethod(){
              
              let defString=[
                "WWWWWW",
                "WW.WWW",
                "B1..2R",
                "WWWWWW",
              ];
              let g=await GameWorld.createFromDefString(defString, 6, 4);
              console.log("log");
              let fl=await $App.asyncFunctionCall(new GameObject(),'$constructor',[null,"",g,"${FlowerJSON.dataurl}"]);
              await fl.insertAt("B");
              let fr=await $App.asyncFunctionCall(new GameObject(),'$constructor',[null,"",g,"${FlowerJSON.dataurl}"]);
              await fr.image.setStyle("filter","hue-rotate(125deg)");
              await fr.insertAt("R");
              let lisa=await $App.asyncFunctionCall(new Bee(),'$constructor',[null,"lisa",g]);
              await lisa.insertAt("1");
              let fee=await $App.asyncFunctionCall(new Bee(),'$constructor',[null,"fee",g]);
              await fee.turnLeftInstantly(2);
              await fee.insertAt("2");
              return {
                lisa,fee, gameworld: g, fl, fr
              };
            }`
          }
        ],
        src: `$void program( Bee lisa, Bee fee ){
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