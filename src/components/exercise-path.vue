<template>
  <h2 style="text-align: center"><span v-if="path.category">{{path.category}}: </span>{{ path.label }} <Button class="no-print" label="" as="a" target="_blank" style="text-decoration: none" :href="directLink" text icon="pi pi-send"/></h2>
  <template v-for="(e,i) in items">
    <ExerciseWrapper v-if="e.isExercise" :number="e.nr" :id="e.id" :disabled="disabled">
      <component :is="e.id"/>
    </ExerciseWrapper>
    <InfoWrapper v-else :id="e.id" :disabled="disabled">
      <component :is="e.id"/>
    </InfoWrapper>
  </template>
  <CheatSheet :path="path"/>
</template>

<script>
import CheatSheet from './cheat-sheet.vue';
import ExerciseWrapper from './exercise-wrapper.vue';
import InfoWrapper from './info-wrapper.vue';
import { exerciseDataCollection } from '../App.vue';

export default{
  components: {
    ExerciseWrapper, CheatSheet, InfoWrapper
  },
  props: {
    path: Object,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    directLink(){
      console.log("loc",location)
      return location.origin+location.pathname+"#start="+this.path.categoryID+"/"+this.path.id;
    },
    items(){
      let items=[];
      let nr=1;
      for(let i=0;i<this.path.exercises.length;i++){
        let p=this.path.exercises[i];
        let ex=exerciseDataCollection[p];
        let isExercise="correct" in ex;
        items.push({
          id: p,
          isExercise,
          nr: isExercise? nr: -1
        });
        if(isExercise) nr++;
      }
      return items;
    }
  }
}
</script>