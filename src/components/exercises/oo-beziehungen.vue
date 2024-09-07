<template>
  <ExerciseBody :exercise="$data">
    Entscheide jeweils, welche Aussagen korrekt sind.
    <template #exercise>
      <ol class="teilaufgaben">
        <li v-for="(t,i) in realTasks">
          <div style="padding: 1rem; background-color: white; display: grid; grid-template: 1fr 1pt 1fr/1cm 1mm 1fr 1fr 1mm 1cm; width: 8cm">
            <span class="uml-class" style="grid-row: 1/4; grid-column: 1">A</span>
            <span class="uml-class" style="grid-row: 1/4; grid-column: 6">B</span>
            <span style="grid-row: 2; grid-column: 3/5;background-color: black"/>
            <span style="grid-row: 2; grid-column: 2; align-self: center; color: black; justify-self: start;font-size:130%;background-color: white;">{{ arrowLeft(t) }}</span>
            <span style="grid-row: 2; grid-column: 5; align-self: center; color: black; justify-self: end;font-size:130%;background-color: white;">{{ arrowRight(t) }}</span>
            <template v-if="t.type!=='vererbung'">
              <span style="padding-left: 1em; grid-row: 2; grid-column: 3; align-self: start; color: black; justify-self: start; font-family: monospace">{{ t.mult[0] }}</span>
              <span style="padding-right: 1em; grid-row: 2; grid-column: 4; align-self: start; color: black; justify-self: end; font-family: monospace">{{ t.mult[1] }}</span>
            </template>
          </div>
          <template v-if="!t.checked">
            <div v-for="(s,j) in statements">
              <label><input type="checkbox" v-model="t.input[j]"/><span v-html="s"/></label>
            </div>
          </template>
          <template v-else>
            <p v-if="t.correct" style="color: lime">
              Deine Auswahl ist richtig:
            </p>
            <p v-else style="color: red">
              Leider nicht  richtig. Richtig ist/sind:
            </p>
            <template v-for="(s,j) in statements">
              <div v-if="t.solution[j]" v-html="s"/>
            </template>
          </template>
        </li>
      </ol>
      
    </template>
  </ExerciseBody>
</template>

<script>
import { nextTick } from 'vue';



export const data={
  id: "oo-beziehungen",
  title: "Beziehungen im UML-Klassendiagramm",
  statements: [
    "Klasse A bekommt ein zusätzliches Attribut vom <code>Typ B</code>.",
    "Klasse A bekommt ein zusätzliches Attribut vom Typ <code>B[]</code>.",
    "Klasse B bekommt ein zusätzliches Attribut vom Typ <code>A</code>.",
    "Klasse B bekommt ein zusätzliches Attribut vom Typ <code>A[]</code>.",
    "Klasse A erbt alle Eigenschaften von Klasse B.",
    "Klasse B erbt alle Eigenschaften von Klasse A."
  ],
  realTasks: [],
  tasks: [
    {
      type: "vererbung",
      mult: ["1",null]
    },
    {
      type: "aggregation",
      mult: [null,"*"]
    },
    {
      type: "assoziation",
      mult: ["1","*"]
    },
    {
      type: "assoziation",
      mult: ["1"]
    }
  ]
}


export default{
  data() {
    return data;
  },
  computed: {
  },
  methods: {
    arrowLeft(task){
      let mult=task.mult;
      let type=task.type;
      if(mult[0] && mult[1]){
        return "";
      }
      if(mult[1]){
        if(type==="aggregation"){
          return "◇";
        }else if(type==="vererbung"){
          return "◁";
        }
      }
      if(type==="assoziation"){
        if(mult[1]){
          return "";
        }else{
          return "❮";
        } 
      }
    },
    arrowRight(task){
      let mult=task.mult;
      let type=task.type;
      if(mult[0] && mult[1]){
        return "";
      }
      if(mult[0]){
        if(type==="aggregation"){
          return "◇";
        }else if(type==="vererbung"){
          return "▷";
        } 
      }
      if(type==="assoziation"){
        if(mult[0]){
          return "";
        }else{
          return "❯";
        }
      }
    },
    create(Random, resArray){
      this.realTasks=JSON.parse(JSON.stringify(Random.mixArray(this.tasks)));
      for(let i=0;i<this.realTasks.length;i++){
        let t=this.realTasks[i];
        t.checked=false;
        t.input=[];
        t.solution=[];
        t.correct=false;
        for(let j=0;j<this.statements.length;j++){
          t.input.push(false);
          t.solution.push(false);
        }
        
        let swap=(array)=>{
          let a=array[0];
          array[0]=array[1];
          array[1]=a;
        };
        if(Random.int(1,2)===1) swap(t.mult);
        for(let j=0;j<t.mult.length;j++){
          if(t.mult[j]?.endsWith("1")){
            if(Random.int(1,2)===1){
              t.mult[j]="0..1";
            }else{
              t.mult[j]="1";
            }
            
          }else if(t.mult[j]?.endsWith("*")){
            if(Random.int(1,2)===1){
              let x=Random.int(1,6);
              t.mult[j]=x+"..*";
            }else{
              t.mult[j]="*";
            }
          }
        }

        if(t.type==="vererbung"){
          if(t.mult[0]){
            t.solution[4]=true;
          }else{
            t.solution[5]=true;
          }
        }else{
          if(t.mult[0]?.endsWith("1")){
            t.solution[2]=true;
          }else if(t.mult[0]?.endsWith("*")){
            t.solution[3]=true;
          }
          if(t.mult[1]?.endsWith("1")){
            t.solution[0]=true;
          }else if(t.mult[1]?.endsWith("*")){
            t.solution[1]=true;
          }
        }
        if(resArray){
          t.checked=true;
          t.correct=resArray[i];
          if(t.correct){
            for(let j=0;j<this.statements.length;j++){
              t.input[j]=t.solution[j];
            }
          }
        }
      }
    },
    check(){
      let resArray=[];
      for(let i=0;i<this.realTasks.length;i++){
        let t=this.realTasks[i];
        t.checked=true;
        t.correct=true;
        for(let j=0;j<this.statements.length;j++){
          if(t.input[j]!==t.solution[j]){
            t.correct=false;
            break;
          }
        }
        resArray.push(t.correct);
      }
      return resArray;
    }
  }
}
</script>

<style scoped>
.uml-class{
  border: 1pt solid black;
  background-color: white;
  color: black;
  text-align: center;
}
</style>