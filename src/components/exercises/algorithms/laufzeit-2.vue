<template>
  <ExerciseBody :exercise="$data" inline>
    Ermittle die Laufzeit der Methoden in Abhängigkeit von der Länge <code>n</code> des Arrays <code>array</code>.
    <template #exercise>
      <Code v-if="showCode">{{ code }}</Code>
      <ol class="teilaufgaben no-print">
        <li v-for="(t,i) in tasks">
          <code>methode{{i+1}}</code> hat die Laufzeit <Select :disabled="t.checked" placeholder="Wähle die korrekte Laufzeit" :options="options" v-model="t.input"/> <Check :status="t.checked? t.correct:null"/> <span v-if="t.checked && !t.correct">[{{ t.solution }}]</span>
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
  id: "laufzeit-2",
  title: "Laufzeit ermitteln",
  showCode: true,
  code: "",
  options: ['O(1)', 'O(n)', 'O(n²)', 'O(n³)', 'O(n⁴)', 'O(log n)', 'O(n log n)', 'O(2^n)'],
  tasks: [
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
    create(Random, resArray){
      let methods=[
        {
          code: `void methode1( int[] array ){
  int n = array.length;
  for ( int i = $startK$; i < $stopK$; i++) {
    System.out.println( array[ i ] );
  }
  for ( int j = $startJ$; j < $stopJ$; j++) {
    for ( int k = $startI$; k < $stopI$; k++ ){
      methode2( array );
    }
  }
}`
        },
        {
          code: `void methode2( int[] array ){
  int n = array.length;
  for ( int i = $startI2$; i < $stopI2$; i++) {
    System.out.println( i );
  }
}`
        }
      ];
      let startI,stopI,startJ,stopJ,startK,stopK,startI2,stopI2;
      let w1=Random.int(1,2);
      let solI;
      if(w1===1){
        startI=Random.int(0,4);
        stopI="n";
        solI=1;
      }else{
        startI=Random.int(0,4);
        stopI=startI+Random.int(10,20);
        solI=0;
      }
      let w2=Random.int(1,2);
      let solJ;
      if(w2===1){
        startJ=Random.int(0,4);
        stopJ="n";
        solJ=1;
      }else{
        startJ="n + "+Random.int(0,4);
        stopJ="n + "+(startI+Random.int(10,20));
        solJ=0;
      }
      let w3=Random.int(1,2);
      let solK;
      if(w3===1){
        startK=Random.int(0,4);
        stopK="2 * n";
        solK=1;
      }else{
        startK="n";
        stopK="n * n";
        solK=2;
      }
      let w4=Random.int(1,2);
      let solI2;
      if(w4===1){
        startI2=Random.int(0,4);
        stopI2="n";
        solI2=1;
      }else{
        startI2=Random.int(0,4);
        stopI2=startI+Random.int(10,20);
        solI2=0;
      }
      this.code=createMethodOutputExerciseCode(Random,methods, {startJ, stopJ, startI, stopI, startK, stopK, startI2, stopI2});
      let sol=Math.max(solK,solJ+solI+solI2);
      this.tasks[0].solution=this.options[sol];
      sol=solI2;
      this.tasks[1].solution=this.options[sol];
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
      this.showCode=false;
      nextTick(()=>{
        this.showCode=true;
      });
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