<template>
  <ExerciseBody :exercise="$data">
      Die Methode <Code inline>zeichnen()</Code> soll das folgende Bild in der Konsole ausgeben:
      <ConsoleOutput> () ()
 (-.-)
<{   }>
(") (")</ConsoleOutput>
      
      Implementiere diese Methode.
  </ExerciseBody>
</template>

<script>


export const data={
  id: "ascii-art",
  title: "ASCII-Art",
  check: {
    init: async ()=>{
      return {
        a: await $new(Aufgabe)
      }
    },
    testcases: [
        {
          data: ()=>{
            return {
              line: 0,
              text: " () ()",
            }
          },
          info: "Die erste Zeile (die Ohren) wird richtig angezeigt."
        },
        {
          data: ()=>{
            return {
              line: 1,
              text: " (-.-)",
            }
          },
          info: "Die zweite Zeile (das Gesicht) wird richtig angezeigt."
        },
        {
          data: ()=>{
            return {
              line: 2,
              text: "<{   }>",
            }
          },
          info: "Die dritte Zeile (Körper und Arme) wird richtig angezeigt."
        },
        {
          data: ()=>{
            return {
              line: 3,
              text: "(\") (\")",
            }
          },
          info: "Die vierte Zeile (die Füße) wird richtig angezeigt."
        }
      ],
    test: async (tc,init)=>{
      await System.console().clear();
      await init.a.zeichnen();
      let ist=$Exercise.getConsoleContent()[tc.line];
      let soll=tc.text;
      let image=`
 () ()
 (-.-)
<{   }>
(") (")
`;
      
      return (soll===ist);
    }
  },
  project: {
    name: "ASCIIArt",
    clazzes: [
`class Aufgabe{
  void zeichnen(){
    //hierhin kommt der Code:
    
  }
}`
    ]
  }
};

export default{
  components: {
    
  },
  data() {
      return data;
  },
}
</script>