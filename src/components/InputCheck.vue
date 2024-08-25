<template>
  <span><template v-if="isChecked"><template v-if="!isCorrect"><span style="text-decoration: line-through;" v-html="displayValueWrong"/></template><span v-else>{{ value }}</span></template><InputText v-else :style="{'width': width}" v-model="task.input"/>&nbsp;<Check :status="status"/><span v-if="isChecked && !isCorrect" style="font-size: small"> [{{ solution }}]</span></span> 
</template>

<script>



export default{
  components: {
  },
  watch: {
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
  props: {
    task: Object,
    width: {
      type: String,
      default: "6em"
    },
    caseSensitive: {
      type: Boolean,
      default: false
    },
    dontTrim: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    value(){
      return this.task.input;
    },
    isCorrect(){
      return this.task.correct;
    },
    solution(){
      return this.task.solution;
    },
    displayValueWrong(){
      let v=this.task.input;
      if(!this.dontTrim) v=v.trim();
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
  data(){
    return {
      
    };
  },
  methods: {
    check(){
      
    }
  }
}
</script>