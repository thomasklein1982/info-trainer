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
  id: "one-1",
  cheats: ["console"],
  title: "Java-Oneliners 1",
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
      let tasks=[
        {
          aufgabe: "Die Variable §l0§ erhält den Wert §i0§.",
          check: (scope,vars)=>{
            let v=getVariableFromScope(vars.l[0],scope);
            if(!v) return false;
            return (v.value===vars.i[0]);
          },
          solution: "§l0§ = §i0§;",
          preCode: "int §l0§;"
        },
        {
          aufgabe: 'Es wird eine Variable namens §l0§ deklariert, die eine §Aganze Zahl;Kommazahl;Zeichenkette§ speichern kann, und sie erhält den Wert §A5;3.14;"Hallo"§.',
          check: (scope,vars)=>{
            let v=getVariableFromScope(vars.l[0],scope);
            if(!v) return false;
            let shouldType=vars.Arrays.A[2];
            if(v.type!==shouldType) return false;
            let shouldValue=vars.Arrays.A[1];
            return (JSON.stringify(v.value)===shouldValue);
          },
          solution: '§Aint;double;String§ §l0§ = §A5;3.14;"Hallo"§;',
          preCode: ""
        },
        {
          aufgabe: "Es wird eine Variable namens §w0§ deklariert, die eine §Aganze Zahl;Kommazahl;Zeichenkette§ speichern kann.",
          check: (scope,vars)=>{
            let v=getVariableFromScope(vars.w[0],scope);
            if(!v) return false;
            let shouldType=vars.Arrays.A[1];
            if(v.type!==shouldType) return false;
            return (v.value===undefined);
          },
          solution: '§Aint;double;String§ §w0§;',
          preCode: ""
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
          aufgabe: "Die Variable §l0§ wird um §I0§ erhöht.",
          check: (scope,vars)=>{
            let v=getVariableFromScope(vars.l[0],scope);
            return (v.value===vars.I[0]+rand);
          },
          solution: '§l0§ = §l0§ + §I0§;',
          preCode: `int §l0§=${rand};`
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