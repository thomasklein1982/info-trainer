<template>
  <div>
    <slot></slot>
    <template v-if="project">
      <JavaAppLauncher
        :project="project"
        :user-project="userProject"
        :check="exercise.check"
        :exercise-data="exerciseData"
        @exercise-submit="exerciseSubmitted"
        @show-feedback="$refs.dialogFeedback.open()"
      />
      <DialogFeedback ref="dialogFeedback" :exercise-data="exerciseData">
        <slot></slot>  
      </DialogFeedback>
    </template>
  </div>
</template>

<script>
import { calcPoints } from "../App.vue";
import { isCompletelyTrue } from "../other/bool-array";
import DialogFeedback from "./dialog-feedback.vue";
import ExerciseProgress from "./exercise-progress.vue";
import JavaApp from "./java-app.vue";


export default {
  components: {
    JavaApp, DialogFeedback,ExerciseProgress
  },
  props: {
    exercise: Object,
    showOnlyExercise: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    title(){
      return this.exercise.title;
    },
    testCaseCount(){
      return this.exerciseData.data.check.testcases.length;
    },
    hasUserData(){
      return this.exerciseData.userProject!==undefined;
    },
    project(){
      return JSON.parse(JSON.stringify(this.exercise.project));
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
      if(isCompletelyTrue(data.resArray)){
        this.exerciseData.correct=true;
      }else{
        this.exerciseData.correct=data.resArray;
      }
      calcPoints(this.exerciseData);
      let clazzes=[];
      for(let i=0;i<data.project.clazzes.length;i++){
        let c=data.project.clazzes[i];
        if(!c.isHidden){
          clazzes.push(c);
        }
      }
      data.project.clazzes=clazzes;
      this.exerciseData.userProject=data.project;
      this.$root.save();
    }
  }
}
</script>