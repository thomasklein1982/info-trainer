<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Biene Lisa muss den Text, der auf dem gelben Feld steht, auf das rote Feld übertragen.
  </ExerciseBody>
</template>

<script>
import { createBeeClazz, GameObjectClazz, GameWorldClazz } from './clazzes';
import FlowerJSON from "./graphics/flower.json";


export const data={
  id: "bee-if",
  title: "Wo geht's zur Blume?",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {
        a: await $new(Main)
      }
    },
    testcases: [
      {
        info: "Biene Lisa befindet sich am Programmende auf der Blume, wenn die Blume oben ist.",
        data: {
          index: 0
        }
      },
      {
        info: "Biene Lisa befindet sich am Programmende auf der Blume, wenn die Blume unten ist.",
        data: {
          index: 1
        }
      },
    ],
    test: async (tc,init)=>{
      let index = tc.index;
      let infos=await init.a.$appPreviewMethod({seed: 1},index);
      infos.bee.toMaxSpeed();
      await init.a.program(infos.bee);
      return (await infos.bee.getField()===await infos.flower.getField());
    }
  },
  project: {
    name: "Bee",
    exerciseData: {
      showAppPreviewWhenNotRunning: true,
      seed: 100,
      seedChange: 1
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
            jsCode: `async $appPreviewMethod(exerciseData, index){
              let dirs=["L","R"];
              if(index===undefined){
                index=exerciseData.seed;
              }
              let dir=dirs[index%dirs.length];
              let defString=[
                "WWWWWW",
                "WWWWWW",
                "B..DWW",
                "WWWWWW",
                "WWWWWW"
              ];
              if(dir==="L"){
                defString[0]=$Exercise.replaceInString(defString[0],3,"F");
                defString[1]=$Exercise.replaceInString(defString[0],3,".");
              }else{
                defString[4]=$Exercise.replaceInString(defString[0],3,"F");
                defString[3]=$Exercise.replaceInString(defString[0],3,".");
              }
              let g=await GameWorld.createFromDefString(defString, 6, 5);
              let flower=await $App.asyncFunctionCall(new GameObject(),'$constructor',[null,"",g,"${FlowerJSON.dataurl}"]);
              await flower.insertAt("F");
              let bee=await $App.asyncFunctionCall(new Bee(),'$constructor',[null,"lisa",g]);
              await bee.insertAt("B");
              let f=await g.getNamedField("D");
              await f.setValue(dir);
              return {
                bee, gameworld: g, dir, flower
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
    
  },
  data() {
      return data;
  },
}
</script>