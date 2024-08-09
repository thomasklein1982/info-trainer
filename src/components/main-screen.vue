<template>
  <div class="screen">
    <h1 @click="show=!show">Main</h1>
    <ArraySwap v-if="show"/>
  </div>
</template>

<script>

import ArraySwap from './exercises/array-swap.vue';

export default{
  components: {
    ArraySwap
  },
  data() {
      return {
        show: true
      };
  },
}
</script>