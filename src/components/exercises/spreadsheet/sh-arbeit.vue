<template>
  <ExerciseBody :exercise="$data" :spreadsheet="spreadsheet">
    <p>Bei Rückgabe einer Klassenarbeit muss der Notenspiegel angegeben werden, meistens in Form einer Tabelle:
      <div>
        <table class="wertetabelle" style="margin: auto;">
          <tr><th v-for="(n,i) in beispiel">{{ i+1 }}</th></tr>
          <tr><td v-for="(n,i) in beispiel">{{ n }}</td></tr>
        </table>
      </div>
      Oben stehen die Noten und darunter, wie viele Schüler*innen diese Note erreicht haben. Die obige Tabelle bedeutet, dass {{ beispiel[0] }} mal die Note 1 erreicht wurde, {{ beispiel[1] }} mal die Note 2 usw.
    </p>
    <p>Eine Arbeit muss wiederholt werden, wenn <strong>mehr als ein Drittel</strong> der Schüler*innen eine schlechtere Note als 4 erreicht haben.</p>
    <p>Es soll eine Tabellenkalkulation erstellt werden, die die Arbeit auswertet, d.h.:
      <ol class="teilaufgaben">
        <li>In Zelle B5 soll der Durchschnitt der Arbeit angezeigt werden.</li>
        <li>In Zelle B6 soll stehen, wie viele Schüler*innen eine schlechtere Note als 4 geschrieben haben.</li>
        <li>In Zelle B7 soll stehen, ob die Arbeit wiederholt werden muss ("ja" oder "nein").</li>
      </ol>
    </p>
    <p>Implementiere die dazu notwendigen Formeln.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';
import { sleep } from '../../../other/sleep';
import convertToSpreadsheet from '../../spreadsheet/convert-to-spreadsheet';
import { getCellName } from '../../spreadsheet/helper';
import { setInSpreadsheet } from '../../spreadsheet/setInSpreadsheet';



export const data={
  id: "sh-arbeit",
  beispiel: [3,5,7,6,3,2],
  title: "Auswertung einer Klassenarbeit",
  spreadsheet: {
    data: null,
  },
  refresh(){
    let sheet={
      A1: "Note:", 
      A2: "Anzahl:",
      A5: "Durchschnitt:",
      A6: "Schlechter als 4:",
      A7: "Muss wiederholt werden?",
      H8: "",
    };
    let noten=[3,5,7,6,3,2];
    for(let i=0;i<noten.length;i++){
      sheet[getCellName(0,i+1)]=i+1+"";
      sheet[getCellName(1,i+1)]={f: noten[i]+"", input: true};
    }
    
    return sheet;
  },
  check: {
    testcases: [
      {
        info: "In B5 steht der korrekte Durchschnitt.",
        check: async function(editor,ex){
          let sum=0;
          let count=0;
          for(let i=0;i<6;i++){
            let c=random(1,10);
            sum+=c*(i+1);
            count+=c;
            ex.spreadsheet.data[1][i+1].f=c;
          }
          let soll=sum/count;
          editor.updateAllCells();
          editor.updateData(true);
          let ist=ex.spreadsheet.data[4][1].v;
          return Math.abs(ist-soll)<0.00001;
        }
      },
      {
        info: "In B6 die korrekte Anzahl der Noten, die schlechter als 4 sind.",
        check: async function(editor,ex){
          let sum=0;
          for(let i=4;i<6;i++){
            let c=random(1,10);
            sum+=c;
            ex.spreadsheet.data[1][i+1].f=c;
          }
          editor.updateAllCells();
          editor.updateData(true);
          let ist=ex.spreadsheet.data[5][1].v;
          return (sum===ist);
        }
      },
      {
        info: "In B7 steht 'ja', wenn mehr als ein Drittel der Noten schlechter als 4 sind.",
        count: 5,
        check: async function(editor,ex){
          let worse=0;
          let count=0;
          let noten=[];
          for(let i=0;i<6;i++){
            let c=random(1,10);
            if(i>=4){
              worse+=c;
            }
            count+=c;
            noten.push(c);
          }
          if(count%3!==0){
            let w=random(0,5);
            let add=3-count%3;
            noten[w]+=add;
            count+=add;
            if(w>=4) worse+=add;
          }
          while(worse*3<=count){
            let w=random(4,5);
            noten[w]++;
            count++;
            worse++;
          }
          for(let i=0;i<noten.length;i++){
            ex.spreadsheet.data[1][i+1].f=noten[i];
          }

          editor.updateAllCells();
          editor.updateData(true);
          let ist=ex.spreadsheet.data[6][1].v;
          return (ist.toLowerCase()==="ja");
        }
      },
      {
        info: "In B7 steht 'nein', wenn nicht mehr als ein Drittel der Noten schlechter als 4 sind.",
        count: 5,
        check: async function(editor,ex){
          let worse=0;
          let count=0;
          let noten=[];
          for(let i=0;i<6;i++){
            let c=random(1,10);
            if(i>=4){
              worse+=c;
            }
            count+=c;
            noten.push(c);
          }
          if(count%3!==0){
            let w=random(0,5);
            let add=3-count%3;
            noten[w]+=add;
            count+=add;
            if(w>=4) worse+=add;
          }
          while(worse*3>count){
            let w=random(0,3);
            noten[w]++;
            count++;
          }
          for(let i=0;i<noten.length;i++){
            ex.spreadsheet.data[1][i+1].f=noten[i];
          }
          if(worse*3>count){
            console.log("fehler",worse,count);
          }
          editor.updateAllCells();
          editor.updateData(true);
          let ist=ex.spreadsheet.data[6][1].v;
          return (ist.toLowerCase()==="nein");
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