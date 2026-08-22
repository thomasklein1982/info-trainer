<template>
  <ExerciseBody :exercise="$data" :spreadsheet="spreadsheet">
    <p>Ein Test besteht aus 8 Aufgaben. Man besteht den Test, wenn man insgesamt mindestens 40 Punkte erreicht. Ansonsten fällt man durch.</p>
    <p>Die Tabelle soll in Zelle B11 die insgesamt erreichte Punktzahl anzeigen und in Zelle B12 "Bestanden" bzw. "Durchgefallen".</p>
    <p>Implementiere die dazu notwendigen Formeln.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';
import { sleep } from '../../../other/sleep';
import convertToSpreadsheet from '../../spreadsheet/convert-to-spreadsheet';
import { setInSpreadsheet } from '../../spreadsheet/setInSpreadsheet';



export const data={
  id: "sh-wenn-1",
  title: "Bestanden oder durchgefallen?",
  spreadsheet: {
    data: null,
  },
  refresh(){
    let sheet={
      A1: "Aufgabe", B1: "Punkte",
      A11: "Gesamtpunktzahl:",
      A12: "Bewertung:"
    };
    let punkte=[5,0,8,6,7,2,10,3]
    for(let i=2;i<=9;i++){
      sheet["A"+i]="Aufgabe "+(i-1);
      sheet["B"+i]={
        input: true, f: punkte[i-2]
      }
    }
    
    return sheet;
  },
  check: {
    testcases: [
      {
        info: "In B11 steht die korrekte Gesamtpunktzahl.",
        check: async function(editor,ex){
          let sum=0;
          for(let i=0;i<8;i++){
            let c=random(0,10);
            sum+=c;
            ex.spreadsheet.data[i+1][1].f=c;
          }
          editor.updateAllCells();
          editor.updateData(true);
          let ist=ex.spreadsheet.data[10][1].v;
          return (ist===sum);
        }
      },
      {
        info: "In B12 steht 'Bestanden', wenn man mindestens 40 Punkte erreicht hat.",
        check: async function(editor,ex){
          let sum=0;
          for(let i=0;i<8;i++){
            let c=random(1,8);
            if(i===7 && sum+c<40) c=40-sum;
            sum+=c;
            ex.spreadsheet.data[i+1][1].f=c;
          }
          editor.updateAllCells();
          editor.updateData(true);
          let ist=ex.spreadsheet.data[11][1].v;
          return (ist.toLowerCase()==="bestanden");
        }
      },
      {
        info: "In B12 steht 'Durchgefallen', wenn man weniger als 40 Punkte erreicht hat.",
        check: async function(editor,ex){
          let sum=0;
          for(let i=0;i<8;i++){
            let c=random(1,8);
            if(sum+c>=40) c=0;
            sum+=c;
            ex.spreadsheet.data[i+1][1].f=c;
          }
          editor.updateAllCells();
          editor.updateData(true);
          let ist=ex.spreadsheet.data[11][1].v;
          return (ist.toLowerCase()==="durchgefallen");
        }
      }
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