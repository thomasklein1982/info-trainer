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
  id: "igeliz",
  title: "Elizabeth sucht die Mathe-Hausaufgaben",
  tasks: [
  {
      info: "Finde die IP-Adresse von mathe-info.com.",
      check: (request)=>{
        if(request.server.name==="dns" && request.data?.query==="mathe-info.com"){
          return true;
        }
        return false;
      }
    },
    {
      info: "Finde deine Hausaufgaben auf dem mathe-info.com-Server.",
      check: (request)=>{
        if(request.server.name==="mathe-info.com" && request.file?.name==="index.html"){
          return true;
        }
        return false;
      }
    }
  ],
  person: {
    name: "Elizabeth",
    title: "die Schülerin",
    icon: "👧",
    teaser: "Elizabeth muss auf der Webseite mathe-info.com nachsehen, was die Hausaufgabe in Mathe ist.",
    losgehts: "Nimm das Tablet von Elizabeth...",
    geraet: "Tablet"
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