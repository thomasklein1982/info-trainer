<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Die Biene Lisa soll das Wort <strong>Hallo</strong> auf das gelbe Feld schreiben.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';
import { Bee } from './Bee';
import { Flower } from './Flower';



export const data={
  id: "beep-print-1",
  cheats: ["beep"],
  title: "Lisa sagt Hallo",
  beep: {
    world: [
      "WW..",
      "B.1.",
      "W.WW",
    ],
    worldWidth: "15rem",
    window: [5,3],
    setupFunc: function(gameworld){
      return {
        bee: new Bee("B","Lisa",gameworld)
      };
    },
    resetFunc: function(gameworld, data){
      gameworld.getNamedField("1").style.backgroundColor="yellow";
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
        info: "Auf dem gelben Feld steht das Wort 'Hallo'.",
        check: function(gameworld,data, isProgramOver){
          let ist=gameworld.getNamedField("1").text;
          return (ist==="Hallo");
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