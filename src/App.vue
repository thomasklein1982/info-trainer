
<template>
  <MainScreen/>
  <PWABadge />
</template>

<script>
import MainScreen from './components/main-screen.vue';
import PWABadge from './components/PWABadge.vue'
import { storage } from './functions/storage';

const STORAGE_DATA="INFO-TRAINER-USER-DATA";

export default{
  components: {
    PWABadge,MainScreen
  },
  data() {
      return {
        version: "0.0.0",
        exerciseDataCollection: {}
      };
  },
  async mounted(){
    await this.load();
    // setInterval(()=>{
    //   this.save();
    // },1000);
  },
  methods: {
    setExerciseData(data){
      let ed={
        index: 0,
        data: data,
        count: data.check.testcases().length
      };
      this.exerciseDataCollection[data.id]=ed;
      return ed;
    },
    getExerciseData(id){
      let ed=this.exerciseDataCollection[id];
      if(!ed) return null;
      return ed;
      if(!this.exerciseDataCollection[id]){
        
      }
      return 
    },
    createUserDataObject(){
      let userData={};
      for(let a in this.exerciseDataCollection){
        let ed=this.exerciseDataCollection[a];
        let o={
          index: ed.index
        };
        userData[ed.data.id]=o;
        if(ed.userProject){
          o.project=JSON.parse(JSON.stringify(ed.userProject));
        }
      }
      return userData;
    },
    restoreUserDataObject(userData){
      for(let a in userData){
        let o=userData[a];
        let ed=this.exerciseDataCollection[a];
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
