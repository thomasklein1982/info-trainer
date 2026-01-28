<template>
  <ExerciseBody :exercise="$data" :java="project">
    <BeePreview :world="world" width="10rem" style="float: right">
      <GameObject image="bee" text="lisa" pos="B"/>
      <GameObject image="" text="Wabe" pos="G" align="center" style="background-color: yellow"/>
      <GameObject image="" text="" pos="R" style="background-color: red"/>
    </BeePreview>
    Implementiere die Methode <Code inline>void program( Bee lisa )</Code>, die das folgende Problem löst:
    <p>Die Biene Lisa muss den Text, der auf dem gelben Feld steht, auf das rote Feld übertragen.</p>
  </ExerciseBody>
</template>

<script>
import { Random } from '../../../other/random';
import { createBeeClazz, GameObjectClazz, GameWorldClazz } from './clazzes';
import FlowerJSON from "./graphics/flower.json";
import BeeJSON from "./graphics/bee.json";
import GameObject from '../../game-object.vue';
import BeePreview from '../../bee-preview.vue';


export const data={
  id: "bee-copy",
  cheats: ["bee"],
  title: "Die Kopier-Biene",
  world: [
    "WWWW",
    "B.GW",
    "W..W",
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
        info: "Auf dem roten Feld steht am Programmende derselbe Text wie auf dem gelben Feld.",
        count: 5
      }
    ],
    test: async (tc,init)=>{
      let index = tc.$run.index;
      let infos=await init.a.$appPreviewMethod({seed: 1},index);
      infos.bee.toMaxSpeed();
      await init.a.program(infos.bee);
      let res=await infos.rot.getValue();
      return (infos.word===res);
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
              let words=["Honig","Maja","Willy","Wabe","Flug"];
              if(index===undefined){
                index=exerciseData.seed;
              }
              let word=words[index%words.length];
              let defString=[
                "WWWW",
                "B.GW",
                "W..W",
                "W.RW",
                "WWWW"
              ];
              let g=await GameWorld.createFromDefString(defString, 4, 5);
              let bee=await $App.asyncFunctionCall(new Bee(),'$constructor',[null,"lisa",g]);
              await bee.insertAt("B");
              let gelb=await g.getNamedField("G");
              let rot=await g.getNamedField("R");
              await gelb.setStyle("background-color","yellow");
              await gelb.setValue(word);
              await rot.setStyle("background-color","red");
              return {
                bee, gameworld: g, word, rot
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