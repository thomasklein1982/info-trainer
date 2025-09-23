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
    <JavaInterpreter/>
    <template #footer>
      <Button label="OK" icon="pi pi-check" @click="submit()"/>
    </template>
  </Dialog>
</template>

<script>
import Message from 'primevue/message';
import JavaInterpreter from './java-interpreter.vue';

const STORAGE="info-trainer-settings";

export default{
  components: {
    Message, JavaInterpreter
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