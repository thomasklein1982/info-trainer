
<template>
  <MainScreen 
    :settings="settings"
    :mode="mode"
  />
</template>

<script>

import MainScreen from './components/main-screen.vue';
import { storage } from './other/storage';
import * as exercises from './components/exercises/index';
import { boolArrayToInt, createBoolArray, intToBoolArray, isCompletelyTrue } from './other/bool-array';
import { toRaw } from 'vue';
import packageJson from '../package.json';
const STORAGE_DATA="INFO-TRAINER-USER-DATA";
const STORAGE_SETTINGS="INFO-TRAINER-SETTINGS";
let mode={
  type: "normal",
  useStorage: true,
  icon: "favicon.svg"
};

let hash=location.hash;
if(hash.toLowerCase().startsWith("#ab=")){
  let pos1=hash.indexOf("[");
  let pos2=hash.indexOf("]");
  if(pos1>=0 && pos2>pos1){
    let title=hash.substring(4,pos1);
    let ids=hash.substring(pos1+1,pos2);
    console.log(title,ids);
    ids=ids.split(",");
    mode={
      type: "ab",
      title,ids,
      useStorage: false,
      reloadOnHome: true,
      unloadWarning: true,
      icon: "icon-ab.svg",
    };
  }
}else if(hash.toLowerCase()==="#practise"){
  mode={
    type: "practise",
    useStorage: false,
    icon: "icon-practise.svg"
  };
}

window.onbeforeunload=function(ev){
  if(!mode.unloadWarning) return;
  ev.preventDefault();
  ev.returnValue = true;
  return true;
}

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

export let difficulty="Hard";
let userData=null;

export default{
  components: {
    MainScreen,
    //PWABadge,
  },
  watch: {
    "settings.javaAppDifficulty"(nv,ov){
      difficulty=nv;
      console.log("difficulty",difficulty);
    }
  },
  data() {
      return {
        version: packageJson.version,
        mode,
        exerciseDataCollection: exerciseDataCollection,
        settings: {
          javaAppDifficulty: difficulty
        }
      };
  },
  async mounted(){
    await this.load();
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
        if(!ed || !ed.correct) continue;
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
        let ed=this.getExerciseData(id);
        if(ed){
          ed.correct=0;
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
      let settings=await storage.getItem(STORAGE_SETTINGS);
      if(settings){
        for(let a in this.settings){
          if(settings[a]!==undefined){
            this.settings[a]=settings[a];
          }
        }
      }
      let data=await storage.getItem(STORAGE_DATA);
      if(this.mode.useStorage){
        this.restoreUserDataObject(data);
      }else{
        userData=data;
      }
    },
    save(exerciseData){
      if(this.mode.useStorage){
        storage.setItem(STORAGE_DATA,this.createUserDataObject());
      }else if(exerciseData){
        let savedExerciseData=userData[exerciseData.data.id];
        if(savedExerciseData.correct===true) return;
        let ed=exerciseData;
        let points=ed.points;
        let correct=ed.correct;

        let array=intToBoolArray(savedExerciseData.correct);
        ed.correct=array;
        calcPoints(ed);
        if(points>ed.points){
          //verbessert: speichern
          let obj={
            correct: isCompletelyTrue(correct)? true: boolArrayToInt(correct),
            project: toRaw(ed.userProject)
          };
          console.log("save better",obj,points,ed.points);
          userData[ed.data.id]=obj;
          storage.setItem(STORAGE_DATA,userData);
        }
        ed.points=points;
        ed.correct=correct;
      }
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
