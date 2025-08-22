<template>
  
  <Button @click="openDialog" label="Web-Editor öffnen"/>
  <Dialog ref="dialog" :header="exerciseData? exerciseData.title:'Web-Editor'" v-model:visible="show" :closable="true" maximizable :close-on-escape="false">
    <template #maximizeicon><Button v-if="exerciseData" :class="newInfos? 'shaking':''" rounded @click.stop="showFeedback" text size="large" style="width:200px;height:200px" :icon="'pi pi-'+(completed? 'check':'info')"/></template>
    <template #closeicon><Button rounded @click.stop="closeDialog" text icon="pi pi-times" severity="secondary"/></template>
    <template #header>
      <div v-if="exerciseData" style="display: flex; width: 100%; align-items: center;"><ExerciseProgress :exercise-data="exerciseData"/></div>
    </template>
    <WebEditor
      ref="webEditor"
      :project="project"
      :exercise-data="exerciseData"
      @save="save()"
      @exercise-submit="newInfos=true"
    />
  </Dialog>
</template>

<script>
import ProgressBar from 'primevue/progressbar';
import ExerciseProgress from './exercise-progress.vue';

import { calcPoints } from "../App.vue";
import { nextTick } from 'vue';
import { WebEditor } from './web-editor';

export default{
  components: {
    ProgressBar,ExerciseProgress,WebEditor
  },
  emits: [
    "show-feedback"
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
    exerciseData: Object,
    project: Object
  },
  data(){
    return {
      show: false,
      newInfos: false,
    }
  },
  methods: {
    closeDialog(){
      if(this.exerciseData){
        this.save();
      }else{
        let a=confirm("Dein Programm wird nicht gespeichert.\n\nTrotzem beenden?");
        if(!a) return;
      }
      
      this.show=false;
    },
    save(){
      if(!this.exerciseData) return;
      let data=this.$refs.webEditor.getUserData();
      if(data.resArray){
        this.exerciseData.correct=data.resArray;
        calcPoints(this.exerciseData);
      }
      if(data.project){
        this.exerciseData.userProject=data.project;
      }
      this.$root.save();
    },
    showFeedback(){
      this.newInfos=false;
      this.$emit('show-feedback');
    },
    openDialog(){
      if(!this.$refs.dialog.maximized){
        this.$refs.dialog.maximize();
      }
      this.show=true;
      if(!this.exerciseData) return;
      nextTick(()=>{
        this.$refs.webEditor.setUserData(this.exerciseData.userProject);
        
      });
      
    }
  }
}
</script>