<template>
  <ExerciseBody :exercise="$data">
    <template #intro>
      Überführe die Dezimalzahlen in das Binärsystem.
    </template>
    <template #exercise>
      <ol class="teilaufgaben">
        <li v-for="(t,i) in tasks">{{t.number}} = <InputText type="number" v-model="t.input"/><Check :status="t.correct"/></li>
      </ol>
    </template>
  </ExerciseBody>
</template>

<script>

export const data={
  id: "umwandeln-binaer",
  title: "Umwandeln ins Binärsystem",
  create(Random, resArray){
    for(let i=0;i<this.tasks.length;i++){
      let t=this.tasks[i];
      t.number=Random.int(t.from,t.to);
      t.correct=resArray? resArray[i]: undefined;
    }
  },
  test(){
    let resArray=[];
    for(let i=0;i<this.tasks.length;i++){
      let t=this.tasks[i];
      let n=t.number;
      let soll=n.toString(2);
      let ist=t.input.trim();
      t.correct=soll===ist;
      resArray.push(t.correct);
    }
    return resArray;
  },
  tasks: [
    {
      from: 2,
      to: 15,
      input: ""
    },
    {
      from: 16,
      to: 31,
      input: ""
    },
    {
      from: 32,
      to: 63,
      input: ""
    },
    {
      from: 64,
      to: 127,
      input: ""
    },
    {
      from: 128,
      to: 255,
      input: ""
    },
    {
      from: 1000,
      to: 2000,
      input: ""
    }
  ]
}

export default{
  data() {
    return data;
  },
}
</script>