<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Auf den hervorgehobenen Feldern stehen zwei Zahlen und dazwischen steht entweder <strong>+</strong> (plus) oder <strong>&minus;</strong> (minus) oder <strong>*</strong> (mal) oder <strong>:</strong> (geteilt). Lisa soll das Ergebnis der Rechenaufgabe bestimmen und auf das leere hervorgehobene Feld schreiben.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


import { Bee } from './Bee';
import { Flower } from './Flower';



export const data={
  id: "beep-tr-2",
  cheats: ["beep"],
  pointsPrint: 6,
  title: "Taschenrechner",
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
        let a=random(2,9);
        let b=random(2,9);
        if(a===b){
          b++;
        }
        let rz=["+","-","*",":"][index%4];
        let solution;
        if(rz==="+") solution=a+b;
        else if(rz==="-"){
          solution=a;
          a=a+b;
        }
        else if(rz==="*") solution=a*b;
        else {
          solution=a;
          a=a*b;
        }
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
        info: "Bei Plus-Aufgaben steht das richtige Ergebnis im roten Feld.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          if(data.rz!=="+") return true;
          let f=gameworld.getNamedField("R");
          return (f.text+""===data.solution+"");
        }
      },
      {
        info: "Bei Minus-Aufgaben steht das richtige Ergebnis im roten Feld.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          if(data.rz!=="-") return true;
          let f=gameworld.getNamedField("R");
          return (f.text+""===data.solution+"");
        }
      },
      {
        info: "Bei Mal-Aufgaben steht das richtige Ergebnis im roten Feld.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          if(data.rz!=="*") return true;
          let f=gameworld.getNamedField("R");
          return (f.text+""===data.solution+"");
        }
      },
      {
        info: "Bei Geteilt-Aufgaben steht das richtige Ergebnis im roten Feld.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          if(data.rz!==":") return true;
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