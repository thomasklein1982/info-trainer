<template>
  <ExerciseBody :exercise="$data" inline>
    <template #exercise>
      Gegeben sind mehrere Methoden, die unterschiedliche Laufzeiten haben:
      <ol>
        <li v-for="(t,i) in tasks">Die Methode <code>void m{{ i+1 }}( int n )</code> hat eine Laufzeit von O(<span v-html="t.laufzeit.name"/>).</li>
      </ol>
      <p>Angenommen, jede dieser Methoden benötigt etwa {{ basisZeit }} ms für die Eingabe <code>n = {{ basisN }}</code>.</p>

      <p>Schätze ab, wie lange die Methoden für die Eingabe <code>n = {{ zielN }}</code> benötigen werden. Gib das Ergebnis in einer möglichst großen Zeit-Einheit an.</p>
      <ol class="teilaufgaben no-print">
        <li v-for="(t,i) in tasks">
          <code>methode{{i+1}}</code> wird etwa <Select :disabled="t.checked" placeholder="Wie lange?" :options="options" v-model="t.input"/> <Check :status="t.checked? t.correct:null"/> <span v-if="t.checked && !t.correct">[{{ t.solution }}]</span> benötigen.
        </li>
      </ol>
    </template>
  </ExerciseBody>
</template>

<script>
import { nextTick } from 'vue';
import { createMethodOutputExerciseCode } from '../../../other/createMethodOutputExerciseCode';
import Check from '../../Check.vue';

export const data={
  id: "laufzeit-3",
  title: "Laufzeit abschätzen",
  options: [],
  times: [
    {
      name: '1',
      f: (t,f)=>{return t;}
    },
    {
      name: 'n',
      f: (t,f)=>{return f*t;}
    },
    {
      name: 'n²',
      f: (t,f)=>{return f*f*t;}
    },
    {
      name: 'n³',
      f: (t,f)=>{return f*f*f*t;}
    },
    {
      name: '2<sup>n</sup>',
      f: (t,f,n1,n2)=>{return Math.pow(2,n2-n1)*t;}
    },
    {
      name: 'log n',
      f: (t,f)=>{return t;}
    }
  ],
  tasks: [
    {
      input: null
    },
    {
      input: null
    },
    {
      input: null
    }
  ],
}


export default{
  components: {
    Check
  },
  data() {
    return data;
  },
  methods: {
    toTimeAndUnit(ms){
      let einheiten=[{n:"Sekunden",x:1000}, {n:"Minuten",x:60}, {n:"Stunden",x:60}, {n:"Tage",x:24}, {n:"Jahre",x:365}];
      let einheit="Milli-Sekunden";
      let z=ms;
      for(let i=0;i<einheiten.length;i++){
        let ein=einheiten[i];
        if(z>=ein.x){
          z/=ein.x;
          einheit=ein.n;
        }else{
          break;
        }
      }
      return (Math.round(z*10)/10)+" "+einheit;
    },
    create(Random, resArray){
      let basisN=Math.round(Math.pow(10,Random.int(1,2)));
      let basisZeit=Random.int(1,9)*Math.round(Math.pow(10,Random.int(2,3)));
      let faktor=Random.int(2,5);
      let zielN=basisN*faktor;
      this.basisN=basisN;
      this.zielN=zielN;
      this.basisZeit=basisZeit;
      let options=[];
      for(let i=0;i<this.times.length-1;i++){
        let laufzeit=this.times[i];
        let ms=laufzeit.f(basisZeit,faktor,basisN,zielN);
        options.push(ms);
      }
      let w=[0.5,2][Random.int(0,1)];
      let weitereZeiten=[(t,f)=>{return f*f*f*f*t;}, (t,f)=>{return f*f*f*f*f*t;}, (t,f)=>{return f*f*f*f*f*f*t;}, (t,f,n1,n2)=>{return w*Math.pow(2,n2-n1)*t;}];
      for(let i=0;i<weitereZeiten.length;i++){
        let laufzeit=weitereZeiten[i];
        let ms=laufzeit(basisZeit,faktor,basisN,zielN);
        options.push(ms);
      }
      options.sort((a,b)=>{return a-b;});
      this.options=[];
      for(let i=0;i<options.length;i++){
        this.options.push(this.toTimeAndUnit(options[i]));
      }
      let times=Random.order(0,this.times.length-1);
      for(let i=0;i<this.tasks.length;i++){
        let t = this.tasks[i];
        t.laufzeit=this.times[times[i]];
        t.ms=t.laufzeit.f(basisZeit,faktor,basisN,zielN);
        t.solution=this.toTimeAndUnit(t.ms);
      }
      
      for(let i=0;i<this.tasks.length;i++){
        let t=this.tasks[i];
        t.checked=false;
        t.input=null;
        t.correct=false;
        if(resArray && resArray[i]!==undefined){
          t.checked=true;
          t.correct=resArray[i];
          if(resArray[i]){
            this.input=t.solution;
          }
        }
      }
    },
    check(){
      let resArray=[];
      for(let i=0;i<this.tasks.length;i++){
        let t=this.tasks[i];
        t.correct=t.input===t.solution;
        t.checked=true;
        resArray.push(t.correct);
      }
      return resArray;
    }
  }
}
</script>