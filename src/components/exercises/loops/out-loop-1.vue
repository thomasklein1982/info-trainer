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
import { createMethodOutputExerciseCode } from '../../../other/createMethodOutputExerciseCode';



export const data={
  id: "out-loop-1",
  cheats: ["sysout"],
  title: "Was wird ausgegeben? (While-Schleife)",
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
  int i = $n$;
  while ( i <= $m$ ) {
    if ( i % 2 == 0 ) {
      System.out.println( "$out" )
    }
    System.out.println( i - 1 )
    i++;
  }
  System.out.println( i );
}`,
          f(out,methods){
            out.push(this.output[0]);
            let i=this.values.n;
            while(i<=this.values.m){
              if(i%2==0){
                out.push(this.output[1]);
              }
              out.push(i-1);
              i++;
            }
            out.push(i);
          }
        }
      ];
      let n=Random.int(6,11);
      let k=Random.int(5,7);
      let m=n+k;
      this.code=createMethodOutputExerciseCode(Random,methods,{n,m});
      
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