<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Methode <Code inline>boolean schaltjahr(int jahr)</Code> erhält eine Jahreszahl <Code inline>jahr</Code> und soll zurückgeben, ob es sich dabei um ein Schaltjahr handelt oder nicht (laut dem gregorianischen Kalender, der bei uns gebräuchlich ist).  Implementiere diese Methode.
    <Example>
      <ul>
        <li>istSchaltjahr(2000) &rarr; <code>false</code></li>
        <li>istSchaltjahr(2024) &rarr; <code>true</code></li>
      </ul>
    </Example>
  </ExerciseBody>
</template>

<script>
export const data={
  id: "schaltjahr",
  title: "Schaltjahr",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {
        a: await $new(Main)
      }
    },
    testcases: [
        {
          data: ()=>{
            let rest=$Exercise.random(1,2)===1? 0: $Exercise.random(1,3);
            let jahr=$Exercise.random(101,1000)*4+rest;
            while(jahr%100===0 || jahr%400===0){
              jahr=$Exercise.random(101,1000)*4+rest;
            }
            return {
              jahr
            };
          }, 
          count: 50, 
          info: 'Funktioniert "im Normalfall".'
        },
        {
          data: ()=>{
            let jahr=$Exercise.random(100,1000)*100;
            while(jahr%400===0){
              jahr=$Exercise.random(100,1000)*100;
            }
            return {
              jahr
            };
          },
          count: 5,
          info: 'Funktioniert bei den Ausnahmejahren.'
        },
        {
          data: ()=>{
            let jahr=$Exercise.random(10,100)*400;
            return {
              jahr
            };
          },
          count: 5,
          info: 'Funktioniert bei den Ausnahmen der Ausnahmen.'
        },
      ],
    test: async (tc,init)=>{
      let jahr=tc.jahr;
      let ist=await init.a.istSchaltjahr(jahr);
      let soll;
      if(jahr%400===0) soll=true;
      else if(jahr%100===0) soll=false;
      else if(jahr%4===0) soll=true;
      else soll=false;
      return (ist===soll);
    }
  },
  project: {
    name: "Schaltjahr",
    clazzes: [{
      name: "Main",
      src: `boolean istSchaltjahr (int jahr){
  //hierhin kommt der Code:
  
}
  
$void main(){
  boolean s = istSchaltjahr(2024);
  System.out.println( s );
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