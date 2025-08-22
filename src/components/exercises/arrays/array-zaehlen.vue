<template>
  <ExerciseBody :exercise="$data" :java="project">
      Die Methode <Code inline>int zaehlen(int[] array, int z)</Code>
      soll zurückgeben, wie oft die Zahl <Code inline>z</Code> in dem Array <Code inline>array</Code> vorkommt.
      <Example>
        <code>zaehlen([ 3, 5, -1, 5, 2, 4], 5)</code> liefert 2 zurück, weil die 5 zweimal vorkommt. 
      </Example>
      <p>Implementiere diese Methode.</p>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "array-zaehlen",
  title: "Zählen, wie oft eine Zahl vorkommt",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {a: await $new(Aufgabe)};
    },
    test: async (tc,init)=>{
      let N;
      if(tc.length==="empty"){
        N=0;
      }else{
        N=$Exercise.random(20,30);
      }
      let array=$Exercise.getRandomIntArray(N,{min: 4, max: 10});
      let z;
      if(tc.kommtVor){
        z=$Exercise.randomFrom(array,1)[0];
      }else{
        z=$Exercise.random(11,100);
      }
      let soll=0;
      for(let i=0;i<array.length;i++){
        if(array[i]===z) soll++;
      }
      $Exercise.clearConsole();
      let ist=await init.a.zaehlen(array,z);
      return soll===ist;
    },
    testcases: [
        {
          data: ()=>{
            return {
              length: "empty"
            }
          },
          info: "Die Methode funktioniert, wenn das Array leer ist.",
        },
        {
          data: ()=>{
            return {
              kommtVor: true
            }
          },
          points: 7,
          count: 10,
          info: "Die Methode funktioniert, wenn die gesuchte Zahl im Array vorkommt.",
        },
        {
          data: ()=>{
            return {
              kommtVor: false
            }
          },
          points: 2,
          count: 10,
          info: "Die Methode funktioniert, wenn die gesuchte Zahl im Array nicht vorkommt.",
        },
      ]
  },

  project: {
    name: "Vorkommen-zaehlen",
    clazzes: [
      {
        name: "Aufgabe",
        src: `int zaehlen(int[] array, int z){
  //hierhin kommt der Code:
  
}

$void main(){
  int anz = zaehlen(new int[]{3, 5, -1, 5, 7}, 5);
  System.out.println(anz);
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