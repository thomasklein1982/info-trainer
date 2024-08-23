<template>
  <div>
    <slot></slot>
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
    <template v-if="turingMachine">
      <TuringMachineLauncher
        :exercise-data="exerciseData"
        :machine="turingMachine"
        @show-feedback="$refs.dialogFeedback.open()"
      />
    </template>
    <DialogFeedback ref="dialogFeedback" :exercise-data="exerciseData">
      <slot></slot>  
    </DialogFeedback>
  </div>
</template>

<script>
import { calcPoints } from "../App.vue";
import { isCompletelyTrue } from "../other/bool-array";
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
      
    };
  },
  methods: {
    exerciseSubmitted(data){
      //this.exerciseData.count=data.testCaseCount;
      if(data.resArray){
        if(isCompletelyTrue(data.resArray)){
          this.exerciseData.correct=true;
        }else{
          this.exerciseData.correct=data.resArray;
        }
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
    }
  }
}
</script>