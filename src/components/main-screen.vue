<template>
  <div class="screen" style="display: flex; flex-direction: column">
    <AppMenubar
      @show-exercises="$refs.exerciseDrawer.show()"
      @click-version="updateVersion()"
    />
    <div style="flex: 1; overflow: auto" ref="content">
      <ExerciseDrawer 
        ref="exerciseDrawer"
        @open-exercise-path="openExercisePath"
      />
      <ExercisePath :path="currentPath"/>
      
    </div>
  </div>
</template>

<script>

import AppMenubar from './app-menubar.vue';
import Home from './home.vue';
import ExerciseDrawer from './exercise-drawer.vue';
import ExercisePath from './exercise-path.vue';
import ExercisePathData from '../other/exercisePathDefinitions';
import { updateServiceWorker } from '../main';

export default{
  components: {
    AppMenubar, Home, ExerciseDrawer, ExercisePath
  },
  data() {
    return {
      currentComponent: "Home",
      currentPath: ExercisePathData[0].paths[0]
    };
  },
  mounted(){

  },
  methods: {
    openExercisePath(path){
      this.currentPath=path;
      //this.navigate(pathInfos.name);
    },
    updateVersion(){
      updateServiceWorker(true);
    },
    navigate(component,dontPush){
      //let comp=await import(path+component);
      this.currentComponent=component;
      if(!dontPush){
        history.pushState({
          page: component,
          scrollTop: this.$refs.content? this.$refs.content.scrollTop: 0
        },"");
      }
      return component;
    }
  }
}
</script>