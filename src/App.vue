
<template>
  <MainScreen/>
  <PWABadge />
</template>

<script>
const version="0.0.2";

import MainScreen from './components/main-screen.vue';
import PWABadge from './components/PWABadge.vue'
import { storage } from './functions/storage';
import * as exercises from './components/exercises/index';
const STORAGE_DATA="INFO-TRAINER-USER-DATA";

console.log(exercises);

let exerciseDataCollection={};
for(let a in exercises){
  let data=exercises[a].data;
  console.log(a,data);
  let ed={
    index: 0,
    data: data,
    count: data.check.testcases().length
  };
  exerciseDataCollection[data.id]=ed;
}
console.log(exerciseDataCollection);

export default{
  components: {
    PWABadge,MainScreen
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
          index: ed.index
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
        ed.index=0;
        if(ed){
          ed.index=o.index;
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
