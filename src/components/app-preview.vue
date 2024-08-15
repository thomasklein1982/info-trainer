<template>
  <div class="wrapper" :style="{width: width, height: height}">
    <slot></slot>
  </div>
</template>

<script>
export default{
  components: {

  },
  props: {
    width: {
      type: String,
      default: "8rem"
    },
    height: {
      type: String,
      default: "12rem"
    }
  }
}
</script>

<style scoped>
.wrapper{
  overflow: hidden;

}
</style>