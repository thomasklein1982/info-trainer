<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Methode <Code inline>rechnen(int a, int b)</Code> soll nacheinander (in dieser Reihenfolge!) die folgenden Dinge in der Konsole ausgeben (jeweils in einer eigenen Zeile):
    <ol>
      <li>Die Summe von <Code inline>a</Code> und <Code inline>b</Code>.</li>
      <li>Das Dreifache von <Code inline>a</Code>.</li>
      <li>Das Ergebnis des Terms a &sdot; ( b - a ).</li>
    </ol>
  </ExerciseBody>
</template>

<script>

export const data={
  id: "rechnen",
  title: "Rechnen mit Java",
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
            check: (output,a,b)=>{
              return output[0]?.trim()===(a+b)+"";
            }
          };
        },
        info: "Die Summe von a und b wird zuerst ausgegeben."
      },
      {
        data: ()=>{
          return {
            check: (output,a,b)=>{
              return output[1]?.trim()===(3*a)+"";
            }
          };
        },
        info: "Das Dreifache von a wird als Zweites ausgegeben."
      },
      {
        data: ()=>{
          return {
            check: (output,a,b)=>{
              return output[2]?.trim()===(a*(b-a))+"";
            }
          };
        },
        info: "Das Ergebnis des Terms a &sdot; ( b - a ) wird am Ende ausgegeben."
      },
    ],
    test: async (tc,init)=>{
      await System.console().clear();
      let a=$Exercise.random(10,1000);
      let b=$Exercise.random(10,1000);
      await init.a.rechnen(a,b);
      let out=$Exercise.getConsoleContent();
      return tc.check(out,a,b);
    }
  },
  project: {
    clazzes: [
      {
        name: "Main",
        src: `$void rechnen(int a, int b){
  //hierhin kommt der Code:
  
}
  
$void main(){
  rechnen(10,4);
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