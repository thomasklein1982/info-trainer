<template>
  <Card :title="title" class="info-wrapper">
    
    <template #title>
      <div class="flex" style="align-items: center;"><span class="pi pi-info-circle" style="margin-right: 1ex"/> <span style="flex: 1">{{ title }}</span></div>
    </template>
    <template #content>
      <slot></slot>
      <Button v-if="!disabled && $root.addExercisesToAB && !$root.isExerciseInAB(id)" icon="pi pi-plus" label="Zu AB hinzufügen" @click="$root.addExerciseToAB(id)"/>
      <div v-if="disabled && $root.addExercisesToAB && $root.isExerciseInAB(id)">
        <Button icon="pi pi-caret-up" @click="$root.moveExerciseUpOnAB(id)"/>
        <Button icon="pi pi-caret-down" @click="$root.moveExerciseDownOnAB(id)"/>
        <Button icon="pi pi-trash" @click="$root.removeExerciseFromAB(id)"/>
        <InputText v-model="$root.ab.paths[id]"/>
      </div>
    </template>
    
  </Card>
</template>

<script>


export default {
  components: {
    
  },
  props: {
    id: String,
    ab: Object,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    title(){
      return this.exerciseData?.data.title;
    },
    testCaseCount(){
      return this.exerciseData?.data.check.testcases.length;
    },
    exerciseData(){
      let root;
      root=this.$root;
      if(this.id===undefined) return;
      let ed=root.getExerciseData(this.id);
      return ed;
    }
  },
  data(){
    return {
      
    };
  },
  methods: {
    
  }
}
</script>

<style scoped>
  .info-wrapper{
    border: 2pt solid slateblue;
    background-color: rgba(100,100,200,0.5);
  }
  
</style>