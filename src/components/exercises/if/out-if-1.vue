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
  id: "out-if-1",
  title: "Was wird ausgegeben? (if-else)",
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
  $call:1($n1$);
  $call:1($n2$);
}`,
          f(out,methods){
            methods[1].f(out,methods,this.values.n1);
            methods[1].f(out,methods,this.values.n2);
          }
        },
        {
          code: `void $name( int n ){
  if ( n >= $i1$){
    System.out.println( "$out" );
  }
  if ( n >= $i2$ ){
    System.out.println( "$out" );
    return;
  }
  if ( n < $i3$ ){
    System.out.println( "$out" );
  }else{
    return;
  }
  System.out.println( "$out" );
}`,
          f(out,methods,n){
            if ( n >= this.values.i1 ){
              out.push( this.output[0] );
            }
            if ( n >= this.values.i2 ){
              out.push( this.output[1] );
              return;
            }
            if(n<this.values.i3){
              out.push(this.output[2]);
            }else{
              return;
            }
            out.push(this.output[3]);
          }
        }
      ];
      let x=Random.int(0,6);
      let zahlen=[x];
      for(let i=0;i<4;i++){
        x+=Random.int(1,3);
        zahlen.push(x);
      }
      console.log(zahlen);
      let n1=Random.int(0,zahlen.length-3);
      let n2=Random.int(n1+2,zahlen.length-1);
      if(Random.int(0,1)===1){
        let c=n1;
        n1=n2;
        n2=c;
      }
      let indices=[];
      let n=[];
      for(let i=0;i<zahlen.length;i++){
        if(i===n1 || i===n2){
          n.push(zahlen[i]);
        }else{
          indices.push(zahlen[i]);
        }
      }
      this.code=createMethodOutputExerciseCode(Random,methods,{n1: n[0], n2: n[1],i1: indices[0], i2: indices[1], i3: indices[2]});
      
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