<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Auf den beiden hervorgehobenen Feldern stehen zwei Zahlen. Lisa soll die beiden Zahlen miteinander vergleichen und das richtige Vergleichszeichen (also <strong>&lt;</strong> oder <strong>&gt;</strong> oder <strong>=</strong>) auf das leere hervorgehobene Feld zwischen den beiden Zahlen schreiben. Anschließend soll sie zur Blume fliegen.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


import { Bee } from './Bee';
import { Flower } from './Flower';



export const data={
  id: "beep-vergleich",
  cheats: ["beep"],
  points: 5,
  title: "Kleiner, größer oder gleich?",
  beep: {
    world: [
      ".WWF",
      "B1R2",
      "WWW."
    ],
    worldWidth: "15rem",
    setupFunc: function(gameworld){
      return {
        flower: new Flower("F","",gameworld),
        bee: new Bee("B","Lisa",gameworld)
      };
    },
    resetFunc: function(gameworld, data){
      for(let i=0;i<2;i++){
        let f=gameworld.getNamedField(i+1+"");
        f.text=data.numbers[i];
        f.cssClass="em-field-1";
      }
      let f=gameworld.getNamedField("R");
      f.cssClass="em-field-2";
    },
    testdata: {
      create: function(index){
        let a=random(1,9);
        let b=random(1,9);
        if(index%3===0){
          a=b;
        }else{
          if(a==b) a--;
          let swap=index%3===1 && a>b || index%3===2 && a<b;
          if(swap){
            let c=a;
            a=b;
            b=c;
          }
        }
        let solution;
        if(a===b) solution="=";
        else if(a<b) solution="<";
        else solution=">";
        return {
          numbers: [a,b],
          solution
        }
      },
      count: 6
    },
    src: ``
  },
  check: {
    testcases: [
      {
        info: "Auf dem roten Feld steht am Ende <strong>&lt;</strong>, wenn die linke Zahl kleiner ist.",
        check: function(gameworld,data, isProgramOver, scope){
          if(!isProgramOver) return false;
          if(data.solution!=="<") return true;
          let f=gameworld.getNamedField("R");
          let ist=f.text+"";
          let soll=data.solution;
          return ist===soll;
        }
      },
      {
        info: "Auf dem roten Feld steht am Ende <strong>&gt;</strong>, wenn die rechte Zahl kleiner ist.",
        check: function(gameworld,data, isProgramOver, scope){
          if(!isProgramOver) return false;
          if(data.solution!==">") return true;
          let f=gameworld.getNamedField("R");
          let ist=f.text+"";
          let soll=data.solution;
          return ist===soll;
        }
      },
      {
        info: "Auf dem roten Feld steht am Ende <strong>=</strong>, wenn beide Zahlen gleich sind.",
        check: function(gameworld,data, isProgramOver, scope){
          if(!isProgramOver) return false;
          if(data.solution!=="=") return true;
          let f=gameworld.getNamedField("R");
          let ist=f.text+"";
          let soll=data.solution;
          return ist===soll;
        }
      },
      {
        info: "Lisa befindet sich am Ende auf dem Feld mit der Blume.",
        check: function(gameworld,data, isProgramOver, scope){
          if(!isProgramOver) return false;
          let bee=gameworld.objects.bee;
          let f=gameworld.objects.flower;
          return bee.isOnSameField(f);
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