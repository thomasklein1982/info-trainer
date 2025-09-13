<template>
  <div class="screen" style="display: flex; flex-direction: column">
    <template v-if="mode.type==='rm'">
      <RmSimulator
        :machine="{}"
      />
    </template>
    <template v-else-if="mode.type==='tm'">
      <TmSimulator
        :machine="{}"
        type="tm"
      />
    </template>
    <template v-else-if="mode.type==='db'">
      <DatabaseLauncher
        allow-choose-database
        allow-choose-mode
        show-from-start
      />
    </template>
    <template v-else>
      <AppMenubar
        :settings="settings"
        @show-exercises="clickMenu()"
        @settings="$refs.dialogSettings.open()"
        @submit="$emit('settings-changed')"
        @home="clickHome()"
      />
      <div id="main-screen" style="flex: 1" ref="content">
        <ExerciseDrawer 
          ref="exerciseDrawer"
          @open-exercise-path="openExercisePath"
        />
        <Drawer v-model:visible="showABDrawer" header="Willkommen beim Info-Trainer">
          Du bist im "Arbeitsblatt-Modus". Hier kannst du nur bestimmte Aufgaben bearbeiten.
          <p>In diesem Modus werden deine vorherigen Lösungen nicht geladen, du musst also alle Aufgaben noch einmal neu lösen.</p>
          <p>Deine Aufgaben werden nur dann gespeichert, wenn du dich verbessert hast.</p>
          <p>Klicke auf <Button icon="pi pi-home" text rounded @click="clickHome()"/>, um das Arbeitsblatt zu verlassen und zum "normalen" Info-Trainer zurückzukehren.</p>
        </Drawer>
        <template v-if="showHome">
          <Home :ab="ab"/>
        </template>
        <ExercisePath v-else :path="currentPath"/>
        
      </div>
      <DialogSettings
        ref="dialogSettings"
        :settings="settings"
      />
    </template>
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
import Drawer from 'primevue/drawer';
import RmSimulator from './rm-simulator.vue';
import TmSimulator from './tm-simulator.vue';
import DatabaseLauncher from './database-launcher.vue';

export default{
  components: {
    AppMenubar, Home, ExerciseDrawer, ExercisePath, DialogSettings, Drawer, RmSimulator, TmSimulator, DatabaseLauncher
  },
  props: {
    settings: Object,
    mode: Object,
    ab: Object
  },
  data() {
    return {
      currentComponent: "Home",
      currentPath: ExercisePathData[1].paths[0],
      showHome: true,
      showABDrawer: false
    };
  },
  mounted(){
    if(this.mode && this.mode.ids){
      this.currentPath={
        category: "Arbeitsblatt",
        exercises: this.mode.ids,
        label: this.mode.title
      };
      this.showHome=false;
    }
  },
  methods: {
    clickMenu(){
      if(this.mode.type==="ab"){
        this.showABDrawer=true;
      }else{
        this.$refs.exerciseDrawer.show()
      }
    },
    clickHome(){
      if(this.mode.reloadOnHome){
        
        location.hash="";
        location.reload();
      }else{
        this.showHome=true;
      }
    },
    openExercisePath(path){
      this.showHome=false;
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