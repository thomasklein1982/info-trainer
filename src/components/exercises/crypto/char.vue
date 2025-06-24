<template>
  <ExerciseBody :exercise="$data" :java="project">
    Viele Kryptosysteme arbeiten nach folgendem Prinzip:
    <ol>
      <li>Wandle die Zeichen in Zahlen um.</li>
      <li>Führe Rechnungen mit den Zahlen durch.</li>
      <li>Wandle die Ergebnis-Zahlen wieder in Zeichen um.</li>
    </ol>
    In dieser Aufgabe geht es darum, wie Zeichen in Zahlen umgewandelt werden können und anders herum.
    <ol class="teilaufgaben">
      <li>Die Methode <Code inline>int zeichenZuZahl( char z )</Code> soll zum Zeichen <Code inline>z</Code> den zugehörigen ASCII-Code zurückgeben (z. B. <code>'A'</code> &rightarrow; <code>65</code>).</li>
      <li>Die Methode <Code inline>char zahlZuZeichen( int a )</Code> soll die Zahl <Code inline>a</Code> in das zugehörige Zeichen (laut  ASCII-Code) umwandeln und zurückgeben (z. B. <code>66</code> &rightarrow; <code>'B'</code>).</li>
    </ol>
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
          count: 10,  
          info: 'Die Methode <code>zeichenZuZahl</code> funktioniert.'
        },
        {
          data: ()=>{
            return {
              a: $Exercise.random(65,90),
              zuZahl: false
            };
          },
          count: 10,  
          info: 'Die Methode <code>zahlZuZeichen</code> funktioniert.'
        }
      ],
    test: async (tc,init)=>{
      let a=tc.a;
      let z1=String.fromCharCode(a);
      let z=$StringCharAtChar(z1,0);
      let ist,soll;
      soll=a;
      if(tc.zuZahl){
        ist=await init.a.zeichenZuZahl(z);
      }else{
        ist=await init.a.zahlZuZeichen(a);
        ist=ist.int;
      }
      return (ist===soll);
    }
  },
  project: {
    name: "Zeichen und Zahlen",
    clazzes: [{
      name: "Main",
      src: `int zeichenZuZahl ( char z ){
  
}

char zahlZuZeichen ( int a ){
  
}
  
$void main(){
  System.out.println( zeichenZuZahl( 'A' ) );
  System.out.println( zahlZuZeichen( 65 ) );
}`
    }
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