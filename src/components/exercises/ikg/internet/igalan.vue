<template>
  <ExerciseBody :exercise="$data" no-footer >
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
  id: "igalan",
  title: "Alans Begeisterung für 'The Enigma'",
  tasks: [
    {
      info: "Wie heißen die Musiker der Band 'The Enigma'?",
      check: (request)=>{
        if(request.server.name==="enigma-band.de" && request.file?.name==="ueberuns.html"){
          return true;
        }
        return false;
      }
    },
    {
      info: "Wie heißt das neueste Album der Band?",
      check: (request)=>{
        if(request.server.name==="enigma-band.de" && request.file?.name==="index.html"){
          return true;
        }
        if(request.server.name==="wiki-wissen.de" && request.file?.name==="enigma.html"){
          return true;
        }
        return false;
      }
    },
    {
      info: "Welche Marke hat das Schlagzeug der Band?",
      check: (request)=>{
        if(request.server.name==="enigma-band.de" && request.file?.name==="galerie.html"){
          return true;
        }
        return false;
      }
    }
  ],
  person: {
    name: "Alan",
    title: "der Drummer",
    icon: "🧔🏾",
    teaser: "Alan ist ein begeisterter Schlagzeuger. Er hat gestern auf einer Party einen Song der Band 'The Enigma' gehört und möchte jetzt alles über die Band herausfinden.",
    losgehts: "Nimm Alans Smartphone ...",
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