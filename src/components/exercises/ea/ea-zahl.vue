<template>
  <ExerciseBody :exercise="$data" :finite-state-machine="machine">
    Es sei L die Sprache aller positiven und negativen Zahlen mit oder ohne Komma, wobei führende Nullen vor dem Komma nicht erlaubt sind.
    <p>Erlaubt sind also z. B. <code>409,07</code> oder <code>-38</code> oder <code>-0,00</code>.</p>
    <p>Nicht erlaubt sind z. B. <code>067,32</code> (führende Null vor dem Komma) oder <code>6,</code> (Komma ohne Nachkommastellen).</p>
    <p>Implementiere einen endlichen Automaten, der die Sprache L akzeptiert.</p>
  </ExerciseBody>
</template>

<script>
import { Random } from '../../../other/random';
import { countInString } from '../../../other/string-helper';

function syntaxCorrect(input){
  return input.match(/^-?(0|[1-9][0-9]*)(,[0-9]+)?$/);
}

export const data={
  id: "ea-zahl",
  title: "Kommazahlen",
  check: {
    input: ()=>{
      let array=["0",",","-"];
      let zahlen=["0"]
      for(let i=1;i<8;i++){
        let z=Random.string("0","9",i);
        zahlen.push(z);
      }
      for(let i=1;i<=10;i++){
        let a=Random.drawFrom(zahlen,1);
        let b=Random.drawFrom(zahlen,1);
        
        array.push("-"+b);
        if(i%2===0){
          array.push(a);
          array.push(a+","+b);
        }else{
          array.push("-"+b);
          array.push("-"+a+","+b);
        }
      }
      array.push("0"+Random.drawFrom(zahlen,1)+","+Random.drawFrom(zahlen,1));
      array.push(Random.drawFrom(zahlen,1)+",");
      array.push(Random.drawFrom(zahlen,1)+","+Random.drawFrom(zahlen,1)+","+Random.drawFrom(zahlen,1));
      array.push(","+Random.drawFrom(zahlen,1));
      array.push("--"+Random.drawFrom(zahlen,1));
      array.push("--"+Random.drawFrom(zahlen,1)+","+Random.drawFrom(zahlen,1));
      return array;
    },
    testcases: [
      {
        check: (input, accepted)=>{
          if(!syntaxCorrect(input)) return true;
          return accepted===true;
        },
        info: 'Korrekt geschriebene Zahlen werden akzeptiert.'
      },
      {
        check: (input, accepted)=>{
          if(syntaxCorrect(input)) return true;
          return accepted===false;
        },
        info: 'Falsch geschriebene Kommazahlen werden nicht akzeptiert.'
      }
    ]
  },
  machine: {
    code: ``,
    startState: "S",
    alphabetInput: null,
    exampleInput: "-5,094"
  }
};

export default{
  components: {
    
  },
  data() {
    return data;
  },
}
</script>