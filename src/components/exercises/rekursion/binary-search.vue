<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Methode <Code inline>int schnelleSuche( int[] array, int gesucht, int von, int bis )</Code> soll das aufsteigend sortierte <Code inline>array</Code> nach einem Auftreten der Zahl <Code inline>gesucht</Code> im Bereich von Index <Code inline>von</Code> bis Index <Code inline>bis</Code> durchsuchen und deren Position im Array zurückgeben (oder -1, falls die gesuchte Zahl in diesem Bereich des Arrays nicht vorkommt). 
    <p>Darüber hinaus muss die Methode eine Laufzeit haben, die besser ist als linear.</p>

    <Example>
      <ul>
        <li><code>schnelleSuche ( [ 3, 5, 6, 9, 10], 5, 0, 4 )</code> &rarr; 1 (die 5 steht an Index 1)</li>
        <li><code>schnelleSuche ( [ 3, 5, 6, 9, 10], 5, 3, 4 )</code> &rarr; -1 (die 5 steht an Index 1 und dieser liegt außerhalb des Bereichs von 3 bis 4)</li>
        <li><code>schnelleSuche ( [ 3, 5, 6, 9, 10], 4, 0, 3 )</code> &rarr; -1 (die 4 kommt überhaupt nicht vor)</li>
      </ul>
    </Example>
    <p>Implementiere diese Methode ohne Verwendung von Schleifen.</p>
    <Hint>Beachte, dass das Array aufsteigend sortiert ist!</Hint>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "binary-search",
  title: "Binäre Suche",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {a: await $new(Aufgabe), n: 4000};
    },
    test: async (tc,init)=>{
      let array=$Exercise.getRandomIntArray(init.n,{sorted: true, forbidMultiple: true});
      let index=tc.index;
      if(tc.index===2) index=array.length-1;
      else if(tc.index===1) index=$Exercise.random(1,array.length-2);
      else if(tc.index===-1){
        index=$Exercise.random(1,array.length-2);
      }
      let gesucht=array[index];
      if(tc.index===-1){
        array.splice(index,1);
        soll=-1;
      }else{
        soll=index;
      }
      let start=new Date();
      let ist=await init.a.schnelleSuche(array,gesucht,0,array.length-1);
      let stop=new Date();
      if(soll!==ist) return false;
      let time1=stop-start;
      if(time1<100) return true;

      array=$Exercise.getRandomIntArray(init.n*2,{sorted: true, forbidMultiple: true});
      index=tc.index;
      if(tc.index===2) index=array.length-1;
      else if(tc.index===1) index=$Exercise.random(1,array.length-2);
      else if(tc.index===-1){
        index=$Exercise.random(1,array.length-2);
      }
      gesucht=array[index];
      if(tc.index===-1){
        array.splice(index,1);
        soll=-1;
      }else{
        soll=index;
      }
      start=new Date();
      ist=await init.a.schnelleSuche(array,gesucht,0,array.length-1);
      stop=new Date();
      if(soll!==ist) return false;
      
      let time2=stop-start;
      if(time2>time1*1.6){
        throw "Klappt, aber dein Algorithmus ist zu langsam.";
      }
      return true;
    },
    testcases: [
      {
        data: ()=>{
          return {
            index: 0
          }
        },
        count: 1,
        info: "Funktioniert, wenn die gesuchte Zahl an erster Stelle steht.",
      },
      {
        data: ()=>{
          return {
            index: 2
          }
        },
        count: 1,
        info: "Funktioniert, wenn die gesuchte Zahl an letzter Stelle steht.",
      },
      {
        data: ()=>{
          return {
            index: 1
          }
        },
        count: 10,
        info: "Funktioniert, wenn die gesuchte Zahl irgendwo im Inneren steht.",
      },
      {
        data: ()=>{
          return {
            index: -1
          }
        },
        count: 1,
        info: "Funktioniert, wenn die gesuchte Zahl gar nicht im Array vorkommt.",
      }
    ]
  },

  project: {
    name: "Binäre Suche",
    constraints: {
      loops: true,
    },
    clazzes: [
      {
        name: "Aufgabe",
        src: `int schnelleSuche( int[] array, int gesucht, int von, int bis ){
  //hierhin kommt der Code:
  
}

$void main(){
  int i = schnelleSuche ( new int[]{ 2, 3, 6, 8, 9, 13, 14, 16 }, 14, 0, 7 );
  System.out.println(i);
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