<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    Der Algorithmus wird auf die Situation angewendet.
    <ol class="teilaufgaben">
      <li>
        Schreibe <strong>alle Texte und Zahlen</strong>, die sich am Programmende auf den Feldern befinden, in das passende Feld (sofern sie sich verändert haben).
      </li>
      <li>
        Schreibe ein <strong>B</strong> auf das Feld, auf dem sich die Biene am Ende des Programms befindet.
      </li>
      <li>
        Stelle den Algorithmus als Struktogramm dar.
        <p class="no-print" style="font-style: italic">Hinweis: Zeichne das <strong>zuerst</strong> das Struktogramm und <Button severity="secondary" @click="beep.language=beep.language==='python'? 'struktogramm': 'python'" :label="beep.language==='python'? 'zeige die Lösung': 'verstecke die Lösung'"/>.</p>
      </li>
    </ol>
  </ExerciseBody>
</template>

<script>
import { Bee } from './Bee';
import { createCode } from './createCode';
import { checkPosition } from './functions/checkPosition';


export const data={
  id: "beep-res-7",
  cheats: ["beep"],
  pointsPrint: 4,
  title: "Wie viele Felder fliegt Lisa?",
  programs: [
    {
      world: [
        ".......",
        "1......",
        "B3.....",
        "2......",
        "......."
      ],
      code: [
        {
          type: "select",
          values: ['left()','right()',''],
          name: "dir"
        },
        "a = read()",
        {
          type: "select",
          values: ['right()','left()',''],
          name: "dir"
        },
        'move()',
        'i = 1',
        {
          type: "while",
          condition: ["i <= a"],
          sub1: [
            ['print( i * i )', 'print( i + §a§ )', 'print( i - 1 )','print( i * §a§ ) '],
            "move()",
            'i = i + 1'
          ]
        },
        ['left()', 'right()'],
        'move()',
        ["move()",""]
      ]
    },
  ],
  beep: {
    language: "python",
    reverse: true,
    pointsPrint: 4,
    world: [
      "WWWWW",
      "B123",
      "WWWWW",
    ],
    zahlen: [0,0,0],
    worldWidth: "15rem",
    setupFunc: function(gameworld){
      return {
        bee: new Bee("B","Lisa",gameworld)
      };
    },
    resetFunc: function(gameworld, data){
      for(let i=0;i<3;i++){
        gameworld.getNamedField(i+1+"").text=this.beep.zahlen[i];
      }
    },
    testdata: {
      create: function(index){
        return {
        };
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
      let code=createCode(Random,program.code,{a: Random.int(2,5)});
      this.beep.code=code.code;
      let zahlen=Random.mixArray([2,3,4,5]);
      this.beep.zahlen=zahlen;
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