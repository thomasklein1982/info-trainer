<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Auf den beiden gelben Feldern stehen die Seitenlängen a und b eines Rechtecks. Lisa soll die beiden Seitenlängen lesen und den Flächeninhalt des Rechtecks auf das rote Feld schreiben.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


import { Bee } from './Bee';
import { Flower } from './Flower';



export const data={
  id: "beep-flaeche",
  cheats: ["beep"],
  title: "Der Flächeninhalt eines Rechtecks",
  beep: {
    world: [
      "Bag1",
      ".bl2",
      ".AeR"
    ],
    worldWidth: "15rem",
    setupFunc: function(gameworld){
      return {
        bee: new Bee("B","Lisa",gameworld)
      };
    },
    resetFunc: function(gameworld, data){
      let f=gameworld.getNamedField("1");
      f.text=data.a;
      f.style.backgroundColor="yellow";
      f=gameworld.getNamedField("2");
      f.text=data.b;
      f.style.backgroundColor="yellow";
      f=gameworld.getNamedField("a");
      f.text="a";
      f=gameworld.getNamedField("b");
      f.text="b";
      f=gameworld.getNamedField("A");
      f.text="A";
      f=gameworld.getNamedField("g");
      f.text="=";
      f=gameworld.getNamedField("l");
      f.text="=";
      f=gameworld.getNamedField("e");
      f.text="=";
      f=gameworld.getNamedField("R");
      f.style.backgroundColor="red";
    },
    testdata: {
      create: function(index){
        let a=random(3,40);
        let b=random(3,40);
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
        info: "Der richtige Flächeninhalt steht im roten Feld.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          let f=gameworld.getNamedField("R");
          return (f.text+""===data.a*data.b+"");
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