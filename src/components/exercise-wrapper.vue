<template>
  <Card>
    
    <template #title>
      <div class="flex"><span style="flex: 1">Aufgabe {{number}}: {{ title }}</span> <span v-if="$root.mode.type==='ab' || $root.addExercisesToAB">({{ exerciseData.total }} P)</span></div>
      
    </template>
    <template #content>
      <ConfirmPopup></ConfirmPopup>
      <div class="no-print" v-if="!disabled" style="display: flex; align-items: center"><span>Fortschritt:</span><ExerciseProgress style="flex: 1" :exercise-data="exerciseData"/><Button :disabled="!hasUserData" @click="confirmReset" size="small" text rounded icon="pi pi-trash"/></div>
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
import { calcPoints } from "../App.vue";
import { createBoolArray, intToBoolArray } from "../other/bool-array";
import DialogFeedback from "./dialog-feedback.vue";
import ExerciseProgress from "./exercise-progress.vue";
import JavaApp from "./java-app.vue";


export default {
  components: {
    JavaApp, DialogFeedback,ExerciseProgress
  },
  props: {
    id: String,
    number: Number,
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
    hasUserData(){
      return this.exerciseData?.userProject!==undefined;
    },
    project(){
      if(this.exerciseData.userProject){
        return this.exerciseData.userProject;
      }else{
        return this.exerciseData.data.project;
      }
    },
    exerciseData(){
      let root;
      root=this.$root;
      if(this.id===undefined) return;
      let ed=root.getExerciseData(this.id);
      if(!Array.isArray(ed.correct)){
        ed.correct=intToBoolArray(ed.correct);
      }
      return ed;
      //return root.setExerciseData(this.exercise);
    }
  },
  data(){
    return {
      
    };
  },
  methods: {
    confirmReset(event) {
      this.$confirm.require({
        target: event.currentTarget,
        message: 'Soll die Aufgabe wirklich zurückgesetzt werden?',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Abbrechen',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Zurücksetzen'
        },
        accept: () => {
          this.reset();
            //this.$toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            //this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
      });

    },
    reset(){
      delete this.exerciseData.userProject;
      let count;
      if(this.exerciseData.data.check){
        count=this.exerciseData.data.check.testcases.length;
      }else if(this.exerciseData.data.tasks){
        count=this.exerciseData.data.tasks.length;
      }else if(this.exerciseData.data.features){
        count=this.exerciseData.data.features.length;
      }
      this.exerciseData.correct=createBoolArray(count);
      calcPoints(this.exerciseData);
      this.$root.save();
    }
  }
}
</script>