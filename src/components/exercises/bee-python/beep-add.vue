<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Lisa soll das Ergebnis der Additionsaufgabe auf das gelbe Feld schreiben.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


import { Bee } from './Bee';
import { Flower } from './Flower';



export const data={
  id: "beep-add",
  cheats: ["beep"],
  title: "Lisa kann addieren!",
  beep: {
    world: [
      "WWWW.W",
      "B1234G",
      "WW..WW"
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
      f=gameworld.getNamedField("1");
      f.text=data.a;
      f=gameworld.getNamedField("2");
      f.text="+";
      f=gameworld.getNamedField("3");
      f.text=data.b;
      f=gameworld.getNamedField("4");
      f.text="=";
    },
    testdata: {
      create: function(index){
        let a=random(5,20);
        let b=random(5,20);
        return {
          a,b
        }
      },
      count: 4
    },
    src: ``
  },
  check: {
    testcases: [
      {
        info: "Das richtige Ergebnis steht im gelben Feld.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          let f=gameworld.getNamedField("G");
          return (f.text+""===data.a+data.b+"");
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