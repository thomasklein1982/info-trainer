<template>
  <Exercise title="Array-Tausch" :exercise="$data">
    <template #exercise>
      Die Methode <Code>void vertauschen(int[] array, int index1, int index2)</Code>
      soll die beiden Elemente im Array <Code inline>array</Code> an den Positionen <Code inline>index1</Code> und <Code inline>index2</Code> miteinander vertauschen.
    </template>
  </Exercise>
</template>

<script>


export default{
  components: {
    
  },
  data() {
      return {
        id: "arraytausch",
        title: "Array-Tausch",
        check: {
          init: async ()=>{
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
          testcases: ()=>{
            return [
              {
                data: ()=>{
                  let N=$Exercise.random(7,11);
                  return {
                    array: $Exercise.getRandomIntArray(N),
                    i: $Exercise.randomFrom($Exercise.getRange(0,N-1),2)
                  };
                },
                info: "Normalfall: Beide Indices liegen im richtigen Bereich.",
                count: 10
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
        },

        project: {
          name: "Array-Tausch",
          clazzes: [
`class ArrayTausch{
  void vertauschen(int[] array, int index1, int index2){
    //hierhin kommt der Code
  }
}`,
//             {
//               isHidden: true,
//               src: `class Aufgabe{
//   ArrayTausch a;
//   Aufgabe(){
//     a=new ArrayTausch();
//     /*JAVASCRIPT-CODE
//       $Exercise.checkTestCases(a,);
//     */
//     checkSolution();
//   }

//   public static void main(String[] args){
//     new Aufgabe();
//   }
//   void vertauschen(int[] array, int index1, int index2){
//     if(index1<0 || index2<0 || index1>=array.length || index2>=array.length) return;
//     int c=array[index1];
//     array[index1]=array[index2];
//     array[index2]=c;
//   }
//   void checkSolution(){
//     /*JAVASCRIPT-CODE
//       let testcases=[
//         {
//           array: $Exercise.getRandomIntArray(7),
//           i: $Exercise.randomFrom($Exercise.getRange(0,6),2),
//           info: "Normalfall: Beide Indices liegen im richtigen Bereich."
//         },
//         {
//           array: $Exercise.getRandomIntArray(10),
//           i: [$Exercise.random(0,9),$Exercise.random(10,15)],
//           info: "Spezialfall: Der 2. Index ist zu groß."
//         },
//         {
//           array: $Exercise.getRandomIntArray(10),
//           i: [$Exercise.random(0,9),$Exercise.random(-10,-2)],
//           info: "Spezialfall: Der 2. Index ist zu klein."
//         },
//         {
//           array: $Exercise.getRandomIntArray(10),
//           i: [$Exercise.random(10,15),$Exercise.random(0,9)],
//           info: "Spezialfall: Der 1. Index ist zu groß."
//         },
//         {
//           array: $Exercise.getRandomIntArray(10),
//           i: [$Exercise.random(-10,-1),$Exercise.random(0,9)],
//           info: "Spezialfall: Der 1. Index ist zu klein."
//         },
//       ];
//       let max=testcases.length;
//       let infos=[];
//       for (let i = 0; i < testcases.length; i++) {
//         let tc=testcases[i];
//         infos.push(tc.info);
//         let copy=JSON.parse(JSON.stringify(tc.array));
//         try{
//           await this.a.vertauschen(tc.array,tc.i[0],tc.i[1]);
//           await this.vertauschen(copy,tc.i[0],tc.i[1]);
//           let b=await this.check(copy,tc.array);
//           if(!b){
//             $Exercise.sendFeedback(i,max,infos);    
//             return;
//           }
//         }catch(e){
//           $Exercise.sendFeedback(i,max,infos);
//           return;
//         }
//       }
//       $Exercise.sendCompleted(max,infos);
//     */
//   }
//   boolean check(int[] array, int[] sol){
//     if(array.length!=sol.length) return false;
//     for (int i = 0; i < sol.length; i++) {
//       if(array[i]!=sol[i]){
//         return false;
//       }
//     }
//     return true;
//   }
// }`
//             }
          ]
        }
      };
  },
}
</script>