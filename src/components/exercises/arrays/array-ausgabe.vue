<template>
  <ExerciseBody :exercise="$data" :java="project">
      Die Methode <Code no-numbers>void ausgeben(String[] array)</Code>
      soll alle Elemente des Arrays untereinander in der Konsole ausgeben.
      <Example>
        Der Aufruf <Code no-numbers>ausgeben(new String[]{"Elefant","Löwe","Zebra","Känguru","Giraffe"})</Code>
        soll zu folgender Konsolenausgabe führen:
        <ConsoleOutput>Elefant
Löwe
Zebra
Känguru
Giraffe
        </ConsoleOutput>
      </Example>
      <p>Implementiere diese Methode.</p>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "array-ausgabe",
  title: "Array-Ausgabe",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {a: await $new(Aufgabe)};
    },
    test: async (tc,init)=>{
      let N=$Exercise.random(7,11);
      let array1=$Exercise.getRandomObjectArray({strings: ["Löwe","Zebra","Kamel","Känguru","Giraffe","Lama","Gnu","Elefant","Nashorn","Nilpferd","Hyäne","Dromedar","Erdmännchen"]},N);
      //array=array.strings;
      let array=[];
      for(let i=0;i<array1.length;i++){
        array.push(array1[i].strings);
      }
      let copy=$Exercise.getCopy(array);
      $Exercise.clearConsole();
      await init.a.ausgeben(copy);
      let output=$Exercise.getConsoleContent();
      $Exercise.clearConsole();
      return tc.check(array,output);
      
    },
    testcases: [
        {
          data: ()=>{
            return {
              check: (array,output)=>{
                if(!(output.length===array.length || output.length===array.length+1 && output[output.length-1].length===0)) return false;
                for(let i=0;i<array.length;i++){
                  if(output[i]!==array[i]){
                    return false;
                  }
                }
                return true;
              }
            }
          },
          info: "Alle Elemente werden in richtiger Reihenfolge untereinander ausgegeben.",
          count: 10
        },
      ]
  },

  project: {
    name: "Array-Ausgabe",
    clazzes: [
      {
        name: "Aufgabe",
        src: `$void ausgeben(String[] array){
  //hierhin kommt der Code:
  
}
$void main(){
  ausgeben(new String[]{"Elefant","Löwe","Zebra","Känguru","Giraffe"});
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