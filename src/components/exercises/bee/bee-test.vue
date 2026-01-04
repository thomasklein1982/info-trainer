<template>
  <ExerciseBody :exercise="$data" :java="project">
    Programmiere die Biene so, dass sie die Blume erreicht.
  </ExerciseBody>
</template>

<script>
import { GameObjectClazz, createGameWorldClazz } from './clazzes';


export const data={
  id: "bee-test",
  title: "Die Biene muss zur Blume",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {
        a: await $new(Main)
      }
    },
    testcases: [
        {
          info: "Die Biene hat die Blume erreicht."
        }
      ],
    test: async (tc,init)=>{
      console.log("test",init.a);
      
      await init.a.$appPreviewMethod();
      console.log(init.a.bee.bee);
      let speed=init.a.bee.bee.speed;
      init.a.bee.bee.speed=100;
      await init.a.main();
      let s=await init.a.bee.onFlower();
      if(!s) alert("Die Biene hat die Blume nicht erreicht.");
      init.a.bee.bee.speed=speed;
      return s;
    }
  },
  project: {
    name: "Bee",
    constraints: {
      
    },
    clazzes: [
      {
        name: "Main",
        hiddenAttributes: [
          {
            name: "bee",
            type: {
              name: "Bee",
              dimension: 0
            }
          }
        ],
        hiddenMethods: [
          {
            name: "$realMainMethod",
            jsCode: `async $realMainMethod(){
              await this.$appPreviewMethod();
              await this.main();
            }`
          },
          {
            name: "$appPreviewMethod",
            jsCode: `async $appPreviewMethod(){
              let g=await $App.asyncFunctionCall(new GameWorld(),'$constructor',[]);
              this.bee=await $App.asyncFunctionCall(new Bee(),'$constructor',[null,g]);
            }`
          }
        ],
        constraints: {
          maxStatementCount: 6
        },
        src: `$void main(){
  bee.move();
}`
      },
      {
        name: "Bee",
        isHidden: true,
        visibility: "uml",//"tab-code-uml"
        src: `private Bee2 bee;
  private boolean onFlower(){
    return bee.getFieldType()=="flower";
  }
  Bee( GameWorld world ) {
    this.bee=new Bee2(world);
  }
  /*Bewegt die Biene um 1 Feld*/
  void move( ) {
    bee.move();
    
  }
  
  void turnLeft( ) {
    bee.turnLeft();
  }
  
  void turnRight( ) {
    bee.turnRight();
  }
  
  String scan( ) {
    return bee.scan();
  }
  
  void setSpeed(int s){
    bee.speed=s;
  }

  
`
      },
      GameObjectClazz,
      createGameWorldClazz([
        "....",
        ".WWF",
        ".WWW",
        "B...",
      ], {width: 3, height: 2})  
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