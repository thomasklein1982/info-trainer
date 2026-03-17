<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Auf den drei gelben Feldern stehen drei unterschiedliche Zahlen. Lisa soll die größte dieser drei Zahlen ermitteln und auf das rote Feld schreiben.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


import { Bee } from './Bee';
import { Flower } from './Flower';



export const data={
  id: "beep-max",
  cheats: ["beep"],
  title: "Welche Zahl ist die größte?",
  beep: {
    world: [
      "WWWWW",
      "W...R",
      "B123.",
      ".WWW."
    ],
    worldWidth: "15rem",
    setupFunc: function(gameworld){
      return {
        bee: new Bee("B","Lisa",gameworld)
      };
    },
    resetFunc: function(gameworld, data){
      for(let i=0;i<3;i++){
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
        let b=a+random(1,9);
        let c=b+random(1,9);
        let sorted=[a,b,c];
        let numbers;
        index=index%6;
        if(index===0) numbers=[a,b,c];
        else if(index===1) numbers=[a,c,b];
        else if(index===2) numbers=[b,a,c];
        else if(index===3) numbers=[b,c,a];
        else if(index===4) numbers=[c,a,b];
        else if(index===5) numbers=[c,b,a];

        return {
          numbers,
          sorted
        }
      },
      count: 6
    },
    src: ``
  },
  check: {
    testcases: [
      {
        info: "Am Programmende steht die größte Zahl auf dem roten Feld.",
        check: function(gameworld,data, isProgramOver, scope){
          if(!isProgramOver) return false;
          let f=gameworld.getNamedField("R");
          let ist=f.text+"";
          let soll=data.sorted[2]+"";
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