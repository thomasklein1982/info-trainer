<template>
  <ExerciseBody :exercise="$data" :register-machine="machine">
    <p>Beim Spiel Tic Tac Toe setzen zwei Spieler*innen abwechselnd ein "X" bzw. ein "O" in eines der Felder des 3&times;3 Felder großen Spielplan. Ein bereits belegtes Feld darf nicht wieder belegt werden. Es gewinnt, wer zuerst drei eigene Symbole in eine Reihe platziert. Dabei sind horizontale, vertikale und diagonale Reihen möglich. Das Spiel endet unentschieden, wenn alle Felder belegt sind, ohne dass ein Spieler gewonnen hat.</p>

    <p>Dieses Spiel soll auf einer Registermaschine so umgesetzt werden, dass zwei menschliche Spieler gegeneinander spielen können.</p>
      <p>Hier die Details:</p>
      <ul>
        <li>
          <div class="float-right">
            <AppPreview style="width: 4cm; height: 4cm">
              <JFrame layout="3">
                <JLabel style="border: 1pt solid black" v-for="i in 9">R{{ i }}</JLabel>
              </JFrame>
            </AppPreview>
          </div>
          Die Register R1 bis R9 stehen für die Felder des Spielfeldes nach nebenstehendem Schema.
          <ul>
            <li>Ein Wert von 0 bedeutet, dass das Feld frei ist.</li>
            <li>Ein Wert von 1 bedeutet, dass das Feld von Spieler 1 belegt wurde.</li>
            <li>Ein Wert von 2 bedeutet, dass das Feld von Spieler 2 belegt wurde.</li>
          </ul>
        </li>
        <li>Das Register R10 zeigt den Spielstatus an:
          <ul>
            <li>Ein Wert von 0 bedeutet, dass das Spiel noch nicht vorbei ist.</li>
            <li>Ein Wert von 1 bedeutet, dass Spieler 1 gewonnen hat.</li>
            <li>Ein Wert von 2 bedeutet, dass Spieler 2 gewonnen hat.</li>
            <li>Ein Wert von 3 bedeutet, dass das Spiel unentschieden ausgegangen ist.</li>
          </ul>
        </li>
        <li>Das Register R11 zeigt die Nummer des Spielers an, der am Zug ist (also 1 oder 2).</li>
        <li>Bei Spielbeginn haben alle Register den Wert 0 außer R11, das den Wert 1 hat.</li>
        <li>Der Spielablauf ist der folgende:
          <ol>
            <li>Der Spieler, der am Zug ist, gibt in R12 die Nummer des Feldes (1 bis 9) ein, das er belegen möchte und führt das Programm aus.</li>
            <li>Falls der Zug möglich ist, führt das Programm den Zug aus und passt die Register R1 bis R11 entsprechend an. Ansonsten passiert gar nichts.</li>
          </ol>
        </li>
      </ul>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';

let rows=[
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function areAllEqual(registers, row, value){
  for(let j=1; j<=2; j++){
    let t=registers[row[j]];
    if(t!==value) return false;
  }
  return true;
}

function getStatus(registers){
  let zug={
    feld: 0,
    spieler: 0
  };
  //gewinner?
  for(let i=0;i<rows.length;i++){
    let row=rows[i];
    let s=registers[row[0]];
    if(s===0) continue;
    if(areAllEqual(registers,row,s)){
      zug.feld=row[0];
      zug.spieler=s;
      return {
        status: s,
        zug
      };
    }
  }
  //unentschieden?
  for(let i=0;i<registers.length;i++){
    if(registers[i]===0){
      //finde ein Register, das nicht 0 ist:
      let r;
      for(let j=0;j<registers.length;j++){
        if(registers[j]!==0){
          r=j;
          break;
        }
      }
      zug.feld=r;
      zug.spieler=registers[r];
      return {
        status: 0,
        zug
      };
    }
  }
  //unentschieden:
  zug.feld=0;
  zug.spieler=registers[0];
  return {
    status: 3,
    zug
  };
}

// let possibleStates=[
//   [], [], [], []
// ];
// for(let i1=0;i1<=2;i1++)
//   for(let i2=0;i2<=2;i2++)
//     for(let i3=0;i3<=2;i3++)
//       for(let i4=0;i4<=2;i4++)
//         for(let i5=0;i5<=2;i5++)
//           for(let i6=0;i6<=2;i6++)
//             for(let i7=0;i7<=2;i7++)
//               for(let i8=0;i8<=2;i8++)
//                 for(let i9=0;i9<=2;i9++){
//                   if(i1===0 && i2===0 && i3===0 && i4===0 && i5===0 && i6===0 && i7===0 && i8===0 && i9===0) continue;
//                   let registers=[i1,i2,i3,i4,i5,i6,i7,i8,i9];
//                   let status=getStatus(registers);
//                   registers[status.zug.feld]=0;
//                   registers.push(status.status);
//                   registers.push(status.zug.feld);
//                   possibleStates[status.status].push(registers);
//                 }

let testStates=[
  [], [], [], []
];
//moegliche Gewinne fuer die beiden Spieler:
for(let s=1; s<=2; s++){
  for(let i=0;i<rows.length;i++){
    let row=rows[i];
    for(let j=0;j<row.length;j++){
      let array=[0,0,0, 0,0,0, 0,0,0, 0, s, row[j]+1];
      for(let k=0;k<row.length;k++){
        array[row[k]]=s;
      }
      array[row[j]]=0;
      testStates[s].push(array);
    }
  }
  console.log("teststates",testStates,rows);
}
//unentschieden:
testStates[3]=[
  [
    2,1,2,
    1,1,2,
    1,2,0,
    0,1,9
  ]
];
//nicht beendet:
testStates[0]=[
  [
    0,0,0,
    0,0,0,
    0,0,0,
    0,1,7
  ]
];

export const data={
  id: "rm-tictactoe",
  title: "Tic Tac Toe",
  check: {
    testcases: [
      {
        info: 'Die Felder R1 bis R9 werden korrekt mit der Spielernummer belegt, wenn sie frei sind.',
        input: ()=>{
          let inputs=[];
          let array=
            [
              0, 0, 0, 
              0, 0, 0, 
              0, 0, 0,
              0, 1, 1
            ];
          for(let i=1; i<=2; i++){
            for(let j=1; j<=9; j++){
              let a=JSON.parse(JSON.stringify(array));
              a[11-1]=i;
              a[12-1]=j;
              inputs.push(a);
            }
          }
          return inputs;
        },
        check: (input, output)=>{
          for(let i=1;i<=9;i++){
            if(i===input[12-1]){
              if(output[i-1]!==input[11-1]) return false;
            }else{
              if(output[i-1]!==input[i-1]) return false;
            }
          }
          return true;
        }
      },
      {
        info: 'Der Zug wird gar nicht ausgeführt, wenn ein Feld gewählt wird, das schon belegt ist.',
        input: ()=>{
          let inputs=[];
          let array=
            [
              0, 0, 0, 
              0, 0, 0, 
              0, 0, 0,
              0, 1, 1
            ];
          for(let i=1; i<=2; i++){
            for(let j=1; j<=9; j++){
              let a=JSON.parse(JSON.stringify(array));
              a[j-1]=random(1,2);
              a[11-1]=i;
              a[12-1]=j;
              inputs.push(a);
            }
          }
          return inputs;
        },
        check: (input, output)=>{
          for(let i=1;i<=11;i++){
            if(output[i-1]!==input[i-1]) return false;
          }
          return true;
        },
        
      },
      {
        info: 'Nach einem korrekten Zug ist der andere Spieler dran.',
        input: ()=>{
          let inputs=[];
          let array=
            [
              0, 0, 0, 
              0, 0, 0, 
              0, 0, 0,
              0, 1, 1
            ];
          for(let i=1; i<=2; i++){
            for(let j=1; j<=9; j++){
              let a=JSON.parse(JSON.stringify(array));
              a[11-1]=i;
              a[12-1]=j;
              inputs.push(a);
            }
          }
          return inputs;
        },
        check: (input, output)=>{
          if(input[11-1]===1 && output[11-1]!==2) return false;
          if(input[11-1]===2 && output[11-1]!==1) return false;
          return true;
        }
      },
      {
        info: 'Es wird der korrekte Spielstatus (R10 = 0) angezeigt, wenn das Spiel noch nicht beendet ist.',
        input: ()=>{
          let inputs=testStates[0];
          return inputs;
        },
        check: (input, output)=>{
          if(output[10-1]!==0) return false;
          return true;
        }
      },
      {
        info: 'Es wird der korrekte Spielstatus (R10 = 1) angezeigt, wenn Spieler 1 gewonnen hat.',
        input: ()=>{
          let inputs=testStates[1];
          return inputs;
        },
        check: (input, output)=>{
          if(output[10-1]!==1) return false;
          return true;
        }
      },
      {
        info: 'Es wird der korrekte Spielstatus (R10 = 2) angezeigt, wenn Spieler 2 gewonnen hat.',
        input: ()=>{
          let inputs=testStates[2];
          return inputs;
        },
        check: (input, output)=>{
          if(output[10-1]!==2) return false;
          return true;
        }
      },
      {
        info: 'Es wird der korrekte Spielstatus (R10 = 3) angezeigt, wenn das Spiel unentschieden ausgegangen ist.',
        input: ()=>{
          let inputs=testStates[3];
          return inputs;
        },
        check: (input, output)=>{
          if(output[10-1]!==3) return false;
          return true;
        }
      }
    ]
  },
  machine: {
    code: ``,
    exampleInput: [
              0, 0, 0, 
              0, 0, 0, 
              0, 0, 0,
              0, 1, 0
            ],
    maxSteps: 100000
  }
};

export default{
  components: {
    
  },
  data() {
    return data;
  },
}

/*
//reihen im Speicher ablegen (Register 21-44):
load #1
store 21
load #2
store 22
load #3
store 23

load #4
store 24
load #5
store 25
load #6
store 26

//... weitere 6 Reihen

//checken, ob feld belegt:
load *12
jnzero ende

//feld ist frei -> belegen
load 11
store *12

//checken, ob ein Spieler gewonnen hat:
load #21
store 20 //R20=Adress-Zähler
load #6 //eigentlich 28*3=4
store 18 //R18=Gesamtzaehler
Reihe: load #3
store 19 //R19=Reihen-Schleifen-Zähler
load *20
jzero 

//Spieler wechseln:
load 11
sub #1
jzero WechselZu2
WechselZu1: load #1
store 11
goto ende
WechselZu2: load #2
store 11

ende: end
*/

</script>