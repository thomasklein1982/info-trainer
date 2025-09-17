<template>
  <ExerciseBody :exercise="$data" inline>
    Ermittle die Ausgabe, die das Programm machen wird, wenn es gestartet wird.
    <template #exercise>
      <Code v-if="showCode">{{ code }}</Code>
      <ConsoleInputCheck :task="tasks[0]"/>
    </template>
  </ExerciseBody>
</template>

<script>
import { nextTick } from 'vue';
import { createMethodOutputExerciseCode } from '../../other/createMethodOutputExerciseCode';



export const data={
  id: "ausgabe-ermitteln",
  title: "Was wird ausgegeben? (mehrere Methoden)",
  showCode: true,
  tasks: [
    {
      points: 2
    }
  ],
  code: ""
}


export default{
  data() {
    return data;
  },
  methods: {
    create(Random, resArray){
      let methods=[
        {
          code: `$void main(){
  System.out.println("$out");
  $call:2();          
}`,
          f(out,methods){
            out.push(this.output[0]);
            methods[2].f(out,methods);
          }
        },
        {
          code: `$void $name(){
  System.out.println("$out");
  System.out.println("$out");
}`,
          f(out,methods){
            out.push(this.output[0]);
            out.push(this.output[1]);
          }
        },
        {
          code: `$void $name(){
  System.out.println("$out");
  $call:1();
  $call:1();
  System.out.println("$out");
}`,
          f(out, methods){
            out.push(this.output[0]);
            methods[1].f(out,methods);
            methods[1].f(out,methods);
            out.push(this.output[1]);
          }
        }
      ];
      this.code=createMethodOutputExerciseCode(Random,methods);
      
      let t=this.tasks[0];
      let out=[];
      methods[0].f(out,methods);
      t.solution=out.join("\n");
      t.checked=false;
      t.input="";
      t.correct=false;
      if(resArray && resArray[0]!==undefined){
        t.checked=true;
        t.correct=resArray[0];
        if(resArray[0]){
          this.input=t.solution;
        }
      }
      this.showCode=false;
      nextTick(()=>{
        this.showCode=true;
      });
    },
    check(){
      let resArray=[];
      let t=this.tasks[0];
      t.checked=true;
      resArray.push(t.correct);
      return resArray;
    }
  }
}
</script>