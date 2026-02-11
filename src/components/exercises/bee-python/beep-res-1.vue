<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Wende den Algorithmus auf die Situation an. Schreibe ein <strong>B</strong> auf das Feld, auf dem sich die Biene am Ende des Programms befindet.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';
import { Bee } from './Bee';
import { createCode } from './createCode';
import { Flower } from './Flower';
import { checkPosition } from './functions/checkPosition';



export const data={
  id: "beep-res-1",
  cheats: ["beep"],
  title: "Wohin fliegt Lisa?",
  programs: [
    {
      world: [
        ".....",
        ".....",
        "..B..",
        ".....",
        "....."
      ],
      code: [
        ["left()","right()",""],
        "move()",
        ["move()",""],
        "right()",
        "move()",
        ["move()",""],
        "right()",
        ["right()",""],
        "move()",
        ["move()",""]
      ]
    }
  ],
  beep: {
    language: "python",
    reverse: true,
    world: [
      "WWWWW",
      "B..1F",
      "WWWWW",
    ],
    worldWidth: "15rem",
    setupFunc: function(gameworld){
      let bee=new Bee("B","Lisa",gameworld);
      return {
        bee
      };
    },
    resetFunc: function(gameworld, data){
      
    },
    testdata: {
      create: function(index){
        return {};
      },
      count: 1
    },
    code: `move()
move()
print("Test")
move()
print(7)`
  },
  tasks: [
    {
      info: "Das richtige Feld wurde mit 'B' beschriftet.",
      check: function(result){
        return checkPosition(result,"B","bee");
      }
    }
  ]
};

export default{
  components: {
    
  },
  data() {
      return data;
  },
  methods: {
    create(Random, resArray){
      let program=this.programs[Random.int(0,this.programs.length-1)];
      this.beep.world=program.world;
      let code=createCode(Random,program.code);
      this.beep.code=code;
      for(let i=0;i<this.tasks.length;i++){
        let t=this.tasks[i];
        t.correct=resArray? resArray[i]: false;
        t.checked=resArray? true: false;
      }
    }
  }
}
</script>