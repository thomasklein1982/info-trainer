<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <BeePreview :world="art.world" width="14rem" style="float: right">
      <GameObject v-for="(p,i) in art.points" image="" :style="{'grid-row': p.row+1, 'grid-column': p.col+1}" :text="p.c" align="center"/>
    </BeePreview>
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Lisa soll einen Frosch aus einzelnen Zeichen in die Spielwelt schreiben. Rechts siehst du, wie der Frosch aussehen soll.</p>
  </ExerciseBody>
</template>

<script>
import { createASCIIArt } from '../../../other/createASCIIArt';
import { random } from '../../../other/random';
import BeePreview from '../../bee-preview.vue';
import GameObject from '../../game-object.vue';

import { Bee } from './Bee';
import { Flower } from './Flower';

let art=createASCIIArt(` @.@ 
(---)`);



export const data={
  id: "beep-print-4",
  cheats: ["beep"],
  title: "Quak!",
  art,
  beep: {
    world: [
      "B....",
      "....."
    ],
    worldWidth: "15rem",
    setupFunc: function(gameworld){
      return {
        bee: new Bee("B","Lisa",gameworld)
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
        info: "Die obere Reihe ist richtig.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          let y=2;
          let line=art.lines[2-y];
          for(let x=1;x<=5;x++){
            let f=gameworld.getField(x,y);
            let soll=x<=line.length? line.charAt(x-1).trim(): "";
            let ist=f.text.trim();
            if(ist!==soll) return false;
          }
          return true;
        }
      },
      {
        info: "Die untere Reihe ist richtig.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          let y=1;
          let line=art.lines[2-y];
          for(let x=1;x<=5;x++){
            let f=gameworld.getField(x,y);
            let soll=x<=line.length? line.charAt(x-1).trim(): "";
            let ist=f.text.trim();
            if(ist!==soll) return false;
          }
          return true;
        }
      },
    ]
  },
};

export default{
  components: {
    BeePreview, GameObject
  },
  data() {
      return data;
  }
}
</script>