<template>
  <div class="screen">
    <h1 @click="show=!show">Main</h1>
    <ArraySwap v-if="show"/>
    <MehrfachAusgabe/>
  </div>
</template>

<script>

import ArraySwap from './exercises/array-swap.vue';
import MehrfachAusgabe from './exercises/mehrfach-ausgabe.vue';

export default{
  components: {
    ArraySwap, MehrfachAusgabe
  },
  data() {
      return {
        show: true
      };
  },
}
</script>