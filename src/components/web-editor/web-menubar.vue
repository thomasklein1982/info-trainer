<template>
  <Menubar
    :model="[]"
  >
    <template #start>
      <Button icon="pi pi-bars" text @click="$emit('open-files')"/>
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
    "open-files"
  ],
  props: {
    settings: Object
  },
  computed: {
    items(){
      return [

      ];
    }
  }
};
</script>