<template>
  <Card :title="title">
    
    <template #title>
      <div >Aufgabe {{number}}: {{ title }} </div>
      
    </template>
    <template #content>
      <ConfirmPopup></ConfirmPopup>
      <div style="display: flex; align-items: center"><span>Fortschritt:</span><ExerciseProgress style="flex: 1" :exercise-data="exerciseData"/><Button :disabled="!hasUserData" @click="confirmReset" size="small" text rounded icon="pi pi-trash"/></div>
      <slot></slot>
    </template>
  </Card>
</template>

<script>
import { calcPoints } from "../App.vue";
import { createBoolArray } from "../other/bool-array";
import DialogFeedback from "./dialog-feedback.vue";
import ExerciseProgress from "./exercise-progress.vue";
import JavaApp from "./java-app.vue";


export default {
  components: {
    JavaApp, DialogFeedback,ExerciseProgress
  },
  props: {
    id: String,
    number: Number
  },
  computed: {
    title(){
      return this.exerciseData.data.title;
    },
    testCaseCount(){
      return this.exerciseData.data.check.testcases.length;
    },
    hasUserData(){
      return this.exerciseData.userProject!==undefined;
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
      console.log("confirm");
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
      this.exerciseData.correct=createBoolArray(this.exerciseData.data.check.testcases.length);
      calcPoints(this.exerciseData);
      this.$root.save();
    }
  }
}
</script>