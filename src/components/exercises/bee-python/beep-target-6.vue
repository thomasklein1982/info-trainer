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
  id: "beep-target-6",
  cheats: ["beep"],
  title: "Lisa fliegt zu mehreren Blumen, noch verschärftere Variante!",
  beep: {
    world: [
      "B...1",
      ".2W..",
      "..W..",
      "3...."
    ],
    maxMoveCount: 10,
    worldWidth: "14rem",
    setupFunc: function(gameworld){
      let f1=new Flower("1","",gameworld,"blue");
      let f2=new Flower("2","",gameworld,"red");
      let f3=new Flower("3","",gameworld,"green");
      let bee=new Bee("B","Lisa",gameworld);
      return {
        f1, f2, f3, bee
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
        info: "Die Biene erreicht die blaue Blume (oben rechts).",
        check: function(gameworld,data,isProgramOver){
          let bee=gameworld.objects.bee;
          let f=gameworld.objects.f1;
          return bee.isOnSameField(f);
        }
      },
      {
        info: "Die Biene erreicht die rote Blume (neben dem Baum).",
        check: function(gameworld,data,isProgramOver){
          let bee=gameworld.objects.bee;
          let f=gameworld.objects.f2;
          return bee.isOnSameField(f);
        }
      },
      {
        info: "Die Biene erreicht die grüne Blume (unten).",
        check: function(gameworld,data,isProgramOver){
          let bee=gameworld.objects.bee;
          let f=gameworld.objects.f3;
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