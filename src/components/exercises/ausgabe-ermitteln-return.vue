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
  id: "ausgabe-ermitteln-return",
  title: "Was wird ausgegeben? (mit Rückgabe)",
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
  System.out.println("$int");
  int x = $call:1($int);
  int y = $call:2($int,$int);
  System.out.println(x);
  System.out.println(y);
            
}`,
          f(out,methods){
            out.push(this.ints[0]);
            let x=methods[1].f(out,methods,this.ints[1]);
            let y=methods[2].f(out,methods, this.ints[2], this.ints[3]);
            out.push(x);
            out.push(y);
          }
        },
        {
          code: `int $name(int a){
  int b = a * 2 ;
  System.out.println( a-1 );
  return b;
}`,
          f(out,methods,a){
            let b= a*2;
            out.push(a-1);
            return b;
          }
        },
        {
          code: `int $name(int a, int b){
  return a * ( b + 1 );
}`,
          f(out, methods,a,b){
            return a*(b+1);
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