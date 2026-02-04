<template>
  <Card class="cheats" v-if="items.show">
    <template #title>Hilfe</template>
    <template #content>
      <div v-if="items.commandList">
        <ul>
          <template v-if="items.console">
            <li><span class="cmd">Console.print ( String t )</span>: Gibt <code>t</code> in der Konsole aus.</li>
            <li><span class="cmd">Console.printLine ( String t )</span>: Gibt <code>t</code> in der Konsole aus und macht anschließend einen Zeilenumbruch.</li>
            <li><span class="cmd">Console.read ( ): String</span>: Wartet darauf, dass der User etwas in die Konsole eingibt und gibt die Eingabe zurück.</li>
          </template>
          <li v-if="items.sysout"><span class="cmd">System.out.println( String t )</span>: <template v-if="items.console">Bewirkt exakt dasselbe wie <code>Console.printLine</code>.</template><template v-else>Gibt <code>t</code> in der Konsole aus und macht anschließend einen Zeilenumbruch.</template></li>
        </ul>
      </div>
      <div v-if="items.string">Methoden der Klasse <code>String</code>:
        <ul>
          <li><span class="cmd">length( ): int</span>: Gibt die Länge des Strings zurück.</li>
          <li><span class="cmd">charAt( int index ): char</span>: Gibt das Zeichen an der Stelle <code>index</code> zurück (die Nummerierung beginnt bei 0).</li>
          <li><span class="cmd">substring( int from, int to ): String</span>: Gibt den Teil-String zurück, der bei <code>from</code> beginnt und vor <code>to</code> endet (die Nummerierung beginnt bei 0).</li>
        </ul>
      </div>
      <div v-if="items.bee">Methoden der Klasse <code>Bee</code>:
        <ul>
          <li><span class="cmd">move( )</span>: Bewegt die Biene um 1 Feld in Blickrichtung.</li>
          <li><span class="cmd">turnLeft( )</span>: Dreht die Biene um 90° gegen den Uhrzeigersinn ↺.</li>
          <li><span class="cmd">turnRight( )</span>: Dreht die Biene um 90° im Uhrzeigersinn ↻.</li>
          <li><span class="cmd">read( ): String</span>: Liest den Text auf dem Feld vor der Biene (in Blickrichtung) und gibt den gelesenen Text zurück.</li>
          <li><span class="cmd">print( Object text )</span>: Schreibt den Wert des Parameters <code>text</code> auf das Feld vor der Biene (in Blickrichtung).</li>
          <li><span class="cmd">setSpeed( int s )</span>: Legt fest, wie schnell sich die Biene bewegt  von <code>s</code> = 0 (sehr langsam) bis <code>s</code> = 100 (sehr schnell).</li>
        </ul>
      </div>
      <div v-if="items.beep">
        Die Biene darf das Spielfeld nicht verlassen. Sie darf keine Felder mit Bäumen betreten.
        <p>Befehle für die Biene:</p>
        <ul>
          <li><span class="cmd">move( )</span>: Bewegt die Biene um 1 Feld in Blickrichtung.</li>
          <li><span class="cmd">left( )</span>: Dreht die Biene um 90° gegen den Uhrzeigersinn ↺.</li>
          <li><span class="cmd">right( )</span>: Dreht die Biene um 90° im Uhrzeigersinn ↻.</li>
          <li><span class="cmd">read( )</span>: Liest den Text auf dem Feld vor der Biene (in Blickrichtung) und gibt den gelesenen Text zurück.</li>
          <li><span class="cmd">print( text )</span>: Schreibt den <code>text</code> auf das Feld vor der Biene (in Blickrichtung).</li>
        </ul>
      </div>

    </template>
  </Card>
</template>

<script>
import Card from 'primevue/card';


export default {
  components: {
    Card
  },
  props: {
    path: Object
  },
  computed: {
    items(){
      let cheats={
        sysout: false,
        console: false,
        string: false,
        show: false,
        bee: false,
        beep: false,
        commandList: false
      };
      let exercises=this.path.exercises;
      for(let i=0;i<exercises.length;i++){
        let ex=this.$root.exerciseDataCollection[exercises[i]];
        if(!ex) continue;
        ex=ex.data;
        for(let a in cheats){
          if(cheats[a]) continue;
          if(!ex.cheats) continue;
          if(ex.cheats.indexOf(a)>=0) {
            cheats[a]=true;
            cheats.show=true;
          }
        }
      }
      cheats.commandList=cheats.sysout || cheats.console;
      return cheats;
    }
  }
}
</script>

<style scoped>
  h2{
    margin: 0;
    font-size: 110%;
    text-align: center;
  }
  .cmd{
    font-family: monospace, monospace;
    font-weight: bold;
  }
  .cheats{
    border: 2pt solid slateblue;
    background-color: rgba(100,100,200,0.5);
  }
  .wrapper{
    border-top: 1pt dashed black;
  }
  .wrapper ul{
    list-style-type: "⇨ ";
  }
</style>