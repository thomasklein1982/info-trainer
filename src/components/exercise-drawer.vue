
<template>
  <Drawer v-model:visible="visible" header="Wähle einen Aufgabenpfad">
    
    <template v-for="(c,i) in categories">
      <Button size="large" pt:root:style="border-radius: 0; justify-content: left" text fluid @click="c.open=!c.open" :icon="c.open? 'pi pi-chevron-down':'pi pi-chevron-right'":label="c.label"/>
      <div style="padding-left: 1rem" v-if="c.open">
        <template v-for="(e,i) in c.paths">
          <PathMenuItem :path-data="e" @click="openExercisePath(e)"/>
        </template> 
      </div>
    </template>
    
  </Drawer>
</template>

<script>
import Drawer from 'primevue/drawer';
import PathMenuItem from './path-menu-item.vue';
import ExercisePathData from '../other/exercisePathDefinitions';

let categories=[];
for(let i=0;i<ExercisePathData.length;i++){
  let cat=ExercisePathData[i];
  let c={
    label: cat.name,
    open: false,
    paths: cat.paths
  }
  categories.push(c);
}

export default{
  components: {
    Drawer, PathMenuItem
  },
  emits: [
    "open-exercise-path"
  ],
  data(){
    return {
      visible: false,
      categories: categories,
    };
  },
  methods: {
    show(){
      this.visible=true;
    },
    openExercisePath(pathData){
      this.visible=false;
      this.$emit('open-exercise-path',pathData);
    }
  }
}
</script>