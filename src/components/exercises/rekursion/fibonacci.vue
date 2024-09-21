<template>
  <ExerciseBody :exercise="$data" :java="project">
    <p>Die Fibonacci-Zahlen beginnen mit 1 und 1. Die nächste Fibonacci-Zahl entsteht dann immer dadurch, dass die beiden vorangegangenen Zahlen addiert werden. Dadurch ergibt sich die Folge 1, 1, 2, 3, 5, 8, 13, ...</p>

    Die Methode <Code inline>int fibonacci(int n)</Code>
    soll die <Code inline>n</Code>-te Fibonacci-Zahl zurückgeben (<Code inline>n</Code> &ge; 1).
    <Example>
      <ul>
        <li><code>fibonacci( 1 )</code> &rarr; 1</li>
        <li><code>fibonacci( 2 )</code> &rarr; 1</li>
        <li><code>fibonacci( 3 )</code> &rarr; 2</li>
        <li><code>fibonacci( 4 )</code> &rarr; 3</li>
      </ul>
    </Example>
    <p>Implementiere diese Methode ohne Verwendung von Schleifen.</p>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "fibonacci",
  title: "Fibonacci-Zahlen",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {a: await $new(Aufgabe)};
    },
    test: async (tc,init)=>{
      let n=tc.$run.index+1;
      let soll;
      if(n<=2) soll=1;
      else{
        let f=[1,1];
        for(let i=2;i<n;i++){
          let a=f[0]+f[1];
          f[0]=f[1];
          f[1]=a;
        }
        soll=f[1];
      }
      let ist=await init.a.fibonacci(n);
      if(soll===ist) return true;
      throw "Problem bei n = "+n;
    },
    testcases: [
        {
          data: ()=>{
            return {
              
            }
          },
          count: 13,
          info: "Die Methode funktioniert.",
        }
      ]
  },

  project: {
    name: "Fibonacci",
    constraints: {
      java: {
        loops: true
      }
    },
    clazzes: [
      {
        name: "Aufgabe",
        src: `int fibonacci( int n ){
  //hierhin kommt der Code:
  
}

$void main(){
  int f = fibonacci ( 8 );
  System.out.println(f);
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