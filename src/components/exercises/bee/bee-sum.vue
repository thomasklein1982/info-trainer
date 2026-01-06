<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Biene Konrad soll alle <Code inline>n</Code> ganzen Zahlen addieren und das Ergebnis hinter die letzte Zahl schreiben.
    <p>
    <BeePreview :world="world" width="30rem">
      <GameObject image="bee" text="konrad" pos="B"/>
      <GameObject text="4" pos="1" align="center"/>
      <GameObject text="11" pos="2" align="center"/>
      <GameObject text="3" pos="3" align="center"/>
      <GameObject text="..." pos="4" align="center"/>
      <GameObject text="9" pos="5" align="center"/>
    </BeePreview>
    </p>
    <Hint>Die Anzahl der Zahlen <Code inline>n</Code> ist vorgegeben. Das Programm soll für jeden Wert von <Code inline>n</Code> &ge; 1 funktionieren.</Hint>
  </ExerciseBody>
</template>

<script>
import { Random } from '../../../other/random';
import { createBeeClazz, GameObjectClazz, GameWorldClazz } from './clazzes';
import BeePreview from '../../bee-preview.vue';
import GameObject from '../../game-object.vue';

export const data={
  id: "bee-sum",
  title: "Die Biene addiert alle Zahlen",
  world: [
    "B12345."
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
          info: "Das richtige Ergebnis steht auf dem Feld rechts von der letzten Zahl."
        }
      ],
    test: async (tc,init)=>{
      let n = $Exercise.random(10,50);
      let infos=await init.a.$appPreviewMethod({seed: $Exercise.random(1000,100000)},n);
      infos.bee.toMaxSpeed();
      await init.a.program(infos.bee,n);
      let lastField=await infos.gameworld.getField(n+1,0);
      return (lastField.getValue()===infos.sum+"");
    }
  },
  project: {
    name: "Bee",
    exerciseData: {
      showAppPreviewWhenNotRunning: true,
      seed: 100
    },
    clazzes: [
      {
        name: "Main",
        uml: false,
        hiddenMethods: [
          {
            name: "$realMainMethod",
            jsCode: `async $realMainMethod(exerciseData){
              let infos=await this.$appPreviewMethod(exerciseData);
              await this.program(infos.bee, infos.n);
            }`
          },
          {
            name: "$appPreviewMethod",
            jsCode: `async $appPreviewMethod(exerciseData, n){
              let random=new Random();
              await random.$constructor(exerciseData.seed);
              if(n===undefined){
                n=await random.nextInt(10)+10;
              }
              let defString="B";
              for(let i=0;i<n;i++){
                defString+=".";
              }
              defString+=".";
              let g=await GameWorld.createFromDefString([defString], 4, 1);
              
              let numbers=[];
              let sum=0;
              for(let i=0;i<n;i++){
                let z=await random.nextInt(100)+1;
                numbers.push(z);
                let c=await g.getField(i+1,0);
                c.setValue(z+"");
                sum+=z;
              }
              let bee=await $App.asyncFunctionCall(new Bee(),'$constructor',[null,"konrad",g]);
              await bee.insertAt("B");
              return {
                bee, gameworld: g, n, sum
              };
            }`
          }
        ],
        constraints: {
          maxStatementCount: 6
        },
        src: `$void program( Bee konrad, int n ){
  //hierhin kommt der Code
  
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
    BeePreview, GameObject
  },
  data() {
      return data;
  },
}
</script>