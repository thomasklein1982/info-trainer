<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Lisa soll den Text auf dem gelben Feld lesen und in einer Variablen speichern.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


import { Bee } from './Bee';
import { Flower } from './Flower';



export const data={
  id: "beep-read-1",
  cheats: ["beep"],
  title: "Lisa kann lesen!",
  beep: {
    world: [
      "WWWW",
      "B..G",
      ".WWW"
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
        info: "Der Text auf dem gelben Feld wird in einer Variablen gespeichert.",
        check: function(gameworld,data, isProgramOver, scope){
          let variables=scope.getAllVariables();
          for(let a in variables){
            let v=variables[a];
            if(v.value===data.text) return true;
          }
          return false;
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