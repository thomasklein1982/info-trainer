<template>
  <CodeMirror 
    id="editor"
    language="python" 
    ref="editor" 
    v-model="code"
    :linter="linter"
    @update-tree="updateTree"
  />
  <div id="preview">

  </div>
</template>

<script>
import CodeMirror from './code-mirror.vue';
import {linter} from "@codemirror/lint";

export default{
  components: {
    CodeMirror
  },
  emits: [
  "save", "exercise-submit"
  ],
  props: {
    exerciseData: Object,
    beep: Object
  },
  data(){
    return {
      tree: null,
      errors: [],
      compiled: false,
      code: "",
      linter: linter(view => {
        let diagnostics=[];
        console.log("errors:",this.errors);
        for(let i=0;i<this.errors.length;i++){
          let e=this.errors[i];
          diagnostics.push({
            from: e.from,
            to: e.to,
            severity: "warning",
            message: e.message
          });
        }
        return diagnostics
      })
    }
  },
  methods: {
    updateTree(tree){
      this.tree=tree;
      this.compiled=false;
      this.compile();
    },
    compile(){
      while(this.errors.length>0) this.errors.pop();
      this.compiled=true;
      if(!this.tree || !this.tree.topNode || !this.tree.topNode.firstChild) return;
      let nodeZeile=this.tree.topNode.firstChild;
      let line=1;
      this.compiled=true;
    },
    save(){
      this.$emit("save");
    },
    undo(){
      this.$refs.editor.undo();
    },
    redo(){
      this.$refs.editor.redo();
    },
    setUserData(data){
      if(!data){
        data={
          code: this.code
        };
      }
      this.code=data.code;
      this.$refs.editor.setValue(this.code);
    },
    getUserData(){
      let data={
        code: this.code
      };
      return {
        machine: data
      };
    }
  }
}
</script>

<style scoped>

</style>