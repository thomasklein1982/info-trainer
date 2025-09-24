<template>
  <div style="display: none" ref="wrapper"><iframe ref="iframe" :src="src"></iframe></div>
</template>

<script>
import { javaAppUrl } from './java-app.vue';

export default{
  computed: {
    src(){
      return javaAppUrl();
    }
  },
  methods: {
    runJavaProject(project){
      this.postMessage("open-project-and-run", project);
    },
    postMessage(type, data){
      let frame=this.$refs.iframe;
      frame.contentWindow.postMessage({
        type,
        data
      },"*");
    }
  }
}
</script>