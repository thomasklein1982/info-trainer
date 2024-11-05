<template>
  <div class="wrapper" :style="{width: width, height: height}">
    <div v-if="resetable" style="text-align: right"><Button text icon="pi pi-refresh" label="Reset" @click="$emit('reset')"/></div>
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
    },
    resetable: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.wrapper{
  overflow: hidden;

}
</style>