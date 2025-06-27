<template>
  <ExerciseBody :exercise="$data" :java="project">
    Bei der Caesar-Verschlüsselung wird jeder Buchstabe des Klartexts durch den Buchstaben ersetzt, der im Alphabet <Code inline>key</Code> Plätze weiter hinten steht. Beim Buchstaben Z geht es dann wieder bei A los. Der Schlüssel <Code inline>key</Code> muss eine ganze Zahl zwischen 0 und 25 sein.

    Wir gehen in dieser Aufgabe davon aus, dass die Texte ausschließlich aus Großbuchstaben bestehen.

    <ol class="teilaufgaben">
      <li>Die Methode <Code inline>char verschluesseleZeichen( char z, int key )</Code> soll das Klartext-Zeichen <Code inline>z</Code> mit dem angegebenen Schlüssel <Code inline>key</Code> verschlüsseln und das verschlüsselte Zeichen zurückgeben.
      
      <Example>
        <ul>
          <li><Code inline>verschluesseleZeichen( 'A', 1 )</Code> liefert <code>'B'</code> zurück.</li>
          <li><Code inline>verschluesseleZeichen( 'B', 3 )</Code> liefert <code>'E'</code> zurück.</li>
          <li><Code inline>verschluesseleZeichen( 'Y', 4 )</Code> liefert <code>'C'</code> zurück.</li>
        </ul>  
      </Example>

      Implementiere diese Methode.</li>
      <li>Die Methode <Code inline>char entschluesseleZeichen( char z, int key )</Code> soll das Geheimtext-Zeichen <Code inline>z</Code> mit dem angegebenen Schlüssel <Code inline>key</Code> wieder entschlüsseln und das entschlüsselte Zeichen zurückgeben.
      
      <Example>
        <ul>
          <li><Code inline>entschluesseleZeichen( 'A', 1 )</Code> liefert <code>'Z'</code> zurück.</li>
          <li><Code inline>entschluesseleZeichen( 'B', 3 )</Code> liefert <code>'Y'</code> zurück.</li>
          <li><Code inline>entschluesseleZeichen( 'Y', 4 )</Code> liefert <code>'U'</code> zurück.</li>
        </ul>  
      </Example>

      Implementiere diese Methode.</li>
      <li>Die Methode <Code inline>String verschluesseleText( String klartext, int key )</Code> soll den gegebenen <Code inline>klartext</Code> verschlüsseln und den Geheimtext zurückgeben.
      
      <Example>
        <Code inline>verschluesseleText( 'TOPSECRET', 5 )</Code> liefert <code>"YTUXJHWJY"</code> zurück.  
      </Example>

      Implementiere diese Methode.</li>
      <li>Die Methode <Code inline>String entschluesseleText( String geheimtext, int key )</Code> soll den gegebenen <Code inline>geheimtext</Code> entschlüsseln und den Klartext zurückgeben.
      
      <Example>
        <Code inline>entschluesseleText( 'UPQTFDSFU', 1 )</Code> liefert <code>"TOPSECRET"</code> zurück.  
      </Example>

      Implementiere diese Methode.</li>
    </ol>
  </ExerciseBody>
</template>

<script>
export const data={
  id: "caesar",
  title: "Caesar-Verschlüsselung",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {
        a: await $new(Main),
        letters: "ABCDEFGHIJKLMOPQRSTUVWXYZ"
      }
    },
    testcases: [
        {
          data: ()=>{
            return {
              key: $Exercise.random(0,25),
              z: String.fromCharCode($Exercise.random(65,90)),
              single: true,
              encrypt: true
            };
          },
          count: 10,  
          info: 'Die Methode <code>verschluesseleZeichen</code> funktioniert.'
        },
        {
          data: ()=>{
            return {
              key: $Exercise.random(0,25),
              z: String.fromCharCode($Exercise.random(65,90)),
              single: true,
              encrypt: false
            };
          },
          count: 10,  
          info: 'Die Methode <code>entschluesseleZeichen</code> funktioniert.'
        },
        {
          data: ()=>{
            return {
              key: $Exercise.random(0,25),
              s1: $Exercise.random(0,10),
              s2: $Exercise.random(13,25),
              single: false,
              encrypt: true
            };
          },
          count: 10,  
          info: 'Die Methode <code>verschluesseleText</code> funktioniert.'
        },
        {
          data: ()=>{
            return {
              key: $Exercise.random(0,25),
              s1: $Exercise.random(0,10),
              s2: $Exercise.random(13,25),
              single: false,
              encrypt: false
            };
          },
          count: 10,  
          info: 'Die Methode <code>entschluesseleText</code> funktioniert.'
        },
      ],
    test: async (tc,init)=>{
      let key=tc.key;

      function verschluesseleZeichen(z,key){
        return String.fromCharCode((z.codePointAt(0)+key-65)%26+65);
      }

      function entschluesseleZeichen(z,key){
        key=key%26;
        return String.fromCharCode((z.codePointAt(0)+26-key-65)%26+65);
      }

      function verschluesseleText(s,key){
        let g="";
        for(let i=0;i<s.length;i++){
          g+=verschluesseleZeichen(s.charAt(i),key);
        }
        return g;
      }

      function entschluesseleText(s,key){
        let g="";
        for(let i=0;i<s.length;i++){
          g+=entschluesseleZeichen(s.charAt(i),key);
        }
        return g;
      }
      let ist,soll;
      if(tc.single){
        let z=$StringCharAtChar(tc.z,0);
        if(tc.encrypt){
          ist=await init.a.verschluesseleZeichen(z,key);
          soll=verschluesseleZeichen(tc.z,key);
        }else{
          ist=await init.a.entschluesseleZeichen(z,key);
          soll=entschluesseleZeichen(tc.z,key);
        }
        ist=ist.char;
      }else{
        let s=init.letters.substring(tc.s1,tc.s2);
        if(tc.encrypt){
          ist=await init.a.verschluesseleText(s,key);
          soll=verschluesseleText(s,key);
        }else{
          ist=await init.a.entschluesseleText(s,key);
          soll=entschluesseleText(s,key);
        }
        console.log(soll,ist,soll===ist);
      }
      return (ist===soll);
    }
  },
  project: {
    name: "Caesar-Verschluesselung",
    clazzes: [{
      name: "Main",
      src: `char verschluesseleZeichen ( char z, int key ){
  
}

char entschluesseleZeichen ( char z, int key ){
  
}

String verschluesseleText ( String klartext, int key ){
  
}

String entschluesseleText ( String geheimtext, int key ){
  
}
  
$void main(){
  System.out.println( verschluesseleZeichen( 'A', 1 ) );
  System.out.println( entschluesseleZeichen( 'D', 2 ) );
  System.out.println( verschluesseleText( "ZORRO", 2 ) );
  System.out.println( entschluesseleText( "ABC", 2 ) );
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