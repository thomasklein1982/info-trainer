<template>
  <ExerciseBody :exercise="$data" inline>
    Gib jeweils eine einzelne Zeile Java-Code an.
    <template #exercise>
      <ol class="teilaufgaben">
        <li v-for="(t,i) in tasks"><span v-html="t.aufgabe"/>
          <p class="no-print"><InputCheck :auto-check="false" code width="100%" ref="input" :task="t"/>
          </p>
        </li>
      </ol>
    </template>
  </ExerciseBody>
</template>

<script>
import { checkOneliner, createOnelinerTasks, getVariableFromScope } from '../../java-interpreter.vue';



export const data={
  id: "one-2",
  cheats: ["console"],
  title: "Java-Oneliners: Rechnen mit Variablen und Werten",
  tasks: [
    {}, {}, {}, {}
  ]
}

export default{
  data() {
    return data;
  },
  methods: {
    create(Random, resArray){
      let rand=Random.int(1000,10000);
      let rand2=Random.int(1000,10000);
      let rand3=Random.int(1000,10000);
      let tasks=[
        {
          aufgabe: "Die Variable §l0§ wird um den Wert der Variablen §l1§ erhöht.",
          check: (scope,vars)=>{
            let v0=getVariableFromScope(vars.l[0],scope);
            return (v0.value===rand+rand2);
          },
          solution: "§l0§ += §l1§;",
          preCode: `int §l0§=${rand2};int §l1§=${rand};`
        },
        {
          aufgabe: "Die Variable §l0§ erhält den §I0§-fachen Wert der Variablen §l1§.",
          check: (scope,vars)=>{
            let v0=getVariableFromScope(vars.l[0],scope);
            return (v0.value===vars.I[0]*rand);
          },
          solution: '§l0§ = §I0§ * §l1§;',
          preCode: `int §l0§; int §l1§ = ${rand};`
        },
        {
          aufgabe: "Die Differenz der Variablen §l0§ und §l1§ wird erst verdoppelt, dann zur Variablen §l2§ addiert und in der Variable §l3§ gespeichert.",
          check: (scope,vars)=>{
            let v3=getVariableFromScope(vars.l[3],scope);

            return (v3.value===(rand-rand2)*2+rand3);
          },
          solution: '§l3§ = ( §l0§ - §l1§ ) * 2 + §l2§;',
          preCode: `int §l0§=${rand}; int §l1§ = ${rand2}; int §l2§ = ${rand3};int §l3§;`
        },
        {
          aufgabe: "Die Variable §l0§ erhält den Wert, den der User in die Konsole eintippt.",
          check: (scope,vars)=>{
            let v=getVariableFromScope(vars.l[0],scope);
            return (v.value===rand+"");
          },
          solution: '§l0§ = Console.read();',
          preCode: `String §l0§;
          /*JAVASCRIPT-CODE
          Console.overrideReadCommandsIndex=0;
          Console.overrideReadCommands=["${rand}"];
          */`
        },
      ];
      createOnelinerTasks(Random,resArray,this.tasks,tasks);
    },
    async check(){
      return await checkOneliner(this);
    }
  }
}
</script>