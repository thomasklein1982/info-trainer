<template>
  <ExerciseBody :exercise="$data" no-footer>
    <template #preview>
      {{person.icon}} {{person.teaser}}
    </template>
    <template #exercise>
      <InternetGame
        :person="person"
        :tasks="tasks"
        :exercise-id="id"
        :random="random"
        @check-request="checkRequest"
      />
      
    </template>
  </ExerciseBody>
</template>

<script>
import InternetGame from './InternetGame.vue';



export const data={
  id: "igada",
  title: "Adas Programmier-Problem",
  tasks: [
    {
      info: "Finde den Namen (die Domain) der Webseite, auf der Ada ihre Frage zur Programmierung gestellt hat.",
      check: (request)=>{
        if(request.server.name==="goggle" && request.data && "programmierung.de".indexOf(request.data.query)>=0){
          return true;
        }
        // if(request.server.name==="programmierung.de" && request.path==="forum.html"){
        //   return true;
        // }
        return false;
      }
    },
    {
      info: "Finde die IP-Adresse der Website, auf der Ada ihre Frage gestellt hat.",
      check: (request)=>{
        if(request.server.name==="dns" && request.data && request.data.query==="programmierung.de"){
          return true;
        }
        return false;
      }
    },
    {
      info: "Finde die Antwort auf die Frage, die Ada im Internet-Forum gestellt hat.",
      check: (request)=>{
        console.log("antwort check",request);
        if(request.server.name==="easy-forums.de" && request.file?.name==="diskussion204.php"){
          return true;
        }
        return false;
      }
    },
    {
      info: "Bedanke dich bei demjenigen, der die Frage beantwortet hat, indem du eine Nachricht mit dem Wort 'Danke' postest.",
      check: (request)=>{
        if(request.method==='post' && request.server.name==="easy-forums.de" && request.file?.name==="diskussion204.php" && request.data?.data!==undefined){
          return true;
        }
        return false;
      }
    },
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
    losgehts: "Klappe Adas Laptop auf...",
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
      this.random=Random;
      this.seed=Random.seed;
      for(let i=0;i<this.tasks.length;i++){
        let t=this.tasks[i];
        t.correct=resArray? resArray[i]: false;
      }
    },
    checkRequest(request){
      for(let i=0;i<this.tasks.length;i++){
        let t=this.tasks[i];
        if(t.check && t.check(request)){
          t.correct=true;
        }
      }
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