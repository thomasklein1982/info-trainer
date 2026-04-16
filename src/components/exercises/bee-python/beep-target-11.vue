<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Die Blume befindet sich auf einem zufälligen Feld. Auf den hervorgehobenen Feldern steht, wie viele Felder Lisa von ihrem Start-Feld aus nach rechts und nach oben fliegen muss, um die Blume zu erreichen. <span class="no-print">(Das Start-Feld ist rot hervorgehoben.)</span></p>
    <p>Lisa soll zur Blume fliegen und dort stehen bleiben.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


import { Bee } from './Bee';
import { Flower } from './Flower';


export const data={
  id: "beep-target-11",
  cheats: ["beep"],
  points: 5,
  title: "Finde die Blume.",
  points: 18,
  beep: {
    world: [
      ".....",
      ".....",
      ".....",
      ".....",
      "B1234"
    ],
    worldWidth: "17rem",
    setupFunc: function(gameworld){
      return {
        flower: new Flower("1","",gameworld),
        bee: new Bee("B","Lisa",gameworld)
      };
    },
    resetFunc: function(gameworld, data){
      let f=gameworld.getField(data.x,data.y);
      gameworld.objects.flower.setPosition(f.x+1,f.y+1);
      f=gameworld.getNamedField("1");
      f.text="Nach rechts:";
      f=gameworld.getNamedField("3");
      f.text="Nach oben:";
      f=gameworld.getNamedField("2");
      f.cssClass="em-field-1";
      f.text=data.x;
      f=gameworld.getNamedField("4");
      f.cssClass="em-field-1";
      f.text=data.y;
      f=gameworld.getNamedField("B");
      f.cssClass="em-field-2";
    },
    testdata: {
      create: function(index){
        let x=random(1,4);
        let y=random(1,4);
        return { x,y };
      },
      count: 10
    },
    src: ``
  },
  check: {
    testcases: [
      {
        info: "Lisa schafft es in jedem Fall bis zur Blume.",
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