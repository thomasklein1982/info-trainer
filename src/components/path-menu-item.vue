<template>
  <Button text pt:root:style="border-radius: 0; justify-content: left" fluid :label="pathData.label" @click="$emit('click')">
    {{pathData.label}} ({{ percent.toFixed(0) }}%)
  </Button>
</template>

<script>
import { isCompletelyTrue } from '../other/bool-array';

export default{
  components: {
  
  },
  props: {
    pathData: Object
  },
  computed: {
    percent(){
      return this.solvedCount/this.exerciseCount*100;
    },
    exerciseCount(){
      return this.pathData.exercises.length;
    },
    solvedCount(){
      let s=0;
      for(let i=0;i<this.pathData.exercises.length;i++){
        let id=this.pathData.exercises[i];
        let ed=this.$root.getExerciseData(id);
        if(ed && isCompletelyTrue(ed.correct)) s++;
      }
      return s;
    }
  }
}
</script>