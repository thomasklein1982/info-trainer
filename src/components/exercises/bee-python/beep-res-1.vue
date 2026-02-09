<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Die Biene Lisa muss zur Blume fliegen und dort stehen bleiben.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';
import { Bee } from './Bee';
import { Flower } from './Flower';



export const data={
  id: "beep-res-1",
  cheats: ["beep"],
  title: "Die Biene muss zur Blume, Teil 1",
  beep: {
    language: "python",
    reverse: true,
    world: [
      "WWWWW",
      "B..1F",
      "WWWWW",
    ],
    worldWidth: "15rem",
    window: [5,3],
    setupFunc: function(gameworld){
      let flower=new Flower("F","",gameworld,"blue");
      let bee=new Bee("B","Lisa",gameworld);
      return {
        flower, bee
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
        }
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