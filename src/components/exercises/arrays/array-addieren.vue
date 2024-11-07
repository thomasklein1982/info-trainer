<template>
  <ExerciseBody :exercise="$data" :java="project">
      Die Methode <Code inline>int[] addieren(int[] array1, int[] array2)</Code>
      soll folgendes bewirken:
      <ol>
        <li>Falls die beiden Arrays unterschiedliche Länge haben, soll <Code inline>null</Code> zurückgegeben werden.</li>
        <li>Andernfalls soll ein neues <code>int</code>-Array zurückgegeben werden, dessen Elemente die Summe der Elemente der beiden Arrays sind (siehe Beispiel).</li>
      </ol>
      <Example>
        <code>addieren([ 3, 5, -1], [ 6, 2, 4])</code> liefert das Array <code>[ 3 + 6, 5 + 2, -1 + 4]</code> = <code>[ 9, 7, 3]</code> zurück. 
      </Example>
      <p>Implementiere diese Methode.</p>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "array-addieren",
  title: "Zwei Arrays addieren",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {a: await $new(Aufgabe)};
    },
    test: async (tc,init)=>{
      let N1,N2;
      if(tc.length==="empty"){
        N1=0;
        N2=0;
      }else if(tc.length==="different"){
        let N=$Exercise.randomFrom($Exercise.getRange(7,15),2);
        N1=N[0];
        N2=N[1];
      }else{
        N1=$Exercise.random(7,15);
        N2=N1;
      }
      let array1=$Exercise.getRandomIntArray(N1);
      let array2=$Exercise.getRandomIntArray(N2);
      let soll;
      if(array1.length!==array2.length){
        soll=null;
      }else{
        soll=[];
        for(let i=0;i<array1.length;i++){
          soll.push(array1[i]+array2[i]);
        }
      }
      $Exercise.clearConsole();
      let ist=await init.a.addieren(array1,array2);
      if(soll===null){
        return ist===null;
      }
      if(soll.length!==ist.length) return false;
      for(let i=0;i<ist.length;i++){
        if(soll[i]!==ist[i]) return false;
      }
      return true;
    },
    testcases: [
        {
          data: ()=>{
            return {
              length: "empty"
            }
          },
          info: "Die Methode funktioniert, wenn beide Arrays leer sind.",
        },
        {
          data: ()=>{
            return {
              length: "equal"
            }
          },
          points: 7,
          count: 10,
          info: "Die Methode funktioniert, wenn beide Arrays dieselbe Länge haben.",
        },
        {
          data: ()=>{
            return {
              length: "different"
            }
          },
          points: 2,
          count: 10,
          info: "Die Methode funktioniert, wenn beide Arrays eine unterschiedliche Länge haben.",
        },
      ]
  },

  project: {
    name: "Arrays-Addieren",
    clazzes: [
      {
        name: "Aufgabe",
        src: `int[] addieren(int[] array1, int[] array2){
  //hierhin kommt der Code:
  
}
$void main(){
  int[] s = addieren(new int[]{3, 5, -1}, new int[]{ 6, 2, 4}); 
  System.out.println(s);
}`,
        main: `Aufgabe a = new Aufgabe();\nint[] s = a.addieren(new int[]{3, 5, -1}, new int[]{ 6, 2, 4}); System.out.println(s);`,
        onStart: `int[] s = addieren(new int[]{3, 5, -1}, new int[]{ 6, 2, 4}); System.out.println(s);`
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