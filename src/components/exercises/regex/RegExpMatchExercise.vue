<template>
  <p>Regulärer Ausdruck: 
    <pre><code class="code">{{ edata.regexp }}</code></pre>
  </p>
  <table>
    <tr style="text-align: left">
      <th>Text</th>
      <th>Deine Entscheidung</th>
    </tr>
    <tr v-for="(t,i) in edata.tasks">
      <td><code class="code">{{ t.text }}</code></td>
      <td><SelectButton :disabled="t.correct!==undefined" :options="['Passt','Passt nicht']" v-model="t.input"/></td>
      <td><span v-if="t.correct===true" style="color: green" class="pi pi-check"/><span style="color: red" v-if="t.correct===false" class="pi pi-times"/></td>
    </tr>
  </table>
</template>

<script>
import { RandExpSeeded } from '../../../other/RandExpSeeded';

export function create(regexp, regexpCorrect,regexpWrong,edata, Random, resArray){
  let randexp=new RandExpSeeded(regexp,Random, 5);
  regexpCorrect=Random.mixArray(regexpCorrect);
  regexpWrong=Random.mixArray(regexpWrong);
  let count=edata.tasks.length;
  let countWrong=Random.int(1,count-1);
  let regexes=[];
  for(let i=0;i<count;i++){
    if(i<countWrong){
      let re=new RandExpSeeded(regexpWrong[i%regexpWrong.length], Random, 5);
      regexes.push(re);
    }else{
      let re=new RandExpSeeded(regexpCorrect[(i-countWrong)%regexpCorrect.length], Random, 5);
      regexes.push(re);
    }
  }
  regexes=Random.mixArray(regexes);
  let reCorrect=new RegExp(regexp);
  for(let i=0;i<edata.tasks.length;i++){
    let t=edata.tasks[i];
    t.text=regexes[i].gen();
    t.matches=t.text.match(reCorrect);
    if(!resArray){
      t.correct=undefined;
      t.input=null;
    }else{
      let soll=t.matches!==null;
      let ist=resArray[i]? soll: !soll;
      t.correct=soll===ist;
      if(t.correct){
        if(soll) t.input="Passt";
        else t.input="Passt nicht";
      }else{
        if(!soll) t.input="Passt";
        else t.input="Passt nicht";
      }
    }
  }
}

export default{
  props: {
    edata: Object
  },
  data() {
    return {

    };
  },
  methods: {
    check(){
      let resArray=[];
      for(let i=0;i<this.edata.tasks.length;i++){
        let t=this.edata.tasks[i];
        if(!t.input){
          t.correct=false;
        }else{
          let soll=t.matches!==null;
          let ist=t.input==="Passt";
          t.correct=soll===ist;
        }
        resArray.push(t.correct);
      }
      return resArray;
    }
  }
}
</script>