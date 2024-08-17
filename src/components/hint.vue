<template>
  <Message style="margin-top: 0.2rem; margin-bottom: 0.2rem;" :icon="'pi pi-'+icon" :severity="severity"><slot></slot></Message>
</template>

<script>
import Message from 'primevue/message';

export default{
  components: {
    Message
  },
  props: {
    severity: {
      type: String,
      default: "info"
    },
    icon: {
      type: String,
      default: "info-circle"
    }
  }
}
</script>