<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Biene Lisa muss den Text, der auf dem gelben Feld steht, auf das rote Feld übertragen.
  </ExerciseBody>
</template>

<script>
import { Random } from '../../../other/random';
import { BeeClazz, GameWorldClazz } from './clazzes';
import FlowerJSON from "./graphics/flower.json";


export const data={
  id: "bee-copy",
  title: "Die Kopier-Biene",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {
        a: await $new(Main)
      }
    },
    testcases: [
      {
        info: "Auf dem roten Feld steht am Programmende derselbe Text wie auf dem gelben Feld.",
        count: 5
      }
    ],
    test: async (tc,init)=>{
      let index = tc.$run.index;
      let infos=await init.a.$appPreviewMethod({seed: 1},index);
      infos.bee.bee.maxSpeed=true;
      await infos.bee.bee.ui.setStyle("transition","");
      await init.a.program(infos.bee);
      let res=await infos.rot.getValue();
      return (infos.word===res);
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
              await this.program(infos.bee);
            }`
          },
          {
            name: "$appPreviewMethod",
            jsCode: `async $appPreviewMethod(exerciseData, index){
              let random=new Random();
              await random.$constructor(exerciseData.seed);
              let words=["Honig","Maja","Willy","Wabe","Flug"];
              if(index===undefined){
                index=await random.nextInt(words.length);
              }
              let word=words[index];
              let defString=[
                "WWWW",
                "B.GW",
                "W..W",
                "W.RW",
                "WWWW"
              ];
              let g=await GameWorld.createFromDefString(defString, 4, 5);
              let bee=await $App.asyncFunctionCall(new Bee(),'$constructor',[null,g]);
              await g.addAt(bee.bee.ui,"B");
              let gelb=await g.getNamedField("G");
              let rot=await g.getNamedField("R");
              await gelb.setStyle("background-color","yellow");
              await gelb.setValue(word);
              await rot.setStyle("background-color","red");
              return {
                bee, gameworld: g, word, rot
              };
            }`
          }
        ],
        src: `$void program( Bee lisa ){
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