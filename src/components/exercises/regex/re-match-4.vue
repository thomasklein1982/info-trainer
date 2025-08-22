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
  id: "re-match-4",
  title: "AEIOU, du gehörst doch mit dazu!",
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
      this.regexp="^(([WKL][aeiou]|[AEIOU]?[^aeiou])[a-z]*){1,2}\\.$";
      let regeexpCorrect=[
        "(([WKL][aeiou])[a-z]*){1,2}\\.",
        "(([AEIOU]?[^aeiou])[a-z]*){1,2}\\.",
        "(([WKL][aeiou]|[AEIOU]?[^aeiou])){1,2}\\.",
        "(([WKL][aeiou]|[^aeiou])[a-z]){2}\\.",
      ];
      let regexpWrong=[
        "(([WKL][aeiou])[a-z]{1,2})(([WKL][j-n]))[a-z]+\\.",
        "(([AEIOU]?[aeiou])[a-z]*)([WKL][aeiou][a-z]*)?\\.",
        "(([WKL][aeiou]|[AEIOU]?[^aeiou])[a-z]*){3}\\.",
        "(([WKL][aeiou]|[AEIOU]?[^aeiou])[a-z]{3,5})",
      ];
      create(this.regexp,regeexpCorrect, regexpWrong, this.$data, Random, resArray);
      
    },
    check(){
      return this.$refs.exercise.check();
    }
  }
}
</script>