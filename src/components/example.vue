<template>
  <Panel :header="title" toggleable collapsed>
    <slot></slot>
  </Panel>
</template>

<script>
import Panel from 'primevue/panel';

export default{
  components: {
    Panel
  },
  props: {
    title: {
      type: String,
      default: "Beispiel"
    }
  }
}
</script>