<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Lisa soll alle sieben Zahlen verdoppeln und anschließend zur Blume fliegen.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


import { Bee } from './Bee';
import { Flower } from './Flower';



export const data={
  id: "beep-double-2",
  cheats: ["beep"],
  title: "Verdoppeln am Fließband",
  beep: {
    world: [
      "B1234567F"
    ],
    maxMoveCount: 3,
    worldWidth: "20rem",
    setupFunc: function(gameworld){
      return {
        flower: new Flower("F","",gameworld),
        bee: new Bee("B","Lisa",gameworld)
      };
    },
    resetFunc: function(gameworld, data){
      for(let i=0;i<data.zahlen.length;i++){
        let f=gameworld.getNamedField(i+1+"");
        f.text=data.zahlen[i];
      }
    },
    testdata: {
      create: function(index){
        let zahlen=[];
        for(let i=0;i<7;i++){
          zahlen.push(random(1,10));
        }
        return {
          zahlen
        }
      },
      count: 5
    },
    src: ``
  },
  check: {
    testcases: [
      {
        info: "Die Biene befindet sich am Programmende auf der Blume.",
        check: function(gameworld,data,isProgramOver){
          if(!isProgramOver) return false;
          let bee=gameworld.objects.bee;
          let f=gameworld.objects.flower;
          return bee.isOnSameField(f);
        },
        points: 0.5
      },
      {
        info: "Die erste Zahl wurde verdoppelt.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          let f=gameworld.getNamedField("1");
          return (f.text+""===data.zahlen[0]*2+"");
        },
        points: 0.5
      },
      {
        info: "Die zweite Zahl wurde verdoppelt.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          let f=gameworld.getNamedField("2");
          return (f.text+""===data.zahlen[1]*2+"");
        },
        points: 0.5
      },
      {
        info: "Die dritte Zahl wurde verdoppelt.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          let f=gameworld.getNamedField("3");
          return (f.text+""===data.zahlen[2]*2+"");
        },
        points: 0.5
      },
      {
        info: "Die vierte Zahl wurde verdoppelt.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          let f=gameworld.getNamedField("4");
          return (f.text+""===data.zahlen[3]*2+"");
        },
        points: 0.5
      },
      {
        info: "Die fünfte Zahl wurde verdoppelt.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          let f=gameworld.getNamedField("5");
          return (f.text+""===data.zahlen[4]*2+"");
        },
        points: 0.5
      },
      {
        info: "Die sechste Zahl wurde verdoppelt.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          let f=gameworld.getNamedField("6");
          return (f.text+""===data.zahlen[5]*2+"");
        },
        points: 0.5
      },
      {
        info: "Die siebte Zahl wurde verdoppelt.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          let f=gameworld.getNamedField("7");
          return (f.text+""===data.zahlen[6]*2+"");
        },
        points: 0.5
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