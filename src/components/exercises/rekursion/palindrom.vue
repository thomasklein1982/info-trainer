<template>
  <ExerciseBody :exercise="$data" :java="project">
    <p>Eine Zeichenkette heißt <em>Palindrom</em>, wenn sie vorwärts und rückwärts gelesen identisch ist. Beispiele sind "OTTO", "ANNA" und "RELIEFPFEILER".</p>

    Die Methode <Code inline>boolean istPalindrom(String s)</Code>
    soll prüfen, ob <Code inline>s</Code> ein Palindrom ist.
    <Example>
      <code>istPalindrom( "holloh" )</code> &rarr; <Code inline>true</Code>
    </Example>
    <p>Implementiere diese Methode ohne Verwendung von Schleifen.</p>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "palindrom",
  title: "Palindrom erkennen",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {a: await $new(Aufgabe)};
    },
    test: async (tc,init)=>{
      let n=tc.n;
      let soll=tc.palindrom;
      let w1=$Exercise.getRandomString(n);
      let s;
      if(soll){
        let w2=w1;
        if(tc.$run.index%2===1){
          w2=w2.substring(1);
        }
        w2=w2.split("").reverse().join("");
        s=w1+w2;
      }else{
        let w2=$Exercise.getRandomString(n+tc.$run.index%2);
        s=w1+w2;
        soll=true;
        for(let i=0;i<s.length/2;i++){
          if(s.charAt(i)!==s.charAt(s.length-i-1)){
            soll=false;
            break;
          }
        }
      }
      let ist=await init.a.istPalindrom(s);
      if(soll===ist) return true;
      throw "Problem bei s = "+JSON.stringify(s);
    },
    testcases: [
      {
        data: ()=>{
          return {
            n: 0,
            palindrom: true
          }
        },
        count: 1,
        info: "Die Methode funktioniert für einen leeren String.",
      },
      {
        data: ()=>{
          return {
            n: $Exercise.random(4,10),
            palindrom: true
          }
        },
        count: 10,
        info: "Die Methode liefert für Palindrome <code>true</code> zurück.",
      },
      {
        data: ()=>{
          return {
            n: $Exercise.random(4,10),
            palindrom: false
          }
        },
        count: 5,
        info: "Die Methode liefert <code>false</code> zurück für Wörter, die keine Palindrome sind.",
      },
    ]
  },

  project: {
    name: "Palindrom",
    constraints: {
      java: {
        loops: true
      }
    },
    clazzes: [
      {
        name: "Aufgabe",
        src: `boolean istPalindrom( String s ){
  //hierhin kommt der Code:
  
}

$void main(){
  boolean p = istPalindrom ( "holloh" );
  System.out.println(p);
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