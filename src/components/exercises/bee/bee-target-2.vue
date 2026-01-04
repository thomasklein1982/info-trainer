<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Biene Lisa muss zur Blume fliegen.
  </ExerciseBody>
</template>

<script>
import { Random } from '../../../other/random';
import { GameObjectClazz, GameWorldClazz } from './clazzes';
import FlowerJSON from "./graphics/flower.json";


export const data={
  id: "bee-target-2",
  title: "Biene Lisa fliegt zu mehreren Blumen",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {
        a: await $new(Main)
      }
    },
    testcases: [
      {
        info: "Biene Lisa erreicht die Blume links."
      },
      {
        info: "Biene Lisa erreicht die Blume rechts oben."
      },
    ],
    test: async (tc,init)=>{
      let infos=await init.a.$appPreviewMethod();
      infos.bee.bee.toMaxSpeed();
      await init.a.program(infos.bee);
      let flower=await infos.gameworld.getNamedField("F");
      let pos=await infos.bee.bee.getField();
      return (pos===flower);
    }
  },
  project: {
    name: "Bee",
    exerciseData: {
      showAppPreviewWhenNotRunning: true
    },
    constraints: {
      maxStatementCount: 6
    },
    clazzes: [
      {
        name: "Main",
        uml: false,
        hiddenMethods: [
          {
            name: "$realMainMethod",
            jsCode: `async $realMainMethod(exerciseData){
              let infos=await this.$appPreviewMethod();
              await this.program(infos.bee);
            }`
          },
          {
            name: "$appPreviewMethod",
            jsCode: `async $appPreviewMethod(){
              
              let defString=[
                "....",
                ".WWF",
                ".WWW",
                "B...",
              ];
              let g=await GameWorld.createFromDefString(defString, 4, 4);
              let flower=await $App.asyncFunctionCall(new JImage(),'$constructor',["${FlowerJSON.dataurl}"]);
              await g.addAt(flower,"F");
              let bee=await $App.asyncFunctionCall(new Bee(),'$constructor',[null,g]);
              await g.addAt(bee.bee.ui,"B");
              await bee.bee.setTransition(true);
              return {
                bee, gameworld: g, flower
              };
            }`
          }
        ],
        src: `$void program( Bee lisa, int n ){
  //hierhin kommt der Code
  
}`
      },
      {
        name: "Bee",
        isHidden: true,
        uml: true,
        src: `private GameObject bee;
  private Bee( GameWorld world ) {
    this.bee=new GameObject("lisa", world, "${BeeJSON.dataurl}");
    bee.setImageSize(0.7,0.7);
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
    bee.setSpeed(s);
  }
`
      },
      GameObjectClazz,
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