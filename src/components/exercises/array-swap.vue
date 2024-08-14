<template>
  <ExerciseBody :exercise="$data">
      Die Methode <Code no-numbers>void vertauschen(int[] array, int index1, int index2)</Code>
      soll die beiden Elemente im Array <Code inline>array</Code> an den Positionen <Code inline>index1</Code> und <Code inline>index2</Code> miteinander vertauschen.
  </ExerciseBody>
</template>

<script>

export const data={
  id: "array-swap",
  title: "Array-Tausch",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {a: await $new(ArrayTausch)};
    },
    test: async (tc,init)=>{
      let array=$Exercise.getCopy(tc.array);
      let i1=tc.i[0];
      let i2=tc.i[1];
      await init.a.vertauschen(tc.array,i1,i2);
      if(array.length!==tc.array.length){
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
            let N=$Exercise.random(7,11);
            return {
              array: $Exercise.getRandomIntArray(N),
              i: $Exercise.randomFrom($Exercise.getRange(0,N-1),2)
            };
          },
          info: "Normalfall: Beide Indices liegen im richtigen Bereich.",
          count: 10,
          points: 16
        },
        {
          data: ()=>{
            return {
              array: $Exercise.getRandomIntArray(10),
              i: [$Exercise.random(0,9),$Exercise.random(10,15)],
            }
          },
          info: "Spezialfall: Der 2. Index ist zu groß."
        },
        {
          data: ()=>{
            return {
              array: $Exercise.getRandomIntArray(10),
              i: [$Exercise.random(0,9),$Exercise.random(-10,-2)]
            }
          },
          info: "Spezialfall: Der 2. Index ist zu klein."
        },
        {
          data: ()=>{
            return {
              array: $Exercise.getRandomIntArray(10),
              i: [$Exercise.random(10,15),$Exercise.random(0,9)]
            }
          },
          info: "Spezialfall: Der 1. Index ist zu groß."
        },
        {
          data: ()=>{
            return {
              array: $Exercise.getRandomIntArray(10),
              i: [$Exercise.random(-10,-1),$Exercise.random(0,9)]
            }
          },
          info: "Spezialfall: Der 1. Index ist zu klein."
        }
      ]
  },

  project: {
    name: "Array-Tausch",
    clazzes: [
      {
        name: "Aufgabe",
        src: `$void vertauschen(int[] array, int index1, int index2){
  //hierhin kommt der Code

}`,
        main: `aufgabe a = new Aufgabe();\na.vertauschen(new int[]{5,3,8,1,6,9,11},2,5);`,
        onStart: `vertauschen(new int[]{5,3,8,1,6,9,11},2,5);`
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