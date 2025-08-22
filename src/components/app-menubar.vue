<template>
  <Menubar
    :model="[]"
  >
  <template #start>
    <img alt="logo" :src="$root.mode.icon" style="height: 2rem" ><Button icon="pi pi-bars" text @click="$emit('show-exercises')"/>
  </template>
  <template #end>
    <Button size="small" text rounded @click="$emit('settings')">
      <Button class="nopointer" size="small" :label="settings.javaAppDifficulty" icon="pi pi-gauge"  text/>
      <Button class="nopointer" size="small" icon="pi pi-tag" :label="$root.version" text rounded/>
    </Button>
    <Button icon="pi pi-home" text rounded @click="$emit('home')"/>
  </template>
  </Menubar>
</template>

<script>
import Menubar from 'primevue/menubar';


export default{
  components: {
    Menubar
  },
  emits: [
    "show-exercises","show-about","settings","home"
  ],
  props: {
    settings: Object
  },
  computed: {
    items(){
      return [
        {
          label: "Aufgaben",
          icon: "pi pi-code",
          command: (ev)=>{
            this.$emit('show-exercises');
          }
        },
        {
          label: "Einstellungen",
          icon: "pi pi-cog",
          command: (ev)=>{
            this.$emit('show-settings');
          }
        },
        {
          label: "Über den Info-Trainer",
          icon: "pi pi-info",
          command: (ev)=>{
            this.$emit('show-about');
          }
        }
      ];
    }
  }
};
</script>