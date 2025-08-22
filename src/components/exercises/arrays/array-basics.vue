<template>
  <ExerciseBody :exercise="$data" :java="project">
      Die Methode <Code no-numbers>void arrayBasics(int[] array)</Code> soll mehrere Dinge bewirken (und nicht mehr als diese!):
      <ol class="teilaufgaben">
        <li>Der Wert des siebten Elements soll in der Konsole ausgegeben werden.</li>
        <li>An die dritte Position des Arrays soll die Zahl 5 geschrieben werden.</li>
        <li>Die Anzahl der Elemente des Arrays soll in der Konsole ausgegeben werden.</li>
        <li>Der Wert des vierten Elements soll um eins erhöht werden.</li>
        <li>An die letzte Stelle des Arrays soll die Zahl 1 geschrieben werden.</li>
        <li>Das Produkt der ersten beiden Elemente des Arrays soll an die vorletzte Stelle geschrieben werden.</li>
      </ol>
      Implementiere diese Methode.
      <Hint>Du darfst davon ausgehen, dass das Array ausreichend viele Elemente hat (mindestens 10). Die Reihenfolge der obigen Anweisungen spielt keine Rolle.</Hint>
  </ExerciseBody>
</template>

<script>

export const data={
  id: "array-basics",
  title: "Array-Basics",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {
        a: await $new(Aufgabe)
      };
    },
    test: async (tc,init)=>{
      let array=$Exercise.getCopy(tc.array);
      $Exercise.clearConsole();
      await init.a.arrayBasics(tc.array);
      if(array.length!==tc.array.length){
        throw $Exercise.error("Längen stimmen nicht überein.");
      }
      let out=$Exercise.getConsoleContent();
      console.log("tc check")
      return (tc.check(array,tc.array,out));
    },
    testcases: [
        {
          data: ()=>{
            let N=$Exercise.random(11,20);
            return {
              array: $Exercise.getRandomIntArray(N,{forbidMultiple: true, min: 20}),
              check: (arrayBefore,arrayAfter,out)=>{
                let soll=arrayBefore[6]+"";
                for(let i=0;i<out.length;i++){
                  if(out[i]===soll) return true;
                }
                return false;
              }
            };
          },
          count: 10,
          info: "Der Wert des siebten Elements wird in der Konsole ausgegeben.",
        },
        {
          data: ()=>{
            let N=$Exercise.random(11,20);
            return {
              array: $Exercise.getRandomIntArray(N,{forbidMultiple: true, min: 20}),
              check: (arrayBefore,arrayAfter,out)=>{
                return arrayAfter[2]===5;
              }
            };
          },
          count: 10,
          info: "An die dritten Position wird die Zahl 5 geschrieben.",
        },
        {
          data: ()=>{
            let N=$Exercise.random(11,20);
            return {
              array: $Exercise.getRandomIntArray(N,{forbidMultiple: true, min: 20}),
              check: (arrayBefore,arrayAfter,out)=>{
                let soll=arrayBefore.length+"";
                for(let i=0;i<out.length;i++){
                  if(out[i]===soll) return true;
                }
                return false;
              }
            };
          },
          count: 10,
          info: "Die Anzahl der Elemente wird in der Konsole ausgegeben.",
        },
        {
          data: ()=>{
            let N=$Exercise.random(11,20);
            return {
              array: $Exercise.getRandomIntArray(N,{forbidMultiple: true, min: 20}),
              check: (arrayBefore,arrayAfter,out)=>{
                return arrayAfter[3]===arrayBefore[3]+1;
              }
            };
          },
          count: 10,
          info: "Der Wert des vierten Elements wird um 1 erhöht.",
        },
        {
          data: ()=>{
            let N=$Exercise.random(11,20);
            return {
              array: $Exercise.getRandomIntArray(N,{forbidMultiple: true, min: 20}),
              check: (arrayBefore,arrayAfter,out)=>{
                return arrayAfter[arrayAfter.length-1]===1;
              }
            };
          },
          count: 10,
          info: "An die letzte Stelle wird die Zahl 1 geschrieben.",
        },
        {
          data: ()=>{
            let N=$Exercise.random(11,20);
            return {
              array: $Exercise.getRandomIntArray(N,{forbidMultiple: true, min: 20}),
              check: (arrayBefore,arrayAfter,out)=>{
                let a=arrayBefore[0];
                let b=arrayBefore[1];
                return arrayAfter[arrayAfter.length-2]===a*b;
              }
            };
          },
          count: 10,
          info: "Das Produkt der ersten beiden Elemente wird an die vorletzte Stelle geschrieben.",
        },
        {
          data: ()=>{
            let N=$Exercise.random(11,20);
            return {
              array: $Exercise.getRandomIntArray(N,{forbidMultiple: true, min: 20}),
              check: (arrayBefore,arrayAfter,out)=>{
                let n=arrayBefore.length;
                let ausnahmen=[2,3,n-2,n-1];
                if(out.length>3) return false;
                for(let i=0;i<arrayBefore.length;i++){
                  if(ausnahmen.indexOf(i)<0 && arrayBefore[i]!==arrayAfter[i]){
                    return false;
                  }
                }
                return true;
              }
            };
          },
          count: 5,
          info: "Die anderen Werte des Arrays bleiben unverändert und es wird nicht noch mehr in der Konsole ausgegeben.",
        },
      ]
  },

  project: {
    name: "Array-Basics",
    clazzes: [
      {
        name: "Aufgabe",
        src: `$void arrayBasics(int[] array){
  //hierhin kommt der Code:
  
}
$void main(){
  arrayBasics(new int[]{37,21,15,65,31,47,53,38,29,55});
}`
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
}
</script>