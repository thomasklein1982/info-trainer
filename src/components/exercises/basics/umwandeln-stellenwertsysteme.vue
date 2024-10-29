<template>
  <ExerciseBody :exercise="$data">
    Berechne die Darstellung der Zahl in dem angegebenen Stellenwertsystem.
    <template #exercise>
      <ol class="teilaufgaben">
        <li v-for="(t,i) in tasks">Wandle vom {{t.basen[0]}}er-System ins {{t.basen[1]}}er-System um: 
          <div>{{t.number}}<sub>({{ t.basen[0] }})</sub> = <InputCheck ref="input" :task="t"/></div>
        </li>
      </ol>
    </template>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "umwandeln-stellenwertsysteme",
  title: "Umwandeln in andere Stellenwertsysteme",
  tasks: [
    {
      from: 2,
      to: 10
    },
    {
      from: 11,
      to: 30,
    },
    {
      from: 31,
      to: 60,
    },
    {
      from: 61,
      to: 120,
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
        let x=Random.int(t.from,t.to);
        t.basen=Random.drawFrom([3,4,5,6,8,12],2);
        t.number=x.toString(t.basen[0]);
        t.solution=x.toString(t.basen[1]);
        t.correct=resArray? resArray[i]: false;
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