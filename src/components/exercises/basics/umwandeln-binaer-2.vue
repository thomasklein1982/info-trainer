<template>
  <ExerciseBody :exercise="$data">
    Überführe die Binärzahlen in das Dezimalsystem.
    <template #exercise>
      <ol class="teilaufgaben">
        <li v-for="(t,i) in tasks">{{t.number}} = <InputCheck ref="input" :task="t"/></li>
      </ol>
    </template>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "umwandeln-binaer-2",
  title: "Umwandeln aus dem Binärsystem",
  tasks: [
    {
      from: 2,
      to: 15,
    },
    {
      from: 16,
      to: 31,
    },
    {
      from: 32,
      to: 63,
    },
    {
      from: 64,
      to: 127,
    },
    {
      from: 128,
      to: 255,
    }
  ]
}

export default{
  data() {
    return data;
  },
  methods: {
    create(Random, resArray){
      for(let i=0;i<this.tasks.length;i++){
        let t=this.tasks[i];
        t.solution=Random.int(t.from,t.to);
        t.correct=resArray? resArray[i]: false;
        t.number=t.solution.toString(2);
        t.checked=resArray? true: false;
        t.input=resArray && resArray[i]? t.solution: "";
      }
    },
    check(){
      let resArray=[];
      for(let i=0;i<this.tasks.length;i++){
        let t=this.tasks[i];
        t.checked=true;
        resArray.push(t.correct);
      }
      return resArray;
    }
  }
}
</script>