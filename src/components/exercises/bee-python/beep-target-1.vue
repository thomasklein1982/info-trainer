<template>
  <ExerciseBody :exercise="$data" :beep="beep">
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
import BeepEditor from '../../beep-editor/beep-editor.vue';


export const data={
  testObject: new GameObjectClazz("B","Fee"),
  id: "beep-target-1",
  cheats: ["beep"],
  title: "Erste Flügelschläge",
  beep: {
    worlds: [
      [
        "WWWWW",
        "B..1F",
        "WWWWW",
      ]
    ],
    worldWidth: "15em",
    window: [5,3],
    setupFunc: function(gameworld){
      let flower=new GameObjectClazz("F","",gameworld,FlowerJSON.dataurl);
      let bee=new GameObjectClazz("B","Biene",gameworld,BeeJSON.dataurl);
      return {
        flower, bee
      };
    },
    resetFunc: function(gameworld){
      let f=gameworld.getNamedField("1");
      f.style["background-color"]="red";
      f.text="bla";
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
    BeePreview, GameObject, GameWorldComp, GameObject, Test, BeepEditor
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