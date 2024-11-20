<template>
  <ExerciseBody :exercise="$data" :java="project">
    <div>
      <AppPreview class="float-right" width="20em" height="25em" resetable @reset="example.textArea='Index Name Vorname Alter Zustand\n0 Müller Max 39 Grippe\n1 Dill Janine 24 Erkältung\n2 Meier Clara 65 gesund'">
        <JFrame layout="auto 1fr auto/">
          <JLabel>Patientenverwaltung</JLabel>
          <JTextArea v-model="example.textArea"/>
          <JPanel layout="1">
            <JLabel>Patient hinzufügen</JLabel>
            <JPanel layout="2">
              <JLabel>Name:</JLabel>
              <JTextField/>
              <JLabel>Vorname:</JLabel>
              <JTextField/>
              <JLabel>Alter:</JLabel>
              <JTextField/>
            </JPanel>
            <JButton>Hinzufügen</JButton>
            <JLabel>Zustand ändern</JLabel>
            <JPanel layout="2">
              <JLabel>Index:</JLabel>
              <JTextField/>
              <JLabel>Neuer Zustand:</JLabel>
              <JTextField/>
            </JPanel>
            <JButton>Zustand ändern</JButton>
          </JPanel>
        </JFrame>
      </AppPreview>
    </div>
    Eine Arztpraxis benötigt eine neue Software zur Verwaltung der Patienten. Diese soll die bestehenden Patientendaten anzeigen und es gestatten, neue Patienten hinzuzufügen.
    <p>
      Die Software soll (zu Testzwecken) zunächst nur maximal 20 Patienten speichern können. Zu jedem Patienten soll der Nachname, der Vorname und das Alter gespeichert werden und zusätzlich der aktuelle Zustand (entweder "gesund" oder der Name der Krankheit).
    </p>
    <p>
      Die Software soll es erlauben, neue Patienten aufzunehmen. Ein neu hinzugefügter Patient soll zunächst immer den Zustand "gesund" haben.
    </p>
    <p>
      Weiterhin soll es möglich sein, den Zustand eines beliebigen Patienten zu ändern, indem man den Index des Patienten in der Tabelle eingibt und den neuen Zustand.
    </p>
    <ol class="teilaufgaben">
      <li>Nenne die sichtbaren UI-Komponenten in der Abbildung. Gib jeweils den Zweck der Komponente für die Applikation an.</li>
      <li>Entwerfe ein UML-Klassendiagramm für die beschriebene Situation unter Verwendung der Klassen <code>Main</code> und <code>Patient</code> unter Wahrung des Geheimnisprinzips. Die UI spielt dabei keine Rolle.</li>
      <li>Implementiere die Applikation in Java unter Beachtung folgender Hinweise:
        <ul>
          <li>Wenn (noch) keine Patienten vorhanden sind, soll anstelle der Tabelle der Hinweis "Keine Patientendaten vorhanden" stehen.</li>
          <li>Neue Patienten sollen in der Tabelle immer unterhalb der bestehenden Patienten angehängt werden.</li>
          <li>Zwischen den Werten der Patienten muss immer genau ein Leerzeichen stehen.</li>
          <li>Die vorgegebene UI-Klasse darf nicht verändert werden.</li>
        </ul>
      </li>
    </ol>
  </ExerciseBody>
</template>

<script>

export const data={
  id: "oo-pat",
  example: {
    textArea: "Index Name Vorname Alter Zustand\n0 Müller Max 39 Grippe\n1 Dill Janine 24 Erkältung\n2 Meier Clara 65 gesund"
  },
  title: "Patientenverwaltung",
  check: {
    init: async ()=>{
      return {
        patienten: []
      }
    },
    test: async (tc,init)=>{
      return await tc.check(init);
    },
    testcases: [
      {
        data: ()=>{
          return {
            check: async (data)=>{
              await $Exercise.sleep(100);
              let text=$main.ui.tabelle.getValue();
              console.log("check anfang",text,$main.ui)
              return (text.trim().toLowerCase()==="keine patientendaten vorhanden");
            },
          };
        },
        count: 1,
        info: 'Am Anfang wird "Keine Patientendaten vorhanden" angezeigt.',
      },
      {
        data: ()=>{
          return {
            check: async (data)=>{
              let p={
                name: $Exercise.getRandomString(8),
                vorname: $Exercise.getRandomString(8),
                alter: $Exercise.random(1,100),
                zustand: "gesund"
              };
              data.patienten.push(p);
              $main.ui.name.setValue(p.name);
              $main.ui.vorname.setValue(p.vorname);
              $main.ui.alter.setValue(p.alter);
              $main.ui.hinzufuegen.$el.click();
              await $Exercise.sleep(100);
              let text=$main.ui.tabelle.getValue().trim();
              let soll=`Index Name Vorname Alter Zustand
0 ${p.name} ${p.vorname} ${p.alter} ${p.zustand}`;
              return soll===text;
            },
          };
        },
        count: 1,
        info: "Das Hinzufügen des*der ersten Patient*in funktioniert.",
      },
      {
        data: ()=>{
          return {
            check: async (data)=>{
              for(let i=0;i<10;i++){
                let p={
                  name: $Exercise.getRandomString(8),
                  vorname: $Exercise.getRandomString(8),
                  alter: $Exercise.random(1,100),
                  zustand: "gesund"
                };
                data.patienten.push(p);
                $main.ui.name.setValue(p.name);
                $main.ui.vorname.setValue(p.vorname);
                $main.ui.alter.setValue(p.alter);
                $main.ui.hinzufuegen.$el.click();
                await $Exercise.sleep(100);
                let text=$main.ui.tabelle.getValue().trim();
                let soll="Index Name Vorname Alter Zustand";
                for(let i=0;i<data.patienten.length;i++){
                  let p=data.patienten[i];
                  soll+=`\n${i} ${p.name} ${p.vorname} ${p.alter} ${p.zustand}`;
                }
                if(soll!==text) return false;
              }
              return true;
            },
          };
        },
        count: 1,
        info: "Das Hinzufügen neuer Patienten funktioniert.",
      },
      {
        data: ()=>{
          return {
            check: async (data)=>{
              for(let i=0;i<data.patienten.length;i++){
                let p=data.patienten[i];
                let nz=$Exercise.randomFrom(["Fieber","Blinddarm","Grippe","Ohrentzündung","Bauchweh","Kopfschmerzen"],1)[0];
                p.zustand=nz;
                $main.ui.index.setValue(i);
                $main.ui.neuerZustand.setValue(nz);
                $main.ui.zustandAendern.$el.click();
                await $Exercise.sleep(100);
                let text=$main.ui.tabelle.getValue().trim();
                let soll="Index Name Vorname Alter Zustand";
                for(let i=0;i<data.patienten.length;i++){
                  let p=data.patienten[i];
                  soll+=`\n${i} ${p.name} ${p.vorname} ${p.alter} ${p.zustand}`;
                }
                if(soll!==text) return false;
              }
              return true;
            },
          };
        },
        count: 1,
        info: "Das Ändern des Zustands bestehender Patienten funktioniert.",
      },
    ]
  },

  project: {
    name: "Patientenverwaltung",
    clazzes: [
      {
        name: "Main",
        src: `UI ui;
        
void main( ) {
  ui=new UI();
  

  //Hinzufügen-Button:
  ui.hinzufuegen.addActionListener((ev)->{
    
  });
  
  //Zustand-ändern-Button:
  ui.zustandAendern.addActionListener((ev)->{
    
  });
}`
      },
      {
        name: "UI",
        src: `JButton hinzufuegen,zustandAendern;
JTextField name,vorname,alter,index,neuerZustand;
JTextArea tabelle;

UI(){
  JFrame f=new JFrame("auto 1fr auto/");
  f.add( new JLabel("Patientenverwaltung"));
  JTextArea tabelle=new JTextArea("");
  tabelle.setValue("");
  f.add(tabelle);
  JPanel p=new JPanel(null);
  f.add(p);
  JPanel sub;
  sub=new JPanel("1");
  sub.add(new JLabel("Patient hinzufügen"));
  p.add(sub);
  sub=new JPanel("2");
  p.add(sub);
  sub.add(new JLabel("Name:"));
  JTextField name=new JTextField();
  sub.add(name);
  sub.add(new JLabel("Vorname:"));
  JTextField vorname=new JTextField();
  sub.add(vorname);
  sub.add(new JLabel("Alter:"));
  JTextField alter=new JTextField();
  sub.add(alter);
  JButton hinzu=new JButton("Hinzufügen");
  sub=new JPanel("1");
  sub.add(hinzu);
  p.add(sub);
  
  sub=new JPanel("1");
  sub.add(new JLabel("Zustand ändern"));
  p.add(sub);
  sub=new JPanel("2");
  sub.add(new JLabel("Index:"));
  JTextField index=new JTextField();
  sub.add(index);
  sub.add(new JLabel("Neuer Zustand:"));
  JTextField neuerZustand=new JTextField();
  sub.add(neuerZustand);
  p.add(sub);
  JButton zustandAendern=new JButton("Zustand ändern");
  sub=new JPanel("1");
  sub.add(zustandAendern);
  p.add(sub);

  hinzufuegen=hinzu;
  this.zustandAendern=zustandAendern;
  this.name=name;
  this.vorname=vorname;
  this.alter=alter;
  this.index=index;
  this.neuerZustand=neuerZustand;
  this.tabelle=tabelle;
}`
      },
      {
        name: "Patient",
        src: ``
      }
    ]
  }
}

export default{
  data() {
      return data;
  },
}
</script>