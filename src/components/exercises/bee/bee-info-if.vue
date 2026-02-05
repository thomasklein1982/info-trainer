<template>
  <p>Mit dem Code</p>
  <Code>if( variable == wert ){
  Anweisung 1;
  Anweisung 2;
  ...
}</Code>
<p>kannst du festlegen, dass die Anweisungen nur dann ausgeführt werden, wenn die Variable einen bestimmten Wert hat.</p>
</template>

<script>
import BeePreview from '../../bee-preview.vue';
import GameObject from '../../game-object.vue';


export const data={
  id: "bee-info-if",
  title: "Wenn - dann",
  world: [
    "W..W.",
    ".B1..",
    "WW.W."
  ],
}

export default{
  components: {
    BeePreview, GameObject
  },
  data(){
    return data;
  }
}

</script>