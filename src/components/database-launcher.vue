<template>
  
  <Button @click="openDialog" label="SQL-Aufgabe bearbeiten"/>
  <Dialog ref="dialog" @hide="save()" modal v-model:visible="show" class="maximized">
    <template #header>
      {{ exerciseData.data.title }} <ExerciseProgress style="flex: 1" :exercise-data="exerciseData"/>
    </template>
    <slot></slot>
    <div style="display: grid; grid-template-columns: 1fr 1fr;">
      <div>

      </div>
    </div>
    <p>
      <Button icon="pi pi-refresh" :disabled="checking" label="Neue Daten" @click="refreshData()"/>
      <Button label="Überprüfen" :disabled="!re" :loading="checking" @click="check()"/>
    </p>
  </Dialog>
</template>

<script>
import ProgressBar from 'primevue/progressbar';
import ExerciseProgress from './exercise-progress.vue';
import { calcPoints } from "../App.vue";
import { nextTick } from 'vue';
import { RandExpSeeded } from '../other/RandExpSeeded';
import { sleep } from '../other/sleep';

export default{
  components: {
    ProgressBar,ExerciseProgress
  },
  watch: {
    
  },
  computed: {
    hasUserData(){
      return this.exerciseData.userData!==undefined;
    },
    completed(){
      if(!this.exerciseData) return false;
      return this.exerciseData.correct===true;
    }
  },
  props: {
    exerciseData: Object,
    database: Object,
    code: String
  },
  data(){
    return {
      show: false,
      input: "",
      error: false,
      correct: false,
      checking: false
    }
  },
  methods: {
    refreshData(){
      
    },
    check(){
      
      
    },
    save(){
      this.$root.save(this.exerciseData);
    },
    openDialog(){
      if(this.exerciseData.userProject){
        this.input=this.exerciseData.userProject;
      }else{
        this.input="";
      }
      this.refreshData();
      this.show=true;
    }
  }
}
</script>