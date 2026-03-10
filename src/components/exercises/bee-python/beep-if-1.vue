<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Auf den beiden gelben Feldern stehen zwei Zahlen. Lisa soll die größere der beiden Zahlen auf das rote Feld schreiben.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


import { Bee } from './Bee';
import { Flower } from './Flower';



export const data={
  id: "beep-if-1",
  cheats: ["beep"],
  title: "Welche Zahl ist größer?",
  beep: {
    world: [
      "W.WW",
      "B12.",
      ".WWR"
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
        f.text=data.numbers[i];
        f.style.backgroundColor="yellow";
      }
      let f=gameworld.getNamedField("R");
      f.style.backgroundColor="red";
    },
    testdata: {
      create: function(index){
        let a=random(1,9);
        let b=random(1,9);
        if(a==b) a--;
        let swap=index%2===0 && a>b || index%2===1 && a<b;
        if(swap){
          let c=a;
          a=b;
          b=c;
        }
        return {
          numbers: [a,b],
          max: Math.max(a,b)
        }
      },
      count: 4
    },
    src: ``
  },
  check: {
    testcases: [
      {
        info: "Am Programmende steht die größere der beiden Zahlen auf dem roten Feld.",
        check: function(gameworld,data, isProgramOver, scope){
          if(!isProgramOver) return false;
          let f=gameworld.getNamedField("R");
          let ist=f.text+"";
          let soll=data.max+"";
          return ist===soll;
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