<template>
  <ExerciseBody :exercise="$data" :java="project">
    <p>Eine <em>verkette Liste</em> ist eine Datenstruktur, die beliebig viele Objekte einer bestimmten Klasse (im folgenden ein Generic namens <Code inline>T</Code>) speichern kann. Jedes gespeicherte Objekt befindet sich an einem bestimmten <em>Index</em>, der angibt, wie weit es vom Anfang der Liste entfernt ist. Der Anfang selbst hat also den Index 0.</p>
    Eine verkettete Liste wird durch die Verwendung von zwei Klassen umgesetzt, wie das UML-KLassendiagramm zeigt.
    <div  class="float-right" style="position: relative; width: 30rem; height: 20rem; background-color: white">
      <UmlClazz :clazz="clazzes[0]" style="width: 40%; position: absolute; left: 5px; top: 50px;"/>
      <UmlClazz :clazz="clazzes[1]" style="width: 40%; position: absolute; right: 5px; top: 50px;"/>
      <div style="position: absolute; right: 15%; top: 20px; width: 60px; ">
        <SvgRoot viewBox="0 0 12 5" style="position: absolute; left:0; top: 0; width: 100%; " >
          <polyline points="0,5 0,0 10,0 10,5" stroke-width="0.4" marker-end="url(#arrow)" stroke="black" fill="none"/>
        </SvgRoot>
        <span style="color: black; position: absolute; left: 0; bottom: 100%">nachfolger</span>
        <span style="color: black; position: absolute; left: 100%; ">0..1</span>
      </div>
      <div style="position: absolute; left: calc( 5px + 40% ); top: 50%; height: 2em; width: calc( 20% - 10px ); ">
        <SvgRoot viewBox="0 0 10 4" style="position: absolute; left:0; top: 0; width: 100%; " >
          <polyline points="0,1 10,1" stroke-width="0.5" marker-end="url(#arrow)" stroke="black" fill="none"/>
        </SvgRoot>
        <span style="color: black; position: absolute; right: 0; bottom: 100%">anfang</span>
        <span style="color: black; position: absolute; right: 0; bottom: 0%;">0..1</span>
      </div>
    </div>
    
    <p>Die Methoden der Klasse <code>LinkedList</code> sollen folgendes bewirken:
      <ol class="teilaufgaben">
        <li><Code inline>int getSize()</Code>: Liefert die Anzahl der Objekte in der Liste zurück.</li>
        <li><Code inline>boolean empty()</Code>: Prüft, ob die Liste leer ist.</li>
        <li><Code inline>void add(int index, T e)</Code>: Fügt das Objekt <Code inline>e</Code> der Liste am Index <Code inline>index</Code> hinzu. Falls der Index negativ ist oder größer als <Code inline>size</Code>, so soll die Methode gar nichts bewirken.</li>
        <li><Code inline>void remove(int index)</Code>: Entfernt das Objekt am angegebenen <Code inline>index</Code>, sofern vorhanden.</li>
        <li><Code inline>T get(int index)</Code>: Gibt das Objekt am angegebenen <Code inline>index</Code> zurück, sofern vorhanden (ansonsten <code>null</code>).</li>
        <li><Code inline>T set(int index, T e)</Code>: Legt das Objekt am angegebenen <Code inline>index</Code> fest.  Falls der Index negativ ist oder zu groß (größer oder gleich <Code inline>size</Code>), so soll die Methode gar nichts bewirken.</li>
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
    <Hint>Du darfst in dieser Aufgabe keine Arrays verwenden.</Hint>
  </ExerciseBody>
</template>

<script>
import SvgRoot from '../../svg/svg-root.vue';
import UmlClazz from '../../UmlClazz.vue';

export const data={
  id: "list",
  clazzes: [
    {
      name: "LinkedList<T>",
      attributes: [
        "- size: int"
      ],
      methods: [
        "+ getSize(): int",
        "+ empty(): boolean",
        "+ add(index: int, obj: T)",
        "+ remove(index: int)",
        "+ get(index: int): T",
        "+ set(index: int, obj: T)"
      ]
    },
    {
      name: "ListElement<T>",
      attributes: [
        "- object: T"
      ],
      methods: [
        "+ get(): T",
        "+ set(obj: T)",
        "+ getNachfolger()",
        "+ setNachfolger(ListElement e)"
      ]
    }
  ],
  title: "Die verkettete Liste",
  check: {
    init: async ()=>{
      return {};
    },
    test: async (tc,init)=>{
      return tc.check();
    },
    testcases: [
      {
        data: ()=>{
          return {
            check: async (init)=>{
              let list=await $Exercise.createInstanceWithTypeParameters(LinkedList, {T: "String"});
              let w="fdhjjdhhf";
              await list.add(0,w);
              let a=await list.get(0);
              if(a!==w) return "get(0) liefert nicht den korrekten Wert zurück.";
              return true;
            }
          }
        },
        count: 1,
        info: "Das Hinzufügen eines Elements (add) und das anschließende Auslesen (get) funktioniert.",
      },
      {
        data: ()=>{
          return {
            check: async (init)=>{
              let list=await $Exercise.createInstanceWithTypeParameters(LinkedList, {T: "String"});
              let n=$Exercise.random(10,20);
              let array=[];
              for(let i=0;i<n;i++){
                let w=$Exercise.getRandomString($Exercise.random(8,10));
                let index=$Exercise.random(0,i);
                await list.add(index,w);
                array.splice(index,0,w);
              }
              for(let i=0;i<n;i++){
                let w=await list.get(i);
                if(w!==array[i]) return false;
              }
              return true;
            }
          }
        },
        count: 2,
        info: "Das Hinzufügen mehrerer Elements (add) und das anschließende Auslesen (get) funktioniert.",
      },
      {
        data: ()=>{
          return {
            check: async (init)=>{
              let list=await $Exercise.createInstanceWithTypeParameters(LinkedList, {T: "String"});
              let e=await list.empty();
              if(e!==true) return "Klappt nicht, wenn die Liste leer ist.";
              for(let i=0;i<10;i++){
                let w=$Exercise.getRandomString($Exercise.random(8,10));
                let index=$Exercise.random(0,i);
                await list.add(index,w);
                let e=await list.empty();
                if(e!==false) return "Klappt nicht, wenn die Liste nicht leer ist.";
              }
              return true;
            }
          }
        },
        count: 2,
        info: "Die Methode <code>empty</code> funktioniert.",
      },
      {
        data: ()=>{
          return {
            check: async (init)=>{
              let list=await $Exercise.createInstanceWithTypeParameters(LinkedList, {T: "String"});
              let n=$Exercise.random(10,20);
              let array=[];
              for(let i=0;i<n;i++){
                let w=$Exercise.getRandomString($Exercise.random(8,10));
                await list.add(0,w);
                array.splice(0,0,w);
              }
              for(let j=0;j<5;j++){
                let index=$Exercise.random(0,n-1);
                let w=$Exercise.getRandomString($Exercise.random(8,10));
                await list.set(index,w);
                array[index]=w;
                for(let i=0;i<n;i++){
                  let w=await list.get(i);
                  if(w!==array[i]) return false;
                }
              }
              return true;
            }
          }
        },
        count: 1,
        info: "Die Methode <code>set</code> funktioniert.",
      },
      {
        data: ()=>{
          return {
            check: async (init)=>{
              let list=await $Exercise.createInstanceWithTypeParameters(LinkedList, {T: "String"});
              let n=$Exercise.random(10,20);
              let array=[];
              for(let i=0;i<n;i++){
                let w=$Exercise.getRandomString($Exercise.random(8,10));
                await list.add(0,w);
                array.splice(0,0,w);
              }
              for(let j=0;j<5;j++){
                let index=j===0? 0: (j===1? n-1: $Exercise.random(0,n-1));
                await list.remove(index);
                array.splice(index,1);
                for(let i=0;i<n-1-j;i++){
                  let w=await list.get(i);
                  if(w!==array[i]) return "Fehler bei remove("+index+")";
                }
              }
              return true;
            }
          }
        },
        count: 1,
        info: "Die Methode <code>remove</code> funktioniert.",
      },
    ]
  },

  project: {
    name: "List",
    constraints: {
      java: {
        arrays: true
      }
    },
    clazzes: [
      {
        name: "Main",
        src: `$void main(){
  LinkedList<String> list = new LinkedList<>();
  list.add(0, "Anna");
  list.add(1, "Tom");
  list.add(2, "Ayla");
  list.add(3, "Jan");
  System.out.println( list.get(1) );
  list.remove(1);
  System.out.println( list.get(2) );
}`
      },
      {
        name: "LinkedList<T>",
        src: `private int size = 0;
T get(int index){
  
}

void set(int index, T e){

}

int getSize(){

}

boolean empty(){

}

void add( int index, T e ){
  
}

void remove( int index ) {

}

        `
      },
      {
        name: "ListElement<T>",
        src: `private T object;

T get(){

}

void set(T e){

}

ListElement<T> getNachfolger(){
  
}

void setNachfolger(ListElement<T> le){
  
}`
      },
    ]
  }
}

export default{
  components: {
    SvgRoot, UmlClazz
  },
  data() {
      return data;
  },
}
</script>