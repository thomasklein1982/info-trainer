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
  id: "re-match-1",
  title: "LOL",
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
      this.regexp="lo";
      let regeexpCorrect=[
        "Hallo",
        "Hello",
        "analog",
        "loading",
      ];
      let regexpWrong=[
        "Lord",
        "toll",
        "saving",
        "Claudio"
      ];
      create(this.regexp,regeexpCorrect, regexpWrong, this.$data, Random, resArray);
      
    },
    check(){
      return this.$refs.exercise.check();
    }
  }
}
</script>