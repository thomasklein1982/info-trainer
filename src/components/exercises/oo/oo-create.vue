<template>
  <ExerciseBody :exercise="$data" :java="project">
    Für eine Pokemon-Kampfarena wurde eine Klasse <Code inline>Pokemon</Code> programmiert mit dem abgebildeten UML-Klassendiagramm.
    <span class="float-right">
      <ClassDiagram 
        :clazz="uml"
      />
    </span>
    Es soll ein Java-Programm geschrieben werden, das die folgenden Dinge tut:
    <ol>
      <li>Es sollen drei Pokemon erzeugt werden:
        <ul>
          <li>Pikachu hat 40 Leben, verursacht 10 Schaden und ist vom Typ Elektro.</li>
          <li>Glumanda ist vom Typ Feuer, er verursacht 8 Schaden und hat 45 Leben.</li>
          <li>Schiggy hat 38 Leben, verursacht 9 Schaden und ist vom Typ Wasser.</li>
        </ul>
      </li>
      <li>Der Kampf soll folgendermaßen ablaufen:
        <ul>
          <li>Schiggy greift Glumanda an.</li>
          <lI>Pikachu verstaerkt sich um 5 Punkte.</lI>
          <li>Glumanda heilt sich um 10 Punkte.</li>
          <li></li>
        </ul>
      </li>
      <li>Es soll die Tankfüllung in Prozent in den Konsole ausgegeben werden (inklusive Prozentzeichen, also z. B. <code>76%</code>).</li>
      <li>Das Auto soll zurückgegeben werden.</li>
    </ol>
    Implementiere diese Methode.
  </ExerciseBody>
</template>

<script>
import ClassDiagram from '../../UmlClazz.vue';


export const data={
  id: "oo-create",
  uml: {
    name: "Pokemon",
    attributes: [
      "- name: String",
      "- leben: int",
      "- schaden: int",
      "- typ: String"
    ],
    methods: [
      "+ Pokemon(name: String, Typ: String, leben: int, schaden: int)",
      "+ angreifen( ziel: Pokemon)",
      "+ heilen( menge: int )",
      "+ verstaerken( menge: int )"
    ]
  },
  title: "Die fahrenden Autos",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      $Exercise.tank=$Exercise.random(40,100);
      return {
        a: await $new(Aufgabe)
      };
    },
    test: async (tc,init)=>{
      $Exercise.clearConsole();
      let marke=$Exercise.randomFrom(["VW","Mercedes","BMW","Opel","Citroen","Renault"],1)[0];
      let kmStand=$Exercise.random(100,2000);
      let auto=await init.a.auto(marke,kmStand);
      let out=$Exercise.getConsoleContent().join("");
      let auto2=await $Exercise.createInstance(Auto,marke,kmStand);//await $App.asyncFunctionCall(new Auto(),"$constructor",[null,marke,kmStand]);
      await auto2.fahren(100);
      return (await tc.check(auto,kmStand,marke,out,auto2));
    },
    testcases: [
        {
          data: ()=>{
            return {
              check: (auto,kmStand,marke,out)=>{
                return auto!==undefined && auto!==null && auto instanceof Auto;
              },
            };
          },
          count: 1,
          info: "Es wird ein Objekt der Klasse Auto erzeugt und zurückgegeben.",
        },
        {
          data: ()=>{
            return {
              check: (auto,kmStand,marke,out)=>{
                return auto!==undefined && auto!==null && auto instanceof Auto && auto.marke===marke;
              },
            };
          },
          count: 3,
          info: "Das zurückgegebene Auto hat die richtige Marke.",
        },
        {
          data: ()=>{
            return {
              check: (auto,kmStand,marke,out)=>{
                return auto!==undefined && auto!==null && auto instanceof Auto && auto.kmStand===kmStand+100 && auto.istGefahren;
              },
            };
          },
          count: 3,
          info: "Das zurückgegebene Auto ist 100 km weit gefahren.",
        },
        {
          data: ()=>{
            return {
              check: async (auto,kmStand,marke,out,auto2)=>{
                return out===await auto2.getTankfuellungInProzent()+"%";
              },
            };
          },
          count: 3,
          info: "Die prozentuale Tankfüllung wird in der Konsole ausgegeben.",
        },
      ]
  },

  project: {
    name: "OO-Basics",
    clazzes: [
      {
        name: "Aufgabe",
        src: `void main( ){
  //hierhin kommt der Code:
  
}`
      },
      {
        isHidden: true,
        name: "Auto",
        src: `
          private boolean istGefahren=false;
          private int kmStand,tank;
          private String marke;
          Auto(String marke, int kmStand){
            this.marke=marke;
            this.kmStand=kmStand;
            /*JAVASCRIPT-CODE
            this.tank=$Exercise.tank?$Exercise.tank:58;
            */
          }
          int getKilometerStand(){
            return kmStand;
          }
          int getTankfuellungInProzent(){
            return tank;
          }
          void fahren(int km){
            istGefahren=true;
            kmStand+=km;
          }`
      }
    ]
  }
}

export default{
  components: {
    ClassDiagram
  },
  data() {
      return data;
  },
}
</script>