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
      return {a: await $new(Aufgabe), n: 400};
    },
    test: async (tc,init)=>{
      if(tc.laufzeit){
        alert("Die Laufzeit wird überprüft. Das kann einige Sekunden dauern.")
        let n=500;
        let array;
        let lastTime,start=0,stop=0,time=-1;
        let gesucht;
        let msg="Laufzeit-Überprüfung abgeschlossen.";
        do{
          n*=2;
          if(n>10000000){
            alert(msg)
            return true;
          }
          array=$Exercise.getRandomIntArray(n,{sorted: true, forbidMultiple: true});
          gesucht=array[0]-1;
          lastTime=time;
          start=Date.now();
          await init.a.schnelleSuche(array,gesucht,0,array.length-1);
          stop=Date.now();
          time=stop-start;
        }while(stop-start<2000 || lastTime===-1);
        console.log(lastTime,time,n);
        alert(msg);
        return (time<lastTime*1.2);
      }
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
      let ist=await init.a.schnelleSuche(array,gesucht,0,array.length-1);
      if(soll!==ist) return false;

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
      ist=await init.a.schnelleSuche(array,gesucht,0,array.length-1);
      if(soll!==ist) return false;
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
      },
      {
        data: ()=>{
          return {
            laufzeit: true
          }
        },
        count: 1,
        info: "Die Laufzeit ist schneller as linear",
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