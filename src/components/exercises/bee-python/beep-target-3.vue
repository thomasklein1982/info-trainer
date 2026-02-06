<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Die Biene Lisa muss nacheinander zu beiden Blumen fliegen.</p>
  </ExerciseBody>
</template>

<script>
import { Bee } from './Bee';
import { Flower } from './Flower';



export const data={
  id: "beep-target-3",
  cheats: ["beep"],
  title: "Die Biene muss zur Blume, Teil 3",
  beep: {
    world: [
      "B..1...",
      "..WWW..",
      "..WWWW.",
      "..2....",
    ],
    maxMoveCount: 10,
    worldWidth: "15rem",
    window: [5,3],
    setupFunc: function(gameworld){
      let f1=new Flower("1","",gameworld,"blue");
      let f2=new Flower("2","",gameworld,"red");
      let bee=new Bee("B","Lisa",gameworld);
      return {
        f1, f2, bee
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
        info: "Die Biene erreicht die blaue Blume.",
        check: function(gameworld,data,isProgramOver){
          let bee=gameworld.objects.bee;
          let f=gameworld.objects.f1;
          return bee.isOnSameField(f);
        }
      },
      {
        info: "Die Biene erreicht die rote Blume.",
        check: function(gameworld,data,isProgramOver){
          let bee=gameworld.objects.bee;
          let f=gameworld.objects.f2;
          return bee.isOnSameField(f);
        }
      },
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