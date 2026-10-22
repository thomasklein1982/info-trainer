<template>
  <div class="flex-column" style="flex: 1;overflow: hidden">
    <div class="bar">
      <h1 style="margin: 0">Challenge: {{ title }}</h1>
      <small>Aufgabe {{ exercise.nr }} von {{ exerciseCount }}</small>
    </div>
    <div style="flex: 1; overflow: auto">
      <ExerciseWrapper  ref="wrapper" :number="exercise.nr" :id="exercise.id">
        <component :is="exercise.id"/>
      </ExerciseWrapper>
      <CheatSheet :path="path"/>
    </div>
    <div class="bar" style="text-align: right">
      <Button @click="proceed()">{{ proceedLabel }}</Button>
    </div>
  </div>
</template>

<script>
import CheatSheet from './cheat-sheet.vue';
import ExerciseWrapper from './exercise-wrapper.vue';


export default {
  components: {
    ExerciseWrapper, CheatSheet
  },
  emits: [

  ],
  props: {
    title: String,
    exercise: Object,
    exerciseCount: Number,
    path: Object
  },
  computed: {
    proceedLabel(){
      if(this.exerciseSolved){
        if(this.exercise.nr===this.exerciseCount){
          return "Beenden";
        }else{
          return "Nächste Aufgabe";
        }
      }else{
        return "Aufgabe überspringen";
      }
    },
    exerciseData(){
      let ed=this.$root.getExerciseData(this.exercise.id);
      if(!Array.isArray(ed.correct)){
        ed.correct=intToBoolArray(ed.correct);
      }
      return ed;
    },
    exerciseSolved(){
      return this.exerciseData.points===this.exerciseData.total;
    }
  },
  methods: {
    proceed(){
      this.$emit("proceed");
    }
  }
}
</script>

<style scoped>
.bar{
  padding: 0.3rem;
  border-top: 1pt solid gray;
  border-bottom: 1pt solid gray;
}
</style>