<template>
  <input class="jtextfield"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
    :type="type"
  />
</template>

<script>
export default{
  components: {

  },
  props: {
    type: {
      type: String,
      default: "text"
    },
    placeholder: String,
    modelValue: String
  }
}
</script>

<style scoped>
.jtextfield{
  background-color: white;
  color: black;
}
</style>