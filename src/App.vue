
<template>
  <MainScreen 
    :settings="settings"
    :mode="mode"
    :ab="ab"
    @create-ab="createAB()"
  />
</template>

<script>

import MainScreen from './components/main-screen.vue';
import { storage } from './other/storage';
import * as exercises from './components/exercises/index';
import { boolArrayToInt, createBoolArray, intToBoolArray, isCompletelyTrue } from './other/bool-array';
import { toRaw } from 'vue';
import packageJson from '../package.json';
import { download, upload } from './other/helper';
const STORAGE_DATA="INFO-TRAINER-USER-DATA";
const STORAGE_SETTINGS="INFO-TRAINER-SETTINGS";
let mode={
  type: "normal",
  useStorage: true,
  icon: "favicon.svg"
};

export let difficulty="Hard";

export function isHardMode(){
  return difficulty==="Hard";
}

export function isNormalMode(){
  return difficulty==="Normal";
}
export function isEasyMode(){
  return difficulty==="Easy";
}

let hash=location.hash;
if(hash.toLowerCase().startsWith("#ab=")){
  hash=hash.substring(4);
  try{
    hash=decodeURI(hash);
  }catch(e){
    
  }
  let pos1=hash.indexOf("[");
  let pos2=hash.indexOf("]");
  if(pos1>=0 && pos2>pos1){
    let title=hash.substring(0,pos1);
    let ids=hash.substring(pos1+1,pos2);
    console.log(title,ids);
    ids=ids.split(",");
    let diff=hash.substring(pos2+1);
    if(!["Hard","Normal","Easy"].indexOf(diff)>=0){
      diff=null;
    }
    mode={
      type: "ab",
      title,ids,difficulty: diff,
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
  // if(a==="TvNum1"){
  //   console.log(a);
  // }
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
  }else if(data.features){
    ed={
      correct: createBoolArray(data.features.length),
      data: data,
      total: data.features.length
    }
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
  }else if(exerciseData.data.features){
    let tasks=exerciseData.data.features;
    for(let i=0;i<tasks.length;i++){
      let t=tasks[i];
      if(exerciseData.correct===true || exerciseData.correct[i]===true){
        p+=t.points? t.points: 1;
      }
    }
  }
  exerciseData.points=p;
}


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
  computed: {
    addExercisesToAB(){
      return this.ab!==null;
    },
    userDataSizeDisplay(){
      let size=this.userDataSize;
      let units=["Byte","Kilo-Byte","Mega-Byte","Giga-Byte"];
      let unitIndex=0;
      while(size>=1000 && unitIndex<units.length-1){
        size=Math.round(size/100)/10;
        unitIndex++;
      }
      return size+" "+units[unitIndex];
    }
  },
  data() {
      return {
        version: packageJson.version,
        mode,
        exerciseDataCollection: exerciseDataCollection,
        settings: {
          javaAppDifficulty: difficulty
        },
        ab: null,
        userDataSize: 0
      };
  },
  async mounted(){
    await this.load();
  },
  methods: {
    removeSavedUserData(){
      storage.removeItem(STORAGE_DATA);
      storage.removeItem(STORAGE_SETTINGS);
      location.reload();
    },
    downloadSavedData(){
      let data={};
      let userData=this.createUserDataObject();
      let date=new Date();
      data.userData=userData;
      data.settings=toRaw(this.settings);
      data.date=date.getTime();
      data=JSON.stringify(data);
      let fileName="Info-Trainer-"+date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+".txt";
      download(data,fileName,"text/plain");
    },
    async uploadSavedData(){
      let file=await upload({accept: 'text/plain'});
      console.log(file);
      let code;
      try{
        code=JSON.parse(file.code);
      }catch(e){
        alert("Fehler beim Hochladen der Datei.");
        return;
      }
      console.log(code);
      let a =confirm("Sollen die Daten wirklich überschrieben werden?\n\nDas kann nicht rückgängig gemacht werden!");
      if(code.userData) storage.setItem(STORAGE_DATA,code.userData);
      if(code.settings) storage.setItem(STORAGE_SETTINGS,code.settings);
      location.reload();
    },
    isExerciseInAB(id){
      if(!this.ab) return false;
      return this.ab.exercises.indexOf(id)>=0;
    },
    removeExerciseFromAB(id){
      if(!this.ab) return;
      let index=this.ab.exercises.indexOf(id);
      if(index<0) return;
      this.ab.exercises.splice(index,1);
    },
    addExerciseToAB(id){
      if(!this.ab) return;
      this.ab.exercises.push(id);
    },
    moveExerciseUpOnAB(id){
      if(!this.ab) return;
      let index=this.ab.exercises.indexOf(id);
      if(index<=0) return;
      this.ab.exercises.splice(index,1);
      this.ab.exercises.splice(index-1,0,id);
    },
    moveExerciseDownOnAB(id){
      if(!this.ab) return;
      let index=this.ab.exercises.indexOf(id);
      if(index<0 || index===this.ab.exercises.length-1) return;
      this.ab.exercises.splice(index,1);
      this.ab.exercises.splice(index+1,0,id);
    },
    createAB(){
      this.ab={
        label: "",
        diff: "n",
        exercises: [],
        category: "Arbeitsblatt"
      };
    },
    removeAB(){
      this.ab=null;
    },
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
          let count;
          if(ed.data.check){
            count=ed.data.check.testcases.length;
          }else if(ed.data.tasks){
            count=ed.data.tasks.length;
          }else if(ed.data.features){
            count=ed.data.features.length;
          }
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
        if(this.mode.difficulty){
          this.settings.javaAppDifficulty=this.mode.difficulty;
        }
      }
      let data=await storage.getItem(STORAGE_DATA);
      this.userDataSize=data? JSON.stringify(data).length: 0;
      if(this.mode.useStorage){
        this.restoreUserDataObject(data);
      }else{
        userData=data;
      }
    },
    save(exerciseData){
      if(this.mode.useStorage){
        let data=this.createUserDataObject();
        storage.setItem(STORAGE_DATA,data);
        this.userDataSize=JSON.stringify(data).length;
      }else if(exerciseData){
        let savedExerciseData=userData[exerciseData.data.id];
        if(!savedExerciseData){
          savedExerciseData={
            correct: false
          };
        }
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
          this.userDataSize=JSON.stringify(userData).length;
        }
        ed.points=points;
        ed.correct=correct;
      }
    },
    saveSettings(){
      storage.setItem(STORAGE_SETTINGS,toRaw(this.settings)).catch((err)=>{
        console.error(err);
      });
    },
    isHardMode(){
      return isHardMode();
    },
    isNormalMode(){
      return isNormalMode();
    },
    isEasyMode(){
      return isEasyMode();
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
