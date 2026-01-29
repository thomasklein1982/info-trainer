<template>
<Hint class="no-print">Wechsle in den Easy-Modus (oben rechts), wenn du Anfänger*in bist.</Hint>
<BeePreview :world="world" width="14rem" style="float: right">
  <GameObject image="bee" text="lisa" pos="B"/>
  <GameObject image="flower" text="" pos="F"/>
</BeePreview>
<p>Bei den folgenden Aufgaben musst du eine oder mehrere Bienen so programmieren, dass sie bestimmte Probleme lösen, das durch eine Ausgangssituation beschrieben wird wie im Beispiel rechts.</p>
<p>Dazu musst du eine <strong>Methode</strong> "implementieren":</p>
<Code>program( Bee lisa ){
  lisa.move(); //Die Biene Lisa um 1 in Blickrichtung
  lisa.turnLeft(); //Lisa dreht sich um 90° nach links
  lisa.move(); //Lisa bewegt sich wieder um 1 Feld in Blickrichtung
}</Code>
<p>Die erste Zeile <Code inline>program( Bee lisa ){</Code> gibt an, wie die <strong>Methode</strong> heißt (<Code inline>program</Code>) und wie unsere Biene heißt (<Code inline>lisa</Code>). Beachte die <strong>geschweifte Klammer</strong> <Code inline>{</Code>. Diese wird in der letzten Zeile wieder mit <Code inline>}</Code> geschlossen. Dazwischen stehen <strong>Anweisungen</strong>, die der Computer ausführen soll.</p>
<p>In den Zeilen 2 bis 4 stehen die Anweisungen. Diese werden immer mit einem <strong>Semikolon</strong> <Code inline>;</Code> beendet.</p>
<p>Die Anweisungen hier sind <strong>Befehle an ein Objekt</strong>, z. B. <Code inline>lisa.move();</Code>
  <ul>
    <li><strong>Vor dem Punkt</strong> steht, welches Objekt den Befehl erhalten soll (hier: die Biene <Code inline>lisa</Code>).</li>
    <li><strong>Hinter dem Punkt</strong> steht der Name der <strong>Methode</strong>, die das Objekt ausführen soll (hier: <Code inline>move</Code>).</li>
    <li>Hinter dem Methodennamen folgt dann noch <Code inline>()</Code> und das Semikolon <Code inline>;</Code>.</li>
    <li>Hinter dem Befehl folgen <strong>zwei Slashes</strong> <Code inline>//</Code>. Dies ist ein <strong>Kommentar</strong>. Kommentare werden vom Computer ignoriert, sie dienen dazu, den Code zu erläutern.</li>
  </ul>
</p>
Das obige Programm würde also folgende Bewegung der Biene Lisa bewirken:
<p>
  <BeePreview :world="world" width="14rem" >
    <GameObject image="bee" text="lisa" pos="B"/>
    <GameObject image="flower" text="" pos="F"/>
    <GameObject image="bee" text="lisa" pos="1" style="opacity: 0.5"/>
    <GameObject image="bee" text="lisa" rotation="90" pos="1" style="opacity: 0.5"/>
    <GameObject image="bee" text="lisa" rotation="90" pos="2" style="opacity: 0.5"/>
  </BeePreview>
</p>
</template>

<script>
import BeePreview from '../../bee-preview.vue';
import GameObject from '../../game-object.vue';


export const data={
  id: "bee-info-start",
  title: "Einführung",
  world: [
    "WF.WW",
    ".2.W.",
    "B1..W",
    "WWWWW"
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