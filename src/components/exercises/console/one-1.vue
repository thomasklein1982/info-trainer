<template>
  <ExerciseBody :exercise="$data" inline>
    Gib jeweils eine einzelne Zeile Java-Code an.
    <template #exercise>
      <ol class="teilaufgaben">
        <li v-for="(t,i) in tasks"><span v-html="t.aufgabe"/>
          <p class="no-print"><InputCheck code width="100%" ref="input" :task="t"/></p>
        </li>
      </ol>
    </template>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "one-1",
  title: "Java-Oneliners 1",
  tasks: [
    {},{},{},{}
  ]
}

export function createOneliner(tasks,srcTasks){

}

export default{
  data() {
    return data;
  },
  methods: {
    create(Random, resArray){
      let tasks=[
        {
          aufgabe: "Die Variable §0§ erhält den Wert §1§.",
          check: "^§0§\\s*=\\s*§1§\\s*;$",
          replace: [
            "letter-small",
            "int"
          ]
        },
        {
          aufgabe: "Es wird eine Variable namens §0§ deklariert, die eine §1§ speichern kann.",
          check: "^§1§\\s+§0§\\s*;$",
          replace: [
            "letter-small",
            [["ganze Zahl","int"], ["Kommazahl","double"], ["Zeichenkette","String"]]
          ]
        },
        {
          aufgabe: "Die Variable §0§ erhält den §1§-fachen Wert der Variablen §2§.",
          check: "^§0§\\s*=\\s*(§1§\\s*\\*\\s*§2§|§2§\\s*\\*\\s*§1§)\\s*;$",
          solution: "§0§ = §1§ * §2§;",
          replace: [
            "letter-small",
            "int",
            "letter-small"
          ]
        },
        {
          aufgabe: "Die Variable §0§ wird um §1§ erhöht.",
          check: "^§0§\\s*(=\\s*(§1§\\s*\\+\\s*§2§|§2§\\s*\\+\\s*§1§)|\\+=\\s*§1§)\\s*;$",
          solution: "§0§ = §0§ + §1§;",
          replace: [
            "letter-small",
            "int"
          ]
        },
        {
          aufgabe: "Die Variable §0§ erhält den Wert, den der User in die Konsole eintippt.",
          check: "^§0§\\s*=\\s*console\\.read[(]\\s*[)]\\s*;$",
          solution: "§0§ = Console.read( );",
          replace: [
            "letter-small"
          ]
        },
      ];
      let N=this.tasks.length;
      let chosenTasks=Random.drawFrom(tasks,N);
      let letters=["a","b","c","d","e","f","g","h","i","k"];
      letters=Random.drawFrom(letters,letters.length);
      let letterCount=0;
      for(let i=0;i<N;i++){
        let t=this.tasks[i];
        let src=chosenTasks[i];
        t.aufgabe=src.aufgabe;
        let check=src.check;
        let solution=src.solution;
        for(let j=0;j<src.replace.length;j++){
          let type=src.replace[j];
          let valCheck,valAufgabe;
          if(type==="letter-small") {
            valCheck=letters[letterCount%letters.length];
            valAufgabe=valCheck;
            letterCount++;
          }
          else if(type==="int"){
            valCheck=Random.int(1,20);
            valAufgabe=valCheck;
          }
          else if(Array.isArray(type)){
            let index=Random.int(0,type.length-1);
            valAufgabe=type[index][0];
            valCheck=type[index][1];
          }
          let re=new RegExp("§"+j+"§","g");
          check=check.replace(re,valCheck);
          if(solution) solution=solution.replace(re,valCheck);
          t.aufgabe=t.aufgabe.replace(re,valAufgabe);
        }
        t.regexp=new RegExp(check);
        if(solution) t.solution=solution;
        else t.solution=check.substring(1,check.length-1).replace(/\\s[+*]/g," ");
        t.checked=resArray? true: false;
        t.correct=resArray? resArray[i]: false;
        t.input=resArray && resArray[i]? t.solution: "";
      }
    },
    check(){
      let resArray=[];
      for(let i=0;i<this.tasks.length;i++){
        let t=this.tasks[i];
        t.checked=true;
        resArray.push(t.correct);
      }
      return resArray;
    }
  }
}
</script>