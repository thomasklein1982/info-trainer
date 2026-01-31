<template>
<BeePreview :world="world" width="14rem" style="float: right">
  <GameObject image="bee" text="lisa" pos="B"/>
  <GameObject image="" text="Hi!" pos="1" align="center" style="background-color: yellow"/>
</BeePreview>
<p>Mit der Methode <Code inline>print</Code> kann eine Biene einen <strong>Text schreiben</strong> auf <strong>das Feld unmittelbar vor sich</strong> (in Blickrichtung).</p>
<p>Die Anweisung <Code inline>lisa.print("Hi!")</Code> schreibt also den <strong>String</strong> <Code inline>Hi!</Code> auf das gelbe Feld.</p>
</template>

<script>
import BeePreview from '../../bee-preview.vue';
import GameObject from '../../game-object.vue';


export const data={
  id: "bee-info-print",
  title: "Schreiben mit der print-Methode",
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