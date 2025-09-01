<template>
  <ExerciseBody :exercise="$data" :java="project">
    <p>Ein Onlinehändler hat sowohl Angestellte als auch Kunden. Für ein Verwaltungsprogramm sollen daher drei Klassen implementiert werden: <code>Mensch</code>, <code>Angestellter</code> und <code>Kunde</code>. Dabei gilt</p>
    <ul>
      <li>Jeder Mensch hat einen Vor- und einen Nachnamen.</li>
      <li>Jede*r Angestellte*r hat (zusätzlich) eine Personalnummer (eine ganze Zahl) und ein monatliches Gehalt (eine beliebige Zahl).</li>
      <li>Jede*r Kunde*in hat (zusätzlich) eine Kundennummer (eine ganze Zahl).</li>
      <li>Jede Klasse verfügt über eine Methode <Code inline>void printInfos()</Code> die die Informationen über die Person in der Konsole ausgibt in folgender Form:
        <ConsoleOutput>Name: nachname, vorname
Personalnummer: personalnummer, Gehalt: gehalt
Kundennummer: kundennummer
        </ConsoleOutput>
        Dabei soll die zweite Zeile nur bei Angestellten ausgegeben werden und die dritte Zeile nur bei Kunden (es werden also immer höchstens zwei Zeilen ausgegeben).
      </li>
    </ul>
    <ol class="teilaufgaben">
      <li>Entscheide mit Begründung, welche der drei Klassen die Oberklasse der anderen beiden Klasse darstellt.</li>
      <li>Erläutere den Code der Klasse <code>Mensch</code>:
        <Code>class Mensch{
  private String nachname, vorname;

  Mensch( String nachname, String vorname){
    this.nachname = nachname;
    this.vorname = vorname;
  }

  void printInfos(){
    System.out.println( "Name: " + nachname + ", " + vorname );
  }
}
        </Code>
      </li>
      <li>Implementiere die Klassen <code>Angestellter</code> und <code>Kunde</code> unter Beachtung folgender Details:
        <ol>
          <li>Die Vererbung muss korrekt umgesetzt werden.</li>
          <li>Der Konstruktor der Klasse <code>Angestellter</code> soll folgende Signatur besitzen: <code>Angestellter ( String nachname, String vorname, int personalnummer, double gehalt )</code>.</li>
          <li>Der Konstruktor der Klasse <code>Kunde</code> soll folgende Signatur besitzen: <code>Kunde ( String nachname, String vorname, int kundennummer )</code>.</li>
          <li>Beide Klassen sollen außerdem eine Methode <code>void printInfos( )</code> gemäß obiger Beschreibung implementieren.</li>
        </ol>
      </li>
      <li>Später fällt den Software-Entwickler*innen auf, dass sie zusätzlich die Privatadresse und die Lieferadresse speichern müssen.
        <p>Beurteile, welcher Klasse das jeweilige neue Attribut zugeordnet werden sollte.</p>
      </li>
    </ol>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "oo-inherit",
  title: "Kunden sind auch Menschen?!?",
  check: {
    init: async ()=>{
      let classMenschExists=true;
      let classAngestellterExists=true;
      let classKundeExists=true;

      try{if(Mensch){}}catch(e){classMenschExists=false;}
      try{if(Angestellter){}}catch(e){classAngestellterExists=false;}
      try{if(Kunde){}}catch(e){classKundeExists=false;}
      return {
        classKundeExists, classMenschExists, classAngestellterExists
      };
    },
    test: async (tc,init)=>{
      return (await tc.check(init));
    },
    testcases: [
        {
          info: "Es existiert eine Klasse Mensch.",
          data: ()=>{
            return {
              check: async (init)=>{
                return init.classMenschExists;
              },
            };
          },
          count: 1,
        },
        {
          info: "Es existiert eine Klasse Kunde.",
          data: ()=>{
            return {
              check: async (init)=>{
                return init.classKundeExists;
              },
            };
          },
          count: 1,
        },
        {
          info: "Es existiert eine Klasse Angestellter.",
          data: ()=>{
            return {
              check: async (init)=>{
                return init.classAngestellterExists;
              },
            };
          },
          count: 1,
        },
        {
          info: "Die Vererbung wurde richtig umgesetzt.",
          data: ()=>{
            return {
              check: async (init)=>{
                if(!init.classKundeExists || !init.classAngestellterExists || !init.classMenschExists) return false;
                if(Angestellter.prototype instanceof Mensch && Kunde.prototype instanceof Mensch) return true;
                return false;
              },
            };
          },
          count: 1,
        },
        {
          info: "Der Konstruktor von Angestellter funktioniert.",
          data: ()=>{
            return {
              check: async (init)=>{
                if(!init.classKundeExists || !init.classAngestellterExists || !init.classMenschExists) return false;
                let data={
                  personalnummer: 563738,
                  gehalt: 3657.78
                };
                let nachname="Turing";
                let vorname="Alan";
                let a = await $Exercise.createInstance(Angestellter,nachname,vorname, data.personalnummer, data.gehalt);
                if(!a) return false;
                if(a.nachname!==nachname || a.vorname!==vorname) return false;
                let found;
                for(let dat in data){
                  found=false;
                  for(let at in a){
                    if(a[at]===data[dat]){
                      found=true;
                      break;
                    }
                  }
                  if(!found) return false;
                }
                return true;
              },
            };
          },
          count: 1,
        },
        {
          info: "Der Konstruktor von Kunde funktioniert.",
          data: ()=>{
            return {
              check: async (init)=>{
                if(!init.classKundeExists || !init.classAngestellterExists || !init.classMenschExists) return false;
                let data={
                  kundennummer: 57383
                };
                let nachname="Hopper";
                let vorname="Grace";
                let a = await $Exercise.createInstance(Kunde,nachname,vorname, data.kundennummer);
                if(!a) return false;
                if(a.nachname!==nachname || a.vorname!==vorname) return false;
                let found;
                for(let dat in data){
                  found=false;
                  for(let at in a){
                    if(a[at]===data[dat]){
                      found=true;
                      break;
                    }
                  }
                  if(!found) return false;
                }
                return true;
              },
            };
          },
          count: 1,
        },
        {
          info: "Die Methode printInfos von Angestellter funktioniert.",
          data: ()=>{
            return {
              check: async (init)=>{
                if(!init.classKundeExists || !init.classAngestellterExists || !init.classMenschExists) return false;
                let gehalt=$Exercise.random(10000,100000)*0.1;
                let pnr=$Exercise.random(100000,999999);
                let nachname=$Exercise.getRandomString(6);
                let vorname=$Exercise.getRandomString(6);
                let a = await $Exercise.createInstance(Angestellter,nachname,vorname, pnr, gehalt);
                if(!a) return false;
                $Exercise.clearConsole();
                await a.printInfos();
                let text=$Exercise.getConsoleContent();
                console.log("Text",text);
                if(text.length!==2) return false;
                if(text[0]!=="Name: "+nachname+", "+vorname) return false;
                if(text[1]!=="Personalnummer: "+pnr+", Gehalt: "+gehalt) return false;
                return true;
              },
            };
          },
          count: 5,
        },
        {
          info: "Die Methode printInfos von Kunde funktioniert.",
          data: ()=>{
            return {
              check: async (init)=>{
                if(!init.classKundeExists || !init.classAngestellterExists || !init.classMenschExists) return false;
                let knr=$Exercise.random(100000,999999);
                let nachname=$Exercise.getRandomString(6);
                let vorname=$Exercise.getRandomString(6);
                let k = await $Exercise.createInstance(Kunde,nachname,vorname, knr);
                if(!k) return false;
                $Exercise.clearConsole();
                await k.printInfos();
                let text=$Exercise.getConsoleContent();
                if(text.length!==2) return false;
                if(text[0]!=="Name: "+nachname+", "+vorname) return false;
                if(text[1]!=="Kundennummer: "+knr) return false;
                return true;
              },
            };
          },
          count: 5,
        },
      ]
  },

  project: {
    name: "oo-inherit",
    clazzes: [
      {
        name: "Aufgabe",
        src: `$void main(){
  
}`
      },
      {
        name: "Mensch",
        src: `private String nachname, vorname;

Mensch( String nachname, String vorname){
  this.nachname = nachname;
  this.vorname = vorname;
}

void printInfos(){
  System.out.println( "Name: " + nachname + ", " + vorname );
}`
      }
    ]
  }
}

export default{
  components: {
    
  },
  data() {
      return data;
  },
}
</script>