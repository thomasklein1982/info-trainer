<template>
  <Dialog modal v-model:visible="show" :header="header" style="width: 90%;">
    <Card>
      <template #content>
        <slot></slot>
      </template>
    </Card>
    <template v-if="exerciseData.data.check?.testcases">
      <p>Um zu prüfen, ob deine Programmierung stimmt, werden verschiedene Testfälle durchgespielt. <template v-if="completed">Alle Testfälle waren erfolgreich:</template><template v-else>Hier siehst du, welche Testfälle erfolgreich waren und welche nicht:</template></p>
      <Message :icon="'pi pi-'+(completed || exerciseData.correct[i]===true?'check':'times')" :severity="(completed || exerciseData.correct[i]===true?'success':'error')" v-for="(t,i) in exerciseData.data.check.testcases">
        <span v-html="t.info"/>
        <span v-if="exerciseData.correct[i].substring" v-html="'('+exerciseData.correct[i]+')'"/>
      </Message>
    </template>
    <template v-else-if="exerciseData.data.features">
      <p>Hier findest du eine Liste möglicher Features. Schaffst du es, möglichst viele davon umzusetzen? Fallen dir weitere Features ein, die du umsetzen könntest?</p>
      <div v-for="(t,i) in exerciseData.data.features">
        <p v-html="t.name" style="font-weight: bold"/>
        <ul>
          <li v-for="(f,j) in t.items" v-html="f"></li>
        </ul>
        <label>
          <ToggleSwitch v-model="exerciseData.correct[i]" @change="recalculatePoints()" /> Feature implementiert
        </label>
        
      </div>
    </template>
  </Dialog>
</template>

<script>
import Message from 'primevue/message';
import ToggleSwitch from 'primevue/toggleswitch';
import { isCompletelyTrue } from '../other/bool-array';
import { calcPoints } from '../App.vue';


export default{
  components: {
    Message, ToggleSwitch
  },
  props: {
    exerciseData: Object
  },
  computed: {
    completed(){
      return this.exerciseData?.correct===true||isCompletelyTrue(this.exerciseData?.correct);
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
    recalculatePoints(){
      console.log("calc p");
      calcPoints(this.exerciseData);
    },
    open(){
      console.log("open feedback",this.exerciseData);
      this.show=true;
    }
  }
}
</script>