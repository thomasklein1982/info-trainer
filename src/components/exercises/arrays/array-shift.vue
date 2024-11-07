<template>
  <ExerciseBody :exercise="$data" :java="project">
      Die Methode <Code inline>void shiftLeft(int[] array)</Code>
      soll alle Elemente des Arrays um eine Position nach links (nach vorne) verschieben. Das erste Element des Arrays soll an die letzte Position versetzt werden.
      <Example>
        shiftLeft([3,6,9,12]) ändert das Array in [6,9,12,3]. 
      </Example>
      <p>Implementiere diese Methode.</p>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "array-shift",
  title: "Array shiften",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {a: await $new(Aufgabe)};
    },
    test: async (tc,init)=>{
      let N;
      if(tc.length!==undefined){
        N=tc.length;
      }else{
        N=$Exercise.random(7,15);
      } 
      let array=$Exercise.getRandomIntArray(N);
      let soll=[];
      for(let i=1;i<array.length;i++){
        soll[i-1]=array[i];
      }
      if(array.length>0) soll[array.length-1]=array[0];
      $Exercise.clearConsole();
      await init.a.shiftLeft(array);
      return tc.check(array,soll);
    },
    testcases: [
        {
          data: ()=>{
            return {
              length: 0,
              check: (array,soll)=>{
                return array.length===0 && soll.length===0;
              }
            }
          },
          info: "Methode funktioniert für leere Arrays.",
        },
        {
          data: ()=>{
            return {
              check: (array,soll)=>{
                for(let i=1;i<soll.length;i++){
                  if(array[i-1]!==soll[i-1]) return false;
                }
                return true;
              }
            }
          },
          points: 6,
          count: 10,
          info: "Alle Elemente (bis auf das erste) werden um 1 Position nach links verschoben.",
        },
        {
          data: ()=>{
            return {
              check: (array,soll)=>{
                return array[array.length-1]===soll[array.length-1];
              }
            }
          },
          points: 3,
          count: 10,
          info: "Das erste Element wird an die letzte Stelle geschrieben.",
        },
      ]
  },

  project: {
    name: "Array-Summe",
    clazzes: [
      {
        name: "Aufgabe",
        src: `$void shiftLeft(int[] array){
  //hierhin kommt der Code:
  
}
  
$void main(){
  shiftLeft(new int[]{3, 6, 9, 12});
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