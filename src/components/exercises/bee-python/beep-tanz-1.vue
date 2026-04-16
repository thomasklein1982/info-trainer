<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Lisa soll einen Bienentanz einstudieren.</p>
    <p>Auf den hervorgehobenen Feldern steht jeweils entweder <strong>links</strong> oder <strong>rechts</strong>. Lisa soll sich beide Texte merken und dann zur Blume fliegen. Dort soll sie sich gemäß dieser Texte drehen (und sich danach nicht mehr bewegen).</p>
    <p>Beispiel: Wenn auf den Feldern <strong>links</strong> und <strong>links</strong> steht, soll sie sich auf der Blume zweimal nach links drehen.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


import { Bee } from './Bee';
import { Flower } from './Flower';



export const data={
  id: "beep-tanz-1",
  cheats: ["beep"],
  title: "Bienentanz",
  beep: {
    world: [
      "W.WW",
      "B12F",
      ".W.W"
    ],
    worldWidth: "15rem",
    setupFunc: function(gameworld){
      return {
        flower: new Flower("F","",gameworld),
        bee: new Bee("B","Lisa",gameworld)
      };
    },
    resetFunc: function(gameworld, data){
      for(let i=0;i<2;i++){
        let f=gameworld.getNamedField(i+1+"");
        f.text=data.cmds[i];
        f.cssClass="em-field-1";
      }
    },
    testdata: {
      create: function(index){
        let l="links";
        let r="rechts";
        let dirs=[[l,l],[l,r],[r,l],[r,r]];
        let cmds=dirs[index%dirs.length];
        let dance="";
        for(let i=0;i<cmds.length;i++){
          dance+=cmds[i].charAt(0);
        }
        return {
          cmds, dance
        }
      },
      count: 4
    },
    src: ``
  },
  check: {
    testcases: [
      {
        info: "Lisa befindet sich am Programmende auf der Blume.",
        check: function(gameworld,data,isProgramOver){
          if(!isProgramOver) return false;
          let bee=gameworld.objects.bee;
          let f=gameworld.objects.flower;
          return bee.isOnSameField(f);
        }
      },
      {
        info: "Lisa führt am Ende den korrekten Tanz auf.",
        check: function(gameworld,data, isProgramOver, scope){
          if(!isProgramOver) return false;
          let bee=gameworld.objects.bee;
          let ist=bee.lastRotations.join("");
          let soll=data.dance;
          return ist===soll;
        },
        points: 4
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