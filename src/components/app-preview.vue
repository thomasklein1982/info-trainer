<template>
  <div class="wrapper" :style="{width: width, height: height, display: 'flex', 'flex-direction': 'column'}">
    <div v-if="resetable" style="text-align: right"><Button text icon="pi pi-refresh" label="Reset" @click="$emit('reset')"/></div>
    <div :style="{flex: 1}"><slot></slot></div>
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