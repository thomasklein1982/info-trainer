<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <GameObject
      :game-object="testObject"
    />
    <Test :object="testObject"></Test>
    <GameWorldComp
      :beep="beep"
      style="width: 15em"
    />
    Implementiere ein Programm, das das folgende Problem löst:
    <p>Die Biene Lisa muss zur Blume fliegen und dort stehen bleiben.</p>
  </ExerciseBody>
</template>

<script>
import BeePreview from '../../bee-preview.vue';
import {GameObject as GameObjectClazz} from './GameObject';
import GameWorldComp from '../../game-world.vue';
import FlowerJSON from '../bee/graphics/flower.json';
import BeeJSON from '../bee/graphics/bee.json';
import { GameWorld } from './GameWorld';
import GameObject from '../../game-object-component.vue';
import Test from '../../test.vue';




export const data={
  testObject: new GameObjectClazz("B","Fee"),
  id: "beep-target-1",
  cheats: ["beep"],
  title: "Erste Flügelschläge",
  beep: {
    worlds: [
      [
        "WWWWW",
        "B...F",
        "WWWWW",
      ]
    ],
    window: [5,3],
    setupFunc: function(gameworld){
      let flower=new GameObjectClazz("F","",gameworld,FlowerJSON.dataurl);
      let bee=new GameObjectClazz("B","Biene",gameworld,BeeJSON.dataurl);
      bee.rotation=90;
      if(!window.gameObjects) window.gameObjects=[];
      window.gameObjects.push(bee);
      // setTimeout(()=>{
      //   console.log("move");
      //   bee.setX(3);
      //   bee.rotation+=90;
      // },5000);
      return {
        bee, flower
      };
    },
    src: ``
  },
  check: {
    testcases: [
      {
        info: "Biene Lisa befindet sich am Programmende auf der Blume."
      }
    ],
    test: async (tc,init)=>{
      
    }
  },
};

export default{
  components: {
    BeePreview, GameObject, GameWorldComp, GameObject, Test
  },
  data() {
      return data;
  },
  mounted(){
    window.testObject=this.testObject;
    // let world1=new GameWorld(
    //   [
    //     "WWWWW",
    //     "B...F",
    //     "WWWWW",
    //   ], 5, 3,
    //   setupGameWorld
    // );
    // this.beep.worlds.push(world1);
  }
}
</script>