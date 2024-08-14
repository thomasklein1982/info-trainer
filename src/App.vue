
<template>
  <MainScreen/>
  
</template>

<script>
const version="0.0.6";

import MainScreen from './components/main-screen.vue';
//import PWABadge from './components/PWABadge.vue'
import { storage } from './other/storage';
import * as exercises from './components/exercises/index';
import { boolArrayToInt, createBoolArray, intToBoolArray } from './other/bool-array';
const STORAGE_DATA="INFO-TRAINER-USER-DATA";

let exerciseDataCollection={};
for(let a in exercises){
  let data=exercises[a].data;
  console.log(a,data);
  
  let testcases=data.check.testcases;
  let ed={
    correct: createBoolArray(testcases.length),
    data: data
  };
  let p=0;
  for(let i=0;i<testcases.length;i++){
    let tc=testcases[i];
    p+=tc.points? tc.points: 1;
  }
  ed.total=p;
  exerciseDataCollection[data.id]=ed;
}

export function calcPoints(exerciseData){
  let p=0;
  let testcases=exerciseData.data.check.testcases;
  for(let i=0;i<testcases.length;i++){
    let tc=testcases[i];
    if(exerciseData.correct===true || exerciseData.correct[i]){
      p+=tc.points? tc.points: 1;
    }
  }
  exerciseData.points=p;
}

export default{
  components: {
    MainScreen,
    //PWABadge,
  },
  data() {
      return {
        version: version,
        exerciseDataCollection: exerciseDataCollection
      };
  },
  async mounted(){

    await this.load();
    // setInterval(()=>{
    //   this.save();
    // },1000);
  },
  methods: {
    getExerciseData(id){
      let ed=this.exerciseDataCollection[id];
      return ed; 
    },
    createUserDataObject(){
      let userData={};
      for(let id in this.exerciseDataCollection){
        let ed=this.exerciseDataCollection[id];
        let o={
          correct: ed.correct===true? true: boolArrayToInt(ed.correct)
        };
        userData[id]=o;
        if(ed.userProject){
          o.project=JSON.parse(JSON.stringify(ed.userProject));
        }
      }
      return userData;
    },
    restoreUserDataObject(userData){
      for(let id in userData){
        let o=userData[id];
        let ed=this.getExerciseData(id);//exerciseDataCollection[a];
        ed.correct=0;
        if(ed){
          if(o.correct===true){
            ed.correct=true;
          }else{
            let array=intToBoolArray(o.correct);
            if(array.length===ed.data.check.testcases.length){
              ed.correct=array;
            }
          }
          calcPoints(ed);
          if(o.project){
            ed.userProject=o.project;
          }else{
            delete ed.userProject;
          }
        }
      }
    },
    async load(){
      let data=await storage.getItem(STORAGE_DATA);
      this.restoreUserDataObject(data);
    },
    save(){
      console.log("save");
      storage.setItem(STORAGE_DATA,this.createUserDataObject());
    }
  }
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
