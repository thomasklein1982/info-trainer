<template>
  <ExerciseBody :exercise="$data" :java="project">
    Viele Kryptosysteme arbeiten nach folgendem Prinzip:
    <ol>
      <li>Wandle die Zeichen in Zahlen um.</li>
      <li>Führe Rechnungen mit den Zahlen durch.</li>
      <li>Wandle die Ergebnis-Zahlen wieder in Zeichen um.</li>
    </ol>
    In dieser Aufgabe geht es darum, Großbuchstaben 'A', 'B', 'C', ... in Zahlen 0, 1, 2, ... umzuwandeln und umgekehrt.
    <ol class="teilaufgaben">
      <li>Die Methode <Code inline>int buchstabeZuZahl( char z )</Code> soll die zum Großbuchstaben <Code inline>z</Code> gehörige Zahl zurückgeben (<code>'A'</code> &rightarrow; <code>0</code>, <code>'B'</code> &rightarrow; <code>1</code>, ...).</li>
      <li>Die Methode <Code inline>char zahlZuBuchstabe( int n )</Code> soll die Zahl <Code inline>n</Code> in den zugehörigen Großbuchstaben umwandeln und zurückgeben (z. B. <code>2</code> &rightarrow; <code>'C'</code>).</li>
    </ol>
    <Hint>
      Die Methoden müssen nur für Großbuchstaben funktionieren. 
    </Hint>
  </ExerciseBody>
</template>

<script>
export const data={
  id: "char",
  title: "Zeichen und Zahlen",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {
        a: await $new(Main),
      }
    },
    testcases: [
        {
          data: ()=>{
            return {
              a: $Exercise.random(65,90),
              zuZahl: true
            };
          },
          count: 26,  
          info: 'Die Methode <code>buchstabeZuZahl</code> funktioniert.'
        },
        {
          data: ()=>{
            return {
              a: $Exercise.random(65,90),
              zuZahl: false
            };
          },
          count: 26,  
          info: 'Die Methode <code>zahlZuBuchstabe</code> funktioniert.'
        }
      ],
    test: async (tc,init)=>{
      let a=tc.$run.index;
      let z1=String.fromCharCode(a+65);
      let z=$StringCharAtChar(z1,0);
      let ist,soll;
      soll=a;
      if(tc.zuZahl){
        ist=await init.a.buchstabeZuZahl(z);
      }else{
        ist=await init.a.zahlZuBuchstabe(a);
        ist=ist.int-65;
      }
      return (ist===soll);
    }
  },
  project: {
    name: "Zeichen und Zahlen",
    clazzes: [{
      name: "Main",
      src: `int buchstabeZuZahl ( char z ){
  
}

char zahlZuBuchstabe ( int n ){
  
}
  
$void main(){
  System.out.println( buchstabeZuZahl( 'A' ) );
  System.out.println( zahlZuBuchstabe( 1 ) );
}`
    }
    ]
  }
}

import Hint from "../../hint.vue"

export default{
  components: {
    Hint
  },
  data() {
      return data;
  },
}
</script>