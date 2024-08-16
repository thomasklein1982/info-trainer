<template>
  <ExerciseBody :exercise="$data">
      Die Methode <Code>Person suchen(Person[] personen, String name)</Code> soll die erste Person in <Code inline>personen</Code> zurückgeben, die den Namen <Code inline>name</Code> hat.
      <p>Gibt es keine solche Person, so soll <Code inline>null</Code> zurückgegeben werden.</p>
      <p>Implementiere diese Methode.</p>
  </ExerciseBody>
</template>

<script>

export const data={
  id: "iterative-suche",
  title: "Sequentielle Suche",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {
        a: await $new(Aufgabe)
      }
    },
    testcases: [
        {
          data: ()=>{
            let array=$Exercise.getRandomObjectArray({
              name: ["Ahmad","Konrad","Elisabeth","Felicitas","Justus","Valerie","Kenan","Fatima","Ayla","Nikolas","Theresa","Ben","Mia","Frauke","Gerd","Thomas"],
              alter: $Exercise.getRange(5,99)
            },20)
            let personen=[];
            for(let i=0;i<array.length;i++){
              personen.push(new Person(array[i].name,array[i].alter));
            }
            let gesucht=personen[$Exercise.random(0,personen.length-1)];
            let name=gesucht.name;
            return {
              personen,gesucht,name
            }
          },
          info: "Suche funktioniert, wenn der gesuchte Name genau einmal vorkommt."
        }
      ],
    test: async (tc,init)=>{
      $Exercise.clearConsole();
      let p=await init.a.suchen(tc.personen,tc.name);
      return (p===tc.gesucht);
    }
  },
  project: {
    clazzes: [
      {
        name: "Aufgabe",
        src: `Person suchen(Person[] personen, String name){
          //hierhin kommt der Code
      
        }`,
        main: `Aufgabe a = new Aufgabe();
          Person p = a.suchen(new Person[]{
          new Person("Thomas",41),
          new Person("Elisabeth",4),
          new Person("Konrad",10),
          new Person("Justus",0),
          new Person("Felicitas",7),
          new Person("Valerie",35)
        });
        System.out.println(p);`,
        onStart: `Person p = suchen(new Person[]{
          new Person("Thomas",41),
          new Person("Elisabeth",4),
          new Person("Konrad",10),
          new Person("Justus",0),
          new Person("Felicitas",7),
          new Person("Valerie",35)
        });
        System.out.println(p);`
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