
<template>
  <MainScreen/>
  <PWABadge />
</template>

<script>
import MainScreen from './components/main-screen.vue';
import PWABadge from './components/PWABadge.vue'
import { storage } from './functions/storage';



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
  methods: {
    getExerciseData(id){
      if(!this.exerciseDataCollection[id]){
        this.exerciseDataCollection[id]={
          index: 0,
          count: 1,
          info: null
        };
      }
      return this.exerciseDataCollection[id];
    },
    async load(){
      let item=await storage.getItem("test");
      this.daten=item;
    },
    async save(){
      await storage.setItem("test",this.daten);
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
