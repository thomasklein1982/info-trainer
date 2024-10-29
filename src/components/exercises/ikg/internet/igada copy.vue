<template>
  <ExerciseBody :exercise="$data">
    Hilf Tim, Ada und Alan ihre Probleme im Internet zu lösen!
    <template #exercise>
      <div style="width: 100%; height: 100%">
        <div class="screen" v-if="screen==='start'">
          <h1>Das Internet-Spiel</h1>
          <p>Suche dir aus, wen du spielen möchtest:</p>
          <Card v-for="(p,i) in personen">
            <template #title>
              {{p.name}}, {{ p.title }}
            </template>
            <template #content>
              <div class="person-card">
                <span class="portrait">
                  {{ p.icon }}
                </span>
                <div>
                  {{ p.teaser }}
                </div>
                <Button @click="start(p)" :label="'Starte mit '+p.name"/>
              </div>
            </template>
          </Card>
        </div>
        <div class="screen" v-else-if="screen==='intro'">
          <span class="portrait" style="float-left">
            {{ person.icon }}
          </span>
          <div>
            {{ person.teaser }}
          </div>
        </div>
      </div>
    </template>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "igada",
  title: "Das Internet-Spiel",
  tasks: [
    {
      
    }
  ],
  person: "tim",
  screen: "start",
  personen: {
    ada: {
      name: "Ada",
      title: "die Programmierin", 
      icon: "👩",
      teaser: "Ada programmiert schon seit vielen Jahren. Jetzt hat sie allerdings ein Problem, bei dem sie nicht weiter weiß. Daher hat sie vor zwei Tagen eine Frage in einem Forum gestellt.",
      tasksIntro: "Du musst verschiedene Sachen erledigen:",
      tasks: [
        "Finde die Webseite, auf der Ada ihre Frage zur Programmierung gestellt hat.",
        "Finde die Antwort auf die Frage, die Ada im Internet-Forum gestellt hat.",
        "Bedankt euch bei demjenigen, der die Frage beantwortet hat, indem ihr eine neue Nachricht postet."
      ] 
    },
    tim: {
      name: "Tim",
      title: "der Schüler",
      icon: "👦",
      teaser: "Tim ist ein Schüler in der 6. Klasse und interessiert sich sehr für das Internet. Deshalb will er ein Referat darüber halten.",
      tasks: [
        "Finde heraus, wer hat das Internet 'erfunden' hat.",
        "Lade ein Bild von dieser Person herunter.",
        "Finde heraus, in welcher Sprache Webseiten programmiert werden."
      ] 
    },
    alan: {
      name: "Alan",
      title: "der Drummer",
      icon: "🧔🏾",
      teaser: "Alan ist ein begeisterter Schlagzeuger. Er hat gestern auf einer Party einen Song der Band 'The Enigma' gehört und möchte jetzt alles über die Band herausfinden.",
      tasksIntro: "Du willst so viel wie möglich über die Band 'The Enigma' herausfinden:",
      tasks: [
        "Wie viele Bandmitglieder gibt es und wie heißen sie?",
        "Wie hieß das letzte Album der Band?",
        "Welche Marke hat das Schlagzeug der Band?"
      ] 
    }
  }
}

export default{
  data() {
    return data;
  },
  methods: {
    start(name){
      this.person=name;
      this.screen="intro";
    },
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