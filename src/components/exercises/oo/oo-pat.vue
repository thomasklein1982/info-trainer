<template>
  <ExerciseBody :exercise="$data" :java="project">
    <div>
      <AppPreview class="float-right" width="20em" height="28em" resetable @reset="demo.reset()">
        <JFrame layout="auto 1fr auto/">
          <JLabel>Patientenverwaltung</JLabel>
          <JTextArea v-model="demo.data"/>
          <JPanel layout="1">
            <JLabel>Patient hinzufügen</JLabel>
            <JPanel layout="2">
              <JLabel>Name:</JLabel>
              <JTextField v-model="demo.name"/>
              <JLabel>Vorname:</JLabel>
              <JTextField v-model="demo.vorname"/>
              <JLabel>Alter:</JLabel>
              <JTextField v-model="demo.alter"/>
            </JPanel>
            <JButton @click="demo.add()">Hinzufügen</JButton>
            <JLabel>Zustand ändern</JLabel>
            <JPanel layout="2">
              <JLabel>Index:</JLabel>
              <JTextField v-model="demo.index"/>
              <JLabel>Neuer Zustand:</JLabel>
              <JTextField v-model="demo.zustand"/>
            </JPanel>
            <JLabel>Patient löschen</JLabel>
            <JPanel layout="2">
              <JLabel>Index:</JLabel>
              <JTextField v-model="demo.indexRemove"/>
            </JPanel>
            <JButton @click="demo.remove()">Entfernen</JButton>
          </JPanel>
        </JFrame>
      </AppPreview>
    </div>
    Eine Arztpraxis benötigt eine neue Software zur Verwaltung der Patienten. Diese soll die bestehenden Patientendaten anzeigen und es gestatten, neue Patienten hinzuzufügen.
    <p>
      Die Patientenverwaltung soll (zu Testzwecken) zunächst nur maximal 20 Patienten speichern können. Zu jedem Patienten soll der Nachname, der Vorname und das Alter gespeichert werden und zusätzlich der aktuelle Zustand (entweder "gesund" oder der Name der Krankheit).
    </p>
    <p>
      Die Software soll es erlauben, neue Patienten aufzunehmen. Ein neu hinzugefügter Patient soll zunächst immer den Zustand "gesund" haben.
    </p>
    <p>
      Weiterhin soll es möglich sein, den Zustand eines beliebigen Patienten zu ändern, indem man den Index des Patienten in der Tabelle eingibt und den neuen Zustand und dann auf "Zustand ändern" klickt.
    </p>
    <p>
      Außerdem soll man einen beliebigen Patienten entfernen können, indem man den Index des Patienten in der Tabelle eingibt und auf "Entfernen" klickt.
    </p>
    <ol class="teilaufgaben">
      <li>Nenne die sichtbaren UI-Komponenten in der Abbildung. Beschreibe jeweils den Zweck der Komponente für die Applikation.</li>
      <li>Entwerfe ein UML-Klassendiagramm für die beschriebene Situation unter Verwendung der Klassen <code>Patientenverwaltung</code> und <code>Patient</code> unter Wahrung des Geheimnisprinzips. Die Main-Klasse und die UI spielen dabei keine Rolle.</li>
      <li>Implementiere die Applikation in Java unter Beachtung folgender Vorgaben:
        <ul>
          <li>Wenn (noch) keine Patienten vorhanden sind, soll anstelle der Tabelle der Hinweis "Keine Patientendaten vorhanden" stehen.</li>
          <li>Neue Patienten sollen in der Tabelle immer unterhalb der bestehenden Patienten angehängt werden.</li>
          <li>Zwischen den Werten der Patienten muss immer genau ein Leerzeichen stehen.</li>
          <li>Die vorgegebene UI-Klasse darf nicht verändert werden.</li>
          <li>Die Hauptklasse darf nur die beiden vorgegebenen Attribute <Code inline>ui</Code> und <Code inline>verwaltung</Code> besitzen.</li>
          <li>Das Geheimnisprinzip muss umgesetzt werden.</li>
        </ul>
      </li>
    </ol>
  </ExerciseBody>
</template>

<script>

export const data={
  id: "oo-pat",
  title: "Patientenverwaltung",
  demo: {
    data: "",
    name: "",
    vorname: "",
    zustand: "",
    index: "",
    alter: "",
    patienten: [],
    reset(){
      this.patienten=[
        ["Müller","Max","39","Grippe"],
        ["Dill","Janine","24","Erkältung"],
        ["Meier","Clara","65","gesund"],
      ];
      this.name="";
      this.vorname="";
      this.zustand="";
      this.index="";
      this.alter="";
      this.createText();
    },
    createText(){
      if(this.patienten.length===0){ 
        this.data="Keine Patientendaten vorhanden";
        return;
      }
      let t="Index Name Vorname Alter Zustand";
      for(let i=0;i<this.patienten.length;i++){
        let p=this.patienten[i];
        t+="\n"+(i)+" "+p.join(" ");
      }
      this.data=t;
    },
    add(){
      this.patienten.push([this.name,this.vorname,this.alter,"gesund"]);
      this.createText();
    },
    change(){
      let i=this.index*1;
      if(isNaN(i)) return;
      if(i<0 || i>=this.patienten.length) return;
      this.patienten[i][3]=this.zustand;
      this.createText();
    },
    remove(){
      let i=this.indexRemove*1;
      if(isNaN(i)) return;
      if(i<0 || i>=this.patienten.length) return;
      this.patienten.splice(i,1);
      this.createText();
    }
  },
  check: {
    init: async ()=>{
      await $main.main();
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
              console.log("check anfang 1",$main.ui);
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
              console.log("check entfernen",data.patienten);
              let order=[2,3,1,0,0];
              for(let i=0;i<order.length;i++){
                let index=order[i];
                let rem=data.patienten.splice(index,1);
                console.log("entfernt",index,rem);
                await $main.ui.indexEntfernen.setValue(index+"");
                $main.ui.entfernen.$el.click();
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
        info: "Das Entfernen von Patienten funktioniert.",
      },
      {
        data: ()=>{
          return {
            check: async (data)=>{
              for(let i=0;i<data.patienten.length;i++){
                let p=data.patienten[i];
                let nz=$Exercise.randomFrom(["Fieber","Blinddarm","Grippe","Ohrentzündung","Bauchweh","Kopfschmerzen"],1)[0];
                p.zustand=nz;
                $main.ui.indexAendern.setValue(i);
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
      {
        data: ()=>{
          return {
            check: async (data)=>{
              let clazz=$object_getClass($main);
              console.log("check main",clazz);
              let attributeCount=0;
              for(let a in clazz.attributes){
                let attr=clazz.attributes[a];
                if(a!=="verwaltung" && a!=="ui") return false;
                attributeCount++;
              }
              if(attributeCount!==2) return false;
              return true;
            },
          };
        },
        count: 1,
        info: "Die Hauptklasse hat nur die beiden Attribute 'ui' und 'verwaltung'.",
      },
      {
        data: ()=>{
          return {
            check: async (data)=>{
              let clazz=$clazzRuntimeInfos.Patient;
              console.log("clazz patient",clazz);
              let attributeCount=0;
              for(let a in clazz.attributes){
                let attr=clazz.attributes[a];
                console.log(attr);
                if(attr.vis!=="private") return false;
                attributeCount++;
              }
              if(attributeCount===0) return false;
              return true;
            },
          };
        },
        count: 1,
        info: "Das Geheimnisprinzip wurde für die Klasse Patient umgesetzt.",
      },
      {
        data: ()=>{
          return {
            check: async (data)=>{
              let clazz=$clazzRuntimeInfos.Patientenverwaltung;
              console.log("clazz",clazz);
              let attributeCount=0;
              for(let a in clazz.attributes){
                let attr=clazz.attributes[a];
                console.log(attr);
                if(attr.vis!=="private") return false;
                attributeCount++;
              }
              if(attributeCount===0) return false;
              return true;
            },
          };
        },
        count: 1,
        info: "Das Geheimnisprinzip wurde für die Klasse Patientenverwaltung umgesetzt.",
      },
    ]
  },

  project: {
    name: "Patientenverwaltung",
    clazzes: [
      {
        name: "Main",
        src: `UI ui = new UI();
Patientenverwaltung verwaltung = new Patientenverwaltung();

void main( ) {
  
  //Hinzufügen-Button:
  ui.hinzufuegen.addActionListener((ev)->{
    
  });
  
  //Zustand-ändern-Button:
  ui.zustandAendern.addActionListener((ev)->{
    
  });

  //Entfernen-Button:
  ui.entfernen.addActionListener((ev)->{
    
  });
}`
      },
      {
        name: "Patientenverwaltung",
        src: ``
      },
      {
        name: "Patient",
        src: ``
      },
      {
        name: "UI",
        src: `JButton hinzufuegen,zustandAendern, entfernen;
JTextField name,vorname,alter,indexAendern,neuerZustand, indexEntfernen;
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

  sub.add(new JLabel("Patient löschen"));
  p.add(sub);
  sub=new JPanel("2");
  sub.add(new JLabel("Index:"));
  JTextField indexRemove=new JTextField();
  sub.add(indexRemove);
  p.add(sub);
  JButton entfernen=new JButton("Entfernen");
  sub=new JPanel("1");
  sub.add(entfernen);
  p.add(sub);

  hinzufuegen=hinzu;
  this.zustandAendern=zustandAendern;
  this.name=name;
  this.vorname=vorname;
  this.alter=alter;
  this.indexAendern=index;
  this.neuerZustand=neuerZustand;
  this.tabelle=tabelle;
  this.indexEntfernen=indexRemove;
  this.entfernen=entfernen;
}`
      },
    ]
  }
}

export default{
  data() {
      return data;
  },
}
</script>