<template>
  <span :class="clazz" :style="{visibility: status===null? 'hidden':'visible'}">
  </span>
</template>

<script>



export default{
  components: {
  },
  props: {
    status: {
      type: [String,Boolean],
      default: null
    }
  },
  computed: {
    clazz(){
      if(this.status===null){
        return "";
      }
      if(this.status===true){
        return "pi pi-check correct"
      }else{
        return "pi pi-times wrong"
      }
    }
  }
}
</script>

<style scoped>
  .correct{
    color: lime;
  }
  .wrong{
    color: red;
  }
</style>