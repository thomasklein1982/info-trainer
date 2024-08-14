<template>
  <div style="display: grid; place-content: end;">
    <Button @click="openDialog" label="JavaApp starten"/>
  </div>
  <Dialog ref="dialog" :header="project?.name" v-model:visible="show" maximizable>
    <template #maximizeicon><Button :class="newInfos? 'shaking':''" rounded @click.stop="showFeedback" text size="small" :icon="'pi pi-'+(completed? 'check':'info')"/></template>
    <template #header>
      <div style="display: flex; width: 100%; align-items: center;"><ExerciseProgress :exercise-data="exerciseData"/></div>
    </template>
    <JavaApp
      :project="project"
      :options="options"
      :check="check"
      @exercise-submit="exerciseSubmitted"
    />
  </Dialog>
</template>

<script>
import ProgressBar from 'primevue/progressbar';
import ExerciseProgress from './exercise-progress.vue';

export default{
  components: {
    ProgressBar,ExerciseProgress
  },
  emits: [
    "exercise-submit","show-feedback","reset-exercise"
  ],
  computed: {
    hasUserData(){
      return this.exerciseData.userProject!==undefined;
    },
    completed(){
      if(!this.exerciseData) return false;
      return this.exerciseData.correct===true;
    },
  },
  props: {
    project: Object,
    options: Object,
    check: Object,
    exerciseData: Object
  },
  data(){
    return {
      show: false,
      newInfos: false
    }
  },
  methods: {
    showFeedback(){
      this.newInfos=false;
      this.$emit('show-feedback');
    },
    openDialog(){
      if(!this.$refs.dialog.maximized){
        this.$refs.dialog.maximize();
      }
      this.show=true;
    },
    exerciseSubmitted(data){
      this.newInfos=true;
      this.$emit("exercise-submit",data);
    }
  }
}
</script>