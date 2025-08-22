<template>
  <ExerciseBody :exercise="$data" :turing-machine="machine">
    Implementiere eine Turingmaschine, die eine Eingabe aus den Zeichen <code>x</code> und <code>y</code> erhält und die überprüft, ob es sich bei der Eingabe um ein Palindrom (siehe unten) handelt und entsprechend <code>J</code> für "Ja" bzw. <code>N</code> für "Nein" auf das Band schreibt. Das Band muss ansonsten leer sein.
    <Example>
      Für die Eingabe <code>xxyxyxyxx</code> soll die Ausgabe <code>J</code> generiert werden.
    </Example>
    <Hint>Eine Zeichenkette heißt Palindrom, wenn sie vorwärts und rückwärts gelesen identisch ist. Beispiele sind "OTTO", "ANNA" und "RELIEFPFEILER".</Hint>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


export const data={
  id: "tm-palindrom",
  title: "Palindrom-Checker",
  check: {
    input: ()=>{
      let array=["","xyx","yxy"];
      for(let i=0;i<5;i++){
        let t="";
        let n=2*i+1;
        for(let j=0;j<n;j++){
          t+=random(0,1)===0? "x":"y";
        }
        let t1=t.split("");
        t1=t1.reverse();
        t1=t1.join("");
        let anfang=i%2===0? "x":"y";
        let inp1=anfang+t+t1+anfang;
        let inp2=anfang+t+t1;
        array.push(inp1);
        array.push(inp2);
      }
      return array;
    },
    testcases: [
      {
        check: (input, output)=>{
          let isPalindrome=true;
          let n=input.length;
          for(let i=0;i<n/2;i++){
            if(input.charAt(i)!==input.charAt(n-1-i)){
              isPalindrome=false;
              break;
            }
          }
          if(!isPalindrome) return true;
          output=output.trim();
          return output==="J";
        },
        info: 'Palindrome werden als solche erkannt und <code>J</code> steht auf dem Band.'
      },
      {
        check: (input, output)=>{
          let isPalindrome=true;
          let n=input.length;
          for(let i=0;i<n/2;i++){
            if(input.charAt(i)!==input.charAt(n-1-i)){
              isPalindrome=false;
              break;
            }
          }
          if(isPalindrome) return true;
          output=output.trim();
          return output==="N";
        },
        info: 'Wörter, die keine Palindrome sind, werden richtig erkannt und <code>N</code> steht auf dem Band.'
      }
    ]
  },
  machine: {
    code: ``,
    startState: "S",
    alphabetInput: null,
    exampleInput: "xxyxyxx",
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
</script>