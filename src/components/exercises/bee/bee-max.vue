<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Biene soll alle <Code inline>n</Code> ganzen Zahlen addieren und das Ergebnis hinter die letzte Zahl schreiben.
  </ExerciseBody>
</template>

<script>
import { Random } from '../../../other/random';
import { BeeClazz, GameWorldClazz } from './clazzes';


export const data={
  id: "bee-max",
  title: "Die Biene addiert alle Zahlen",
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
      infos.bee.bee.maxSpeed=true;
      await infos.bee.bee.ui.setStyle("transition","");
      await init.a.program(infos.bee,n);
      console.log("infos",infos);
      let lastField=await infos.gameworld.getField(n+1,0);
      console.log(lastField,infos.sum);
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
              let bee=await $App.asyncFunctionCall(new Bee(),'$constructor',[null,g]);
              return {
                bee, gameworld: g, n, sum
              };
            }`
          }
        ],
        constraints: {
          maxStatementCount: 6
        },
        src: `$void program( Bee bee, int n ){
  //hierhin kommt der Code

}`
      },
      {
        name: "Bee",
        isHidden: true,
        uml: true,
        src: `private Bee2 bee;
  private boolean onFlower(){
    return bee.getFieldType()=="flower";
  }
  private Bee( GameWorld world ) {
    this.bee=new Bee2(world);
  }
  /*Bewegt die Biene um 1 Feld*/
  void move( ) {
    bee.move();
    
  }

  String read(){
    return bee.read();
  }
  
  void turnLeft( ) {
    bee.turnLeft();
  }
  
  void turnRight( ) {
    bee.turnRight();
  }
  
  void print( Object text ) {
    bee.print(text);
  }
  
  void setSpeed(int s){
    bee.speed=s;
  }

  
`
      },
      BeeClazz,
      GameWorldClazz  
    ]
  }
};

export default{
  components: {
    
  },
  data() {
      return data;
  },
}
</script>