<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Die Biene Lisa muss zur Blume fliegen und dort stehen bleiben. Außerdem muss sie die Zahl auf dem Feld um 1 erhöhen.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';
import { Bee } from './Bee';
import { Flower } from './Flower';



export const data={
  id: "beep-target-1",
  cheats: ["beep"],
  title: "Erste Flügelschläge",
  beep: {
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