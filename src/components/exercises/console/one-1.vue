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
  title: "Java-Oneliners: Variablen und Datentypen",
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
          aufgabe: 'Es wird eine Variable namens §l0§ deklariert, die §Aeine ganze Zahl;eine Kommazahl;eine Zeichenkette;einen Wahrheitswert§ speichern kann, und sie erhält den Wert §A5;3.14;"Hallo";false§.',
          check: (scope,vars)=>{
            let v=getVariableFromScope(vars.l[0],scope);
            if(!v) return false;
            let shouldType=vars.Arrays.A[2];
            if(v.type!==shouldType) return false;
            let shouldValue=vars.Arrays.A[1];
            return (JSON.stringify(v.value)===shouldValue);
          },
          solution: '§Aint;double;String;boolean§ §l0§ = §A5;3.14;"Hallo";false§;',
          preCode: ""
        },
        {
          aufgabe: "Es wird eine Variable namens §w0§ deklariert, die eine §Aeine ganze Zahl;eine Kommazahl;eine Zeichenkette;einen Wahrheitswert§ speichern kann.",
          check: (scope,vars)=>{
            let v=getVariableFromScope(vars.w[0],scope);
            if(!v) return false;
            let shouldType=vars.Arrays.A[1];
            if(v.type!==shouldType) return false;
            return (v.value===undefined);
          },
          solution: '§Aint;double;String;boolean§ §w0§;',
          preCode: ""
        },
        {
          aufgabe: "Der Wert der String-Variable §l0§ wird in eine ganze Zahl umgewandelt und in der Integer-Variablen §l1§ gespeichert.",
          check: (scope,vars)=>{
            let v1=getVariableFromScope(vars.l[1],scope);
            return (v1.value===rand);
          },
          solution: '§l1§ = Integer.parseInt( §l0§ );',
          preCode: `int §l1§; String §l0§ = "${rand}";`
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