<template>
  <div class="wrapper" v-if="items.show">
    <h2>Befehlsübersicht</h2>
    <ul>
      <template v-if="items.console">
        <li><span class="cmd">Console.print ( String t )</span>: Gibt <code>t</code> in der Konsole aus.</li>
        <li><span class="cmd">Console.printLine ( String t )</span>: Gibt <code>t</code> in der Konsole aus und macht anschließend einen Zeilenumbruch.</li>
        <li><span class="cmd">Console.read ( ): String</span>: Wartet darauf, dass der User etwas in die Konsole eingibt und gibt die Eingabe zurück.</li>
      </template>
      <li v-if="items.sysout"><span class="cmd">System.out.println( String t )</span>: <template v-if="items.console">Bewirkt exakt dasselbe wie <code>Console.printLine</code>.</template><template v-else>Gibt <code>t</code> in der Konsole aus und macht anschließend einen Zeilenumbruch.</template></li>
      <li v-if="items.string">Methoden der Klasse <code>String</code>:
        <ul>
          <li><span class="cmd">length( ): int</span>: Gibt die Länge des Strings zurück.</li>
          <li><span class="cmd">charAt( int index ): char</span>: Gibt das Zeichen an der Stelle <code>index</code> zurück (die Nummerierung beginnt bei 0).</li>
          <li><span class="cmd">substring( int from, int to ): String</span>: Gibt den Teil-String zurück, der bei <code>from</code> beginnt und vor <code>to</code> endet (die Nummerierung beginnt bei 0).</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    path: Object
  },
  computed: {
    items(){
      let cheats={
        sysout: false,
        console: false,
        string: false,
        show: false
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
  .wrapper{
    border-top: 1pt dashed black;
  }
  .wrapper ul{
    list-style-type: "⇨ ";
  }
</style>