<template>
  <h2 style="text-align: center"><span v-if="path.category">{{path.category}}: </span>{{ path.label }}</h2>
  <template v-for="(e,i) in path.exercises">
    <ExerciseWrapper :number="i+1" :id="e" :disabled="disabled">
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
    path: Object,
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>