<template>
  <h1>Challenge: {{ title }}</h1>
  <p>Auf dich warten {{ exerciseCount }} Aufgaben.</p>
  <p>Gib bitte deinen Namen ein und klicke auf den Button.</p>
  <div class="flex"><InputText v-model="name" style="flex: 1"/><Button @click="start()" :disabled="!name">Los geht's!</Button></div>
  <small>Dein Name wird nicht gespeichert und auch nicht irgendwohin übermittelt.</small>
</template>

<script>

export default {
  components: {
    
  },
  emits: [
    "start"
  ],
  props: {
    title: String,
    exerciseCount: Number
  },
  data(){
    return {
      name: ""
    };
  },
  methods: {
    start(){
      this.$emit("start",this.name);
    }
  }
}
</script>