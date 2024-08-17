<template>
  <Dialog modal v-model:visible="show" :header="header">
    <Card>
      <template #content>
        <slot></slot>
      </template>
    </Card>
    
      <p>Um zu prüfen, ob deine Programmierung stimmt, werden verschiedene Testfälle durchgespielt. <template v-if="completed">Alle Testfälle waren erfolgreich:</template><template v-else>Hier siehst du, welche Testfälle erfolgreich waren und welche nicht:</template></p>
      <Message :icon="'pi pi-'+(completed || exerciseData.correct[i]?'check':'times')" :severity="(completed || exerciseData.correct[i]?'success':'error')" v-for="(t,i) in exerciseData.data.check.testcases">
        {{ t.info }}
      </Message>
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
      return this.exerciseData.correct===true;
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