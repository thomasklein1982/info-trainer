<template>
  <ExerciseBody :exercise="$data">
    <Editor v-model="text"/>
    {{ text }}
  </ExerciseBody>
</template>

<script>
import Editor from "primevue/editor";

export const data={
  id: "tv-num-1",
  title: "Nummerierung",
  text: "",
  check: {
    testcases: [
      {

      }
    ]
  }
}

export default{
  components: {
    Editor
  },
  data() {
    return data;
  },
  methods: {
    
  }
}
</script>