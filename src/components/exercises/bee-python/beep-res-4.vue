<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    Gegeben ist das untenstehende Python-Programm.
    <ol class="teilaufgaben">
      <li>Stelle den Algorithmus als Struktogramm dar.</li>
      <li>Wende den Algorithmus auf die Situation an. Schreibe ein <strong>B</strong> auf das Feld, auf dem sich die Biene am Ende des Programms befindet.</li>
    </ol>
    
    
  </ExerciseBody>
</template>

<script>
import { Bee } from './Bee';
import { createCode } from './createCode';
import { checkPosition } from './functions/checkPosition';


export const data={
  id: "beep-res-4",
  cheats: ["beep"],
  pointsPrint: 3,
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
        'a = read()',
        {
          type: "if",
          condition: ["a == §i0§","a != §i0§"],
          sub1: [
            "left()",
            ["move()",""],
            ["right()",""]
          ],
          sub2: [
            "right()",
            "move()"
          ]
        },
        "left()",
        'move()',
        ["move()",""],
      ]
    },
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
    code: ``
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
      let nCode=code.values.i[0];
      let nMap=Random.int(0,1)===1? nCode: Random.int(2,99);
      this.beep.zahlen=[nCode,nMap];
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