<template>
  <ExerciseBody :exercise="$data">
    Entscheide für jeden der folgenden Texte, ob der reguläre Ausdruck passt oder nicht.

    <template #exercise>
      <RegExpMatchExercise
        ref="exercise"
        :edata="$data"
      >

      </RegExpMatchExercise>
    </template>
  </ExerciseBody>
</template>

<script>
import RegExpMatchExercise from './RegExpMatchExercise.vue';
import { create } from './RegExpMatchExercise.vue';



export const data={
  id: "re-match-2",
  title: "Ein Tisch?",
  regexp: "",
  tasks: [
    {},{},{},{}
  ]
}

export default{
  components: {
    RegExpMatchExercise
  },
  data() {
    return data;
  },
  methods: {
    create(Random, resArray){
      this.regexp="T.isch?$";
      let regeexpCorrect=[
        "T\\?isc",
        "T\\Wisch",
        "\\W{1,3}T\\wisch",
        "\\w{1,3}T\\disc",
      ];
      let regexpWrong=[
        "Tisch",
        "Tausch",
        "T\\Wisch\\?",
        "\\W{1,3}T\\wis"
      ];
      create(this.regexp,regeexpCorrect, regexpWrong, this.$data, Random, resArray);
      
    },
    check(){
      return this.$refs.exercise.check();
    }
  }
}
</script>