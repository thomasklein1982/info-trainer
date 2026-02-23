<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Lisa soll den Text auf dem gelben Feld lesen und auf das rote Feld kopieren.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


import { Bee } from './Bee';
import { Flower } from './Flower';



export const data={
  id: "beep-copy-1",
  cheats: ["beep"],
  title: "Die Kopier-Biene",
  beep: {
    world: [
      "WWWWW",
      "B.G.R",
      "W.WW.",
      ".W.WW"
    ],
    worldWidth: "15rem",
    setupFunc: function(gameworld){
      return {
        bee: new Bee("B","Lisa",gameworld)
      };
    },
    resetFunc: function(gameworld, data){
      let f=gameworld.getNamedField("G");
      f.text=data.text;
      f.style.backgroundColor="yellow";
      f=gameworld.getNamedField("R");
      f.style.backgroundColor="red";
    },
    testdata: {
      create: function(index){
        let texts=["Honig","Wabe","Biene","Flug"];
        return {
          text: texts[index]
        }
      },
      count: 4
    },
    src: ``
  },
  check: {
    testcases: [
      {
        info: "Lisa liest den Text auf dem gelben Feld und speichert ihn in einer Variablen.",
        check: function(gameworld,data, isProgramOver, scope){
          let variables=scope.getAllVariables();
          for(let a in variables){
            let v=variables[a];
            if(v.value===data.text) return true;
          }
          return false;
        }
      },
      {
        info: "Lisa schreibt den gelesenen Text auf das rote Feld.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          let f=gameworld.getNamedField("R");
          return (f.text+""===data.text);
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