<template>
  <Card :title="title">
    <template #title>
      {{ title }}
    </template>
    <template #content>
      Inhalt
      <slot name="exercise"></slot>
      <slot name="input"></slot>
      <template v-if="project">
        <JavaAppLauncher
          :project="project"
          :exercise-data="exerciseData"
          @exercise-submit=""
          @show-feedback="$refs.dialogFeedback.open()"
        />
        <DialogFeedback ref="dialogFeedback" :exercise-data="exerciseData"/>
      </template>
    </template>
  </Card>
</template>

<script>
import DialogFeedback from "./dialog-feedback.vue";
import JavaApp from "./java-app.vue";


export default {
  components: {
    JavaApp, DialogFeedback
  },
  props: {
    title: String,
    project: Object,
    id: String
  },
  computed: {
    exerciseData(){
      let root;
      root=this.$root;
      if(this.id===undefined) return;
      return root.getExerciseData(this.id);
    }
  },
  data(){
    return {
      
    };
  }
}
</script>