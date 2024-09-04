<template>
  <ExerciseBody :exercise="$data" :java="project">
    Eine lineare funktion f(x) = m x + b hat immer eine Nullstelle, sofern m &ne; 0. 
    <p>Die Methode <Code inline>double nullstelle(double m, double b)</Code> soll diese Nullstelle berechnen und zurückgeben.</p>
    <Example>
      Für m = 2 und b = 7 ergibt sich
      <div>2x + 7 = 0 &nbsp;&nbsp;&nbsp;&nbsp;| - 7</div>
      <div>2x = -7 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| :2</div>
      <div>x = -3.5</div>
      Es muss also -3.5 zurückgegeben werden.
    </Example>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "nullstelle",
  title: "Nullstelle einer linearen Funktion",
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
            check: (m,b,x)=>{
              let soll=-b/m;
              return Math.abs(x-soll)<0.00000001;
            }
          };
        },
        count: 40,
        info: "Funktioniert für beliebiges m &ne; 0 und beliebiges b."
      }
    ],
    test: async (tc,init)=>{
      
      let m=(Math.random()-0.5)*100;
      if(Math.abs(m)<0.0001) m+=2;
      let b=(Math.random()-0.5)*100;
      let ist = await init.a.nullstelle(m,b);
      return tc.check(m,b,ist);
    }
  },
  project: {
    clazzes: [
      {
        name: "Main",
        src: `double nullstelle(double m, double b){
  //hierhin kommt der Code:
  
}
  
$void main(){
  double x = nullstelle(2,7);
  System.out.println( x );
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