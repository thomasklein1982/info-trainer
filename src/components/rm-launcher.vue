<template>
  
  <Button @click="openDialog" label="RM-Simulator öffnen"/>
  <Dialog ref="dialog" :header="exerciseData? exerciseData.title:'Registermaschine'" v-model:visible="show" :closable="true" maximizable :close-on-escape="false">
    <template #maximizeicon>
      <div style="position: relative">
        <div style="position: absolute; width: 200px; height: 200px;"/>
        <Button v-if="exerciseData" rounded @click.stop="showFeedback" text size="large"><span :class="'pi pi-'+(completed? 'check':'info')+(newInfos? ' shaking':'')"></span></Button>
      </div>
    </template>
    <template #closeicon><Button rounded @click.stop="closeDialog" text icon="pi pi-times" severity="secondary"/></template>
    <template #header>
      <div v-if="exerciseData" style="display: flex; width: 100%; align-items: center;"><ExerciseProgress :exercise-data="exerciseData"/></div>
    </template>
    <RmSimulator
      ref="rmSimulator"
      :machine="machine"
      :exercise-data="exerciseData"
      @save="save()"
      @exercise-submit="newInfos=true"
    />
  </Dialog>
</template>

<script>
import ProgressBar from 'primevue/progressbar';
import ExerciseProgress from './exercise-progress.vue';
import RmSimulator from './rm-simulator.vue';
import { calcPoints } from "../App.vue";
import { nextTick } from 'vue';

export default{
  components: {
    ProgressBar,ExerciseProgress,RmSimulator
  },
  emits: [
    "show-feedback"
  ],
  computed: {
    hasUserData(){
      return this.exerciseData.userMachine!==undefined;
    },
    completed(){
      if(!this.exerciseData) return false;
      return this.exerciseData.correct===true;
    },
  },
  props: {
    exerciseData: Object,
    machine: Object,
  },
  data(){
    return {
      show: false,
      newInfos: false,
      saveResolve: null
    }
  },
  methods: {
    closeDialog(){
      if(this.exerciseData){
        this.save(this.exerciseData);
      }else{
        let a=confirm("Dein Programm wird nicht gespeichert.\n\nTrotzem beenden?");
        if(!a) return;
      }
      
      this.show=false;
    },
    save(){
      if(!this.exerciseData) return;
      let data=this.$refs.rmSimulator.getUserData();
      if(data.resArray){
        this.exerciseData.correct=data.resArray;
        calcPoints(this.exerciseData);
      }
      if(data.machine){
        this.exerciseData.userProject=data.machine;
      }
      this.$root.save(this.exerciseData);
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
        this.$refs.rmSimulator.setUserData(this.exerciseData.userProject);
        
      });
      
    }
  }
}
</script>