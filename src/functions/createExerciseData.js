import {data as ArraySwap} from '../components/exercises/array-swap.vue';

function createExerciseData(){
  let o={};
  o[ArraySwap.id]=ArraySwap;
  return o;
}

export const exerciseData=createExerciseData();