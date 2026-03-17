<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    Wende den Algorithmus auf die Situation an. Schreibe ein <strong>B</strong> auf das Feld, auf dem sich die Biene am Ende des Programms befindet.
  </ExerciseBody>
</template>

<script>
import { Bee } from './Bee';
import { createCode } from './createCode';
import { checkPosition } from './functions/checkPosition';


export const data={
  id: "beep-res-5",
  cheats: ["beep"],
  title: "Wohin fliegt Lisa?",
  programs: [
    {
      world: [
        ".....",
        ".....",
        "..B1.",
        ".....",
        "....."
      ],
      code: [
        ['right()','left()'],
        ['right()','left()',''],
        'a = read()',
        {
          type: "if",
          condition: ["a < §i0§","a > §i0§"],
          sub1: [
            ["move()",""],
            "left()",
            ["right()",""]
          ],
          sub2: [
            "right()",
            "move()"
          ]
        },
        "right()",
        ["right()","left()",""],
        "move()"
      ]
    },
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
      return {
        bee: new Bee("B","Lisa",gameworld)
      };
    },
    zahlen: [0,0],
    resetFunc: function(gameworld, data){
      gameworld.forEachField((f,i)=>{
        f.text=this.beep.zahlen[i];
      });
      let f=gameworld.getNamedField("1");
      f.text=this.beep.zahlen[1];
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
      this.beep.code=code.code;
      this.beep.zahlen=[];
      for(let i=0;i<40;i++){
        this.beep.zahlen.push(Random.int(2,99));
      }
      for(let i=0;i<this.tasks.length;i++){
        let t=this.tasks[i];
        t.input="";
        t.correct=resArray? resArray[i]: false;
        t.checked=resArray? true: false;
      }
    }
  }
}
</script>