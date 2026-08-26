<template>
  <ExerciseBody :exercise="$data" :spreadsheet="spreadsheet">
    <p>Für den Eintritt in den Freizeitpark Info-Wonderland zahlen Kinder 12 € und Erwachsene 15 €. Gruppen ab 10 Personen erhalten einen Rabatt von 20 €.</p>
    <p>An der Kasse soll eine Tabellenkalkulation verwendet werden. In die Tabelle kann man eingeben, wie viele Eintrittskarten jeweils gekauft werden.</p>
    <p>Die Tabelle soll in Zelle B4 die Gesamtzahl der Personen in der Gruppe anzeigen. In Zelle B5 soll angezeigt werden, ob es den Rabatt gibt ("ja") oder nicht ("nein"). In Zelle B6 soll angezeigt werden, was die Gruppe ingsesamt für den Eintritt bezahlen muss.</p>
    <p>Implementiere die dazu notwendigen Formeln.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';
import convertToSpreadsheet from '../../spreadsheet/convert-to-spreadsheet';



export const data={
  id: "sh-rabatt",
  title: "Auf ins Info-Wonderland!",
  spreadsheet: {
    data: null,
  },
  refresh(){
    let sheet={
      A1: "Anzahl Kinder:", 
      A2: "Anzahl Erwachsene:",
      A4: "Gesamtzahl Personen:",
      A5: "Rabatt:",
      A6: "Zu zahlen:",
      B1: {
        f: 3,
        input: true
      },
      B2: {
        f: 2,
        input: true
      }
    };
    
    return sheet;
  },
  check: {
    testcases: [
      {
        info: "In B4 steht die korrekte Gesamtzahl der Personen.",
        check: async function(editor,ex){
          let k=random(0,10);
          let e=random(0,10);
          ex.spreadsheet.data[0][1].f=k;
          ex.spreadsheet.data[1][1].f=e;
          editor.updateAllCells();
          editor.updateData(true);
          let ist=ex.spreadsheet.data[3][1].v;
          let soll=k+e;
          return (ist===soll);
        },
        count: 5
      },
      {
        info: "In B5 steht 'ja', wenn es einen Rabatt gibt und andernfalls 'nein'.",
        check: async function(editor,ex){
          let anz=0;
          for(let i=0;i<20;i++){
            let k=random(0,anz);
            let e=anz-k;
            ex.spreadsheet.data[0][1].f=k;
            ex.spreadsheet.data[1][1].f=e;
            editor.updateAllCells();
            editor.updateData(true);
            let ist=ex.spreadsheet.data[4][1].v;
            let soll=anz<10? "nein": "ja";
            if(ist!==soll) return false;
            anz++;
          }
          return true;
        }
      },
      {
        info: "In B6 steht der korrekte Gesamtbetrag, den die Gruppe zahlen muss.",
        check: async function(editor,ex){
          let anz=0;
          for(let i=0;i<20;i++){
            let k=random(0,anz);
            let e=anz-k;
            ex.spreadsheet.data[0][1].f=k;
            ex.spreadsheet.data[1][1].f=e;
            editor.updateAllCells();
            editor.updateData(true);
            let ist=ex.spreadsheet.data[5][1].v;
            let soll=k*12+e*15-(anz>=10? 20: 0);
            if(ist!==soll) return false;
            anz++;
          }
          return true;
        }
      },
    ]
  },
};

export default{
  components: {
    
  },
  data() {
    let sheet=data.refresh();
    data.spreadsheet.data=convertToSpreadsheet(sheet)
    return data;
  }
}
</script>