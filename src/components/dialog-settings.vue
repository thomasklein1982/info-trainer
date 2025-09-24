<template>
  <Dialog modal v-model:visible="show" header="Einstellungen">
    <Card>
      <template #title>
        JavaApp
      </template>
      <template #content>
        Modus: <Select v-model="settings.javaAppDifficulty" :options="['Easy','Normal','Hard']"/>
      </template>
    </Card>
    <template #footer>
      <Button label="OK" icon="pi pi-check" @click="submit()"/>
    </template>
  </Dialog>
</template>

<script>
import Message from 'primevue/message';

const STORAGE="info-trainer-settings";

export default{
  components: {
    Message
  },
  props: {
    settings: Object
  },
  computed: {
    
  },
  data(){
    return {
      show: false,
      
    };
  },
  methods: {
    submit(){
      this.$root.saveSettings();
      this.show=false;
    },
    open(){
      this.show=true;
    }
  }
}
</script>