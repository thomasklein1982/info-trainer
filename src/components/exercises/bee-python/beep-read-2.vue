<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Lisa soll die Texte auf den gelben Feldern lesen und in zwei verschiedenen Variablen speichern.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


import { Bee } from './Bee';
import { Flower } from './Flower';



export const data={
  id: "beep-read-2",
  cheats: ["beep"],
  title: "Lisa merkt sich mehrere Texte",
  beep: {
    world: [
      "W1WW",
      "B...",
      ".WW2"
    ],
    worldWidth: "15rem",
    setupFunc: function(gameworld){
      return {
        bee: new Bee("B","Lisa",gameworld)
      };
    },
    resetFunc: function(gameworld, data){
      for(let i=0;i<2;i++){
        let f=gameworld.getNamedField(i+1+"");
        f.text=data.texts[i];
        f.style.backgroundColor="yellow";
      }
    },
    testdata: {
      create: function(index){
        let texts=[["Honig","Biene"],["Flug","Wabe"],["Honig","Wabe"],["Flug","Biene"]];
        return {
          texts: texts[index]
        }
      },
      count: 4
    },
    src: ``
  },
  check: {
    testcases: [
      {
        info: "Der Text auf dem gelben Feld oben wird in einer Variablen gespeichert.",
        check: function(gameworld,data, isProgramOver, scope){
          if(!isProgramOver) return false;
          let variables=scope.getAllVariables();
          for(let a in variables){
            let v=variables[a];
            if(v.value===data.texts[0]) return true;
          }
          return false;
        }
      },
      {
        info: "Der Text auf dem gelben Feld unten wird in einer anderen Variablen gespeichert.",
        check: function(gameworld,data, isProgramOver, scope){
          if(!isProgramOver) return false;
          let variables=scope.getAllVariables();
          for(let a in variables){
            let v=variables[a];
            if(v.value===data.texts[1]) return true;
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