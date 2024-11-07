<template>
  <ExerciseBody :exercise="$data" :java="project">
    Es soll die Klasse <Code inline>Person</Code> gemäß dem abgebildeten UML-Klassendiagramm implementiert werden.
    <span class="float-right">
      <UmlClazz 
        :clazz="uml"
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
      <li>Die Methode <Code inline>heiraten</Code> soll den Nachnamen der Person in den Nachnamen der Person <Code inline>ehepartner</Code> ändern, aber nur, wenn der zweite Parameter <Code inline>false</Code> ist.</li>
    </ol>
  </ExerciseBody>
</template>

<script>
import UmlClazz from '../../UmlClazz.vue';


export const data={
  id: "oo-person",
  uml: {
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
      "+ heiraten(Person ehepartner, boolean behalteNachname)"
    ]
  },
  title: "Person",
  check: {
    init: async ()=>{
      let personendaten=[
        {
          nachname: "Müller",
          vorname: "Eva",
          alter: 17,
          groesse: 1.63,
          gewicht: 56.4
        },
        {
          nachname: "Abelmann",
          vorname: "Lutz",
          alter: 18,
          groesse: 2.03,
          gewicht: 121.2
        },
        {
          nachname: "Turing",
          vorname: "Alan",
          alter: 36,
          groesse: 1.84,
          gewicht: 77.6
        },
      ];
      let personen=[];
      for(let i=0;i<personendaten.length;i++){
        let p=personendaten[i];
        personen.push(await $Exercise.createInstance(Person, p.nachname,p.vorname,p.alter,p.groesse, p.gewicht));
      }
      let c=$object_getClass(personen[0]);
      let res=$Exercise.compareClass(c,{
        attributes: {
          nachname: {
            vis: "private",
            type: "String"
          },
          vorname: {
            vis: "private",
            type: "String"
          },
          alter: {
            vis: "private",
            type: "int"
          },
          groesse: {
            vis: "private",
            type: "double"
          },
          gewicht: {
            vis: "private",
            type: "double"
          },
        },
        methods: {
          Person: {
            vis: "public",
            args: [
              {
                name: "nachname",
                type: "String"
              },
              {
                name: "vorname",
                type: "String"
              },
              {
                name: "alter",
                type: "int"
              },
              {
                name: "groesse",
                type: "double"
              },
              {
                name: "gewicht",
                type: "double"
              }
            ]
          },
          vollerName: {
            vis: "public",
            args: [
              
            ],
            type: "String"
          },
          sage: {
            vis: "public",
            args: [
              {
                name: "text",
                type: "String"
              }
            ]
          },
          istErwachsen: {
            vis: "public",
            args: [],
            type: "boolean"
          },
          bmi: {
            vis: "public",
            args: [
              
            ],
            type: "double"
          },
          heiraten: {
            vis: "public",
            args: [
              {
                name: "ehepartner",
                type: "Person"
              },
              {
                name: "behalteNachname",
                type: "boolean"
              }
            ]
          }
        }
      });
      console.log("compare",res);
      return {
        personen, personendaten, declaration: res
      }
    },
    test: async (tc,init)=>{
      return await tc.check(init);
    },
    testcases: [
      {
        data: ()=>{
          return {
            check: (data)=>{
              if(data.declaration.length>0){
                return data.declaration.join("\n");
              }else{
                return true;
              }
            },
          };
        },
        count: 1,
        info: "Alle Attribute und Methoden wurden korrekt deklariert.",
      },
      {
        data: ()=>{
          return {
            check: (data)=>{
              for(let i=0;i<data.personen.length;i++){
                let p=data.personen[i];
                let pd=data.personendaten[i];
                for(let a in pd){
                  if(p[a]!==pd[a]){
                    return false;
                  }
                }
              }
              return true;
            },
          };
        },
        count: 1,
        info: "Der Konstruktor wurde korrekt implementiert.",
      },
      {
        data: ()=>{
          return {
            check: async (data)=>{
              for(let i=0;i<data.personen.length;i++){
                let p=data.personen[i];
                let pd=data.personendaten[i];
                let vn=await p.vollerName();
                if(vn!==pd.vorname+" "+pd.nachname){
                  return false;
                }
              }
              return true;
            },
          };
        },
        count: 1,
        info: "Die Methode 'vollerName' wurde korrekt implementiert.",
      },
      {
        data: ()=>{
          return {
            check: async (data)=>{
              for(let i=0;i<data.personen.length;i++){
                let p=data.personen[i];
                let pd=data.personendaten[i];
                $Exercise.clearConsole();
                await p.sage("ghdgdshg"+i);
                let out=$Exercise.getConsoleContent().join("");
                if(out!==pd.vorname+" "+pd.nachname+": ghdgdshg"+i){
                  return false;
                }
              }
              return true;
            },
          };
        },
        count: 1,
        info: "Die Methode 'sage' wurde korrekt implementiert.",
      },
      {
        data: ()=>{
          return {
            check: async (data)=>{
              for(let i=0;i<data.personen.length;i++){
                let p=data.personen[i];
                let pd=data.personendaten[i];
                let erw=await p.istErwachsen();
                if(pd.alter<18 && erw || pd.alter>=18 && !erw){
                  return false;
                }
              }
              return true;
            },
          };
        },
        count: 1,
        info: "Die Methode 'istErwachsen' wurde korrekt implementiert.",
      },
      {
        data: ()=>{
          return {
            check: async (data)=>{
              for(let i=0;i<data.personen.length;i++){
                let p=data.personen[i];
                let pd=data.personendaten[i];
                let bmi=await p.bmi();
                let bmiSoll=pd.gewicht/(pd.groesse*pd.groesse);
                if(Math.abs(bmi-bmiSoll)>0.00001){
                  return false;
                }
              }
              return true;
            },
          };
        },
        count: 1,
        info: "Die Methode 'bmi' wurde korrekt implementiert.",
      },
      {
        data: ()=>{
          return {
            check: async (data)=>{
              for(let i=0;i<data.personen.length;i++){
                let p=data.personen[i];
                let pd=data.personendaten[i];
                let ehe=await $Exercise.createInstance(Person,"Bahsndha","Paul",23,1,1);
                let behalten=i%2===1;
                await p.heiraten(ehe,behalten);
                let soll=behalten? pd.nachname:ehe.nachname;
                console.log("nachnamen",soll,p.nachname);
                if(soll!==p.nachname){
                  return false;
                }
              }
              return true;
            },
          };
        },
        count: 1,
        info: "Die Methode 'heiraten' wurde korrekt implementiert.",
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
  p1.heiraten( p2, true );
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
    UmlClazz
  },
  data() {
      return data;
  },
}
</script>