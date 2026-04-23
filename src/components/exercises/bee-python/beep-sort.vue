<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Auf den drei hervorgehobenen Feldern stehen drei unterschiedliche Zahlen. Lisa soll diese Zahlen von klein nach groß sortieren und anschließend zur Blume fliegen.</p>
    <Hint>Mit <Code inline>if a < b < c: ...</Code> kannst du abfragen, ob a kleiner als b und gleichzeitig b kleiner als c ist.</Hint>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


import { Bee } from './Bee';
import { Flower } from './Flower';



export const data={
  id: "beep-sort",
  cheats: ["beep"],
  pointsPrint: 6,
  title: "Sortiere die Zahlen",
  beep: {
    world: [
      "W.WW",
      "B123",
      ".WWF"
    ],
    worldWidth: "15rem",
    setupFunc: function(gameworld){
      return {
        flower: new Flower("F","",gameworld),
        bee: new Bee("B","Lisa",gameworld)
      };
    },
    resetFunc: function(gameworld, data){
      for(let i=0;i<3;i++){
        let f=gameworld.getNamedField(i+1+"");
        f.text=data.numbers[i];
        f.cssClass="em-field-1";
      }
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
        info: "Am Programmende steht links die kleinste Zahl.",
        check: function(gameworld,data, isProgramOver, scope){
          if(!isProgramOver) return false;
          let f=gameworld.getNamedField("1");
          let ist=f.text+"";
          let soll=data.sorted[0]+"";
          return ist===soll;
        }
      },
      {
        info: "Am Programmende steht in der Mitte die mittlere Zahl.",
        check: function(gameworld,data, isProgramOver, scope){
          if(!isProgramOver) return false;
          let f=gameworld.getNamedField("2");
          let ist=f.text+"";
          let soll=data.sorted[1]+"";
          return ist===soll;
        }
      },
      {
        info: "Am Programmende steht rechts die größte Zahl.",
        check: function(gameworld,data, isProgramOver, scope){
          if(!isProgramOver) return false;
          let f=gameworld.getNamedField("3");
          let ist=f.text+"";
          let soll=data.sorted[2]+"";
          return ist===soll;
        }
      },
      {
        info: "Die Biene befindet sich am Programmende auf der Blume.",
        check: function(gameworld,data,isProgramOver){
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