<template>
  <div ref="wrapper"><iframe :src="src"></iframe></div>
</template>

<script>
import { javaAppUrl } from './java-app.vue';

export default{
  computed: {
    src(){
      return javaAppUrl();
    }
  }
}
</script>