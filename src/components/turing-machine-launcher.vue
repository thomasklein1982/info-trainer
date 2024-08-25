<template>
  
  <Button @click="openDialog" label="TM-Simulator öffnen"/>
  <Dialog ref="dialog" :header="exerciseData? exerciseData.title:'Turing-Maschine'" v-model:visible="show" :closable="true" maximizable :close-on-escape="false">
    <template #maximizeicon><Button v-if="exerciseData" :class="newInfos? 'shaking':''" rounded @click.stop="showFeedback" text size="large" style="width:200px;height:200px" :icon="'pi pi-'+(completed? 'check':'info')"/></template>
    <template #closeicon><Button rounded @click.stop="closeDialog" text icon="pi pi-times" severity="secondary"/></template>
    <template #header>
      <div v-if="exerciseData" style="display: flex; width: 100%; align-items: center;"><ExerciseProgress :exercise-data="exerciseData"/></div>
    </template>
    <TmSimulator
      ref="tmSimulator"
      :machine="machine"
      :exercise-data="exerciseData"
      @save="save()"
    />
  </Dialog>
</template>

<script>
import ProgressBar from 'primevue/progressbar';
import ExerciseProgress from './exercise-progress.vue';
import TmSimulator from './tm-simulator.vue';
import { calcPoints } from "../App.vue";
import { nextTick } from 'vue';

export default{
  components: {
    ProgressBar,ExerciseProgress,TmSimulator
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
    machine: Object
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
        this.save();
      }else{
        let a=confirm("Dein Programm wird nicht gespeichert.\n\nTrotzem beenden?");
        if(!a) return;
      }
      
      this.show=false;
    },
    save(){
      if(!this.exerciseData) return;
      let data=this.$refs.tmSimulator.getUserData();
      if(data.resArray){
        if(isCompletelyTrue(data.resArray)){
          this.exerciseData.correct=true;
        }else{
          this.exerciseData.correct=data.resArray;
        }
        calcPoints(this.exerciseData);
      }
      if(data.machine){
        this.exerciseData.userProject=data.machine;
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
        this.$refs.tmSimulator.setUserData(this.exerciseData.userProject);
        
      });
      
    }
  }
}
</script>