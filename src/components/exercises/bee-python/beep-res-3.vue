<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Wende den Algorithmus auf die Situation an. Gib an, welcher Wert am Programmende auf dem gelben Feld steht.</p>
    <p class="no-print">Schreibe diesen Wert direkt auf das gelbe Feld.</p>
    
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';
import { Bee } from './Bee';
import { createCode } from './createCode';
import { Flower } from './Flower';



export const data={
  id: "beep-res-3",
  cheats: ["beep"],
  title: "Variablen",
  programs: [
    {
      world: [
        "WWWWW",
        "B123G",
        "WWWWW"
      ],
      code: [
        'a = read()',
        'move()',
        "move()",
        "move()",
        ['b = a + 2', 'b = a * 3', 'b = a + a', 'b = 3 + a', 'b = a * a'],
        'print(b)'
      ]
    },
    {
      world: [
        "WWWWW",
        "B123G",
        "WWWWW"
      ],
      code: [
        'move()',
        'a = read()',
        "move()",
        "move()",
        ['b = a + 2', 'b = a * 3', 'b = a + a', 'b = 3 + a', 'b = a * a'],
        'print(b)'
      ]
    },
    {
      world: [
        "WWWWW",
        "B123G",
        "WWWWW"
      ],
      code: [
        'move()',
        "move()",
        'a = read()',
        "move()",
        ['b = a + 2', 'b = a * 3', 'b = a + a', 'b = 3 + a', 'b = a * a'],
        'print(b)'
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
    zahlen: [
      3, 5, 7
    ],
    resetFunc: function(gameworld, data){
      for(let i=0;i<this.beep.zahlen.length;i++){
        let z=this.beep.zahlen[i];
        let f=gameworld.getNamedField(i+1+"");
        if(!f)return;
        f.text=z;
      }
      let f=gameworld.getNamedField("G");
      f.style.backgroundColor="yellow";
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
      info: "Auf dem gelben Feld steht das richtige Ergebnis.",
      check: function(result){
        let f=result.gameworld.getNamedField("G");
        let soll=f.text+"";
        let ist=result.ist["5,2"]+"";
        this.solution=soll;
        return soll===ist;
      },
      input: ""
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
      this.beep.zahlen=Random.draw(this.beep.zahlen.length,10);
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