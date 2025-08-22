<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Methode <Code inline>double stromkosten(double verbrauch)</Code> soll die Stromkosten in € bei einem Verbrauch von <Code inline>verbrauch</Code> kwh berechnen und zurückgeben. Die Stromkosten setzen sich folgendermaßen zusammen:
    <ol>
      <li>Die ersten 200 kwh kosten 35 Cent pro kwh.</li>
      <li>Die nächsten 300 kwh kosten 25 Cent pro kwh.</li>
      <li>Jede weitere kwh kostet nur noch 15 Cent.</li>
    </ol>
    Implementiere diese Methode.
    <Example>
      <code>stromkosten(250)</code> &rarr; <code>82.5</code>, denn die ersten 200 kwh kosten 70 € und die restlichen 50 kwh nur noch 12,50 €. 
    </Example>
  </ExerciseBody>
</template>

<script>
export const data={
  id: "strom",
  title: "Stromkosten",
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
            return {
              verbrauch: Math.random()*200
            };
          },  
          count: 10,
          info: 'Klappt für einen Verbrauch bis 200 kwh.'
        },
        {
          data: ()=>{
            return {
              verbrauch: Math.random()*300+200
            };
          }, 
          count: 10,
          info: 'Klappt für einen Verbrauch von 200 kwh bis 500 kwh.'
        },
        {
          data: ()=>{
            return {
              verbrauch: Math.random()*500+500
            };
          }, 
          count: 10,
          info: 'Klappt für einen Verbrauch von über 500 kwh.'
        },
      ],
    test: async (tc,init)=>{
      let v=tc.verbrauch;
      let ist=await init.a.stromkosten(v);
      let soll;
      if(v<=200) soll=v*0.35;
      else if(v<=500) soll=200*0.35+(v-200)*0.25;
      else soll=200*0.35+300*0.25+(v-500)*0.15;
      return (Math.abs(ist-soll)<0.00001);
    }
  },
  project: {
    name: "Stromkosten",
    clazzes: [{
      name: "Main",
      src: `double stromkosten (double verbrauch){
  //hierhin kommt der Code:
  
}
  
$void main(){
  double k = stromkosten(250);
  System.out.println( k );
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