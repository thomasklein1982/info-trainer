<template>
  <BeePreview :world="world" width="6rem" style="float: right">
    <GameObject image="bee" text="lisa" pos="B"/>
    <GameObject image="" text="7" pos="1" align="center" style="background-color: yellow"/>
  </BeePreview>
  <p>Auf dem gelben Feld steht eine zufällige Zahl. Lisa soll die Zahl um 1 erhöhen.</p>
  <p>Dazu muss Lisa die Zahl zunächst in einer Variablen vom Typ <strong>int</strong> speichern. <code>int</code> steht für das englische Wort <strong>Integer</strong> und das heißt "ganze Zahl".</p>
  <p>Jetzt kommt es darauf an, ob du im <strong>Easy-Modus</strong> bist oder nicht:</p>
  <ul>
    <li><strong>Im Easy-Modus</strong>: Schreibe einfach <Code inline>int z = lisa.read();</Code>, damit Lisa den Text als Zahl mit dem Namen <Code inline>z</Code> abspeichert.</li>
    <li><strong>Nicht im Easy-Modus</strong>: Hier musst du zwei Schritte machen, um dasselbe zu erreichen:
      <Code>String t = lisa.read( );
int z = Integer.parseInt( t );</Code>
    </li>
  </ul>
  <p>Zum Rechnen kannst du die Grundrechenarten <strong>Plus</strong> <Code inline>+</Code>, <strong>Minus</strong> <Code inline>-</Code>, <strong>Mal</strong> <Code inline>*</Code> und <strong>Geteilt</strong> <Code inline>/</Code> verwenden. Genau wie in Mathe kannst du auch <strong>Klammern</strong> <Code inline>(...)</Code> verwenden.</p>
  <p>Das folgende Beispielprogramm erhöht die Zahl auf dem gelben Feld um 1:</p>
  <div style="display: grid; grid-template-columns: 1fr 1fr">
    <div>
      Im Easy-Modus:
      <Code>program( Bee lisa ){
  int z = lisa.read( );
  lisa.print( z + 1);
}
      </Code>
    </div>
    <div>
      Nicht im Easy-Modus:
      <Code>void program( Bee lisa ){
  String t = lisa.read( );
  int z = Integer.parseInt( t );
  lisa.print( z + 1 );
}
      </Code>
    </div>
  </div>
</template>

<script>
import BeePreview from '../../bee-preview.vue';
import GameObject from '../../game-object.vue';


export const data={
  id: "bee-info-read-int",
  title: "Lesen mit der read-Methode und speichern als Zahl",
  world: [
    "B1"
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