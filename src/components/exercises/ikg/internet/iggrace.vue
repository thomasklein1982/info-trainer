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
  id: "iggrace",
  closable: true,
  title: "Grace nutzt eine Suchmaschine",
  tasks: [
  {
      info: "Gehe auf die Goggle-Seite.",
      check: (request)=>{
        if(request.server.name==="goggle"){
          return true;
        }
        return false;
      }
    },
    {
      info: "Suche bei Goggle nach 'wiki'.",
      check: (request)=>{
        if(request.server.name==="goggle" && request.data?.query==="wiki"){
          return true;
        }
        return false;
      }
    },
    {
      info: "Suche bei Goggle nach 'programm'.",
      check: (request)=>{
        if(request.server.name==="goggle" && request.data?.query==="programm"){
          return true;
        }
        return false;
      }
    },
  ],
  person: {
    name: "Grace",
    title: "die Rentnerin",
    icon: "👵",
    teaser: "Grace ist mittlerweile im Ruhestand. Sie möchte die neue Suchmaschine Goggle ausprobieren.",
    losgehts: "Nimm das Smartphone von Grace...",
    geraet: "Smartphone"
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