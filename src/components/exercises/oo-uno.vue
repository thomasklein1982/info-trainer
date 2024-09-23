<template>
  <ExerciseBody :exercise="$data" :java="project">
    Es soll das Kartenspiel Uno (teilweise) umgesetzt werden. Gegeben ist das folgende UML-Klassendiagramm.
    <div style="">
      <ClassDiagram
        style="width: 14cm" 
        :clazz="clazzes[0]"
      />
    </div>
    
  </ExerciseBody>
</template>

<script>
import ClassDiagram from '../ClassDiagram.vue';
import CodeMirror from '../code-mirror.vue';


export const data={
  id: "oo-uno",
  clazzes: [
    {
      name: "Kartenstapel",
      style: {
        width: '4cm',
        right: '10cm',
        top: 0
      },
      attributes: [
        "- anzahlKarten: int",
      ],
      methods: [
        "+ Kartenstapel()",
        "+ istLeer(): boolean",
        "+ mischen(int n)",
        "+ ziehen(): Karte",
        "+ drauflegen(Karte k)"
      ]
    },
    {
      name: "UnoKarte",
      style: {
        width: '4cm',
        left: '10cm',
        top: 0
      },
      attributes: [
        "- farbe: String",
        "- art: String"
      ],
      methods: [
        "+ UnoKarte(String farbe, String art)",
        "+ passtAuf(Karte k): boolean"
      ]
    }
  ],
  connections: [
    {
      type: "aggregation",
      from: "Kartenstapel",
      to: "UnoKarte"
    }
  ],
  title: "Ein Kartenstapel",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {
        a: await $new(Aufgabe)
      };
    },
    test: async (tc,init)=>{
      $Exercise.clearConsole();
      return false;
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
        src: `Auto auto(String marke, int kmStand){
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