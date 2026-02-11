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
  id: "beep-target-7",
  cheats: ["beep"],
  title: "Lisa fliegt zu mehreren Blumen, ultimative Variante!",
  beep: {
    world: [
      ".....1",
      "2...3.",
      "....W.",
      "......",
      ".4B.5.",
      ".6...."
    ],
    maxMoveCount: 17,
    worldWidth: "14rem",
    setupFunc: function(gameworld){
      let f1=new Flower("1","",gameworld,"blue");
      let f2=new Flower("2","",gameworld,"red");
      let f3=new Flower("3","",gameworld,"green");
      let f4=new Flower("4","",gameworld,"blue");
      let f5=new Flower("5","",gameworld,"red");
      let f6=new Flower("6","",gameworld,"green");
      let bee=new Bee("B","Lisa",gameworld);
      return {
        f1, f2, f3, f4,f5,f6,bee
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
        info: "Die Biene erreicht die Blume oben links.",
        check: function(gameworld,data,isProgramOver){
          let bee=gameworld.objects.bee;
          let f=gameworld.objects.f2;
          return bee.isOnSameField(f);
        }
      },
      {
        info: "Die Biene erreicht die Blume oben rechts.",
        check: function(gameworld,data,isProgramOver){
          let bee=gameworld.objects.bee;
          let f=gameworld.objects.f1;
          return bee.isOnSameField(f);
        }
      },
      {
        info: "Die Biene erreicht die Blume oben rechts neben dem Baum.",
        check: function(gameworld,data,isProgramOver){
          let bee=gameworld.objects.bee;
          let f=gameworld.objects.f3;
          return bee.isOnSameField(f);
        }
      },
      {
        info: "Die Biene erreicht die Blume neben ihrem Startfeld.",
        check: function(gameworld,data,isProgramOver){
          let bee=gameworld.objects.bee;
          let f=gameworld.objects.f4;
          return bee.isOnSameField(f);
        }
      },
      {
        info: "Die Biene erreicht die Blume unten links.",
        check: function(gameworld,data,isProgramOver){
          let bee=gameworld.objects.bee;
          let f=gameworld.objects.f6;
          return bee.isOnSameField(f);
        }
      },
      {
        info: "Die Biene erreicht die Blume unten rechts.",
        check: function(gameworld,data,isProgramOver){
          let bee=gameworld.objects.bee;
          let f=gameworld.objects.f5;
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