<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Auf den hervorgehobenen Feldern stehen zwei Zahlen und dazwischen steht entweder <strong>+</strong> oder <strong>&minus;</strong>. Lisa soll das Ergebnis der Rechenaufgabe bestimmen und auf das leere hervorgehobene Feld schreiben.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


import { Bee } from './Bee';
import { Flower } from './Flower';



export const data={
  id: "beep-tr-1",
  cheats: ["beep"],
  pointsPrint: 4,
  title: "Plus oder Minus?",
  beep: {
    world: [
      "WWWW.W",
      "B1234R",
      "WW..WW"
    ],
    worldWidth: "15rem",
    setupFunc: function(gameworld){
      return {
        bee: new Bee("B","Lisa",gameworld)
      };
    },
    resetFunc: function(gameworld, data){
      let f=gameworld.getNamedField("R");
      f.text=data.text;
      f.cssClass="em-field-2";
      f=gameworld.getNamedField("1");
      f.text=data.a;
      f.cssClass="em-field-1";
      f=gameworld.getNamedField("2");
      f.text=data.rz;
      f.cssClass="em-field-1";
      f=gameworld.getNamedField("3");
      f.text=data.b;
      f.cssClass="em-field-1";
      f=gameworld.getNamedField("4");
      f.text="=";
    },
    testdata: {
      create: function(index){
        let b=random(2,9);
        let a=random(b+1,20);
        let rz=["+","-"][index%2];
        let solution=rz==="+"? a+b:a-b;
        return {
          a,b,rz,solution
        }
      },
      count: 4
    },
    src: ``
  },
  check: {
    testcases: [
      {
        info: "Bei Plusaufgaben steht das richtige Ergebnis im roten Feld.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          if(data.rz==="-") return true;
          let f=gameworld.getNamedField("R");
          return (f.text+""===data.solution+"");
        }
      },
      {
        info: "Bei Minusaufgaben steht das richtige Ergebnis im roten Feld.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          if(data.rz==="+") return true;
          let f=gameworld.getNamedField("R");
          return (f.text+""===data.solution+"");
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