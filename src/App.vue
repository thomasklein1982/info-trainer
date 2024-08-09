
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
        count: 1,
        info: null,
        data: data
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
        if(ed.userProject){
          userData[ed.data.id]=JSON.parse(JSON.stringify(ed.userProject));
        }
      }
      return userData;
    },
    restoreUserDataObject(o){
      for(let a in o){
        let data=o[a];
        let ed=this.exerciseDataCollection[a];
        if(ed){
          ed.userProject=data;
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
