<template>
  <Button @click="show=true" label="JavaApp starten"/>
  <Dialog :header="project?.name" v-model:visible="show" maximizable>
    <template #header>
      <div style="display: flex; width: 100%; align-items: center;"><span style="font-size: 120%; font-weight: bold;">{{ project?.name }}</span> <span style="flex: 1; margin-left: 0.5rem; margin-right: 0.5rem"><ProgressBar :value="percent">{{ exerciseData?.index }}/{{ exerciseData?.count }}</ProgressBar></span><Button v-if="completed" @click="$emit('show-feedback')" severity="success" size="small" icon="pi pi-check"/><Button v-else @click="$emit('show-feedback')" size="small" severity="danger" icon="pi pi-exclamation-triangle"/></div>
    </template>
    <JavaApp
      :project="project"
      :options="options"
      @exercise-submit="exerciseSubmitted"
    />
  </Dialog>
</template>

<script>
import ProgressBar from 'primevue/progressbar';
export default{
  components: {
    ProgressBar
  },
  emits: [
    "exercise-submit","show-feedback"
  ],
  computed: {
    percent(){
      if(!this.exerciseData) return 0;
      return this.exerciseData.index/this.exerciseData.count*100;
    },
    completed(){
      if(!this.exerciseData) return false;
      return this.exerciseData.index===this.exerciseData.count;
    },

  },
  props: {
    project: Object,
    options: Object,
    exerciseData: Object
  },
  data(){
    return {
      show: false
    }
  },
  methods: {
    exerciseSubmitted(data){
      this.exerciseData.count=data.testCaseCount;
      this.exerciseData.index=data.testCaseIndex;
      this.exerciseData.info=data.testCaseInfo;
      //this.$emit("exercise-submit",data);
    }
  }
}
</script>