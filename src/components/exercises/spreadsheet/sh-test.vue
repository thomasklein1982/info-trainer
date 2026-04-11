<template>
  <ExerciseBody :exercise="$data" :spreadsheet="spreadsheet">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Auf den gelben Feldern stehen zwei Zahlen und dazwischen steht entweder <strong>+</strong> oder <strong>&minus;</strong>. Lisa soll das Ergebnis der Rechenaufgabe bestimmen und auf das rote Feld schreiben.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';




export const data={
  id: "sh-test",
  title: "Spreadsheet Test",
  spreadsheet: {
    data: [
      [{f: 1},{f: "=A1"},{f: "Hallo"}],
      [{},{},{}]
    ],
  },
  check: {
    testcases: [
      {
        info: "Bei Plusaufgaben steht das richtige Ergebnis im roten Feld.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          if(data.rz==="-") return true;
          let f=gameworld.getNamedField("R");
          return (f.text+""===data.solution+"");
        }
      },
      {
        info: "Bei Minusaufgaben steht das richtige Ergebnis im roten Feld.",
        check: function(gameworld,data, isProgramOver){
          if(!isProgramOver) return false;
          if(data.rz==="+") return true;
          let f=gameworld.getNamedField("R");
          return (f.text+""===data.solution+"");
        }
      },
    ]
  },
};

export default{
  components: {
    
  },
  data() {
      return data;
  }
}
</script>