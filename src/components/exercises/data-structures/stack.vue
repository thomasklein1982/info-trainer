<template>
  <ExerciseBody :exercise="$data" :java="project">
    Ein <em>Stack</em> (deutsch: "Stapel") ist eine Datenstruktur, die beliebig viele Objekte einer bestimmten Klasse (im folgenden ein Generic namens <Code inline>T</Code>) speichern kann. Ein Stack besitzt (mindestens) die folgenden Methoden:
    <ol class="teilaufgaben">
      <li><Code inline>int size()</Code>: Liefert die Anzahl der Objekte auf dem Stack zurück.</li>
      <li><Code inline>boolean empty()</Code>: Pürft, ob der Stack leer ist.</li>
      <li><Code inline>T peek()</Code>: Liefert das oberste Objekt auf dem Stack zurück, sofern vorhanden (ansonsten <code>null</code>).</li>
      <li><Code inline>T pop()</Code>: Entfernt das oberste Objekt vom Stack und liefert es zurück, sofern vorhanden (ansonsten <code>null</code>)</li>
      <li><Code inline>void push(T obj)</Code>: Legt das Objekt <Code inline>obj</Code> oben auf den Stack.</li>
    </ol>
    <p>In dieser Aufgabe soll der Stack als verkettete Liste implementiert werden.</p>
    <p>Implementiere diese Methode ohne Verwendung von Schleifen.</p>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "ggt",
  title: "Der größte gemeinsame Teiler (rekursiv)",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {a: await $new(Aufgabe)};
    },
    test: async (tc,init)=>{
      let g=$Exercise.random(1,20);
      let n=$Exercise.random(1,1000)*g;
      let m=$Exercise.random(1,1000)*g;
      let ist=await init.a.ggT(n,m);
      let soll;
      let N=n;
      let M=m;
      let r;
      do{
        r=n%m;
        n=m;
        m=r;
      }while(r>0);
      soll=n;
      if(soll===ist) return true;
      throw "Problem bei n = "+N +" und m = "+M;
    },
    testcases: [
        {
          data: ()=>{
            return {
              
            }
          },
          count: 20,
          info: "Die Methode funktioniert.",
        }
      ]
  },

  project: {
    name: "ggt",
    constraints: {
      java: {
        loops: true
      }
    },
    clazzes: [
      {
        name: "Aufgabe",
        src: `int ggT( int n, int m ){
  //hierhin kommt der Code:
  
}

$void main(){
  int g = ggT ( 42, 12 );
  System.out.println(g);
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