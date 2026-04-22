<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    Das untenstehende Python-Programm wird auf die Situation daneben angwendet.
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
  id: "beep-res-8",
  cheats: ["beep"],
  points: 6,
  title: "Ein IF im WHILE",
  programs: [
    {
      world: [
        "..1..",
        "..2..",
        "..3..",
        "..4..",
        "..5..",
        "..6..",
        "..BM."
      ],
      code: [
        'm = read()',
        'left()',
        'i = 1',
        {
          type: "while",
          condition: ["i <= 6"],
          sub1: [
            'x = read()',
            'move()',
            {
              type: "select",
              values: ['left()','right()'],
              name: "dir"
            },
            {
              type: "if",
              condition: ["x <= m","x >= m", "x < m", "x > m"],
              sub1: [
                'print( x - 1 )'
              ],
              sub2: [
                ['print( x + 1 )','print( 2 * x )']
              ]
            },
            {
              type: "select",
              values: ['right()','left()'],
              name: "dir"
            },
            'i = i + 1'
          ]
        },
        ['right()','left()'],
        'move()',
        'move()'
      ]
    },
  ],
  beep: {
    language: "python",
    reverse: true,
    world: [
      "123456M",
    ],
    zahlen: [0,0,0,0,0,0],
    middle: 0,
    worldWidth: "15rem",
    setupFunc: function(gameworld){
      let bee=new Bee("B","Lisa",gameworld);
      return {
        bee
      };
    },
    resetFunc: function(gameworld, data){
      for(let i=0;i<6;i++){
        gameworld.getNamedField(i+1+"").text=this.beep.zahlen[i];
      }
      gameworld.getNamedField("M").text=this.beep.middle;
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
      let zahlen=[];
      let x=0;
      for(let i=1;i<=6;i++){
        x+=Random.int(1,3);
        zahlen.push(x);
      }
      this.beep.middle=zahlen[Random.int(2,4)];
      this.beep.zahlen=Random.mixArray(zahlen);
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