<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Lisa soll die Texte auf den gelben Feldern (oben) auf die roten Felder darunter kopieren.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


import { Bee } from './Bee';
import { Flower } from './Flower';



export const data={
  id: "beep-copy-2",
  cheats: ["beep"],
  title: "Die Kopier-Biene",
  beep: {
    world: [
      "B123",
      "....",
      ".456",
    ],
    worldWidth: "15rem",
    setupFunc: function(gameworld){
      return {
        bee: new Bee("B","Lisa",gameworld)
      };
    },
    resetFunc: function(gameworld, data){
      let f=gameworld.getNamedField("1");
      f.text=data.texts[0];
      f.style.backgroundColor="yellow";
      f=gameworld.getNamedField("2");
      f.text=data.texts[1];
      f.style.backgroundColor="yellow";
      f=gameworld.getNamedField("3");
      f.text=data.texts[2];
      f.style.backgroundColor="yellow";
      f=gameworld.getNamedField("4");
      f.style.backgroundColor="red";
      f=gameworld.getNamedField("5");
      f.style.backgroundColor="red";
      f=gameworld.getNamedField("6");
      f.style.backgroundColor="red";
    },
    testdata: {
      create: function(index){
        let texts=[["Honig","Wabe","Biene"], ["Biene","Wabe","Honig"], ["Wabe","Honig","Biene"]];
        return {
          texts: texts[index]
        }
      },
      count: 3
    },
    src: ``
  },
  check: {
    testcases: [
      {
        info: "Der erste Text wird korrekt kopiert.",
        check: function(gameworld,data, isProgramOver, scope){
          if(!isProgramOver) return false;
          let f=gameworld.getNamedField("4");
           return (f.text===data.texts[0]);
        }
      },
      {
        info: "Der zweite Text wird korrekt kopiert.",
        check: function(gameworld,data, isProgramOver, scope){
          if(!isProgramOver) return false;
          let f=gameworld.getNamedField("5");
           return (f.text===data.texts[1]);
        }
      },
      {
        info: "Der dritte Text wird korrekt kopiert.",
        check: function(gameworld,data, isProgramOver, scope){
          if(!isProgramOver) return false;
          let f=gameworld.getNamedField("6");
           return (f.text===data.texts[2]);
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