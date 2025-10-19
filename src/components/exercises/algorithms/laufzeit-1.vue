<template>
  <ExerciseBody :exercise="$data" inline>
    Ermittle die Laufzeit der Methode in Abhängigkeit von der Länge <code>n</code> des Arrays <code>array</code>.
    <template #exercise>
      <template v-for="(t,i) in tasks">
        <Code v-if="showCode">{{ t.code }}</Code>
        <div class="no-print"><Select :disabled="t.checked" placeholder="Wähle die korrekte Laufzeit" :options="options" v-model="t.input"/> <Check :status="t.checked? t.correct:null"/> <span v-if="t.checked && !t.correct">[{{ t.solution }}]</span></div>
      </template>
    </template>
  </ExerciseBody>
</template>

<script>
import { nextTick } from 'vue';
import { createMethodOutputExerciseCode } from '../../../other/createMethodOutputExerciseCode';
import Check from '../../Check.vue';

export const data={
  id: "laufzeit-1",
  title: "Laufzeit ermitteln",
  showCode: true,
  options: ['O(1)', 'O(n)', 'O(n²)', 'O(n³)', 'O(n⁴)', 'O(log n)', 'O(n log n)', 'O(2^n)'],
  tasks: [
    {
      code: "",
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
          code: `void methode( int[] array ){
  int n = array.length;
  array[ $i1$ ] = $i2$;
  if ( array[ $i3$ ] != $i4$ ) {
    for ( int i = $startI$; i < $stopI$; i++ ) {
      int a = $a$;
      for (int j = a; j < $stopJ$; j++) {
        for (int k = $startK$; k < $stopK$; k++ ) {
          System.out.println( k );
        }
      }
    }
  }
}`
        }
      ];
      for(let i=0;i<this.tasks.length;i++){
        let i1,i2,i3,i4,startI,startJ,startK,stopI,stopJ,stopK,a;
        i1=Random.int(0,5);
        i2=Random.int(0,5);
        let w1=Random.int(1,5);
        let solIf;
        if(w1===1){
          i3=i1;
          i4=i2;
          solIf=0;
        }else{
          i3=Random.int(0,5);
          i4=i2+1;
          solIf=1;
        }
        let w2=Random.int(1,3);
        if(w2===1){
          a="1";
        }else{
          a="n";
        }
        let w3=Random.int(1,3);
        startI=Random.int(0,3);
        let solI;
        if(w3===1){
          stopI=startI+Random.int(5,10)*10;
          solI=0;
        }else{
          stopI="n";
          solI=1;
        }
        //let w4=Random.int(1,2);
        let solJ;
        //if(w4===1){
          stopJ="n + "+Random.int(1,5);
          solJ=w2===1? 1: 0;
        // }else{
        //   stopJ="2 * n";
        //   solJ=1;
        // }
        let w5=Random.int(1,3);
        let solK;
        if(w5===1){
          startK="j";
          stopK="j + 5";
          solK=0;
        }else if(w5===2){
          startK="j";
          stopK="j + n";
          solK=1;
        }else{
          startK="1";
          stopK="n * n";
          solK=2;
        }
        let t=this.tasks[i];
        t.code=createMethodOutputExerciseCode(Random,methods, {a, i1, i2, i3, i4, startJ, stopJ, startI, stopI, startK, stopK});
        let sol=solIf*(solI+solJ+solK);
        t.solution=this.options[sol];
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