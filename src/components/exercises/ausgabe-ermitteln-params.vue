<template>
  <ExerciseBody :exercise="$data">
    Ermittle die Ausgabe, die das Programm machen wird, wenn es gestartet wird.
    <template #exercise>
      <Code v-if="showCode">{{ code }}</Code>
      <ConsoleInputCheck :task="tasks[0]"/>
    </template>
  </ExerciseBody>
</template>

<script>
import { ThemeService } from '@primevue/themes';
import { difficulty } from '../../App.vue';
import Prism from 'prismjs';
import { nextTick } from 'vue';
import { createMethodOutputExerciseCode } from '../../other/createMethodOutputExerciseCode';



export const data={
  id: "ausgabe-ermitteln-params",
  title: "Was wird ausgegeben? (mit Parametern)",
  showCode: true,
  tasks: [
    {
      
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
  $call:1($int,$int);
  System.out.println($int);
  $call:2($int,$int);
  System.out.println($int);
  $call:1($int,$int);
            
}`,
          f(out,methods){
            methods[1].f(out,methods,this.ints[0],this.ints[1]);
            out.push(this.ints[2]);
            methods[2].f(out,methods, this.ints[3], this.ints[4]);
            out.push(this.ints[5]);
            methods[1].f(out,methods,this.ints[6],this.ints[7]);
          }
        },
        {
          code: `$void $name(int x, int y){
  int a = y - x ;
  System.out.println("$out"+a);
}`,
          f(out,methods,x,y){
            let a= y-x;
            out.push(this.output[0]+a);
          }
        },
        {
          code: `$void $name(int x, int y){
  int a = x + 1;
  a+1;
  a++;
  System.out.println(a);
}`,
          f(out, methods,x,y){
            let a=x+1;
            a++;
            out.push(a);
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