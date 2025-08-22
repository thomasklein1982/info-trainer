<template>
  <ExerciseBody :exercise="$data" :java="project">
    Für das Kartenspiel Uno wird eine Klasse <code>Karte</code> benötigt. 
    <ul>
      <li>Jede Karte hat eine Farbe (rot, grün, blau oder gelb) und eine Zahl zwischen 1 und 9.</li>
      <li>Sonderkarten (Farbwahl, Richtungswechsel, Aussetzen usw.) gibt es nicht.</li>
      <li>Eine Karte kann auf eine andere Karte gelegt werden, wenn die Farbe oder die Zahl (oder beides) gleich sind.</li>
    </ul>
    <ol class="teilaufgaben">
      <li>Implementiere die Klasse <code>Karte</code> mit den Attributen <code>farbe</code> und <code>zahl</code>.</li>
      <li>Implementiere den Konstruktor <code>Karte( String farbe, String zahl )</code>, der die beiden Attribute auf die Werte der Parameter setzt.</li>
      <li>Implementiere die Methode <Code>boolean passtAuf( Karte k )</Code>, die überprüft, ob diese Karte auf die Karte <code>k</code> gelegt werden kann.</li>
    </ol>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "oo-uno",
  title: "Uno 1: Karten",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {
        a: await $new(Aufgabe)
      };
    },
    test: async (tc,init)=>{
      return await tc.check(init);
    },
    testcases: [
        {
          data: ()=>{
            return {
              check: (data)=>{
                console.log(data);
                return false;
              },
            };
          },
          count: 1,
          info: "Die Klasse <code>Karte</code> ist vorhanden.",
        },
        {
          data: ()=>{
            return {
              check: (auto,kmStand,marke,out)=>{
                return auto!==undefined && auto!==null && auto instanceof Auto && auto.marke===marke;
              },
            };
          },
          count: 3,
          info: "Das zurückgegebene Auto hat die richtige Marke.",
        },
        {
          data: ()=>{
            return {
              check: (auto,kmStand,marke,out)=>{
                return auto!==undefined && auto!==null && auto instanceof Auto && auto.kmStand===kmStand+100 && auto.istGefahren;
              },
            };
          },
          count: 3,
          info: "Das zurückgegebene Auto ist 100 km weit gefahren.",
        },
        {
          data: ()=>{
            return {
              check: async (auto,kmStand,marke,out,auto2)=>{
                return out===await auto2.getTankfuellungInProzent()+"%";
              },
            };
          },
          count: 3,
          info: "Die prozentuale Tankfüllung wird in der Konsole ausgegeben.",
        },
      ]
  },

  project: {
    name: "OO-Uno",
    clazzes: [
      {
        name: "Aufgabe",
        src: `
$void main(){
  Karte k1 = new Karte( "rot", 8 );
  Karte k2 = new Karte( "gelb", 2 );
  Karte k3 = new Karte( "gelb", 8 );
  System.out.println( k1.passtAuf( k2 ) );
  System.out.println( k2.passtAuf( k3 ) );
  System.out.println( k3.passtAuf( k1 ) );
}`
      },
    ]
  }
}

export default{
  components: {
    
  },
  data() {
      return data;
  },
}
</script>