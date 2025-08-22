<template>
  <ExerciseBody :exercise="$data" :java="project">
    Gegeben ist die Klasse <Code inline>Auto</Code> mit dem abgebildeten UML-Klassendiagramm.
    <span class="float-right">
      <ClassDiagram 
        :clazz="uml"
      />
    </span>
    Die Methode <Code no-numbers>Auto auto(String automarke, int km)</Code> soll nacheinander die folgenden Dinge tun:
    <ol>
      <li>Es soll ein neues Auto erzeugt werden mit der angegebenen Marke <Code inline>automarke</Code> und dem angegebenen Kilometerstand <Code inline>km</Code>.</li>
      <li>Das Auto soll 100 km weit fahren.</li>
      <li>Es soll die Tankfüllung in Prozent in den Konsole ausgegeben werden (inklusive Prozentzeichen, also z. B. <code>76%</code>).</li>
      <li>Das Auto soll zurückgegeben werden.</li>
    </ol>
    Implementiere diese Methode.
  </ExerciseBody>
</template>

<script>
import ClassDiagram from '../../UmlClazz.vue';


export const data={
  id: "oo-basics",
  uml: {
    name: "Auto",
    attributes: [
      "- kmStand: int",
      "- tank: int",
      "- marke: String"
    ],
    methods: [
      "+ Auto(marke: String, kmStand: int)",
      "+ fahren(km: int)",
      "+ getKilometerStand(): int",
      "+ getTankfuellungInProzent(): int"
    ]
  },
  title: "Das fahrende Auto",
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
        src: `Auto auto(String automarke, int km){
  //hierhin kommt der Code:
  
}

$void main(){
  auto("VW", 438);
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