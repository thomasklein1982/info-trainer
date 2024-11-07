<template>
  <ExerciseBody :exercise="$data" :java="project">
    Es sollen mehrere Methoden implementiert werden:
      <ol class="teilaufgaben">
        <li>Die Methode <Code inline no-numbers>??? erzeugeArray1()</Code> soll ein Array erzeugen, das Platz für 100 ganze Zahlen hat, und dieses Array zurückgeben.</li>
        <li>Die Methode <Code inline no-numbers>??? erzeugeArray2()</Code> soll ein Array mit den Einträgen <code>"red"</code>, <code>"blue"</code>, <code>"yellow"</code> und <code>"green"</code> erzeugen (in dieser Reihenfolge) und zurückgeben.</li>
      </ol>
      Implementiere diese Methoden.
      <Hint>'???' bedeutet, dass du die korrekten Datentypen eingeben musst, damit das Programm funktioniert.</Hint>
  </ExerciseBody>
</template>

<script>

export const data={
  id: "array-erzeugen",
  title: "Erzeugen von Arrays",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {
        a: await $new(Aufgabe)
      };
    },
    test: async (tc,init)=>{
      $Exercise.clearConsole();
      return await tc.check(init);
    },
    testcases: [
      {
        data: ()=>{
          return {
            check: async (init)=>{
              let array=await init.a.erzeugeArray1();
              return array!==null & array!==undefined && array.length===100 && array.$type==="int";
            }
          };
        },
        count: 1,
        info: "Die Methode erzeugeArray1 funktioniert und liefert ein Array zurück mit Platz für 100 ganze Zahlen.",
      },
      {
        data: ()=>{
          return {
            check: async (init)=>{
              let array=await init.a.erzeugeArray2();
              if(!array || array.length!==4 || array.$type!=="String") return false;
              let soll=["red","blue","yellow","green"];
              for(let i=0;i<soll.length;i++){
                if(array[i]!==soll[i]) return false;
              }
              return true;
            }
          };
        },
        count: 1,
        info: "Die Methode erzeugeArray2 funktioniert und liefert ein Array zurück mit den Strings 'red', 'blue', 'yellow', 'green'.",
      },
    ]
  },

  project: {
    name: "Arrays-Erzeugen",
    clazzes: [
      {
        name: "Aufgabe",
        src: `??? erzeugeArray1(){
  //hierhin kommt der Code:

}
  
??? erzeugeArray2(){
  //hierhin kommt der Code:
  
}
  
$void main(){
  System.out.println( erzeugeArray1() );
  System.out.println( erzeugeArray2() );
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