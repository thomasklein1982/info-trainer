<template>
  <ExerciseBody :exercise="$data" :java="project">
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
            return {
              create: (personen,person,runIndex)=>{
                let index=runIndex%personen.length;
                let gesucht=personen[index];
                let name=gesucht.name;
                return {
                  personen,gesucht,name
                }
              }
            }
          },
          info: "Suche funktioniert, wenn der gesuchte Name vorkommt.",
          count: 15,
          points: 3
        },
        {
          data: ()=>{
            return {
              create: (personen,person)=>{
                let gesucht=null;
                let name=person.name;
                return {
                  personen,gesucht,name
                }
              }
            }
          },
          info: "Suche funktioniert, wenn der gesuchte Name gar nicht vorkommt.",
          count: 5
        }
      ],
    test: async (tc,init)=>{
      let array=$Exercise.getRandomObjectArray({
        name: ["Ahmad","Konrad","Elisabeth","Felicitas","Justus","Valerie","Kenan","Fatima","Ayla","Nikolas","Theresa","Ben","Mia","Frauke","Gerd","Thomas","Maria","Frank","Meltem","Hannes","Berta","Ramon"],//22 Namen
        alter: $Exercise.getRange(5,99)
      },$Exercise.random(10,15));
      let personen=[];
      for(let i=1;i<array.length;i++){
        let p=new Person();
        p.name=array[i].name;
        p.alter=array[i].alter;
        personen.push(p);
      }
      let person=new Person();
      person.name=array[0].name;
      person.alter=array[1].alter;
      let res=tc.create(personen,person,tc.$run.index);
      $Exercise.clearConsole();
      let p=await init.a.suchen(res.personen,res.name);
      if(res.gesucht){
        if(!p) return false;
        return p.name===res.name;
      }else{
        return p===null && res.gesucht===null;
      }
    }
  },
  project: {
    clazzes: [
      {
        name: "Aufgabe",
        src: `Person suchen(Person[] personen, String name){
  //hierhin kommt der Code:
  
}
  
$void main(){
  Person p = suchen(new Person[]{
    new Person("Thomas",41),
    new Person("Elisabeth",4),
    new Person("Konrad",10),
    new Person("Justus",0),
    new Person("Felicitas",7),
    new Person("Valerie",35)
  }, "Justus");
  System.out.println(p);
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