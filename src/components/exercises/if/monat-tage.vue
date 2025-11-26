<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Methode <Code inline>int anzahlTage(String monat)</Code> soll für den eingegebenen Monat (in der Form "Januar", "Februar", usw.) zurückgeben, wie viele Tage dieser Monat hat (in einem Jahr, das kein Schaltjahr ist). Implementiere diese Methode.
    <Example>
      <ul>
        <li>anzahlTage("Februar") &rarr; 28</li>
        <li>anzahlTage("August") &rarr; 31</li>
      </ul>
    </Example>
  </ExerciseBody>
</template>

<script>

export const data={
  id: "monat-tage",
  title: "Tage im Monat",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {
        a: await $new(Main)
      }
    },
    testcases: [
        {
          data: ()=>{
            return {month: "Januar", t: 31};
          },  
          info: 'Funktioniert für Januar.',
          points: 0.25
        },
        {
          data: ()=>{
            return {month: "Februar", t: 28};
          },  
          info: 'Funktioniert für Februar.',
          points: 0.25
        },
        {
          data: ()=>{
            return {month: "März", t: 31};
          },  
          info: 'Funktioniert für März.',
          points: 0.25
        },
        {
          data: ()=>{
            return {month: "April", t: 30};
          },  
          info: 'Funktioniert für April.',
          points: 0.25
        },
        {
          data: ()=>{
            return {month: "Mai", t: 31};
          },  
          info: 'Funktioniert für Mai.',
          points: 0.25
        },
        {
          data: ()=>{
            return {month: "Juni", t: 30};
          },  
          info: 'Funktioniert für Juni.',
          points: 0.25
        },
        {
          data: ()=>{
            return {month: "Juli", t: 31};
          },  
          info: 'Funktioniert für Juli.',
          points: 0.25
        },
        {
          data: ()=>{
            return {month: "August", t: 31};
          },  
          info: 'Funktioniert für August.',
          points: 0.25
        },
        {
          data: ()=>{
            return {month: "September", t: 30};
          },  
          info: 'Funktioniert für September.',
          points: 0.25
        },
        {
          data: ()=>{
            return {month: "Oktober", t: 31};
          },  
          info: 'Funktioniert für Oktober.',
          points: 0.25
        },
        {
          data: ()=>{
            return {month: "November", t: 30};
          },  
          info: 'Funktioniert für November.',
          points: 0.25
        },
        {
          data: ()=>{
            return {month: "Dezember", t: 31};
          },  
          info: 'Funktioniert für Dezember.',
          points: 0.25
        },
      ],
    test: async (tc,init)=>{
      let m=tc.month;
      let t=await init.a.anzahlTage(m);
      let soll=tc.t;
      return (t===soll);
    }
  },
  project: {
    name: "Tage im Monat",
    clazzes: [{
      name: "Main",
      src: `int anzahlTage (String monat){
  //hierhin kommt der Code:
  
}
  
$void main(){
  int t = anzahlTage("Februar");
  System.out.println( t );
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