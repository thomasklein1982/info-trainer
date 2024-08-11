<template>
  <h2>Aufgabenserie {{ path.label }} [{{path.category}}]</h2>
  <template v-for="(e,i) in path.exercises">
    <ExerciseWrapper :number="i+1" :id="e">
      <component :is="e"/>
    </ExerciseWrapper>
  </template>
</template>

<script>
import ExerciseWrapper from './exercise-wrapper.vue';


export default{
  components: {
    ExerciseWrapper
  },
  props: {
    path: Object
  }
}
</script>