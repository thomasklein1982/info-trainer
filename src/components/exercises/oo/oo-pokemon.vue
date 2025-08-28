<template>
  <ExerciseBody :exercise="$data" :java="project">
    <p>Für ein Computerspiel wird eine Klasse <code>Pokemon</code> benötigt.</p>
    <p>Implementiere diese Klasse unter Beachtung der folgenden Vorgaben:</p>
    <ol>
      <li>Die Klasse hat die folgenden Attribute:
        <ul>
          <li><code>name</code>: Der Name des Pokemon, z. B. <code>"Pikachu"</code>.</li>
          <li><code>maxLeben</code> (ganze Zahl): Gibt an, mit wie vielen Lebenspunkten das Pokemon startet. Die <code>leben</code> (siehe unten) dürfen nie größer sein als <code>maxLeben</code>.</li>
          <li><code>leben</code> (ganze Zahl): Gibt an, wie viele Lebenspunkte das Pokemon noch übrig hat. Wenn die Punkte auf 0 fallen, ist das Pokemon KO. Ein neues Pokemon startet immer mit vollen Leben.</li>
          <li><code>schaden</code> (ganze Zahl): Gibt an, wie viel Schaden das Pokemon bei einem Angriff verursacht. Der Schaden wird von den Lebenspunkten des angegriffenen Pokemon abgezogen.</li>
        </ul>
      </li>
      <li>Die Klasse hat den Konstruktor <code>Pokemon( String name, int maxLeben, int schaden )</code>. Dieser legt alle Attribute gemäß der beschriebenen Vorgaben fest.</li>
      <li>Die Klasse hat die folgenden Methoden:
        <ul>
          <li><code>void angreifen( Pokemon ziel )</code>: Lässt das Pokemon das <code>ziel</code> angreifen und Schaden zufügen.</li>
          <li><code>boolean istKO( )</code>: Gibt zurück, ob das Pokemon KO ist oder nicht.</li>
          <li><code>void ausruhen( int stunden, boolean imPokeCenter )</code>: Bewirkt, dass das Pokemon <code>stunden</code> Stunden ausruht und pro solcher Stunde 2 Leben zurück erhält. Falls <code>imPokeCenter</code> wahr ist, erhält das Pokemon sogar 3 Leben pro Stunde zurück.</li>
          <li><code>int getErlittenerSchaden( )</code>: Liefert zurück, wie viel Schaden das Pokemon aktuell insgesamt erlitten hat.</li>
        </ul>
      </li>
    </ol>
  </ExerciseBody>
</template>

<script>
import ClassDiagram from '../../UmlClazz.vue';


export const data={
  id: "oo-pokemon",
  title: "Pokemon",
  check: {
    init: async ()=>{
      let classPokemonExists=true;

      try{
        if(Pokemon){
        }
      }catch(e){
        classPokemonExists=false;
      }
      return {
        classPokemonExists
      };
    },
    test: async (tc,init)=>{
      if(!init.classPokemonExists) return false;
      return (await tc.check());
    },
    testcases: [
        {
          info: "Es existiert eine Klasse Pokemon.",
          data: ()=>{
            return {
              check: ()=>{
                return true;
              },
            };
          },
          count: 1,
        },
        {
          info: "Der Konstruktor funktioniert.",
          data: ()=>{
            return {
              check: async ()=>{
                let name=$Exercise.randomFrom(["Schiggy","Pikachu","Aquana"])[0];
                let maxLeben=$Exercise.random(4,100);
                let schaden=$Exercise.random(1,20);
                let p1=await $Exercise.createInstance(Pokemon,name,maxLeben,schaden);
                if(p1.name===name && p1.maxLeben===maxLeben && p1.schaden===schaden && p1.leben===maxLeben) return true;
                return false;
              },
            };
          },
          count: 3,
        },
        {
          info: "Die Methode <code>angreifen</code> funktioniert.",
          data: ()=>{
            return {
              check: async ()=>{
                let leben=20;
                let schaden=5;
                let p1=await $Exercise.createInstance(Pokemon,"name",30,schaden);
                let p2=await $Exercise.createInstance(Pokemon,"name",leben,10);
                
                while(leben>0){
                  await p1.angreifen(p2);
                  leben-=schaden;
                  if(p2.leben!==leben) return false;
                }
                return true;
              },
            };
          },
          count: 1,
        },
        {
          info: "Die Methode <code>istKO</code> funktioniert.",
          data: ()=>{
            return {
              check: async ()=>{
                let p1=await $Exercise.createInstance(Pokemon,"name",0,10);
                let ko=await p1.istKO();
                if(!ko) return false;
                for(let i=10;i>0;i--){
                  p1.leben=i;
                  ko=await p1.istKO();
                  if(ko) return false;
                }
                return true;
              },
            };
          },
          count: 1,
        },
        {
          info: "Die Methode <code>ausruhen</code> funktioniert.",
          data: ()=>{
            return {
              check: async ()=>{
                let maxLeben=$Exercise.random(100,200);
                let leben=maxLeben;
                let schaden=$Exercise.random(0,2);
                let p1=await $Exercise.createInstance(Pokemon,"name",leben,10);
                p1.leben-=schaden;
                let stunden=$Exercise.random(2,4);
                await p1.ausruhen(stunden, false);
                if(p1.leben!==maxLeben) return false;
                
                p1.leben-=schaden;
                await p1.ausruhen(stunden, true);
                if(p1.leben!==maxLeben) return false;

                leben=10;
                p1.leben=leben;
                stunden=$Exercise.random(1,10);
                await p1.ausruhen(stunden,false);
                leben+=stunden*2;
                if(p1.leben!==leben) return false;

                leben=10;
                p1.leben=leben;
                stunden=$Exercise.random(1,10);
                await p1.ausruhen(stunden,true);
                leben+=stunden*3;
                if(p1.leben!==leben) return false;
                return true;
              },
            };
          },
          count: 1,
        },
      ]
  },

  project: {
    name: "OO-Pokemon",
    clazzes: [
      {
        name: "Aufgabe",
        src: `$void main(){
  
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