<template>
  <Menubar
    :model="[]"
  >
  <template #start>
    <img alt="logo" src="/favicon.svg" style="height: 2rem" ><Button icon="pi pi-bars" text @click="$emit('show-exercises')"/>
  </template>
  <template #end>
    <Button :label="$root.version" text rounded/>
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
    "show-exercises","show-about","show-settings"
  ],
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