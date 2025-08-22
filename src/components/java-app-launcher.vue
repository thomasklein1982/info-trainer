<template>
  <div style="display: grid; place-content: end;">
    <Button @click="openDialog" label="JavaApp starten"/>
  </div>
  <Dialog ref="dialog" :header="project?.name" v-model:visible="show" :closable="true" maximizable :close-on-escape="false">
    <template #maximizeicon>
      <div style="position: relative" @click.stop="stopMaximize">
        <Button  rounded @click.stop="showFeedback" text size="large"><span :class="'pi pi-'+(completed? 'check':'info')+(newInfos? ' shaking':'')"></span></Button>
      </div>
    </template>
    <template #closeicon><Button rounded @click.stop="closeDialog" text icon="pi pi-times" severity="secondary" :loading="saveResolve!==null"/></template>
    <template #header>
      <div style="display: flex; width: 100%; align-items: center;"><ExerciseProgress :exercise-data="exerciseData"/></div>
    </template>
    <JavaApp
      ref="javaApp"
      :project="project"
      :user-project="userProject"
      :options="options"
      :check="check"
      @exercise-submit="exerciseSubmitted"
      @close-dialog="closeDialogFinish"
    />
  </Dialog>
</template>

<script>
import ProgressBar from 'primevue/progressbar';
import ExerciseProgress from './exercise-progress.vue';

export default{
  components: {
    ProgressBar,ExerciseProgress
  },
  emits: [
    "exercise-submit","show-feedback","reset-exercise"
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
    project: Object,
    userProject: Object,
    options: Object,
    check: Object,
    exerciseData: Object
  },
  data(){
    return {
      show: false,
      newInfos: false,
      saveResolve: null
    }
  },
  methods: {
    stopMaximize(ev){
      ev.stopPropagation();
    },
    async closeDialog(){
      if(this.saveResolve) return;
      this.$refs.javaApp.sendMessage("give-exercise-data",{});
      let p=new Promise((resolve,reject)=>{
        this.saveResolve=resolve;
        setTimeout(()=>{
          if(!this.saveResolve) return;
          alert("Fehler: Ihre Änderungen konnten unter Umständen nicht gespeichert werden.\n\nVerwenden Sie die aktuelle JavaApp-Version?");
          resolve();
        },3000);
          
      });
      await p;
      this.show=false;
      this.saveResolve=null;
    },
    closeDialogFinish(data){
      this.$emit("exercise-submit",data);
      if(this.saveResolve){
        this.saveResolve();
      }
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
    },
    exerciseSubmitted(data){
      this.newInfos=true;
      this.$emit("exercise-submit",data);
    }
  }
}
</script>