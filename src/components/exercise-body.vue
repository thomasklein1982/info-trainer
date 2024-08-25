<template>
  <div>
    <slot name="intro"></slot>
    <div style="display: grid; place-content: end;">
      
      <template v-if="java">
        <JavaAppLauncher
          :project="project"
          :user-project="userProject"
          :check="exercise.check"
          :exercise-data="exerciseData"
          @exercise-submit="exerciseSubmitted"
          @show-feedback="$refs.dialogFeedback.open()"
        />
      </template>
      <template v-else-if="turingMachine">
        <TuringMachineLauncher
          :exercise-data="exerciseData"
          :machine="turingMachine"
          @show-feedback="$refs.dialogFeedback.open()"
        />
      </template>
      <template v-else>
        <Button label="Aufgabe bearbeiten" @click="showExercise()"/>
        <Dialog modal v-model:visible="showExerciseDialog" :header="title">
          <slot name="intro"></slot>
          <div style="position: relative">
            <slot name="exercise"></slot>
            <div style="position: absolute; left: 0; right: 0; top: 0; bottom: 0" v-if="exerciseChecked"/>
          </div>
          
          <template #footer>
            <Button v-if="!exerciseChecked" icon="pi pi-list-check" label="Überprüfen" @click="checkExercise()"/>
            <Button v-else icon="pi pi-refresh" label="Neue Aufgabe" @click="refreshExercise()"/>
          </template>
        </Dialog>
      </template>
    </div>
    <DialogFeedback ref="dialogFeedback" :exercise-data="exerciseData">
      <slot></slot>  
    </DialogFeedback>
  </div>
</template>

<script>
import { calcPoints } from "../App.vue";
import { isCompletelyTrue, setArrayToValue } from "../other/bool-array";
import { Random, random } from "../other/random";
import DialogFeedback from "./dialog-feedback.vue";
import ExerciseProgress from "./exercise-progress.vue";
import JavaApp from "./java-app.vue";
import TuringMachineLauncher from "./turing-machine-launcher.vue";


export default {
  components: {
    JavaApp, DialogFeedback,ExerciseProgress, TuringMachineLauncher
  },
  props: {
    exercise: Object,
    showOnlyExercise: {
      type: Boolean,
      default: false
    },
    turingMachine: Object,
    java: Object
  },
  computed: {
    exerciseChecked(){
      return this.exerciseData.userProject!==undefined;
    },
    title(){
      return this.exercise.title;
    },
    testCaseCount(){
      return this.exerciseData.data.check.testcases.length;
    },
    project(){
      if(!this.java) return null;
      return JSON.parse(JSON.stringify(this.java));
    },
    userProject(){
      if(this.exerciseData.userProject){
        return this.exerciseData.userProject;
      }else{
        return null;
      }
    },
    id(){
      return this.exercise.id;
    },
    exerciseData(){
      let root;
      root=this.$root;
      if(this.id===undefined) return;
      let ed=root.getExerciseData(this.id,this.exercise);
      return ed;
      //return root.setExerciseData(this.exercise);
    }
  },
  data(){
    return {
      showExerciseDialog: false,
      seed: 0
    };
  },
  methods: {
    showExercise(){
      let resArray;
      if(this.exerciseData.userProject!==undefined){
        this.seed=this.exerciseData.userProject;
        resArray=this.exerciseData.correct;
      }else{
        this.seed=random(1000,99999999);
        resArray=undefined;
      }
      Random.setSeed(this.seed);
      this.$parent.create(Random,resArray);
      this.showExerciseDialog=true;
      this.$root.save();
    },
    exerciseSubmitted(data){
      //this.exerciseData.count=data.testCaseCount;
      if(data.resArray){
        this.exerciseData.correct=data.resArray;
        calcPoints(this.exerciseData);
      }
      if(data.project){
        let clazzes=[];
        for(let i=0;i<data.project.clazzes.length;i++){
          let c=data.project.clazzes[i];
          if(!c.isHidden){
            clazzes.push(c);
          }
        }
        data.project.clazzes=clazzes;
        this.exerciseData.userProject=data.project;
      }
      this.$root.save();
    },
    checkExercise(){
      let resArray=this.$parent.check();
      this.exerciseData.correct=resArray;
      this.exerciseData.userProject=this.seed;
      calcPoints(this.exerciseData);
      this.$root.save();
    },
    refreshExercise(){
      this.seed=random(1000,99999999);
      Random.setSeed(this.seed);
      this.$parent.create(Random);
      delete this.exerciseData.userProject;
      setArrayToValue(this.exerciseData.correct,false);
      calcPoints(this.exerciseData);
      this.$root.save();
    }
  }
}
</script>