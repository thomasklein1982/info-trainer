<template>
  <ExerciseBody :exercise="$data" :java="project">
    Beim <strong>N-Damen-Problem</strong> geht es darum, N Damen so auf einem Schachbrett der Größe N &times; N zu platzieren, dass sich keine zwei Damen gegenseitig bedrohen (d.h., schlagen könnten). Eine Dame bedroht alle anderen Figuren, die sich mit ihr in der gleichen Reihe befinden (vertikal, horizontal oder diagonal).

    
    <ol class="teilaufgaben">
      <li>Gib eine Lösung für das 5-Damen-Problem an:
        <AppPreview width="10em" height="10em">
          <JFrame layout="5">
            <template v-for="(f,i) in example.feld">
              <JButton @click="clickFeld(f)" :style="getFeldStyle(f)" v-html="example.damen.indexOf(f)>=0?'♕':'&nbsp;'"></JButton>
            </template>
          </JFrame>
        </AppPreview>
        <span v-if="example.solved">Richtig!</span>
      </li>
      <li>Erläutere den Code der Klasse <Code inline>Dame</Code>:
<Code>class Dame{
  int x, y;
  Dame(int x, int y){
    this.x=x;
    this.y=y;
  }

  public boolean bedrohtOderAufGleichemFeld ( Dame d ){
    if( d.x == x ) return true;
    if( d.y == y ) return true;
    if( d.y == d.x + ( y - x) ) return true;
    if( d.y == -d.x + ( y + x) ) return true;
    return false;
  }
}
      </Code>
      
      </li>
      <li>
        Die Methode <Code no-numbers>ArrayList&lt;Dame&gt; setzeDamen(int N)</Code>
        der Hauptklasse soll das N-Damen-Problem lösen und eine mögliche Platzierung der Damen in Form einer ArrayList zurückgeben, sofern das Problem lösbar ist. Andernfalls soll die Methode <Code inline>null</Code> zurückgeben.

        <p>Implementiere diese Methode.</p>
        <Hint>Man kann Spalte für Spalte vorgehen, da in jeder Spalte genau eine Dame platziert werden muss. 
          <p>Implementiere zunächst die Methode <Code no-numbers>boolean backtracking(ArrayList&lt;Dame&gt; damen, int N, int abSpalte)</Code> Der Parameter <Code inline>damen</Code> enthält alle bisher platzierten Damen, der Parameter <Code inline>abSpalte</Code> gibt an, in welcher Spalte des Feldes der Algorithmus starten soll.</p>
        <p>Die Methode soll mit Hilfe des Backtracking-Verfahrens die Damen platzieren und <code>true</code> zurückgeben, wenn alle N Damen platziert werden konnten oder <code>false</code>, falls dies nicht möglich ist.</p></Hint>
      </li>
    </ol>
  </ExerciseBody>
</template>

<script>

let feld=[];
for(let i=0;i<5;i++){
  for(let j=0;j<5;j++){
    let f={
      x: j,
      y: i
    }
    feld.push(f);
  }
}



export const data={
  id: "damen",
  title: "Das N-Damen-Problem",
  example: {
    feld,
    damen: []
  },
  check: {
    init: async ()=>{
      
    },
    test: async (tc,init)=>{
      return tc.test();
    },
    testcases: [
      {
        data: ()=>{
          return {
            test: async ()=>{
              let n,damen;
              n=$Exercise.random(2,3);
              damen=await $main.setzeDamen(n);
              return damen===null;
            }
          }
        },
        count: 1,
        info: "Die Methode funktioniert, wenn das Problem nicht lösbar ist.",
      },
      {
        data: ()=>{
          return {
            test: async ()=>{
              let n,damen;
              n=$Exercise.random(7,9);
              damen=await $main.setzeDamen(n);
              if(damen===null) return false;
              for(let i=0;i<damen.length;i++){
                let dame=damen[i];
                for(let j=i+1;j<damen.length;j++){
                  let d=damen[j];
                  if(d.x===dame.x || d.y===dame.y || d.y-d.x===dame.y-dame.x || d.y+d.x===dame.y+dame.x){
                    return false;
                  }
                }
              }
              return true;
            }
          }
        },
        count: 1,
        info: "Die Methode funktioniert, wenn das Problem lösbar ist.",
      },
    ]
  },

  project: {
    name: "Damen",
    clazzes: [
      {
        name: "Main",
        src: `
JTextArea output;

ArrayList<Dame> setzeDamen( int N ){
  return null;
}

boolean backtracking ( ArrayList<Dame> damen, int N, int abSpalte ){
  
}

//zeigt das Schachbrett mit den Damen an:
void showSchachfeld(ArrayList<Dame> damen, int N){
  output.setValue("");
  for(int i=0;i<N;i++){
    for(int j=0;j<N;j++){
      boolean istFrei=true;
      if(damen!=null){
        for(int k=0;k<damen.size();k++){
          Dame d=damen.get(k);
          if(d.x==j && d.y==i){
            istFrei=false;
            break;
          }
        }
      }
      if(istFrei){
        output.append("⬜");
      }else{
        output.append("⬛");
      }
    }
    output.append("\\n");
  }
}

void main(){
  JFrame f=new JFrame("1");
  output=new JTextArea("");
  f.add(output);
  ArrayList<Dame> damen = setzeDamen ( 6 );
  showSchachfeld(damen,6);
}`
      },
      {
        name: "Dame",
        src: `int x, y;
Dame(int x, int y){
  this.x=x;
  this.y=y;
}

public boolean bedrohtOderAufGleichemFeld ( Dame d ){
  if( d.x == x ) return true;
  if( d.y == y ) return true;
  if( d.y == d.x + ( y - x) ) return true;
  if( d.y == -d.x + ( y + x) ) return true;
  return false;
}
`
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
  methods: {
    // getDamen(){
    //   let damen=[];
    //   let felder=this.example.feld;
    //   for(let i=0;i<felder.length;i++){
    //     let f=felder[i];
    //     if(f.dame) damen.push(f);
    //   }
    //   return damen;
    // },
    istFeldBedroht(f){
      let damen=this.example.damen;
      for(let i=0;i<damen.length;i++){
        let d=damen[i];
        if(f===d) continue;
        if(f.x===d.x || f.y===d.y || f.x+f.y===d.x+d.y || f.x-f.y===d.x-d.y) return true;
      }
      return false;
    },
    getFeldStyle(f){
      let s={};
      let black,white;
      // if(this.istFeldBedroht(f)){
      //   white="#faa";
      //   black="#700";
      // }
      white="white";
      black="black";
      if((f.x+f.y)%2===0){
        s.background=white;
        s.color="black";
      }else{
        s.background=black;
        s.color="white";
      }
      
      
      return s;
    },
    clickFeld(f){
      this.example.solved=false;
      let damen=this.example.damen;
      let i=damen.indexOf(f);
      if(i>=0){
        damen.splice(i,1);
      }else{
        if(this.istFeldBedroht(f)){
          alert("Dieses Feld wird bedroht. Hier kannst du nicht setzen.");
          return;
        }
        damen.push(f);
      }
      if(damen.length!==5) return;
      this.example.solved=true;
    }
  }
}

// ArrayList<Dame> setzeDamen( int N ){
//   //hierhin kommt der Code:
//   ArrayList<Dame> damen=new ArrayList<>();
//   boolean ok=setzeDamenBacktracking(damen, N, 0);
//   if(ok){
//     return damen;
//   }else{
//     return null;
//   }
// }

// boolean setzeDamenBacktracking( ArrayList<Dame> damen, int N, int abSpalte){
//   if(damen.size()==N) return true;
//   if(abSpalte>=N) return false;
//   int i=abSpalte;
//   for(int j=0;j<N;j++){
//     Dame d=new Dame(i,j);
//     boolean ok=true;
//     for(int k=0;k<damen.size();k++){
//       if(damen.get(k).bedroht(d) || damen.get(k).istAufGleichemFeld(d)){
//         ok=false;
//         break;
//       }
//     }
//     if(ok){
//       damen.add(d);
//       showSchachfeld(damen, N);
//       Thread.sleep(100);
//       boolean fertig=setzeDamenBacktracking(damen, N, abSpalte+1);
//       if(fertig){
//         return true;
//       }
//       damen.remove(damen.size()-1);
//     }
//   }
//   return false;
// }

</script>

<style scoped>
  .schachfeld-5{
    display: grid;
    grid-template-columns: repeat(1fr, 5);
    grid-template-rows: repeat(1fr, 5);
  }
</style>