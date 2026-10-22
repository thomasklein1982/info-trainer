<template>
  <ChallengeStart 
    v-if="progress<0"
    :title="path.label"
    :exercise-count="exerciseCount"
    @start="startChallenge"
  />
  <ChallengeEnd 
    v-else-if="progress>=exerciseCount"
    :title="path.label"
    :name="name"
    :exercises="exercises"
    :start-date="startDate"
    @restart="restart()"
  />
  <ChallengeExercise
    v-else
    :title="path.label"
    :exercise="exercises[progress]"
    :exercise-count="exerciseCount"
    :path="path"
    @proceed="proceed()"
  />
</template>

<script>
import { exerciseDataCollection } from '../App.vue';
import ChallengeEnd from './challenge-end.vue';
import ChallengeExercise from './challenge-exercise.vue';
import ChallengeStart from './challenge-start.vue';

export default{
  components: {
    ChallengeEnd, ChallengeStart, ChallengeExercise
  },
  props: {
    path: Object
  },
  computed: {
    exercises(){
      return this.exercisesAndInfos.exercises;
    },
    exercisesAndInfos(){
      let exercises=[];
      let infos=[];
      let nr=1;
      for(let i=0;i<this.path.exercises.length;i++){
        let p=this.path.exercises[i];
        let ex=exerciseDataCollection[p];
        let isExercise="correct" in ex;
        if(isExercise){
          exercises.push({
            id: p,
            isExercise,
            nr
          });
          nr++;
        }else{
          infos.push({
            id: p,
            isExercise
          });
        }
      }
      return {
        exercises, infos
      };
    },
    exerciseCount(){
      return this.exercisesAndInfos.exercises.length;
    }
  },
  data(){
    return {
      progress: -1,
      name: "",
      startDate: null
    };
  },
  methods: {
    proceed(){
      this.progress++;
    },
    startChallenge(name){
      this.startDate=new Date();
      this.name=name;
      this.progress=0;
    },
    restart(){
      location.reload();
    }
  }
}

</script>