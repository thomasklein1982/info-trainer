<template>
  <Dialog modal v-model:visible="show" :header="header" style="width: 90%;">
    <Card>
      <template #content>
        <slot></slot>
      </template>
    </Card>
    
      <p>Um zu prüfen, ob deine Programmierung stimmt, werden verschiedene Testfälle durchgespielt. <template v-if="completed">Alle Testfälle waren erfolgreich:</template><template v-else>Hier siehst du, welche Testfälle erfolgreich waren und welche nicht:</template></p>
      <Message :icon="'pi pi-'+(completed || exerciseData.correct[i]===true?'check':'times')" :severity="(completed || exerciseData.correct[i]===true?'success':'error')" v-for="(t,i) in exerciseData.data.check.testcases">
        <span v-html="t.info"/>
        <span v-if="exerciseData.correct[i].substring" v-html="'('+exerciseData.correct[i]+')'"/>
      </Message>
  </Dialog>
</template>

<script>
import Message from 'primevue/message';
import { isCompletelyTrue } from '../other/bool-array';


export default{
  components: {
    Message
  },
  props: {
    exerciseData: Object
  },
  computed: {
    completed(){
      return this.exerciseData.correct===true||isCompletelyTrue(this.exerciseData.correct);
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
      console.log("open feedback",this.exerciseData);
      this.show=true;
    }
  }
}
</script>