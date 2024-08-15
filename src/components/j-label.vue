<template>
  <span class="jlabel" :style="{display: 'grid', alignItems: alignItems, justifyContent: justifyContent}"><slot></slot></span>
</template>

<script>
export default{
  components: {

  },
  props: {
    align: {
      type: String,
      default: "center"
    }
  },
  computed: {
    alignItems(){
      if(this.align==="center"){
        return "center";
      }
      let a="center";
      if(this.align.indexOf("left")>=0){
        a="start";
      }
      if(this.align.indexOf("right")>=0){
        a="end";
      }
      return a;
    },
    justifyContent(){
      if(this.align==="center"){
        return "center";
      }
      let a="center";
      if(this.align.indexOf("top")>=0){
        a="start";
      }
      if(this.align.indexOf("bottom")>=0){
        a="end";
      }
      return a;
    }
  }
}
</script>

<style scoped>
.jlabel{
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}
</style>