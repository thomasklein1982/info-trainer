<template>
  <ExerciseBody :exercise="$data" :java="project">
    Implementiere die Methode <Code inline>void program( Bee lisa )</Code>, die das folgende Problem löst:
    <p>Die Biene Lisa muss sich am Programmende auf dem Feld mit der Blume befinden.</p>
    <div style="display: flex; gap: 1rem;">
      <div>
        <BeePreview :world="world1" width="14rem">
          <GameObject image="bee" text="lisa" pos="B"/>
          <GameObject image="flower" text="" pos="F"/>
          <GameObject text="U" pos="D"/>
        </BeePreview>
        Möglichkeit 1: Die Blume befindet sich unten.
      </div>
      <div>
        <BeePreview :world="world2" width="14rem">
          <GameObject image="bee" text="lisa" pos="B"/>
          <GameObject image="flower" text="" pos="F"/>
          <GameObject text="O" pos="D"/>
        </BeePreview>
        Möglichkeit 2: Die Blume befindet sich oben.
      </div>
    </div>

    <Hint>Lisa kann nachschauen, ob die Blume oben (O) oder unten (U) ist.</Hint>
  </ExerciseBody>
</template>

<script>
import BeePreview from '../../bee-preview.vue';
import GameObject from '../../game-object.vue';
import { createBeeClazz, GameObjectClazz, GameWorldClazz } from './clazzes';
import FlowerJSON from "./graphics/flower.json";


export const data={
  id: "bee-if",
  cheats: ["bee"],
  title: "Wo geht's zur Blume?",
  world1: [
    "WWWWWW",
    "WWWWWW",
    "B..DWW",
    "WWW.WW",
    "WWWFWW"
  ],
  world2: [
    "WWWFWW",
    "WWW.WW",
    "B..DWW",
    "WWWWWW",
    "WWWWWW"
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
    slowMode: true,
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
              let dirs=["O","U"];
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
              if(dir==="O"){
                defString[0]=$Exercise.replaceInString(defString[0],3,"F");
                defString[1]=$Exercise.replaceInString(defString[0],3,".");
              }else{
                defString[4]=$Exercise.replaceInString(defString[0],3,"F");
                defString[3]=$Exercise.replaceInString(defString[0],3,".");
              }
              let g=await GameWorld.createFromDefString(defString,0,0);
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
    GameObject, BeePreview
  },
  data() {
      return data;
  },
}
</script>