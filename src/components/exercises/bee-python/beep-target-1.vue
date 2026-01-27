<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <GameWorldComp
      :gameworld="beep.worlds[0]"
      style="width: 15em"
    />
    Implementiere ein Programm, das das folgende Problem löst:
    <p>Die Biene Lisa muss zur Blume fliegen und dort stehen bleiben.</p>
  </ExerciseBody>
</template>

<script>
import BeePreview from '../../bee-preview.vue';
import {GameObject} from './GameObject';
import GameWorldComp from '../../game-world.vue';
import FlowerJSON from '../bee/graphics/flower.json';
import BeeJSON from '../bee/graphics/bee.json';
import { GameWorld } from './GameWorld';

let setupGameWorld=function(gameworld){
  let flower=new GameObject("F","",gameworld,FlowerJSON.dataurl);
  let bee=new GameObject("B","Biene",gameworld,BeeJSON.dataurl);
  bee.rotation=90;
  setTimeout(()=>{
    console.log("move");
    bee.setX(3);
    bee.rotation+=90;
  },5000);
  return {
    bee, flower
  };
}



export const data={
  id: "beep-target-1",
  cheats: ["beep"],
  title: "Erste Flügelschläge",
  beep: {
    worlds: [
      
    ],
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
    BeePreview, GameObject, GameWorldComp
  },
  data() {
      return data;
  },
  mounted(){
    let world1=new GameWorld(
      [
        "WWWWW",
        "B...F",
        "WWWWW",
      ], 5, 3,
      setupGameWorld
    );
    this.beep.worlds.push(world1);
  }
}
</script>