<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Die Biene Lisa zur Blume fliegen und dort stehen bleiben.</p>
  </ExerciseBody>
</template>

<script>
import { Bee } from './Bee';
import { Flower } from './Flower';



export const data={
  id: "beep-target-4",
  cheats: ["beep"],
  title: "Die Biene muss zur Blume, Teil 4",
  beep: {
    world: [
      "WWWWW",
      "B...F",
      "WWWWW",
    ],
    maxMoveCount: 1,
    worldWidth: "15rem",
    window: [5,3],
    setupFunc: function(gameworld){
      let f=new Flower("F","",gameworld,"blue");
      let bee=new Bee("B","Lisa",gameworld);
      return {
        f, bee
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
          let f=gameworld.objects.f;
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