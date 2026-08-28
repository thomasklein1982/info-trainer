<template>
  <ExerciseBody :exercise="$data" :java="project">
    Gegeben ist die Klasse <Code inline>EAuto</Code> mit dem abgebildeten UML-Klassendiagramm.
    <span class="float-right">
      <ClassDiagram 
        :clazz="uml"
      />
    </span>
    <p>Dabei wird die Ladung in Prozent angegeben und die Geschwindigkeit in km/h.</p>
    In der <code>main</code>-Methode soll folgendes passieren:
    <ol>
      <li>Es sollen zwei neue E-Autos (der Marken "Ford" und "BMW") erzeugt werden und in den globalen Variablen <Code inline>ford</Code> bzw. <Code inline>bmw</Code> gespeichert werden.</li>
      <li>Der Ford soll auf 70 km/h beschleunigen und anschließend drei Stunden lang fahren.</li>
      <li>Der BMW soll auf 50 km/h beschleunigen, anschließend 30 Minuten lang fahren und dann auf 100 km/h beschleunigen und noch einmal zwei Stunden lang fahren. Dann soll er bremsen und stehen bleiben. Am Ende wird er um 40% aufgeladen.</li>
    </ol>
    Implementiere diese <code>main</code>-Methode.
  </ExerciseBody>
</template>

<script>
import ClassDiagram from '../../UmlClazz.vue';


export const data={
  id: "oo-eautos",
  uml: {
    name: "EAuto",
    attributes: [
      "- kmStand: double",
      "- ladung: double",
      "- marke: String",
      "- geschwindigkeit: double"
    ],
    methods: [
      "+ EAuto(marke: String)",
      "+ fahren(stunden: double)",
      "+ beschleunigenAuf(geschw: double)",
      "+ aufladen(int prozent): boolean"
    ]
  },
  title: "Die fahrenden Autos",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {
        a: await $new(Aufgabe)
      };
    },
    test: async (tc,init)=>{
      await init.a.main();
      let istFord=init.a.ford;
      let istBMW=init.a.bmw;
      let sollFord=await $Exercise.createInstance(EAuto,"Ford");
      let sollBMW=await $Exercise.createInstance(EAuto,"BMW");
      return (await tc.check(istFord,istBMW,sollFord,sollBMW));
    },
    testcases: [
        {
          data: ()=>{
            return {
              check: (istFord,istBMW,sollFord,sollBMW)=>{
                if(!istFord || istFord.marke!==sollFord.marke) return false;
                return true;
              },
            };
          },
          count: 1,
          info: 'In der globalen Variablen <code>ford</code> wird ein neues Auto der Marke <code>"Ford"</code> gespeichert.',
        },
        {
          data: ()=>{
            return {
              check: (istFord,istBMW,sollFord,sollBMW)=>{
                if(!istBMW || istBMW.marke!==sollBMW.marke) return false;
                return true;
              },
            };
          },
          count: 1,
          info: 'In der globalen Variablen <code>bmw</code> wird ein neues Auto der Marke <code>"BMW"</code> gespeichert.',
        },
        {
          data: ()=>{
            return {
              check: (istFord,istBMW,sollFord,sollBMW)=>{
                if(!istFord) return false;
                return (istFord.anzahlAktionen<=2 && istBMW.anzahlAktionen<=6);
              },
            };
          },
          count: 1,
          info: 'Die beiden Autos machen keine überflüssigen Aktionen.',
        },
        {
          data: ()=>{
            return {
              check: (istFord,istBMW,sollFord,sollBMW)=>{
                if(!istFord) return false;
                return (istFord.anzahlRichtigeAktionen>=1);
              },
            };
          },
          count: 1,
          info: 'Der Ford hat zuerst auf 70 kmh beschleunigt.',
        },
        {
          data: ()=>{
            return {
              check: (istFord,istBMW,sollFord,sollBMW)=>{
                if(!istFord) return false;
                return (istFord.anzahlRichtigeAktionen>=2);
              },
            };
          },
          count: 1,
          info: 'Der Ford ist anschließend drei Stunden lang gefahren.',
        },
        {
          data: ()=>{
            return {
              check: (istFord,istBMW,sollFord,sollBMW)=>{
                if(!istBMW) return false;
                return (istBMW.anzahlRichtigeAktionen>=1);
              },
            };
          },
          count: 1,
          info: 'Der BMW hat zuerst auf 50 kmh beschleunigt.',
        },
        {
          data: ()=>{
            return {
              check: (istFord,istBMW,sollFord,sollBMW)=>{
                if(!istBMW) return false;
                return (istBMW.anzahlRichtigeAktionen>=2);
              },
            };
          },
          count: 1,
          info: 'Der BMW ist danach 30 min lang gefahren.',
        },
        {
          data: ()=>{
            return {
              check: (istFord,istBMW,sollFord,sollBMW)=>{
                if(!istBMW) return false;
                return (istBMW.anzahlRichtigeAktionen>=3);
              },
            };
          },
          count: 1,
          info: 'Der BMW hat danach auf 100 kmh beschleunigt.',
        },
        {
          data: ()=>{
            return {
              check: (istFord,istBMW,sollFord,sollBMW)=>{
                if(!istBMW) return false;
                return (istBMW.anzahlRichtigeAktionen>=4);
              },
            };
          },
          count: 1,
          info: 'Der BMW ist danach zwei Stunden lang gefahren.',
        },
        {
          data: ()=>{
            return {
              check: (istFord,istBMW,sollFord,sollBMW)=>{
                if(!istBMW) return false;
                return (istBMW.anzahlRichtigeAktionen>=5);
              },
            };
          },
          count: 1,
          info: 'Der BMW hat danach gebremst und ist stehen geblieben.',
        },
        {
          data: ()=>{
            return {
              check: (istFord,istBMW,sollFord,sollBMW)=>{
                if(!istBMW) return false;
                return (istBMW.anzahlRichtigeAktionen>=6);
              },
            };
          },
          count: 1,
          info: 'Der BMW hat danach um 40% aufgeladen.',
        },
      ]
  },

  project: {
    name: "OO-E-Autos",
    clazzes: [
      {
        name: "Aufgabe",
        readOnlyLines: [1,2,3,-1],
        src: `EAuto ford, bmw;

$void main(){
  //hierhin kommt der Code:
  
}`
      },
      {
        isHidden: true,
        name: "EAuto",
        src: `
          private int anzahlRichtigeAktionen=0;
          private int anzahlAktionen=0;
          private boolean istGefahren=false;
          private double kmStand,ladung;
          private String marke;
          private double geschwindigkeit;
          EAuto(String marke){
            this.marke=marke;
            this.kmStand=0;
            this.geschwindigkeit=0;
            this.ladung=100;
          }
          void beschleunigenAuf(double geschw){
            anzahlAktionen++;
            if(marke=="Ford"){
              if(anzahlAktionen==1){
                if(Math.abs(geschw-70)<0.0000001){
                  anzahlRichtigeAktionen++;
                }
              }
            }else{
              if(anzahlAktionen==1){
                if(Math.abs(geschw-50)<0.0000001){
                  anzahlRichtigeAktionen++;
                }
              }
              if(anzahlAktionen==3){
                if(Math.abs(geschw-100)<0.0000001){
                  anzahlRichtigeAktionen++;
                }
              }
              if(anzahlAktionen==5){
                if(Math.abs(geschw-0)<0.0000001){
                  anzahlRichtigeAktionen++;
                }
              }
            }
            geschwindigkeit=geschw;
            if(geschwindigkeit<0) geschwindigkeit=0;
          }
          private double getVerbrauchProKm(){
            if(geschwindigkeit==0) return 0;
            if(geschwindigkeit<=40) return geschwindigkeit*0.08;
            if(geschwindigkeit<=60) return geschwindigkeit*0.1;
            if(geschwindigkeit<=80) return geschwindigkeit*0.12;
            if(geschwindigkeit<=100) return geschwindigkeit*0.15;
            if(geschwindigkeit<=120) return geschwindigkeit*0.25;
            return geschwindigkeit*0.4;
          }
          void fahren(double stunden){
            anzahlAktionen++;
            if(marke=="Ford"){
              if(anzahlAktionen==2){
                if(Math.abs(stunden-3)<0.0000001){
                  anzahlRichtigeAktionen++;
                }
              }
            }else{
              if(anzahlAktionen==2){
                if(Math.abs(stunden-0.5)<0.000001){
                  anzahlRichtigeAktionen++;
                }
              }
              if(anzahlAktionen==4){
                if(Math.abs(stunden-2)<0.000001){
                  anzahlRichtigeAktionen++;
                }
              }
            }
            istGefahren=true;
            double km=stunden*geschwindigkeit;
            double verbrauchProKm=getVerbrauchProKm();
            double verbrauch=(km*verbrauchProKm);
            if(verbrauch>ladung){
              verbrauch=ladung;
              km=verbrauch/verbrauchProKm;
              ladung=0;
            }else{
              ladung-=verbrauch;
            }
            kmStand+=km;
          }
          void aufladen(double prozent){
            anzahlAktionen++;
            if(marke=="BMW"){
              if(anzahlAktionen==6){
                if(Math.abs(prozent-40)<0.000001){
                  anzahlRichtigeAktionen++;
                }
              }
            }
            if(prozent<0) return;
            ladung+=prozent;
            if(ladung>100) ladung=100;
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