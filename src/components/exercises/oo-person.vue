<template>
  <ExerciseBody :exercise="$data" :java="project">
    Es soll die Klasse <Code inline>Person</Code> gemäß dem abgebildeten UML-Klassendiagramm implementiert werden.
    <span class="float-right">
      <ClassDiagram 
        :clazzes="clazzes"
      />
    </span>
    Außerdem sollen die folgenden Anmerkungen berücksichtigt werden:
    <ol>
      <li>Das Alter wird in Jahren angegegeben, die Größe in Metern und das Gewicht in kg.</li>
      <li>Die Methode <Code inline>sage</Code> soll den <Code inline>text</Code> zusammen mit dem vollständigen Namen in der Konsole ausgeben in der Form
      <ConsoleOutput>Vorname Nachname: text</ConsoleOutput></li>
      <li>Die Methode <Code inline>vollerName</Code> soll den vollständigen Namen in der Form 
        <ConsoleOutput>Vorname Nachname</ConsoleOutput>
      zurückgeben.</li>
      <li>Die Methode <Code inline>istErwachsen</Code> soll entscheiden, ob die Person erwachsen ist oder nicht.</li>
      <li>Die Methode <Code inline>bmi</Code> soll den BMI (Body-Maß-Index) der Person berechnen und zurückgeben.</li>
      <li>Die Methode <Code inline>heiraten</Code> soll den Nachnamen der Person in den Nachnamen der Person <Code inline>ehepartner</Code> ändern, aber nur, wenn der zweite Parameter <Code inline>true</Code> ist.</li>
    </ol>
  </ExerciseBody>
</template>

<script>
import ClassDiagram from '../ClassDiagram.vue';


export const data={
  id: "oo-person",
  clazzes: [
    {
      name: "Person",
      attributes: [
        "- nachname: String",
        "- vorname: String",
        "- alter: int",
        "- groesse: double",
        "- gewicht: double"
      ],
      methods: [
        "+ Person(nachname: String, vorname: String, alter: int, groesse: double, gewicht: double)",
        "+ vollerName(): String",
        "+ sage(String text)",
        "+ istErwachsen(): boolean",
        "+ bmi(): double",
        "+ heiraten(Person ehepartner, boolean behaeltNachname)"
      ]
    }
  ],
  title: "Person",
  check: {
    init: async ()=>{
      return {
        a: await $new(Aufgabe)
      };
    },
    test: async (tc,init)=>{
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
    name: "OO-Person",
    clazzes: [
      {
        name: "Main",
        src: `$void main(){
  Person p1 = new Person( "Lovelace", "Ada", 23,  1.67, 57.7);
  Person p2 = new Person( "Turing", "Alan", 31,  1.82, 73.2);
  p1.sage("Hallo!");
  System.out.println( p1.istErwachsen() );
  System.out.println( "BMI = " + p1.bmi() );
  p1.heiraten( p2, true )
  p1.sage("Tschüss!");
}`
      },
      {
        name: "Person",
        src: ``
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