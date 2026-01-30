<template>
<BeePreview :world="world" width="14rem" style="float: right">
  <GameObject image="bee" text="lisa" pos="B"/>
  <GameObject image="" text="Honig" pos="1" align="center" style="background-color: yellow"/>
</BeePreview>
<p>Mit der Anweisung <Code inline>String t = lisa.read();</Code> liest die Biene <Code inline>lisa</Code> den Text, der auf <strong>dem Feld unmittelbar vor ihr</strong> steht (in Blickrichtung) und speichert ihn in der <strong>Variable</strong> <Code inline>t</Code>.</p>
<p>Eine Variable ist ein <strong>Container</strong> für einen <strong>Wert</strong>.</p>
<p>Mit <Code inline>lisa.print(t)</Code> schreibt <Code inline>lisa</Code> den Text, der in der Variablen <Code inline>t</Code> gespeichert ist, auf das Feld unmittelbar vor sich.</p>
</template>

<script>
import BeePreview from '../../bee-preview.vue';
import GameObject from '../../game-object.vue';


export const data={
  id: "bee-info-read",
  title: "Lesen mit der read-Methode und speichern in Variablen",
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