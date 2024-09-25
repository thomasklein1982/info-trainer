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
import { nextTick } from 'vue';
import { createMethodOutputExerciseCode } from '../../../other/createMethodOutputExerciseCode';



export const data={
  id: "output-rec-1",
  title: "Was wird ausgegeben? (einfache Rekursion)",
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
  System.out.println( "$out" );
  int x = $call:1( $n$ );
  System.out.println( x );
}`,
          f(out,methods){
            out.push(this.output[0]);
            let x=methods[1].f(out,methods,this.values.n);
            out.push(x);
          }
        },
        {
          code: `int $name(int n){
  if ( n == 1 ){
    System.out.println( "$out" );
    return 1;
  }
  if ( n == 0 ) return 0;
  System.out.println( n );
  return n - $call:1( n - 2 );
}`,
          f(out,methods,n){
            if(n===1){
              out.push(this.output[0]);
              return 1;
            }
            if(n===0) return 0;
            out.push( n );
            return n - methods[1].f(out,methods,n-2);
          }
        }
      ];
      let n=Random.int(6,11);
      this.code=createMethodOutputExerciseCode(Random,methods, {n});
      
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