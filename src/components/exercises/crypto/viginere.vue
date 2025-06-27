<template>
  <ExerciseBody :exercise="$data" :java="project">
    Bei der Viginére-Verschlüsselung wird die Caesar-Verschlüsselung bei jedem Buchstaben mit einem anderen (Teil-)Schlüssel angewendet. Der gesamte Schlüssel wird als String angegeben. Dabei bedeutet z. B. der Schlüssel <code>ACB</code>, dass das erste Klartext-Zeichen mit 0 caesar-verschlüsselt wird (<code>'A'</code> = <code>0</code>), das zweite Zeichen mit 2 (<code>'C'</code> = <code>2</code>), das dritte mit 1 (<code>'B'</code> = <code>1</code>) und dann geht es von vorne los. Der Klartext <code>"GEHEIM"</code> würde so zu <code>GGIEKN</code>.

    <ol class="teilaufgaben">
      <li>Die Methode <Code inline>char verschluesseln( String klartext, String key )</Code> soll den <Code inline>klartext</Code> mit dem angegebenen Schlüssel <Code inline>key</Code> viginére-verschlüsseln und das Ergebnis zurückgeben.

      Implementiere diese Methode.</li>
      <li>Die Methode <Code inline>char entschluesseln( String geheimtext, String key )</Code> soll den <Code inline>geheimtext</Code> mit dem angegebenen Schlüssel <Code inline>key</Code> viginére-entschlüsseln und das Ergebnis zurückgeben.

      Implementiere diese Methode.</li>
    </ol>
  </ExerciseBody>
</template>

<script>
export const data={
  id: "viginere",
  title: "Viginére-Verschlüsselung",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {
        a: await $new(Main),
        letters: "ABCDEFGHIJKLMOPQRSTUVWXYZ",
        randomWord: function(length){
          let word="";
          for(let i=0;i<length;i++){
            let w=$Exercise.random(0,25)+65;
            word+=String.fromCharCode(w);
          }
          return word;
        }
      }
    },
    testcases: [
        {
          data: ()=>{
            return {
              encrypt: true
            };
          },
          count: 10,  
          info: 'Die Methode <code>verschluesseln</code> funktioniert.'
        },
        {
          data: ()=>{
            return {
              encrypt: false
            };
          },
          count: 10,  
          info: 'Die Methode <code>entschluesseln</code> funktioniert.'
        }
      ],
    test: async (tc,init)=>{
      let n=$Exercise.random(10,20);
      let kn;
      if(tc.$run.index<5){
        kn=$Exercise.random(2,n);
      }else{
        kn=$Exercise.random(n+1,n+10);
      }
      let klartext=init.randomWord(n);
      let key=init.randomWord(kn);
      
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
          let k=key.codePointAt(i%key.length)-65;
          g+=verschluesseleZeichen(s.charAt(i),k);
        }
        return g;
      }

      function entschluesseleText(s,key){
        let g="";
        for(let i=0;i<s.length;i++){
          let k=key.codePointAt(i%key.length)-65;
          g+=entschluesseleZeichen(s.charAt(i),k);
        }
        return g;
      }
      let ist,soll;
      let geheimtext=verschluesseleText(klartext,key);
      if(tc.encrypt){
        ist=await init.a.verschluesseln(klartext,key);
        soll=geheimtext;
      }else{
        ist=await init.a.entschluesseln(geheimtext,key);
        soll=klartext;
      }
      console.log(soll,ist,soll===ist);
      return (ist===soll);
    }
  },
  project: {
    name: "Viginere-Verschluesselung",
    clazzes: [{
      name: "Main",
      src: `
String verschluesseln ( String klartext, String key ){
  
}

String entschluesseln ( String geheimtext, String key ){
  
}
  
$void main(){
  System.out.println( verschluesseln( "ZORRO", "ACB" ) );
  System.out.println( entschluesseln( "ZQSRQ", "ACB" ) );
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