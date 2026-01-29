<template>
  <ExerciseBody :exercise="$data" :java="project">
    <BeePreview :world="world" width="14rem" style="float: right">
      <GameObject image="bee" text="lisa" pos="B"/>
      <GameObject image="" text="" pos="G" align="center" style="background-color: yellow"/>
      <GameObject image="" text="" pos="R" style="background-color: red"/>
    </BeePreview>
    Implementiere die Methode <Code inline>void program( Bee lisa )</Code>, die das folgende Problem löst:
    <p>Die Biene Lisa soll das Wort "Hallo" auf das gelbe Feld und das Wort "Welt" auf das rote Feld schreiben.</p>
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
  id: "bee-print",
  cheats: ["bee"],
  title: "Biene Lisa sagt 'Hallo Welt'",
  world: [
    "..W.W",
    "WW..W",
    "WBGRW",
    "W.WW.",
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
        info: "Auf dem gelben Feld steht am Programmende das Wort 'Hallo'.",
        data: {
          feld: "gelb",
          wort: "Hallo"
        }
      },
      {
        info: "Auf dem roten Feld steht am Programmende das Wort 'Welt'.",
        data: {
          feld: "rot",
          wort: "Welt"
        }
      }
    ],
    test: async (tc,init)=>{
      let infos=await init.a.$appPreviewMethod({seed: 1});
      infos.bee.toMaxSpeed();
      await init.a.program(infos.bee);

      let res=await infos[tc.feld].getValue();
      return (res===tc.wort);
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
            jsCode: `async $appPreviewMethod(exerciseData){
              let defString=[
                "..W.W",
    "WW..W",
    "WBGRW",
    "W.WW.",
              ];
              let g=await GameWorld.createFromDefString(defString,0,0);
              let bee=await $App.asyncFunctionCall(new Bee(),'$constructor',[null,"lisa",g]);
              await bee.insertAt("B");
              let rot=await g.getNamedField("R");
              await rot.setStyle("background-color","red");
              let gelb=await g.getNamedField("G");
              await gelb.setStyle("background-color","yellow");
              return {
                bee, gameworld: g, rot, gelb
              };
            }`
          }
        ],
        src: `$void program( Bee lisa ){
  //hierhin kommt der Code
  lisa.print("Hey?");

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