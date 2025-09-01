<template>
  <ExerciseBody :exercise="$data" :java="project">
    <p>In einem Computerspiel steuert man ein Raumschiff, das sich von unten nach oben durch den Weltraum bewegt. Feindliche Raumschiffe tauchen auf und versuchen, das Raumschiff des Spielers abzuschießen. Der*die Spieler*in kann selbst auch versuchen, die Feinde abzuschießen. Dabei kann jedes Raumschiff den nächsten Schuss erst dann abfeuern, wenn der aktuelle Schuss den Bildschirm verlassen oder ein Ziel getroffen hat.</p> 
    <p>Für das Spiel werden mehrere Klassen benötigt: <code>Spielobjekt</code>, <code>Raumschiff</code> und <code>Schuss</code>.</p>
    <ul>
      <li>Ein <code>Raumschiff</code> besitzt eine bestimmte Anzahl Lebenspunkte sowie einen Schadenswert, der angibt, wie viel Schaden ein Schuss von ihm verursacht.</li>
      <li>Ein <code>Schuss</code> hat einen Schadenswert, der angibt, wie viel Schaden er verursacht.</li>
      <li><code>Spielobjekt</code> ist eine Unterklasse von <code>JImage</code>. Des Weiteren hat jedes Spielobjekt eine Geschwindigkeit, die angibt, um wie viele Einheiten sich das Objekt pro Frame bewegt.</li>
    </ul>
    <ol class="teilaufgaben">
      <li>Beschreibe, was es bedeutet, dass <code>Spielobjekt</code> eine Unterklasse von <code>JImage</code> ist.</li>
      <li>Begründe, dass es sinnvoll ist, dass <code>Raumschiff</code> und <code>Schuss</code> Unterklassen von <code>Spielobjekt</code> sind.</li>
      <li>Erläutere den Code der Klasse <code>SpielObjekt</code>:
        <Code>
          class SpielObjekt extends JImage{
            private double geschwindigkeit;
            SpielObjekt( String imageurl, double geschwindigkeit ){
              super( imageurl );
              this.geschwindigkeit = geschwindigkeit;
            }
            void fliegen( ){
              move( geschwindigkeit ); //Methode von JImage
            }
            void versetzeZu ( double x, double y){
              setPosition( x, y); //Methode von JImage
            }
          }
        </Code>
      </li>
      <li>Implementiere die Klasse <code>Raumschiff</code> als Unterklasse von <code>SpielObjekt</code> unter Wahrung des Geheimnisprinzips mit den oben genannten zusätzlichen Attributen <code>leben</code> und <code>schaden</code> sowie dem Attribut <code>schuss</code> vom Typ <code>Schuss</code> und den folgenden Methoden:
        <ol>
          <li><code>Raumschiff( String imageurl, double geschwindigkeit, double leben, double schaden )</code>: Der Konstruktor setzt die Attribute auf die passenden Werte. Außerdem erzeugt er einen neuen Schuss und speichert diesen im Attribut <code>schuss</code>.</li>
          <li><code>void schiessen()</code>: Ändert den Schaden des Schusses auf den Schaden des Raumschiffs und versetzt den Schuss an die Koordinaten des Raumschiffs.</li>
        </ol>
      </li>
    </ol>
  </ExerciseBody>
</template>

<script>
import ClassDiagram from '../../UmlClazz.vue';


export const data={
  id: "oo-space",
  title: "Space-Shooter",
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
    name: "oo-space",
    assets: [
      {name: "player", url: "https://thomaskl.uber.space/Webapps/Assets/graphics/space/Ship1.png"},
      {name: "enemy", url: "https://thomaskl.uber.space/Webapps/Assets/graphics/space/Ship0.png"}
    ],
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