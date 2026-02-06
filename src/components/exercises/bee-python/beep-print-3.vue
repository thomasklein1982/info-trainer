<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <BeePreview :world="beep.world" width="10rem" style="float: right">
      <GameObject v-for="(p,i) in art.points" image="" :style="{'grid-row': p.row+1, 'grid-column': p.col+1}" :text="p.c" align="center"/>
      <GameObject image="flower" text="" pos="F"/>
    </BeePreview>
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Lisa soll um die Blume herum ein Herz aus verschiedenen Symbolen malen und dann zur Blume fliegen und dort stehen bleiben. Rechts siehst du, wie das Herz aussehen soll.</p>
    <Hint>Damit Lisa einen <strong>Backslash</strong> <strong>\</strong> schreibt, musst du <Code inline>print("\\")</Code> schreiben.</Hint>
  </ExerciseBody>
</template>

<script>
import { createASCIIArt } from '../../../other/createASCIIArt';
import { random } from '../../../other/random';
import BeePreview from '../../bee-preview.vue';
import GameObject from '../../game-object.vue';

import { Bee } from './Bee';
import { Flower } from './Flower';

let art=createASCIIArt(` ^	^
/ - \\
\\   /
 \\ /
  -`);



export const data={
  id: "beep-print-3",
  cheats: ["beep"],
  title: "Mit viel Liebe",
  art,
  beep: {
    world: [
      "B....",
      ".....",
      "..F..",
      ".....",
      ".....",
    ],
    worldWidth: "15rem",
    setupFunc: function(gameworld){
      return {
        f: new Flower("F","",gameworld,"blue"),
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
        info: "Die oberste Reihe ist richtig.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          let y=5;
          let line=art.lines[5-y];
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
        info: "Die zweite Reihe ist richtig.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          let y=4;
          let line=art.lines[5-y];
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
        info: "Die dritte Reihe ist richtig.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          let y=3;
          let line=art.lines[5-y];
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
        info: "Die vierte Reihe ist richtig.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          let y=2;
          let line=art.lines[5-y];
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
        info: "Die unterste Reihe ist richtig.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          let y=1;
          let line=art.lines[5-y];
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
    BeePreview, GameObject
  },
  data() {
      return data;
  }
}
</script>