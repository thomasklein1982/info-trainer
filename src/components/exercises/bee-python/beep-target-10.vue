<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Die Blume befindet sich auf einem zufälligen Feld. Auf dem hervorgehobenen Feld steht, wie weit die Blume am Anfang von Lisa entfernt ist.</p>
    <p>Lisa soll zur Blume fliegen und dort stehen bleiben.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


import { Bee } from './Bee';
import { Flower } from './Flower';


export const data={
  id: "beep-target-10",
  cheats: ["beep"],
  pointsPrint: 3,
  title: "Finde die Blume.",
  beep: {
    world: [
      "WWWWWW",
      "GB1234",
      "WWWWWW"
    ],
    maxMoveCount: 1,
    worldWidth: "17rem",
    setupFunc: function(gameworld){
      return {
        flower: new Flower("1","",gameworld),
        bee: new Bee("B","Lisa",gameworld)
      };
    },
    resetFunc: function(gameworld, data){
      let f=gameworld.getNamedField(data.feld+"");
      gameworld.objects.flower.setPositionToField(f);
      f=gameworld.getNamedField("G");
      f.cssClass="em-field-1";
      f.text=data.feld;
    },
    testdata: {
      create: function(index){
        return { feld: index%4+1 };
      },
      count: 4
    },
    src: ``
  },
  check: {
    testcases: [
      {
        info: "Funktioniert, wenn die Blume 1 Feld entfernt ist.",
        check: function(gameworld,data,isProgramOver){
          if(!isProgramOver) return false;
          if(data.feld!==1) return true;
          let bee=gameworld.objects.bee;
          let f=gameworld.objects.flower;
          return bee.isOnSameField(f);
        }
      },
      {
        info: "Funktioniert, wenn die Blume 2 Felder entfernt ist.",
        check: function(gameworld,data,isProgramOver){
          if(!isProgramOver) return false;
          if(data.feld!==2) return true;
          let bee=gameworld.objects.bee;
          let f=gameworld.objects.flower;
          return bee.isOnSameField(f);
        }
      },
      {
        info: "Funktioniert, wenn die Blume 3 Felder entfernt ist.",
        check: function(gameworld,data,isProgramOver){
          if(!isProgramOver) return false;
          if(data.feld!==3) return true;
          let bee=gameworld.objects.bee;
          let f=gameworld.objects.flower;
          return bee.isOnSameField(f);
        }
      },
      {
        info: "Funktioniert, wenn die Blume 4 Felder entfernt ist.",
        check: function(gameworld,data,isProgramOver){
          console.log(data.feld)
          if(!isProgramOver) return false;
          if(data.feld!==4) return true;
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