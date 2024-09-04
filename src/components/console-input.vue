<template>
  <Textarea v-model="value" style="width: 100%; background-color: #121212; color: white; font-family: monospace; resize: vertical;"/>
</template>

<script>
import Textarea from 'primevue/textarea';

export default{
  watch: {
    value(nv,ov){
      this.$emit("update:modelValue",nv);
    }
  },
  props: {
    modelValue: String
  },
  components: {
    Textarea
  },
  data(){
    return {
      value: ""
    }
  }
}
</script>