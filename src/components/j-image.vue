<template>
  <div :style="{backgroundImage: 'url('+src+')'}" class="jimage"></div>
</template>

<script>
export default{
  components: {

  },
  props: {
    src: String
  }
}
</script>

<style scoped>
.jimage{
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>