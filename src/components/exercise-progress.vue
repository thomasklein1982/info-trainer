<template>
  <span style="flex: 1; margin-left: 0.5rem; margin-right: 0.5rem">
    <ProgressBar :value="percent">{{ exerciseData?.index }}/{{ testCaseCount }}</ProgressBar>
  </span>
</template>

<script>
import ProgressBar from 'primevue/progressbar';
export default{
  components: {
    ProgressBar
  },
  props: {
    exerciseData: Object
  },
  computed: {
    percent(){
      if(!this.exerciseData) return 0;
      return this.exerciseData.index/this.testCaseCount*100;
    },
    testCaseCount(){
      return this.exerciseData.count;
    },
  }
}
</script>