<template>
  <textarea class="jtextarea"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
  />
</template>

<script>
export default{
  components: {

  },
  props: {
    placeholder: String,
    modelValue: String
  }
}
</script>

<style scoped>
.jtextarea{
  background-color: white;
  color: black;
  resize: none;
}
</style>