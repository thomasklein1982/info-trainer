<template>
  <ExerciseBody :exercise="$data" :java="project">
    <BeePreview :world="world" width="16rem" style="float: right">
      <GameObject image="bee" text="lisa" pos="B"/>
      <GameObject image="flower" text="" pos="1"/>
      <GameObject image="flower" text="" pos="2" style="filter: hue-rotate(125deg)"/>
    </BeePreview>Die Biene Lisa muss nacheinander zu beiden Blumen fliegen.
  </ExerciseBody>
</template>

<script>
import { Random } from '../../../other/random';
import BeePreview from '../../bee-preview.vue';
import GameObject from '../../game-object.vue';
import { createBeeClazz, GameObjectClazz, GameWorldClazz } from './clazzes';
import FlowerJSON from "./graphics/flower.json";

let beeClazz=createBeeClazz();
// beeClazz.isHidden=false;

export const data={
  id: "bee-target-2",
  title: "Biene Lisa fliegt zu mehreren Blumen",
  world: [
    "B..1...",
    "..WWW..",
    "..WWWW.",
    "..2....",
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
        info: "Biene Lisa ist zur blauen Blume geflogen.",
        data: {
          flower1: true
        }
      },
      {
        data: {
          flower1: false
        },
        info: "Biene Lisa ist zur roten Blume geflogen."
      }
    ],
    test: async (tc,init)=>{
      console.log("test");
      let infos=await init.a.$appPreviewMethod();
      infos.bee.toMaxSpeed();
      await init.a.program(infos.bee);
      let flower;
      if(tc.flower1){
        flower=infos.f1;
      }else{
        flower=infos.f2;
      }
      let field=await flower.getField();
      let count=await infos.bee.getFieldCount(field)
      return (count>0);
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
                "B..1...",
                "..WWW..",
                "..WWWW.",
                "..2....",
              ];
              let g=await GameWorld.createFromDefString(defString, 7, 4);
              let f1=await $App.asyncFunctionCall(new GameObject(),'$constructor',[null,"",g,"${FlowerJSON.dataurl}"]);
              await f1.insertAt("1");
              let f2=await $App.asyncFunctionCall(new GameObject(),'$constructor',[null,"",g,"${FlowerJSON.dataurl}"]);
              await f2.insertAt("2");
              await f2.image.setStyle("filter","hue-rotate(125deg)");
              let bee=await $App.asyncFunctionCall(new Bee(),'$constructor',[null,"lisa",g]);
              await bee.insertAt("B");
              return {
                bee, gameworld: g, f1,f2
              };
            }`
          }
        ],
        constraints: {
          maxStatementCount: 14
        },
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
    GameObject, BeePreview
  },
  data() {
      return data;
  },
}
</script>