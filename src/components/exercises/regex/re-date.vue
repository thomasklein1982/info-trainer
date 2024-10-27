<template>
  <ExerciseBody :exercise="$data" :regexp="regexp">
    Formuliere einen regulären Ausdruck, der alle korrekten Datumsangaben in der Form <code class="code">tt.mm.</code> erkennt. "Korrekt" heißt dabei, dass nur Datumsangaben erlaubt sind, die tatsächlich existieren (also z. B. <code class="code">07.02.</code> oder <code class="code">31.12.</code>, nicht aber <code class="code">30.02.</code> oder <code class="code">31.04.</code>). Da es in Schaltjahren den 29. Februar gibt, ist <code class="code">29.02.</code> auch eine korrekte Datumsangabe.
  </ExerciseBody>
</template>

<script>
import { calcPoints } from '../../../App.vue';
import { RandExpSeeded } from '../../../other/RandExpSeeded';



export const data={
  id: "re-date",
  title: "Datumsangaben erkennen",
  regexp: {
    solution: /^(0[1-9]|[1-2][0-9])\.(0[1-9]|1[0-2])\.|30\.(0[13-9]|1[0-2])\.|31\.(0[13578]|10|12)\.$/,
    match: [
      /29\.02\./,
      /(0[1-9])\.(0[1-9]|1[0-2])\./,
      /([1-2][0-9])\.(0[1-9]|1[0-2])\./,
      /30\.(0[13-9]|1[0-2])\./,
      /31\.(0[13578]|10|12)\./,
      /(0[1-9]|[1-2][0-9])\.(0[1-9])\./
    ],
    skip: [
      /30\.02\./,
      /31\.(0[2469]|11)\./,
      /[4-9][0-9]\.([0-9]|1[0-2])\./,
      /0[1-9]\.(1[3-9])\./,
      /\d{3}/,
      /[1-2][0-9]\.0[1-9]/,
    ]
  },
  error: false,
  check: {
    testcases: [
      {}
    ]
  }
}

export default{
  components: {
  },
  data() {
    return data;
  },
  methods: {
    test(){
      let resArray=[false,false,false];
      let re;
      this.error=false;
      try{
        re=new RegExp(this.regexp);
      }catch(e){
        this.error=true;
        return;
      }
      let ed=this.$root.getExerciseData(this.id);
      let textGen=/(.+ \d{2}\.\d{2}\.\d{4} .+ \d{2}\.\d{2}){7,10} \d\.\d \d{2}\.\d \d\.\d{2} \d{1,2}\.\d{1,2}\.\d{1,3} \d{1,2}\.\d{1,2}\.\d{5,7} .+/;
      textGen=new RandExpSeeded(textGen,null,5);
      let text=textGen.gen();
      let reCorrect=/(0[1-9]|[1-2][0-9])\.(0[1-9]|1[0-2])|30\.(0[13-9]|1[0-2])|31\.(0[13578]|10|12)/;
      let res=reCorrect.exec(text);
      console.log(res);
      ed.correct=resArray;
      calcPoints(ed);
    }
  }
}
</script>