<template>
  <ExerciseBody :exercise="$data" :java="project">
    Programmiere die Biene so, dass sie die Blume erreicht.
  </ExerciseBody>
</template>

<script>
import { BeeClazz, createGameWorldClazz } from './clazzes';


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
      // console.log("test");
      await init.a.$realMainMethod();
      console.log("after realMain");
      let s=await init.a.bee.onFlower();
      console.log("on flower",s);
      return s;
    }
  },
  project: {
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
              let g=await $App.asyncFunctionCall(new GameWorld(),'$constructor',[]);
              this.bee=await $App.asyncFunctionCall(new Bee(),'$constructor',[null,g]);
              await this.main();
            }`
          }
        ],
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
  
`
      },
      BeeClazz,
      createGameWorldClazz([
        "....",
        ".WWF",
        ".WWW",
        "B..."
      ])  
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