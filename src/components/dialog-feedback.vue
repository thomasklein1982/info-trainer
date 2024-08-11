<template>
  <Dialog v-model:visible="show" :header="header">
    <template v-if="exerciseData.info">
      <p>Um zu prüfen, ob deine Programmierung stimmt, werden verschiedene Testfälle durchgespielt. <template v-if="completed">Alle Testfälle waren erfolgreich:</template><template v-else>Hier siehst du, welche Testfälle erfolgreich waren und welche nicht:</template></p>
      <Message :icon="'pi pi-'+(i<exerciseData.index?'check':'times')" :severity="(i<exerciseData.index?'success':'error')" v-for="(t,i) in exerciseData.info">
        {{ t }}
      </Message>
    </template>
    <template v-else>
      Löse die Aufgabe und klicke auf Ausführen, um deinen Code zu testen.
    </template>
  </Dialog>
</template>

<script>
import Message from 'primevue/message';


export default{
  components: {
    Message
  },
  props: {
    exerciseData: Object
  },
  computed: {
    completed(){
      return this.exerciseData.count===this.exerciseData.index;
    },
    header(){
      if(this.completed){
        return "Vollständig gelöst";
      }else{
        return "Noch nicht gelöst";
      }
    }
  },
  data(){
    return {
      show: false
    };
  },
  methods: {
    open(){
      this.show=true;
    }
  }
}
</script>