<template>
  <ExerciseBody :exercise="$data" :spreadsheet="spreadsheet">
    <p>Zur Zubereitung von "Gemüse-Couscous" werden verschiedene Zutaten benötigt. Die untenstehende Tabelle zeigt die Zutaten an und wie viel Gramm pro Person benötigt werden. In Zelle B1 kann man eingeben, für wie viele Personen man kochen möchte.</p>
    <p>In den Zellen C4 bis C7 soll jeweils stehen, wie viel Gramm der Zutat für die eingegebene Anzahl Personen benötigt werden. In der Zelle B9 soll das Gesamt-Gewicht aller Zutaten angezeigt werden.</p>
    <p>Implementiere die dazu notwendigen Formeln.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';
import { sleep } from '../../../other/sleep';
import convertToSpreadsheet from '../../spreadsheet/convert-to-spreadsheet';
import { setInSpreadsheet } from '../../spreadsheet/setInSpreadsheet';



export const data={
  id: "sh-couscous",
  title: "Gemüse-Couscous",
  spreadsheet: {
    data: null,
  },
  refresh(){
    let sheet={
      A1: "Anzahl Personen:",
      B1: {f: 2, input: true},
      A3: "Zutat",
      B3: "Menge p.P.",
      C3: "Menge",
      A4: "Couscous",
      A5: "Möhren",
      A6: "Paprika",
      A7: "Zuchini",
      B4: { f: 60, input: true},
      B5: { f: 250, input: true},
      B6: { f: 75, input: true},
      B7: { f: 40, input: true},
      A9: "Gesamt:"
    };
    
    return sheet;
  },
  check: {
    testcases: [
      {
        info: "In C4 steht die korrekte Grammzahl für Couscous.",
        check: async function(editor,ex){
          for(let i=0;i<10;i++){
            let gewicht=random(10,100);
            let anz=i;
            ex.spreadsheet.data[3][1].f=gewicht;
            ex.spreadsheet.data[0][1].f=anz;
            editor.updateAllCells();
            editor.updateData(true);
            let ist=ex.spreadsheet.data[3][2].v;
            let soll=gewicht*anz;
            if(ist!==soll) return false;
          }
          return true;
        }
      },
      {
        info: "In C5 steht die korrekte Grammzahl für Möhren.",
        check: async function(editor,ex){
          let row=4;
          for(let i=0;i<10;i++){
            let gewicht=random(10,100);
            let anz=i;
            ex.spreadsheet.data[row][1].f=gewicht;
            ex.spreadsheet.data[0][1].f=anz;
            editor.updateAllCells();
            editor.updateData(true);
            let ist=ex.spreadsheet.data[row][2].v;
            let soll=gewicht*anz;
            if(ist!==soll) return false;
          }
          return true;
        }
      },
      {
        info: "In C6 steht die korrekte Grammzahl für Paprika.",
        check: async function(editor,ex){
          let row=5;
          for(let i=0;i<10;i++){
            let gewicht=random(10,100);
            let anz=i;
            ex.spreadsheet.data[row][1].f=gewicht;
            ex.spreadsheet.data[0][1].f=anz;
            editor.updateAllCells();
            editor.updateData(true);
            let ist=ex.spreadsheet.data[row][2].v;
            let soll=gewicht*anz;
            if(ist!==soll) return false;
          }
          return true;
        }
      },
      {
        info: "In C7 steht die korrekte Grammzahl für Zucchini.",
        check: async function(editor,ex){
          let row=6;
          for(let i=0;i<10;i++){
            let gewicht=random(10,100);
            let anz=i;
            ex.spreadsheet.data[row][1].f=gewicht;
            ex.spreadsheet.data[0][1].f=anz;
            editor.updateAllCells();
            editor.updateData(true);
            let ist=ex.spreadsheet.data[row][2].v;
            let soll=gewicht*anz;
            if(ist!==soll) return false;
          }
          return true;
        }
      },
      {
        info: "In B9 steht das korrekte Gesamt-Gewicht.",
        check: async function(editor,ex){
          let anz=random(2,20);
          ex.spreadsheet.data[0][1].f=anz;
          let sum=0;
          for(let i=0;i<4;i++){
            let gewicht=random(10,100);
            sum+=gewicht;
            ex.spreadsheet.data[i+3][1].f=gewicht;
          }
          editor.updateAllCells();
          editor.updateData(true);
          let ist=ex.spreadsheet.data[8][1].v;
          let soll=anz*sum;
          if(ist!==soll) return false;
          return true;
        },
        count: 4
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