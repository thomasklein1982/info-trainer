<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Auf dem gelben Feld steht eine Zahl. Lisa soll das Doppelte dieser Zahl auf das rote Feld schreiben.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


import { Bee } from './Bee';
import { Flower } from './Flower';



export const data={
  id: "beep-double",
  cheats: ["beep"],
  title: "Lisa kann verdoppeln!",
  beep: {
    world: [
      "W..W.",
      "B.G.R",
      ".WW.W"
    ],
    worldWidth: "15rem",
    setupFunc: function(gameworld){
      return {
        bee: new Bee("B","Lisa",gameworld)
      };
    },
    resetFunc: function(gameworld, data){
      let f=gameworld.getNamedField("G");
      f.text=data.a;
      f.style.backgroundColor="yellow";
      f=gameworld.getNamedField("R");
      f.style.backgroundColor="red";
    },
    testdata: {
      create: function(index){
        let a=random(3,20);
        return {
          a
        }
      },
      count: 4
    },
    src: ``
  },
  check: {
    testcases: [
      {
        info: "Im roten Feld steht das Doppelte der Zahl auf dem gelben Feld.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          let f=gameworld.getNamedField("R");
          return (f.text+""===data.a*2+"");
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