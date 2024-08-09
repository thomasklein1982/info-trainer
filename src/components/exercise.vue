<template>
  <Card :title="title">
    <template #title>
      {{ title }}
    </template>
    <template #content>
      <slot name="exercise"></slot>
      <slot name="input"></slot>
      <template v-if="project">
        <JavaAppLauncher
          :project="project"
          :exercise-data="exerciseData"
          @exercise-submit="exerciseSubmitted"
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
    exercise: Object,
  },
  computed: {
    title(){
      return this.project.title;
    },
    project(){
      if(this.exerciseData.userProject){
        return this.exerciseData.userProject;
      }else{
        return this.exercise.project;
      }
    },
    id(){
      return this.exercise.id;
    },
    exerciseData(){
      let root;
      root=this.$root;
      if(this.id===undefined) return;
      let ed=root.getExerciseData(this.id);
      if(ed) return ed;
      return root.setExerciseData(this.exercise);
    }
  },
  data(){
    return {
      
    };
  },
  methods: {
    exerciseSubmitted(data){
      this.exerciseData.count=data.testCaseCount;
      this.exerciseData.index=data.testCaseIndex;
      this.exerciseData.info=data.testCaseInfo;
      console.log(data);
      this.exerciseData.userProject=data.project;
      this.$root.save();
    }
  }
}
</script>