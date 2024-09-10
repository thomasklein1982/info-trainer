<template>
  <ExerciseBody :exercise="$data" :java="project">
    Die Methode <Code inline>String artDreieck(double a, double b, double c)</Code> erhält als Eingabe-Parameter die drei Seitenlängen des Dreiecks ABC. Die Methode soll die Art des Dreiecks bestimmen und zurückgeben: 
    <ol>
      <li><code>"gleichseitig"</code>: Alle drei Seiten sind gleich lang.</li>
      <li><code>"gleichschenklig"</code>: Nicht gleichseitig, aber zwei gleich lange Seiten.</li>
      <li><code>"nicht-existent"</code>: Wenn es kein Dreieck mit diesen Seitenlängen gibt.</li>
      <li><code>"normal"</code>: Nichts von dem oben genannten trifft zu.</li>
    </ol>
    <Example>
      artDreick(3,4,3) &rarr; "gleichschenklig"
    </Example>
  </ExerciseBody>
</template>

<script>
export const data={
  id: "dreieck",
  title: "Art eines Dreiecks",
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
              seiten: ()=>{
                let a=((Math.random()+1)*10).toFixed(2)*1;
                let b=a;
                let c=a;
                return [a,b,c];
              }
            };
          },
          count: 2,
          info: '<code>"gleichseitig"</code> wird richtig erkannt.'
        },
        {
          data: ()=>{
            return {
              seiten: ()=>{
                let a=((Math.random()+1)*10).toFixed(2)*1;
                let b=((Math.random()+1)*10).toFixed(2)*1;
                let c=a;
                return [a,b,c];
              }
            };
          },
          count: 10,
          info: '<code>"gleichschenklig"</code> wird richtig erkannt.'
        },
        {
          data: ()=>{
            return {
              seiten: ()=>{
                let a=((Math.random()+1)*10).toFixed(2)*1;
                let b=((Math.random()+1)*10).toFixed(2)*1;
                let c=a+b+1;
                return [a,b,c];
              }
            };
          },
          count: 10,
          info: '<code>"nicht-existent"</code> wird richtig erkannt.'
        },
        {
          data: ()=>{
            return {
              seiten: ()=>{
                let a=((Math.random()+2)*10).toFixed(2)*1;
                let b=((Math.random()+2)*10).toFixed(2)*1;
                let c=((Math.random()+2)*10).toFixed(2)*1;
                return [a,b,c];
              }
            };
          },
          count: 5,
          info: '<code>"normal"</code> wird richtig erkannt.'
        },
      ],
    test: async (tc,init)=>{
      let seiten=tc.seiten();
      $Exercise.randomize(seiten);
      let a=seiten[0];
      let b=seiten[1];
      let c=seiten[2];
      let ist=await init.a.artDreieck(a,b,c);
      let soll;
      if(a===b && a===c){
        soll="gleichseitig";
      }else if(a===b || a===c || b===c){
        soll="gleichschenklig";
      }else if(a+b<=c || a+c<=b || b+c<=a){
        soll="nicht-existent";
      }else{
        soll="normal";
      }
      console.log(a,b,c,ist,soll);
      return (ist===soll);
    }
  },
  project: {
    name: "Art eines Dreiecks",
    clazzes: [{
      name: "Main",
      src: `String artDreieck (double a, double b, double c){
  //hierhin kommt der Code:
  
}
  
$void main(){
  String art = artDreieck(3,5,3);
  System.out.println( art );
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