<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Biene Lisa muss zur Blume fliegen.
  </ExerciseBody>
</template>

<script>
import { Random } from '../../../other/random';
import { BeeClazz, GameWorldClazz } from './clazzes';
import FlowerJSON from "./graphics/flower.json";


export const data={
  id: "bee-target",
  title: "Biene Lisa muss zur Blume",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {
        a: await $new(Main)
      }
    },
    testcases: [
        {
          info: "Biene Lisa befindet sich am Programmende auf der Blume."
        }
      ],
    test: async (tc,init)=>{
      let n = $Exercise.random(10,50);
      let infos=await init.a.$appPreviewMethod();
      infos.bee.bee.maxSpeed=true;
      await infos.bee.bee.ui.setStyle("transition","");
      await init.a.program(infos.bee,n);
      console.log("infos",infos);
      let flower=await infos.gameworld.getNamedField("F");
      let pos=await infos.bee.bee.getField();
      console.log(flower,pos);
      return (pos===flower);
    }
  },
  project: {
    name: "Bee",
    exerciseData: {
      showAppPreviewWhenNotRunning: true
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
        src: `private Bee2 bee;
  private Bee( GameWorld world ) {
    this.bee=new Bee2("lisa", world);
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