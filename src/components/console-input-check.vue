<template>
  <div style="display: flex">
    <ConsoleInput v-model="task.input"/>
    <Check :status="status"/>
  </div>
</template>

<script>
import Check from './Check.vue';
import ConsoleInput from './console-input.vue';

export default{
  watch: {
    value(nv,ov){
      //this.$emit("update:modelValue",nv);
    },
    'task.input'(nv,ov){
      if(this.task.correct && this.task.checked){
        return true;
      }
      let ist=this.task.input;
      let soll=this.solution+"";
      if(!this.dontTrim){
        ist=ist.trim();
        soll=soll.trim();
      }
      if(!this.caseSensitive){
        ist=ist.toLowerCase();
        soll=soll.toLowerCase();
      }
      this.task.correct=ist===soll;
    }
  },
  computed: {
    isCorrect(){
      return this.task.correct;
    },
    solution(){
      return this.task.solution;
    },
    displayValueWrong(){
      let v=this.task.input;
      return v;
    },
    isChecked(){
      return this.task.checked;
    },
    status(){
      if(!this.isChecked) return undefined;
      return this.isCorrect;
    }
  },
  props: {
    task: Object,
    dontTrim: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Check, ConsoleInput
  },
  data(){
    return {
      
    }
  }
}
</script>