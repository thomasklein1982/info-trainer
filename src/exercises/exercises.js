import arrayTausch from "./array-tausch";

export const exerciseDataCollection={

}

export function addExercise(data){
  exerciseDataCollection[data.id]=data;
}

addExercise(arrayTausch);