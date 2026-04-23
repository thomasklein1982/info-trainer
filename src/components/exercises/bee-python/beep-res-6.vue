<template>
  <ExerciseBody ref="body" :exercise="$data" :beep="beep">
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
    <Dialog v-model:visible="showSolution" header="Struktogramm">
      <Struktogramm v-if="program" :python-program="program"/>
    </Dialog>
  </ExerciseBody>
</template>

<script>
import { Bee } from './Bee';
import { createCode } from './createCode';
import { checkPosition } from './functions/checkPosition';
import Struktogramm from '../../struktogramm.vue';
import { parsePython } from '../../beep-editor/parsePython';
import { nextTick } from 'vue';

export const data={
  id: "beep-res-6",
  cheats: ["beep"],
  pointsPrint: 4,
  showSolution: false,
  title: "Was schreibt Lisa da?",
  program: null,
  programs: [
    {
      world: [
        ".....",
        ".....",
        ".....",
        ".....",
        "B...."
      ],
      code: [
        {
          type: "select",
          values: ['left()',''],
          name: "leftOrNot"
        },
        'i = 1',
        {
          type: "while",
          condition: ["i <= §a§"],
          sub1: [
            'print( i )',
            "move()",
            'i = i + 1'
          ]
        },
        {
          type: "select",
          values: ['right()','left()'],
          name: "leftOrNot"
        },
        "move()",
        ["move()",""],
        ["move()",""]
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
    resetFunc: function(gameworld, data){
      
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
    Struktogramm
  },
  data() {
      return data;
  },
  methods: {
    create(Random, resArray){
      let program=this.programs[Random.int(0,this.programs.length-1)];
      this.beep.world=program.world;
      let code=createCode(Random,program.code,{a: Random.int(2,4)});
      this.beep.code=code.code;
      nextTick(()=>{
        let edit=this.$refs.body.$refs.beepEditor;
        this.program=edit.program;
      });
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