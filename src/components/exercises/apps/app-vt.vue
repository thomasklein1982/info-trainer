<template>
  <ExerciseBody :exercise="$data" :java="project">
    <p>Aufgabe ist noch nicht fertig!</p>
    <!-- <div class="float-right">
      <AppPreview >
        <JFrame layout="1">
          <JLabel>Taschenrechner</JLabel>
          <JPanel layout="2">
            <JTextField placeholder="Zahl 1" type="number"/>
            <JTextField placeholder="Zahl 2" type="number"/>
          </JPanel>
          <JPanel layout="4">
            <JButton>+</JButton>
            <JButton>-</JButton>
            <JButton>*</JButton>
            <JButton>:</JButton>
          </JPanel>
          <JLabel>Ergebnis</JLabel>
        </JFrame>
      </AppPreview>
    </div> -->
  </ExerciseBody>
</template>

<script>
import App from '../../../App.vue';



export const data={
  id: "app-vt",
  title: "Vokabeltrainer (WIP)",
  features: [
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
        src: `/*Frames der App*/
JFrame frameStart, frameGame, frameWin, frameHighscore;

/*Labels für die Anzeige des Feedbacks auf einen Rateversuch und für die Anzeige des Highscore*/
JLabel labelFeedback, labelHighscore;

/*Der eingegebene Name*/
String userName;

/*Die geheime Zahl bzw. die geratene Zahl*/
int secretNumber, guessedNumber;

/*Objekt zur Erzeugung von Zufallszahlen*/
Random random=new Random();

void main( ){
  createFrameStart();
  createFrameGame();
  createFrameHighscore();
  frameGame.hide();
  frameHighscore.hide();
  frameStart.show();
}

/*Startet ein neues Spiel*/
void startGame(){
  secretNumber=random.nextInt(100)+1;
}

/*Handelt den Rateversuch ab*/
void guess(){
  
}

/*Zeigt das Highscore-Frame an*/
void showHighscore(){
  frameStart.hide();
  frameHighscore.show();
}

//der weitere Code muss wahrscheinlich nicht verändert werden

/*Erzeugt die UI des Spiel-Frames*/
void createFrameGame(){
  frameGame=new JFrame("1");
  JLabel l;
  l=new JLabel("Ich habe mir eine geheime Zahl zwischen 1 und 100 ausgedacht. Kannst du sie erraten?");
  frameGame.add(l);
  JPanel p=new JPanel("3");
  frameGame.add(p);
  l=new JLabel("Raten:");
  p.add(l);
  JTextField eingabeRaten=new JTextField("Dein Rateversuch","number");
  p.add(eingabeRaten);
  JButton buttonRaten=new JButton("Raten");
  p.add(buttonRaten);
  buttonRaten.setStyle("place-self", "center");
  labelFeedback=new JLabel("Ich warte auf deinen ersten Rateversuch...");
  frameGame.add(labelFeedback);
  buttonRaten.addActionListener((ev)->{
    guessedNumber=Integer.parseInt(eingabeRaten.getValue());
    guess();
  });
  JButton close=new JButton("&times;");
  frameGame.add(close);
  close.setCSS("position: absolute; right: 0; border-radius: 100%; width: 2em; height: 2em;");
  close.addActionListener((ev)->{
    frameGame.hide();
    frameStart.show();
  });
}

/*Erzeugt die UI des Start-Frames*/
void createFrameStart(){
  frameStart=new JFrame("1");
  JLabel l =new JLabel("<h1>Zahlenraten</h1>");
  frameStart.add(l);
  JTextField eingabeName=new JTextField("Gib deinen Namen ein");
  eingabeName.setStyle("width", "auto");
  eingabeName.setStyle("place-self", "center");
  frameStart.add(eingabeName);
  JButton start=new JButton("Spiel starten");
  start.setStyle("place-self", "center");
  frameStart.add(start);
  start.addActionListener((ev)->{
    userName=eingabeName.getValue();
    frameStart.hide();
    frameGame.show();
    startGame();
  });
  JButton high=new JButton("Highscore");
  high.setStyle("place-self", "center");
  frameStart.add(high);
  high.addActionListener((ev)->{
    showHighscore();
  });
}

/*Erzeugt die UI des Highscore-Frames*/
void createFrameHighscore(){
  frameHighscore=new JFrame("auto 1fr/");
  JLabel l;
  l=new JLabel("<h1>Highscore Zahlenraten</h1>");
  frameHighscore.add(l);
  labelHighscore=new JLabel("hier sollte der Highscore auftauchen...");
  frameHighscore.add(labelHighscore);
  JButton close=new JButton("&times;");
  frameHighscore.add(close);
  close.setCSS("position: absolute; right: 0; border-radius: 100%; width: 2em; height: 2em;");
  close.addActionListener((ev)->{
    frameHighscore.hide();
    frameStart.show();
  });
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
}
</script>