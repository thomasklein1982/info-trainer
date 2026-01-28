<template>
  <ExerciseBody :exercise="$data" :java="project">
    <BeePreview :world="world" width="14rem" style="float: right">
      <GameObject image="bee" text="lisa" pos="B"/>
      <GameObject image="" text="A" pos="1" align="center" />
      <GameObject image="" text="B" pos="2" align="center"/>
      <GameObject image="" text="C" pos="3" align="center" />
      <GameObject image="" text="D" pos="4" align="center"/>
    </BeePreview>
    Implementiere die Methode <Code inline>void program( Bee lisa )</Code>, die das folgende Problem löst:
    <p>Auf vier Feldern stehen zu Beginn die Buchstaben 'A', 'B', 'C' und 'D'. Die Biene Lisa auf diese Felder die Texte <strong>'Info'</strong>, <strong>'ist'</strong>, <strong>'cool'</strong> und <strong>'!'</strong> schreiben.</p>
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
  id: "bee-print-2",
  cheats: ["bee"],
  title: "Info ist cool!",
  world: [
    "WW..WW",
    "B1234W",
    "W.WW.W",
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
        info: "Auf dem Feld 'A' steht am Programmende das Wort 'Info'.",
        data: {
          feld: "f1",
          wort: "Info"
        }
      },
      {
        info: "Auf dem Feld 'B' steht am Programmende das Wort 'ist'.",
        data: {
          feld: "f2",
          wort: "ist"
        }
      },
      {
        info: "Auf dem Feld 'B' steht am Programmende das Wort 'cool'.",
        data: {
          feld: "f3",
          wort: "cool"
        }
      },
      {
        info: "Auf dem Feld 'B' steht am Programmende das Zeichen '!'.",
        data: {
          feld: "f4",
          wort: "!"
        }
      },
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
    "WW..WW",
    "B1234W",
    "W.WW.W",
  ];
              let g=await GameWorld.createFromDefString(defString, 5, 4);
              let bee=await $App.asyncFunctionCall(new Bee(),'$constructor',[null,"lisa",g]);
              await bee.insertAt("B");
              let f1=await g.getNamedField("1");
              await f1.setValue("A");
              let f2=await g.getNamedField("2");
              await f2.setValue("B");
              let f3=await g.getNamedField("3");
              await f3.setValue("C");
              let f4=await g.getNamedField("4");
              await f4.setValue("D");
              return {
                bee, gameworld: g, f1,f2,f3,f4
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