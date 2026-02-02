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
import { random } from '../../../other/random';


export const data={
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
    worldWidth: "15rem",
    window: [5,3],
    setupFunc: function(gameworld){
      let flower=new GameObjectClazz("F","",gameworld,FlowerJSON.dataurl);
      let bee=new GameObjectClazz("B","Biene",gameworld,BeeJSON.dataurl);
      return {
        flower, bee
      };
    },
    resetFunc: function(gameworld, data){
      let f=gameworld.getNamedField("1");
      f.text=data.zahl;
    },
    testdata: {
      create: function(index){
        let zahl=index===0? random(0,9): random(10,20);
        return {
          zahl: zahl
        }
      },
      count: 2
    },
    src: ``
  },
  check: {
    testcases: [
      {
        info: "Die Biene befindet sich am Programmende auf der Blume.",
        check: function(gameworld,data,isProgramOver){
          if(!isProgramOver) return false;
          let bee=gameworld.objects.bee;
          let f=gameworld.objects.flower;
          return bee.isOnSameField(f);
        }
      },
      {
        info: "Die Zahl auf dem roten Feld wurde um 1 erhöht.",
        check: function(gameworld,data,isProgramOver){
          let f=gameworld.getNamedField("1");
          return (f.text===data.zahl+1);
        }
      }
    ],
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