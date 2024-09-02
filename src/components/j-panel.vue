<template>
  <div class="jpanel" :style="style"><slot></slot></div>
</template>

<script>
import { layoutToStyle } from './j-frame.vue';

export default{
  components: {

  },
  props: {
    layout: String
  },
  computed: {
    style(){
      return layoutToStyle(this.layout);
    }
  }
}
</script>

<style scoped>
  .jpanel{
    align-items: stretch;
    justify-items: stretch;
  }
</style>