<template>
  <span style="flex: 1; margin-left: 0.5rem; margin-right: 0.5rem">
    <ProgressBar :value="percent">{{ Math.floor(percent) }}%</ProgressBar>
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
      if(!this.exerciseData||!this.exerciseData.total) return 0;
      return this.exerciseData.points/this.exerciseData.total*100;
    }
  }
}
</script>