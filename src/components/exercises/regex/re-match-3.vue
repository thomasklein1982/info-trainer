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
  id: "re-match-3",
  title: "Alternative",
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
      this.regexp="r[abc]+[def]*s|s[def]*[abc]+r";
      let regeexpCorrect=[
        "r(a+|b+|c+)(d*|e*|f*)s|s(d*|e*|f*)(a+|b+|c+)r",
        "r[abc][def]s|s[def][abc]r",
        "r[abc]{3,6}s|s[abc]{3,6}r",
        "r[ab][df]{2,5}|s[df]{2,5}[ab]r",
      ];
      let regexpWrong=[
        "r[def]+s|s[def]+r",
        "s[abc]+[def]*r|r[def]*[abc]+s",
        "r[abc]{1,2}d[abc][def]{2,3}s|s[def]{2,3}[abc]{1,2}d[abc]{1,2}s",
        "r(a+|b+|c+)(d*|e*|f*)|s(d*|e*|f*)(a+|b+|c+)"
      ];
      create(this.regexp,regeexpCorrect, regexpWrong, this.$data, Random, resArray);
      
    },
    check(){
      return this.$refs.exercise.check();
    }
  }
}
</script>