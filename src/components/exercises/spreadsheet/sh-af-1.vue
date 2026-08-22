<template>
  <ExerciseBody :exercise="$data" :spreadsheet="spreadsheet">
    <p>Eine Biologin untersucht eine Eidechsenart auf einer einsamen Insel in der Südsee. Sie hat 10 Tiere jeweils gemessen und gewogen und die Werte in eine Tabellenkalkulation eingegeben.</p>
    <p>Nun möchte sie die Daten auswerten: In den Zellen B4, B5 und B6 sollen das durchschnittliche Gewicht, die größte vorkommende Länge und das kleinste vorkommende Gewicht stehen.</p>
    <p>Implementiere die dazu notwendigen Formeln.</p>
  </ExerciseBody>
</template>

<script>
import { Random, random } from '../../../other/random';
import { round } from '../../../other/round';
import { sleep } from '../../../other/sleep';
import convertToSpreadsheet from '../../spreadsheet/convert-to-spreadsheet';
import { getCellName } from '../../spreadsheet/helper';
import { setInSpreadsheet } from '../../spreadsheet/setInSpreadsheet';



export const data={
  id: "sh-af-1",
  title: "Untersuchung einer Eidechsenart",
  spreadsheet: {
    data: null,
  },
  refresh(){
    Random.setSeed(233);
    let sheet={
      A1: "Länge (mm):",
      A2: "Gewicht (g):",
      A4: "Durchschnittliches Gewicht:",
      A5: "Größte Länge:",
      A6: "Geringstes Gewicht:",
    };
    let daten=[];
    for(let i=0;i<10;i++){
      let groesse=Random.int(40,90);
      let f=Random.randomSeeded()*0.4+0.8;
      let gewicht=round(groesse*groesse*f*0.002,1);
      daten.push({
        groesse, gewicht
      });
    }
    for(let i=0;i<daten.length;i++){
      sheet[getCellName(0,i+1)]={
        f: daten[i].groesse, input: true
      };
      sheet[getCellName(1,i+1)]={
        f: daten[i].gewicht, input: true
      };
    }
    return sheet;
  },
  check: {
    testcases: [
      {
        info: "In B4 steht das durchschnittliche Gewicht.",
        check: async function(editor,ex){
          let sum=0;
          for(let i=0;i<10;i++){
            let c=random(5,30);
            sum+=c;
            ex.spreadsheet.data[1][i+1].f=c;
          }
          editor.updateAllCells();
          editor.updateData(true);
          let ist=ex.spreadsheet.data[3][1].v;
          let soll=sum/10;
          return (Math.abs(ist-soll)<0.0000001);
        }
      },
      {
        info: "In B5 steht die größte Länge.",
        check: async function(editor,ex){
          let soll, v;
          for(let j=0;j<10;j++){
            soll=random(10,30);
            for(let i=0;i<10;i++){
              if(i===j) v=soll;
              else v=random(5,soll-1);
              ex.spreadsheet.data[0][i+1].f=v;
            }
            editor.updateAllCells();
            editor.updateData(true);
            let ist=ex.spreadsheet.data[4][1].v;
            if(Math.abs(soll-ist)>0.00000001) return false;
          }
          return true;
        }
      },
      {
        info: "In B6 steht das geringste Gewicht.",
        check: async function(editor,ex){
          let soll, v;
          for(let j=0;j<10;j++){
            soll=random(3,10);
            for(let i=0;i<10;i++){
              if(i===j) v=soll;
              else v=random(soll+1,40);
              ex.spreadsheet.data[1][i+1].f=v;
            }
            editor.updateAllCells();
            editor.updateData(true);
            let ist=ex.spreadsheet.data[5][1].v;
            if(Math.abs(soll-ist)>0.00000001) return false;
          }
          return true;
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