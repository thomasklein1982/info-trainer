<template>
  <ExerciseBody :exercise="$data" :java="project">
    Implementiere die beiden folgenden Methoden:
    <ol class="teilaufgaben">
      <li>
        Die Methode <Code>void swap ( Person[] array, int i, int j )</Code> soll die beiden Elemente im Array <Code inline>array</Code> an den Positionen <Code inline>i</Code> und <Code inline>j</Code> miteinander vertauschen.
        <Hint>Du darfst davon ausgehen, dass <Code inline>i</Code> und <Code inline>j</Code> gültige Indices sind.</Hint>
      </li>
      <li>
        Die Methode <Code>void bubbleSort(Person[] array)</Code> soll das Array <Code inline>array</Code> nach dem BubbleSort-Algorithmus aufsteigend nach dem Alter sortieren.
        <Hint>Der Info-Trainer kann nicht überprüfen, ob deine Lösung dem BubbleSort-Algorithmus entspricht. Es wird nur geprüft, ob das Array korrekt sortiert wird.</Hint>
      </li>
    </ol>
    <Hint></Hint>
  </ExerciseBody>
</template>

<script>

export const data={
  id: "bubble",
  title: "BubbleSort",
  check: {
    init: async ()=>{
      
    },
    testcases: [
        {
          data: ()=>{
            return {
              test: async (init,personen)=>{
                let i=$Exercise.random(0,personen.length-1);
                let j=$Exercise.random(0,personen.length-1);
                let pi=personen[i];
                let pj=personen[j];
                await $main.swap(personen,i,j);
                return personen[i]===pj && personen[j]===pi;
              }
            }
          },
          info: "Die Methode <code class='code'>swap</code> funktioniert.",
          count: 15,
          points: 1
        },
        {
          data: ()=>{
            return {
              test: async (init,personen)=>{
                let sorted=[];
                for(let i=0;i<personen.length;i++){
                  sorted.push(personen[i]);
                }
                sorted=sorted.sort((a,b)=>{
                  return a.alter-b.alter;
                });
                await $main.bubbleSort(personen);
                for(let i=0;i<sorted.length;i++){
                  if(sorted[i]!==personen[i]) return false;
                }
                return true;
              }
            }
          },
          info: "Die Methode <code class='code'>bubbleSort</code> funktioniert.",
          count: 10,
          points: 1
        }
      ],
    test: async (tc,init)=>{
      let array=$Exercise.getRandomObjectArray({
        name: ["Ahmad","Konrad","Elisabeth","Felicitas","Justus","Valerie","Kenan","Fatima","Ayla","Nikolas","Theresa","Ben","Mia","Frauke","Gerd","Thomas","Maria","Frank","Meltem","Hannes","Berta","Ramon"],//22 Namen
        alter: $Exercise.getRange(5,99)
      },$Exercise.random(15,20));
      let personen=[];
      for(let i=1;i<array.length;i++){
        let p=new Person();
        p.name=array[i].name;
        p.alter=array[i].alter;
        personen.push(p);
      }
      return tc.test(init, personen);
    }
  },
  project: {
    clazzes: [
      {
        name: "Main",
        src: `void swap ( Person[] array, int i, int j){
  
}

void bubbleSort ( Person[] array ){
  
}
  
$void main(){
  Person[] personen = new Person[]{
    new Person("Thomas",41),
    new Person("Elisabeth",4),
    new Person("Konrad",10),
    new Person("Justus",0),
    new Person("Felicitas",7),
    new Person("Valerie",35)
  };
  swap ( personen, 2, 5 );
  System.out.println( JSON.stringify(personen) );
  bubbleSort ( personen );
  System.out.println( JSON.stringify(personen) );
}`
      },
      {
        name: "Person",
        src: `String name;
        int alter;

        Person(String name, int alter){
          this.name=name;
          this.alter=alter;
        }`
      }
    ]
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