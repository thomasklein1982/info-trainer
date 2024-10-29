<template>
  <ExerciseBody :exercise="$data">
    
    <template #exercise>
      <InternetGame
        :person="person"
        :seed="seed"
      />
      
    </template>
  </ExerciseBody>
</template>

<script>
import InternetGame from './InternetGame.vue';



export const data={
  id: "igada",
  title: "Das Internet-Spiel",
  tasks: [
    {
      
    }
  ],
  person: {
    name: "Ada",
    title: "die Programmierin", 
    icon: "👩",
    teaser: "Ada programmiert schon seit vielen Jahren. Jetzt hat sie allerdings ein Problem, bei dem sie nicht weiter weiß. Daher hat sie vor zwei Tagen eine Frage in einem Forum gestellt.",
    tasksIntro: "Du musst verschiedene Sachen erledigen:",
    tasks: [
      "Finde die Webseite, auf der Ada ihre Frage zur Programmierung gestellt hat.",
      "Finde die Antwort auf die Frage, die Ada im Internet-Forum gestellt hat.",
      "Bedankt euch bei demjenigen, der die Frage beantwortet hat, indem ihr eine neue Nachricht postet."
    ],
    losgehts: "Ada klappt ihren Laptop auf ...",
    geraet: "Laptop"
  },
  screen: "start",
  random: null
}

export default{
  components: {
    InternetGame
  },
  data() {
    return data;
  },
  methods: {
    create(Random, resArray){
      this.seed=Random.seed;
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

<style scoped>
  .portrait{
    font-size: 200%;
    padding-right: 0.5rem;
  }

  .person-card{
    display: grid;
    grid-template-columns: auto 1fr auto;
    
  }
</style>