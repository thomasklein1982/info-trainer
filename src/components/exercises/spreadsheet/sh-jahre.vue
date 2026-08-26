<template>
  <ExerciseBody :exercise="$data" :spreadsheet="spreadsheet">
    <p>Es soll eine Tabelle erstellt werden, die Jahre in Monate, Tage, Stunden, Minuten und Sekunden umrechnen kann.</p>
    <p>In B1 kann der User die Anzahl der Jahre eingeben.</p>
    <p>In den Zellen A3 bis A7 soll dann stehen, wie viele Monate, Tage, ... das sind.</p>
    <p>Implementiere die dazu notwendigen Formeln.</p>
    <Hint>Du musst keine Schaltjahre beachten. Gehe davon aus, dass jedes Jahr 365 Tage hat.</Hint>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';
import { sleep } from '../../../other/sleep';
import convertToSpreadsheet from '../../spreadsheet/convert-to-spreadsheet';



export const data={
  id: "sh-jahre",
  title: "Jahre umrechnen",
  spreadsheet: {
    data: null,
  },
  refresh(){
    let sheet={
      A1: "Jahre:",
      B1: {f: 3, input: true},
      A2: "Das sind ...",
      B3: "Monate",
      B4: "Tage",
      B5: "Stunden",
      B6: "Minuten",
      B7: "Sekunden",
    };
    
    return sheet;
  },
  check: {
    testcases: [
      {
        info: "In A3 steht die korrekte Anzahl Monate.",
        check: async function(editor,ex){
          let anz=random(0,20);
          ex.spreadsheet.data[0][1].f=anz;
          editor.updateAllCells();
          editor.updateData(true);
          let ist=ex.spreadsheet.data[2][0].v;
          let soll=anz*12;
          if(ist!==soll) return false;
          return true;
        },
        count: 5
      },
      {
        info: "In A4 steht die korrekte Anzahl Tage.",
        check: async function(editor,ex){
          let anz=random(0,20);
          ex.spreadsheet.data[0][1].f=anz;
          editor.updateAllCells();
          editor.updateData(true);
          let ist=ex.spreadsheet.data[3][0].v;
          let soll=anz*365;
          if(ist!==soll) return false;
          return true;
        },
        count: 5
      },
      {
        info: "In A5 steht die korrekte Anzahl Stunden.",
        check: async function(editor,ex){
          let anz=random(0,20);
          ex.spreadsheet.data[0][1].f=anz;
          editor.updateAllCells();
          editor.updateData(true);
          let ist=ex.spreadsheet.data[4][0].v;
          let soll=anz*365*24;
          if(ist!==soll) return false;
          return true;
        },
        count: 5
      },
      {
        info: "In A6 steht die korrekte Anzahl Minuten.",
        check: async function(editor,ex){
          let anz=random(0,20);
          ex.spreadsheet.data[0][1].f=anz;
          editor.updateAllCells();
          editor.updateData(true);
          let ist=ex.spreadsheet.data[5][0].v;
          let soll=anz*365*24*60;
          if(ist!==soll) return false;
          return true;
        },
        count: 5
      },
      {
        info: "In A7 steht die korrekte Anzahl Sekunden.",
        check: async function(editor,ex){
          let anz=random(0,20);
          ex.spreadsheet.data[0][1].f=anz;
          editor.updateAllCells();
          editor.updateData(true);
          let ist=ex.spreadsheet.data[6][0].v;
          let soll=anz*365*24*60*60;
          if(ist!==soll) return false;
          return true;
        },
        count: 5
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