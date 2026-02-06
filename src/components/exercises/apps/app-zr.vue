<template>
  <ExerciseBody :exercise="$data" :java="project">
    Bei der App "Zahlenraten" denkt sich der Computer eine geheime Zahl zwischen 1 und 100 aus und der User muss diese geheime Zahl erraten. Nach jedem missglückten Rateversuch teilt der Computer mit, ob die geheime Zahl größer oder kleiner ist als die geratene Zahl, sodass der User die geheime Zahl immer weiter eingrenzen kann.
    <p>Dieses Spiel soll als App umgesetzt werden.</p>
    <div>
      <AppPreview width="20em">
        <JFrame layout="1">
          <JLabel>Zahlenraten</JLabel>
          <JLabel>Ich habe mir eine Zahl zwischen 1 und 100 ausgedacht, kannst du sie erraten?</JLabel>
          <JPanel layout="2">
            <JLabel>Dein Rateversuch:</JLabel>
            <JTextField v-model="ratenZahl" placeholder="Zahl" type="number"/>
          </JPanel>
          <JButton @click="raten()">Raten</JButton>
          <JLabel>{{ result }}</JLabel>
        </JFrame>
      </AppPreview>
    </div>
  </ExerciseBody>
</template>

<script>
import App from '../../../App.vue';
import { random } from '../../../other/random';



export const data={
  id: "app-zr",
  ratenZahl: null,
  geheim: random(1,100),
  result: null,
  title: "Zahlenraten",
  features: [
    {
      name: "UI gebaut",
      items: ["Du hast die UI passend nachgebaut."]
    },
    {
      name: "Gewinnen können",
      items: ["Wenn der User die geheime Zahl errät, hat er*sie gewonnen."]
    },
    {
      name: "Tipps geben",
      items: ["Wenn der User falsch rät, sagt der Computer, ob die geheime Zahl größer oder kleiner ist als die geratene Zahl."]
    },
    {
      name: "Rateversuche",
      items: [
        "Es wird angezeigt, der wievielte Rateversuch gerade unternommen wird.",
        "Wenn man gewonnen hat, wird angezeigt, wie viele Rateversuche man gebraucht hat."
      ]
    },
    {
      name: "Highscore",
      items: [
        "Die App speichert den Namen und die Anzahl der Rateversuche des besten Durchgangs und zeigt sie auf der Highscore-Seite an.",
        "Die Daten werden so gespeichert, dass sie beim Neustarten der App wieder geladen werden."
      ]
    },
    {
      name: "Highscore-Liste",
      items: [
        "Es werden die Namen und Rateversuche der besten 10 Durchgänge gespeichert und auf der Highscore-Seite angezeigt.",
        "Neue Durchgänge werden richtig in die Highscore-Liste einsortiert. Was passiert bei Gleichstand?"
      ]
    },
  ],
  project: {
    name: "Zahlenraten",
    clazzes: [
      {
        name: "Main",
        src: `$void main( ){
  
}`,
      }
    ]
  }
};

export default{
  components: {
    
  },
  data() {
    return data;
  },
  methods: {
    raten(){
      if(this.ratenZahl*1===this.geheim){
        this.result="Richtig geraten!";
      }else if(this.ratenZahl*1<this.geheim){
        this.result="Falsch, meine Zahl ist größer!"
      }else{
        this.result="Falsch, meine Zahl ist kleiner!"
      }
    }
  }
}
</script>