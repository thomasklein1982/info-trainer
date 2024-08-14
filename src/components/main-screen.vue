<template>
  <div class="screen" style="display: flex; flex-direction: column">
    <AppMenubar
      :settings="settings"
      @show-exercises="$refs.exerciseDrawer.show()"
      @settings="$refs.dialogSettings.open()"
      @submit="$emit('settings-changed')"
    />
    <div style="flex: 1; overflow: auto" ref="content">
      <ExerciseDrawer 
        ref="exerciseDrawer"
        @open-exercise-path="openExercisePath"
      />
      <ExercisePath :path="currentPath"/>
      
    </div>
    <DialogSettings
      ref="dialogSettings"
      :settings="settings"
    />
  </div>
</template>

<script>

import AppMenubar from './app-menubar.vue';
import Home from './home.vue';
import ExerciseDrawer from './exercise-drawer.vue';
import ExercisePath from './exercise-path.vue';
import ExercisePathData from '../other/exercisePathDefinitions';
import { updateServiceWorker } from '../main';
import DialogSettings from './dialog-settings.vue';

export default{
  components: {
    AppMenubar, Home, ExerciseDrawer, ExercisePath, DialogSettings
  },
  props: {
    settings: Object
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