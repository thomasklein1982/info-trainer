<template>
  <ExerciseBody :exercise="$data" :java="project">
      Die Methode <Code no-numbers>void vertauschen(int[] array, int index1, int index2)</Code>
      soll die beiden Elemente im Array <Code inline>array</Code> an den Positionen <Code inline>index1</Code> und <Code inline>index2</Code> miteinander vertauschen.
      <p>Implementiere diese Methode.</p>
      <Hint>Du darfst davon ausgehen, dass die Indices im "richtigen" Bereich liegen.</Hint>
  </ExerciseBody>
</template>

<script>

export const data={
  id: "array-swap",
  title: "Array-Tausch",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {a: await $new(Aufgabe)};
    },
    test: async (tc,init)=>{
      let N=$Exercise.random(7,11);
      let array=$Exercise.getRandomIntArray(N);
      let i=$Exercise.randomFrom($Exercise.getRange(0,N-1),2)
      let copy=$Exercise.getCopy(array);
      let i1=i[0];
      let i2=i[1];
      await init.a.vertauschen(copy,i1,i2);
      return tc.check(array,copy,i1,i2);
      if(copy.length!==array.length){
        throw "Längen stimmen nicht überein.";
      }
      let tauschen=i1>=0 && i2>=0 && i1<array.length && i2<array.length;
      for(let i=0;i<array.length;i++){
        if(tauschen && (i===i1||i===i2)){
          if(i==i1 && tc.array[i]!==array[i2]){
            throw "Fehler";
          }
          if(i==i2 && tc.array[i]!==array[i1]){
            throw "Fehler";
          }
        }else{
          if(tc.array[i]!==array[i]){
            throw "Fehler";
          }
        }
      }
      return true;
    },
    testcases: [
        {
          data: ()=>{
            return {
              check: (arrayBefore,arrayAfter,index1,index2)=>{
                return arrayAfter[index1]===arrayBefore[index2];
              }
            }
          },
          info: "Das Element an der Stelle index2 wird an die Stelle index1 geschrieben.",
          count: 10
        },
        {
          data: ()=>{
            return {
              check: (arrayBefore,arrayAfter,index1,index2)=>{
                return arrayAfter[index2]===arrayBefore[index1];
              }
            }
          },
          info: "Das Element an der Stelle index1 wird an die Stelle index2 geschrieben.",
          count: 10
        },
        {
          data: ()=>{
            return {
              check: (arrayBefore,arrayAfter,index1,index2)=>{
                for(let i=0;i<arrayBefore.length;i++){
                  if(i===index1 || i==index2) continue;
                  if(arrayBefore[i]!==arrayAfter[i]) return false;
                }
                return true;
              }
            }
          },
          info: "Alle anderen Elemente bleiben unverändert.",
          count: 2
        },
        // {
        //   data: ()=>{
        //     return {
        //       array: $Exercise.getRandomIntArray(10),
        //       i: [$Exercise.random(0,9),$Exercise.random(10,15)],
        //     }
        //   },
        //   info: "Spezialfall: Der 2. Index ist zu groß."
        // },
        // {
        //   data: ()=>{
        //     return {
        //       array: $Exercise.getRandomIntArray(10),
        //       i: [$Exercise.random(0,9),$Exercise.random(-10,-2)]
        //     }
        //   },
        //   info: "Spezialfall: Der 2. Index ist zu klein."
        // },
        // {
        //   data: ()=>{
        //     return {
        //       array: $Exercise.getRandomIntArray(10),
        //       i: [$Exercise.random(10,15),$Exercise.random(0,9)]
        //     }
        //   },
        //   info: "Spezialfall: Der 1. Index ist zu groß."
        // },
        // {
        //   data: ()=>{
        //     return {
        //       array: $Exercise.getRandomIntArray(10),
        //       i: [$Exercise.random(-10,-1),$Exercise.random(0,9)]
        //     }
        //   },
        //   info: "Spezialfall: Der 1. Index ist zu klein."
        // }
      ]
  },

  project: {
    name: "Array-Tausch",
    clazzes: [
      {
        name: "Aufgabe",
        src: `$void vertauschen(int[] array, int index1, int index2){
  //hierhin kommt der Code
  
}
  
$void main(){
  vertauschen(new int[]{5,3,8,1,6,9,11},2,5);
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