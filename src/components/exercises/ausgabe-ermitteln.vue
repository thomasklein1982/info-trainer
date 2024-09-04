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



export const data={
  id: "ausgabe-ermitteln",
  title: "Was wird ausgegeben?",
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
  $call:2();          
}`,
          f(out,methods){
            methods[2].f(out,methods);
          }
        },
        {
          code: `$void $name(){
  System.out.println ("$out$out");
}`,
          f(out,methods){
            out.push(this.output[0]+this.output[1]);
          }
        },
        {
          code: `$void $name(){
  System.out.println ("$out");
  $call:1();
  $call:1();
  System.out.println ("$out");
}`,
          f(out, methods){
            out.push(this.output[0]);
            methods[1].f(out,methods);
            methods[1].f(out,methods);
            out.push(this.output[1]);
          }
        }
      ];
      let methodNames=[];
      for(let i=0;i<methods.length;i++){
        methodNames.push("m"+(i+1));
      }
      methodNames=Random.mixArray(methodNames);
      let letterCount=0;
      let letters=[];
      for(let i=0;i<methods.length;i++){
        let m=methods[i];
        m.name=methodNames[i];
        let pos=m.code.indexOf("$out");
        m.output=0;
        while(pos>=0){
          letters.push(String.fromCodePoint(65+letters.length));
          m.output++;
          pos=m.code.indexOf("$out",pos+1);
        }
        console.log(m);
      }
      letters=Random.mixArray(letters);
      let letterIndex=0;
      for(let i=0;i<methods.length;i++){
        let m=methods[i];
        let count=m.output;
        m.output=[];
        for(let j=0;j<count;j++){
          m.output.push(letters[letterIndex]);
          letterIndex++;
        }
      }
      let randMethods=Random.mixArray(methods);
      let methodsCode=[];
      for(let i=0;i<randMethods.length;i++){
        let m=randMethods[i];
        let code=m.code;
        code=code.replace(/\$name/g,m.name);
        if(difficulty==="Easy"){
          code=code.replace(/\$void /g,"");
        }else{
          code=code.replace(/\$void /g,"void ");
        }
        let pos=code.indexOf("$call");
        while(pos>=0){
          let pos2=code.indexOf("(",pos+1);
          let call=code.substring(pos,pos2);
          let callNr=call.split(":")[1]*1;
          code=code.substring(0,pos)+methods[callNr].name+code.substring(pos2);
          pos=code.indexOf("$call");
        }
        for(let j=0;j<m.output.length;j++){
          code=code.replace(/\$out/,m.output[j]);
        }
        methodsCode.push(code);
      }
      this.code=methodsCode.join("\n");
      let t=this.tasks[0];
      t.input="";
      let out=[];
      methods[0].f(out,methods);
      t.solution=out.join("\n");
      t.checked=false;
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