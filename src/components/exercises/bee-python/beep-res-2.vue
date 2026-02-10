<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Wende den Algorithmus auf die Situation an.</p>
    <p>Schreibe ein <strong>B</strong> auf das Feld, auf dem sich die Biene am Ende des Programms befindet.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';
import { Bee } from './Bee';
import { createCode } from './createCode';
import { Flower } from './Flower';



export const data={
  id: "beep-res-2",
  cheats: ["beep"],
  title: "Struktogramm, Test",
  programs: [
    {
      world: [
        "B...",
        "....",
        "....",
        "...."
      ],
      code: [
        "i=1",
        "while i<=2:",
        "  move()",
        "  i+=1",
        "right()",
        "x=5",
        ["move()",""],
        'if x == 5:',
        '  print( "Hi")',
        '  move()',
        'print("§s0§")',
        "left()",
        "move()",
        ["move()"]
      ]
    }
  ],
  beep: {
    language: "struktogramm",
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
        let bee=result.gameworld.objects.bee;
        let soll=bee.x+","+bee.y;
        for(let a in result.ist){
          let f=result.ist[a];
          if(soll===a){
            if(f!=="B") return false;
          }else{
            if(f==="B") return false;
          }
        }
        if(result.ist[soll]!=="B") return false;
        return true;
      }
    },
    {
      info: "Die anderen Beschriftungen sind korrekt.",
      check: function(result){
        return result.correct;
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
      console.log("code",code);
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