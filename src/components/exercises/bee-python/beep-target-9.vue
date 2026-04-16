<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Lisa muss wieder einmal zur Blume fliegen. Das ist einfach, oder? Dieses Mal darfst du aber nur {{ beep.maxMoveCount }} Move-Befehl verwenden!</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


import { Bee } from './Bee';
import { Flower } from './Flower';



export const data={
  id: "beep-target-9",
  cheats: ["beep"],
  title: "Lisa will zur Blume",
  beep: {
    world: [
      "WWWWW",
      "B...F",
      "WWWWW"
    ],
    points: 2,
    maxMoveCount: 1,
    worldWidth: "13rem",
    setupFunc: function(gameworld){
      return {
        flower: new Flower("F","",gameworld),
        bee: new Bee("B","Lisa",gameworld)
      };
    },
    resetFunc: function(gameworld, data){
      
    },
    testdata: {
      create: function(index){
        return {};
      },
      count: 1
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
        },
        points: 2
      }
    ]
  },
};

export default{
  components: {
    
  },
  data() {
      return data;
  }
}
</script>