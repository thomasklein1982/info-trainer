
<template>
  <Drawer v-model:visible="visible" header="Dateien">
    
    
    
  </Drawer>
</template>

<script>
import Drawer from 'primevue/drawer';



export default{
  components: {
    Drawer
  },
  emits: [
    
  ],
  props: {
    files: Array
  },
  data(){
    return {
      visible: false,
      
    };
  },
  methods: {
    show(){
      this.visible=true;
    }
  }
}
</script>