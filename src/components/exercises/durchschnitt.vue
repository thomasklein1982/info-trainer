<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Methode <Code inline>durchschnitt(int a1, int a2, int a3, int a4, int a5, int a6)</Code> soll den Durchschnitt einer Klassenarbeit mit dem Notenspiegel
    <table class="wertetabelle">
      <tr><th>Note 1</th><th>Note 2</th><th>Note 3</th><th>Note 4</th><th>Note 5</th><th>Note 6</th></tr>
      <tr><td><Code inline>a1</Code></td><td><Code inline>a2</Code></td><td><Code inline>a3</Code></td><td><Code inline>a4</Code></td><td><Code inline>a5</Code></td><td><Code inline>a6</Code></td></tr>
    </table>
    berechnen und das Ergebnis in der Form <code>"Der Durchschnitt ist ..."</code> in der Konsole ausgeben, z. B. <code>Der Durchschnitt ist 3.2178</code>.
  </ExerciseBody>
</template>

<script>

export const data={
  id: "durchschnitt",
  title: "Durchschnitt einer Klassenarbeit",
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
            
          };
        },
        info: "Der Durchschnitt wird berechnet und ausgegeben.",
        points: 4
      },
    ],
    test: async (tc,init)=>{
      await System.console().clear();
      let a1=$Exercise.random(0,7);
      let a2=$Exercise.random(0,7);
      let a3=$Exercise.random(0,7);
      let a4=$Exercise.random(0,7);
      let a5=$Exercise.random(0,7);
      let a6=$Exercise.random(0,7);
      let s=(1.0*a1*1+a2*2+a3*3+a4*4+a5*5+a6*6)/(a1+a2+a3+a4+a5+a6);
      $Exercise.clearConsole();
      await init.a.durchschnitt(a1,a2,a3,a4,a5,a6);
      let out=$Exercise.getConsoleContent().join("").trim();
      $Exercise.clearConsole();
      let n="Der Durchschnitt ist ".length;
      let ist=out.substring(n).trimEnd();
      let soll=s+"";
      console.log(ist,soll);
      return ist.substring(0,7)===soll.substring(0,7);
    }
  },
  project: {
    clazzes: [
      {
        name: "Main",
        src: `$void durchschnitt(int a1, int a2, int a3, int a4, int a5, int a6){
  //hierhin kommt der Code:
  
}
  
$void main(){
  durchschnitt(2, 5, 7, 4, 1, 0);
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