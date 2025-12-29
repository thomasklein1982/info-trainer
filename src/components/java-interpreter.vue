<template>
  <div style="display: none;position: absolute; top: 0; right: 0; width: 500px; height: 400px" ref="wrapper"><iframe ref="iframe" :src="src" style="width: 100%; height: 100%"></iframe></div>
</template>

<script>
import { javaAppUrl } from './java-app.vue';



let listener;

export default{
  computed: {
    src(){
      return javaAppUrl();
    }
  },
  methods: {
    async runJavaSnippet(code){
      let project={
        clazzes: [
          {
            name: "Main",
            src: `void main(){
            try{
              ${code}
              /*JAVASCRIPT-CODE
        $Exercise.sendMessageToParentsParent('java-interpreter-result',$scope);
      */
            }catch(Exception exceptionExceptionException){
              /*JAVASCRIPT-CODE
              $Exercise.sendMessageToParentsParent('java-interpreter-result',null);
              */
            }
      
    }`
          }
        ]
      };
      return await this.runJavaProject(project);
    },
    async runJavaProject(project){
      let p=new Promise((resolve,reject)=>{
        if(listener) window.removeEventListener("message",listener);
        listener=(data)=>{
          data=data.data;
          if(data.type==="java-interpreter-result"){
            resolve(data.data);
          }else if(data.type==="open-project-and-run-done" && data.data===false){
            resolve(null);
          }
          
        }
        window.addEventListener("message",listener);
      });
      this.postMessage("open-project-and-run", project);
      let q=await p;
      return q;
    },
    postMessage(type, data){
      let frame=this.$refs.iframe;
      frame.contentWindow.postMessage({
        type,
        data
      },"*");
    }
  }
}

export function createOnelinerTasks(Random,resArray,tasks,srcTasks){
  let N=tasks.length;
  let chosenTasks=Random.drawFrom(srcTasks,N);
  let letters=["a","b","c","d","e","f","g","h","i","k"];
  let words=["anzahl","alter","groesse","gewicht","speed","energie","leben","tiefe","breite","hoehe"];
  words=Random.drawFrom(words,words.length);
  letters=Random.drawFrom(letters,letters.length);
  let srcData={
    letters, words, letterCount: 0, wordCount: 0, indices: {}, Random
  };
  for(let i=0;i<N;i++){
    let t=tasks[i];
    let src=chosenTasks[i];
    createTask(t,src,srcData,resArray);
    t.checked=resArray? true: false;
    t.correct=resArray? resArray[i]: false;
    t.input=resArray && resArray[i]? t.solution: "";
  }
}

export async function checkOneliner(exercise, allowMultipleLines){
  let resArray=[];
  for(let i=0;i<exercise.tasks.length;i++){
    let t=exercise.tasks[i];
    let res;
    if(!allowMultipleLines){
      let count=t.input.split(";").length;
      if(count>1) res=false;
    }
    if(!res){
      let scope=await exercise.$root.runJavaSnippet(t.preCode+t.input);
      res=scope && t.check(scope,t.vars);
    }
    if(res===true){
      t.correct=true;
    }else{
      t.correct=false;
    }
    t.checked=true;
    resArray.push(t.correct);
  }
  return resArray;
}

export function getVariableFromScope(name,scope){
  for(let i=scope.stack.length-1;i>=0;i--){
    let s=scope.stack[i];
    if(s[name]){
      return s[name];
    }
  }
  return null;
}

function handleVariable(task,content,srcData){
  let t=task;
  /*
    types: 
    l: single letter
    w: word
    i: int >=0
    I: int >=10
    d: double
    Sonst: Array, ;-separated, Index wird unter dem ersten Zeichen gespeichert; gleiche Zeichen wählen gleichen Index
  */
  let type=content.charAt(0);
  let varname=content.substring(1);
  let val;
  let text;
  let Random=srcData.Random;
  let indices=srcData.indices;
  if(t.vars[type]!==undefined && t.vars[type][varname*1]!==undefined){
    text=t.vars[type][varname*1];
  }else{
    if(type==="i"){
      val=Random.int(0,20);
    }else if(type==="I"){
      val=Random.int(10,20);
    }else if(type==="d"){
      val=Random.int(1,100)/8;
    }else if(type==="l"){
      val=srcData.letters[srcData.letterCount%srcData.letters.length];
      srcData.letterCount++;
    }else if(type==="w"){
      val=srcData.words[srcData.wordCount%srcData.words.length];
      srcData.wordCount++;
    }else{
      let elements=varname.split(";");
      if(indices[type]===undefined){
        indices[type]=Random.int(0,100000);
        t.vars.Arrays[type]=[];
      }
      val=elements[indices[type]%elements.length];
      t.vars.Arrays[type].push(val);
      text=val;
      val=undefined;
    }
    if(val!==undefined){
      text=val;
      t.vars[type][varname*1]=val;
    }
  }
  return text;
}

function createTask(task,srcTask, srcData ){
  let src=srcTask;
  srcData.indices={};
  let t=task;
  t.aufgabe=src.aufgabe;
  t.check=src.check;
  t.vars={
    l: {},
    w: {},
    i: {},
    I: {},
    d: {},
    Arrays: {}
  }
  let parts=src.aufgabe.split("§");
  let text=parts[0];
  for(let j=1;j<parts.length;j++){
    if(j%2===0){ text+=parts[j]; continue;}
    text+=handleVariable(t, parts[j], srcData);
  }
  t.aufgabe=text;
  parts=src.solution.split("§");
  text=parts[0];
  for(let j=1;j<parts.length;j++){
    if(j%2===0){ text+=parts[j]; continue;}
    text+=handleVariable(t, parts[j], srcData);
  }
  t.solution=text;
  parts=src.preCode.split("§");
  text=parts[0];
  for(let j=1;j<parts.length;j++){
    if(j%2===0){ text+=parts[j]; continue;}
    text+=handleVariable(t, parts[j], srcData);
  }
  t.preCode=text;
}
</script>