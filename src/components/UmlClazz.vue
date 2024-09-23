<template>
  <div class="clazz-wrapper">
    <div class="clazz-name">
      {{ clazz.name }}
    </div>
    <div class="clazz-attributes">
      <div v-for="(a,j) in clazz.attributes" v-html="a"></div>
    </div>
    <div class="clazz-methods">
      <div v-for="(m,j) in clazz.methods" v-html="m"></div>
    </div>
  </div>
</template>

<script>


export default{
  props: {
    clazz: Object
  },
  mounted(){
  }
}
</script>

<style scoped>
  .clazz-wrapper{
    border: 1pt solid black;
    background-color: white;
    color: black;
    font-family: 'Courier New', Courier, monospace;
  }
  .clazz-name{
    border-bottom: 1pt solid black;
    font-weight: bold;
    text-align: center;
  }
  .clazz-attributes{
    border-bottom: 1pt solid black;
    
  }
</style>