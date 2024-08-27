<template>
  <div class="clazz-wrapper" v-for="(c,i) in clazzes">
    <div class="clazz-name">
      {{ c.name }}
    </div>
    <div class="clazz-attributes">
      <div v-for="(a,j) in c.attributes">{{ a }}</div>
    </div>
    <div class="clazz-methods">
      <div v-for="(m,j) in c.methods">{{ m }}</div>
    </div>
  </div>
</template>

<script>


export default{
  props: {
    clazzes: Array
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