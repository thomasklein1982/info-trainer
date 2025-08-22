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
  id: "output-rec-2",
  title: "Was wird ausgegeben? (mehrfache Rekursion)",
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
  int r = $call:1( $n$, $m$ );
  System.out.println( r );
}`,
          f(out,methods){
            let r=methods[1].f(out,methods,this.values.n,this.values.m);
            out.push(r);
          }
        },
        {
          code: `int $name(int n, int m){
  if ( n < m ){
    System.out.println( "$out" );
    return n;
  }
  System.out.println( n + m );
  return $call:1( n - 2, m - 1 ) + $call:1( n + 1, m + 3 );
}`,
          f(out,methods,n,m){
            if(n<m){
              out.push(this.output[0]);
              return n;
            }
            out.push( n+m );
            return methods[1].f(out,methods,n-2,m-1)+methods[1].f(out,methods,n+1,m+3);
          }
        }
      ];
      let k=Random.int(2,4);
      let m=Random.int(6,11);
      let n=m+k;
      this.code=createMethodOutputExerciseCode(Random,methods, {n,m});
      
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