
<template>
  <MainScreen 
    :settings="settings"
  />
</template>

<script>

import MainScreen from './components/main-screen.vue';
//import PWABadge from './components/PWABadge.vue'
import { storage } from './other/storage';
import * as exercises from './components/exercises/index';
import { boolArrayToInt, createBoolArray, intToBoolArray, isCompletelyTrue } from './other/bool-array';
import { toRaw } from 'vue';
import packageJson from '../package.json';
const STORAGE_DATA="INFO-TRAINER-USER-DATA";
const STORAGE_SETTINGS="INFO-TRAINER-SETTINGS";

let exerciseDataCollection={};
for(let a in exercises){
  let data=exercises[a].data;
  let ed;
  if(data.check){
    let testcases=data.check.testcases;
    ed={
      correct: createBoolArray(testcases.length),
      data: data
    };
    let p=0;
    for(let i=0;i<testcases.length;i++){
      let tc=testcases[i];
      p+=tc.points? tc.points: 1;
    }
    ed.total=p;
  }else if(data.tasks){
    ed={
      correct: createBoolArray(data.tasks.length),
      data: data,
      total: data.tasks.length
    };
  }
  exerciseDataCollection[data.id]=ed;
}

export function calcPoints(exerciseData){
  let p=0;
  if(exerciseData.data.check){
    let testcases=exerciseData.data.check.testcases;
    for(let i=0;i<testcases.length;i++){
      let tc=testcases[i];
      if(exerciseData.correct===true || exerciseData.correct[i]===true){
        p+=tc.points? tc.points: 1;
      }
    }
  }else if(exerciseData.data.tasks){
    let tasks=exerciseData.data.tasks;
    for(let i=0;i<tasks.length;i++){
      let t=tasks[i];
      if(exerciseData.correct===true || exerciseData.correct[i]===true){
        p+=t.points? t.points: 1;
      }
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
        version: packageJson.version,
        exerciseDataCollection: exerciseDataCollection,
        settings: {
          javaAppDifficulty: "Hard"
        }
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
        if(!ed.correct) continue;
        let o={
          correct: isCompletelyTrue(ed.correct)? true: boolArrayToInt(ed.correct)
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
          let count=ed.data.check? ed.data.check.testcases.length : ed.data.tasks.length;
          let array;
          if(o.correct===true){
            array=createBoolArray(count,true);
          }else{
            array=intToBoolArray(o.correct);
          }
          if(array.length===count){
            ed.correct=array;
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
      console.log("load");
      let settings=await storage.getItem(STORAGE_SETTINGS);
      if(settings){
        for(let a in this.settings){
          if(settings[a]!==undefined){
            this.settings[a]=settings[a];
          }
        }
      }
      let data=await storage.getItem(STORAGE_DATA);
      this.restoreUserDataObject(data);
    },
    save(){
      console.log("save");
      storage.setItem(STORAGE_DATA,this.createUserDataObject());
    },
    saveSettings(){
      storage.setItem(STORAGE_SETTINGS,toRaw(this.settings)).catch((err)=>{
        console.error(err);
      });
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
