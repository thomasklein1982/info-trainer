<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Du siehst, dass einige Felder mit 'A', 'B' und 'C' markiert sind. Die Biene Lisa soll auf diese Felder die Wörter 'DiBi', 'ist' und 'cool' schreiben. Danach soll sie zur Blume fliegen und dort stehen bleiben.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';
import { Bee } from './Bee';
import { Flower } from './Flower';



export const data={
  id: "beep-print-2",
  cheats: ["beep"],
  title: "DiBi ist cool!",
  beep: {
    world: [
      "B123F",
    ],
    worldWidth: "15rem",
    window: [5,3],
    setupFunc: function(gameworld){
      return {
        f: new Flower("F","",gameworld,"blue"),
        bee: new Bee("B","Lisa",gameworld)
      };
    },
    resetFunc: function(gameworld, data){
      gameworld.getNamedField("1").text="A";
      gameworld.getNamedField("2").text="B";
      gameworld.getNamedField("3").text="C";
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
        info: "Auf dem 'A'-Feld steht am Ende 'DiBi'.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          let ist=gameworld.getNamedField("1").text;
          return (ist==="DiBi");
        }
      },
      {
        info: "Auf dem 'B'-Feld steht am Ende 'ist'.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          let ist=gameworld.getNamedField("2").text;
          return (ist==="ist");
        }
      },
      {
        info: "Auf dem 'C'-Feld steht am Ende 'cool'.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          let ist=gameworld.getNamedField("3").text;
          return (ist==="cool");
        }
      },
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