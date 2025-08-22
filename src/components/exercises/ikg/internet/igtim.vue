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
  id: "igtim",
  title: "Tims Referat",
  tasks: [
    {
      info: "Finde heraus, wer hat das Internet 'erfunden' hat.",
      check: (request)=>{
        if(request.server.name==="wiki-wissen.de" && request.file?.name==="internet.html"){
          return true;
        }
        return false;
      }
    },
    {
      info: "Lade ein Bild von dieser Person herunter.",
      check: (request)=>{
        if(request.server.name==="wiki-wissen.de" && request.file?.name==="lee-foto.jpg"){
          return true;
        }
        return false;
      }
    },
    {
      info: "Finde heraus, in welcher Computer-Sprache Webseiten programmiert werden.",
      check: (request)=>{
        if(request.server.name==="programmierung.de" && request.file?.name==="internet.html"){
          return true;
        }
        return false;
      }
    }
  ],
  person: {
    name: "Tim",
    title: "der Schüler",
    icon: "👦",
    teaser: "Tim ist ein Schüler in der 6. Klasse und interessiert sich sehr für das Internet. Deshalb will er ein Referat darüber halten.",
    losgehts: "Öffne den Browser auf Tims Tablet ...",
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