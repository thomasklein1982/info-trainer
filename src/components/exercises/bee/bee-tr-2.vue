<template>
  <ExerciseBody :exercise="$data" :java="project">
    <BeePreview :world="world" width="14rem" style="float: right">
      <GameObject image="bee" text="lisa" pos="B"/>
      <GameObject image="" text="11" pos="1"/>
      <GameObject image="" text="*" pos="-"/>
      <GameObject image="" text="3" pos="2"/>
      <GameObject image="" text="=" pos="="/>
      <GameObject image="" text="" pos="R" style="background-color: red"/>
    </BeePreview>
    Implementiere die Methode <Code inline>void program( Bee lisa )</Code>, die das folgende Problem löst:
    <p>Zwischen den beiden Zahlen steht ein <strong>beliebiges Rechenzeichen</strong>: <strong>+</strong>, <strong>-</strong>, <strong>*</strong> oder <strong>/</strong>.Die Biene Lisa soll die beiden Zahl gemäß des Rechenzeichens verrechnen und das Ergebnis auf das rote Feld schreiben.</p>
  </ExerciseBody>
</template>

<script>
import { Random } from '../../../other/random';
import { createBeeClazz, GameObjectClazz, GameWorldClazz } from './clazzes';
import FlowerJSON from "./graphics/flower.json";
import BeeJSON from "./graphics/bee.json";
import GameObject from '../../game-object.vue';
import BeePreview from '../../bee-preview.vue';


export const data={
  id: "bee-tr-2",
  cheats: ["bee"],
  title: "Biene Lisa wird zum Taschenrechner!",
  world: [
    "......",
    "B1-2=R",
    "......"
  ],
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {
        a: await $new(Main)
      }
    },
    testcases: [
      {
        info: "Das richtige Ergebnis steht auf dem roten Feld, wenn es eine Additionsaufgabe (+) ist.",
        data: {
          op: "+"
        },
        count: 5
      },
      {
        info: "Das richtige Ergebnis steht auf dem roten Feld, wenn es eine Subtraktionsaufgabe (-) ist.",
        data: {
          op: "-"
        },
        count: 5
      },
      {
        info: "Das richtige Ergebnis steht auf dem roten Feld, wenn es eine Multiplikationsaufgabe (*) ist.",
        data: {
          op: "*"
        },
        count: 5
      },
      {
        info: "Das richtige Ergebnis steht auf dem roten Feld, wenn es eine Divisionsaufgabe (/) ist.",
        data: {
          op: "/"
        },
        count: 5
      }
    ],
    test: async (tc,init)=>{
      let z1=$Exercise.random(10,100);
      let z2=$Exercise.random(10,100);
      let op=tc.op;
      let soll;
      if(op==="+") soll=z1+z2;
      else if(op==="-") soll=z1-z2;
      else if(op==="*") soll=z1*z2;
      else{ 
        let a=z1*z2;
        soll=z2;
        z2=z1;
        z1=a;
      }
      let infos=await init.a.$appPreviewMethod({seed: 1}, z1, z2, op);
      infos.bee.toMaxSpeed();
      await init.a.program(infos.bee);

      let res=await infos.rot.getValue();
      return (res===soll+"");
    }
  },
  project: {
    name: "Bee",
    slowMode: true,
    exerciseData: {
      showAppPreviewWhenNotRunning: true,
      seed: 100,
      seedChange: 1
    },
    clazzes: [
      {
        name: "Main",
        readOnlyLines: [1,-1],
        uml: false,
        hiddenMethods: [
          {
            name: "$realMainMethod",
            jsCode: `async $realMainMethod(exerciseData){
              let infos=await this.$appPreviewMethod(exerciseData);
              await this.program(infos.bee);
            }`
          },
          {
            name: "$appPreviewMethod",
            jsCode: `async $appPreviewMethod(exerciseData, z1, z2, op){
              let defString=[
    "......",
    "B1-2=R",
    "......"
  ];
              let g=await GameWorld.createFromDefString(defString,0,0);
              let bee=await $App.asyncFunctionCall(new Bee(),'$constructor',[null,"lisa",g]);
              await bee.insertAt("B");
              let random=new Random();
              await random.$constructor(exerciseData.seed);
              if(z1===undefined){
                let ops=["+","-","*","/"];
                z1=await random.nextInt(9)+1;
                z2=await random.nextInt(9)+1;
                op=ops[exerciseData.seed%ops.length];
                
                console.log("taschenrechner",z1,z2,op);
                if(op==="/"){
                  z1*=z2;
                }
              }
              let f1=await g.getNamedField("1");
              await f1.setValue(z1+"");
              let f=await g.getNamedField("-");
              await f.setValue("+");
              f=await g.getNamedField("=");
              await f.setValue("=");
              let f2=await g.getNamedField("2");
              await f2.setValue(z2+"");
              let rot=await g.getNamedField("R");
              await rot.setStyle("background-color","red");
              let opFeld=await g.getNamedField("-");
              await opFeld.setValue(op);
              return {
                bee, gameworld: g, rot, f1, f2, z1, z2, op, opFeld
              };
            }`
          }
        ],
        src: `$void program( Bee lisa ){
  
}`
      },
      createBeeClazz(),
      GameObjectClazz,
      GameWorldClazz  
    ]
  }
};

export default{
  components: {
    GameObject, BeePreview
  },
  data() {
      return data;
  },
}
</script>