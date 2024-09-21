<template>
  <ExerciseBody :exercise="$data" :java="project">
    <p>Eine <em>verkette Liste</em> ist eine Datenstruktur, die beliebig viele Objekte einer bestimmten Klasse (im folgenden ein Generic namens <Code inline>T</Code>) speichern kann. Jedes gespeicherte Objekt befindet sich an einem bestimmten <em>Index</em>, der angibt, wie weit es vom Anfang der Liste entfernt ist. Der Anfang selbst hat also den Index 0.</p>
    Eine verkettete Liste wird durch die Verwendung von zwei Klassen umgesetzt, wie das UML-KLassendiagramm zeigt.
    <img src="https://thomaskl.uber.space/Apps/resources/info-trainer/Liste.png" class="float-right" style="width: 30em"/>
    <p>Die Methoden der Klasse <code>LinkedList</code> sollen folgendes bewirken:
      <ol class="teilaufgaben">
        <li><Code inline>int size()</Code>: Liefert die Anzahl der Objekte in der Liste zurück.</li>
        <li><Code inline>boolean empty()</Code>: Prüft, ob die Liste leer ist.</li>
        <li><Code inline>void add(int index, T e)</Code>: Fügt das Objekt <Code inline>e</Code> der Liste am Index <Code inline>index</Code> hinzu. Falls der Index negativ ist oder zu groß, so soll die Methode gar nichts bewirken.</li>
        <li><Code inline>void remove(int index)</Code>: Entfernt das Objekt am angegebenen <Code inline>index</Code>, sofern vorhanden.</li>
        <li><Code inline>T get(int index)</Code>: Gibt das Objekt am angegebenen <Code inline>index</Code> zurück, sofern vorhanden (ansonsten <code>null</code>).</li>
        <li><Code inline>T set(int index, T e)</Code>: Legt das Objekt am angegebenen <Code inline>index</Code> fest.  Falls der Index negativ ist oder zu groß, so soll die Methode gar nichts bewirken.</li>
      </ol>
    </p>
    <p>Die Methoden der Klasse <code>ListElement</code> sollen folgendes bewirken:
      <ol class="teilaufgaben">
        <li><Code inline>T get()</Code>: Liefert das gespeicherte Objekt zurück.</li>
        <li><Code inline>void set( T e )</Code>: Legt das gespeicherte Objekt fest.</li>
        <li><Code inline>void setNachfolger( ListElement le )</Code>: Legt den Nachfolger dieses Elements auf <Code inline>le</Code> fest.</li>
        <li><Code inline>ListElement getNachfolger()</Code>: Liefert den Nachfolger dieses Elements zurück.</li>
      </ol>
    </p>
    <p>Implementiere diese Methode ohne Verwendung von Schleifen.</p>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "list",
  title: "Die verkettete Liste",
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