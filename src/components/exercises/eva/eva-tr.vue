<template>
  <ExerciseBody :exercise="$data" :java="project">
      Es soll ein einfacher grafischer Taschenrechner erstellt werden, mit dem man zwei Zahlen addieren, subtrahieren, multiplizieren und dividieren kann.
      <div class="float-right">
        <AppPreview >
          <JFrame layout="1">
            <JLabel>Taschenrechner</JLabel>
            <JPanel layout="2">
              <JTextField placeholder="Zahl 1" type="number"/>
              <JTextField placeholder="Zahl 2" type="number"/>
            </JPanel>
            <JPanel layout="4">
              <JButton>+</JButton>
              <JButton>-</JButton>
              <JButton>*</JButton>
              <JButton>:</JButton>
            </JPanel>
            <JLabel>Ergebnis</JLabel>
          </JFrame>
        </AppPreview>
      </div>
      <p>Die UI soll bestehen aus:</p>
      <ul>
        <li>Einem JLabel, in dem "Taschenrechner" steht.</li>
        <li>Zwei Textfeldern mit den Platzhalter-Texten "Zahl 1" und "Zahl 2".</li>
        <li>Einem Button für jede Grundrechenart mit den Aufschriften "+", "-", "*" und ":".</li>
        <li>Einem Label, in dem "Ergebnis" steht.</li>
      </ul>
      <p>Sobald einer der Buttons angeklickt wird, sollen die beiden Zahlen aus den Textfeldern miteinander verrechnet werden und das Ergebnis in dem Label "Ergebnis" angezeigt werden.</p>
  </ExerciseBody>
</template>

<script>
import App from '../../../App.vue';



export const data={
  id: "eva-tr",
  title: "Taschenrechner",
  check: {
    init: async ()=>{
      return {
        labelTR: $Exercise.getComponent("JLabel",(e)=>{return e.getValue()==="Taschenrechner"}),
        buttonPlus: $Exercise.getComponent("JButton",(e)=>{return e.getValue()==="+"}),
        buttonMinus: $Exercise.getComponent("JButton",(e)=>{return e.getValue()==="-"}),
        buttonMal: $Exercise.getComponent("JButton",(e)=>{return e.getValue()==="*"}),
        buttonGeteilt: $Exercise.getComponent("JButton",(e)=>{return e.getValue()===":"}),
        labelResult: $Exercise.getComponent("JLabel",(e)=>{return e.getValue()==="Ergebnis"}),
        tf1: $Exercise.getComponent("JTextField",(e)=>{return e.getPlaceholder()==="Zahl 1"}),
        tf2: $Exercise.getComponent("JTextField",(e)=>{return e.getPlaceholder()==="Zahl 2"}),
      };
    },
    testcases: [
      {
        data: ()=>{
          return {
            id: "labelTR",
            type: "exists"
          }
        },
        info: "Es gibt ein JLabel, in dem 'Taschenrechner' steht."
      },
      {
        data: ()=>{
          return {
            id: "buttonPlus",
            type: "exists"
          }
        },
        info: "Es gibt einen JButton, in dem '+' steht."
      },
      {
        data: ()=>{
          return {
            id: "buttonMinus",
            type: "exists"
          }
        },
        info: "Es gibt einen JButton, in dem '-' steht."
      },
      {
        data: ()=>{
          return {
            id: "buttonMal",
            type: "exists"
          }
        },
        info: "Es gibt einen JButton, in dem '*' steht."
      },
      {
        data: ()=>{
          return {
            id: "buttonGeteilt",
            type: "exists"
          }
        },
        info: "Es gibt einen JButton, in dem ':' steht."
      },
      {
        data: ()=>{
          return {
            id: "labelResult",
            type: "exists"
          }
        },
        info: "Es gibt ein JLabel, in dem 'Ergebnis' steht."
      },
      {
        data: ()=>{
          return {
            id: "tf1",
            type: "exists"
          }
        },
        info: "Es gibt ein JTextField mit dem Platzhaltertext 'Zahl 1'."
      },
      {
        data: ()=>{
          return {
            id: "tf2",
            type: "exists"
          }
        },
        info: "Es gibt ein JTextField mit dem Platzhaltertext 'Zahl 2'."
      },
      {
        data: ()=>{
          return {
            id: "Plus",
            type: "calc",
            f: (a,b)=>{return a+b}
          }
        },
        info: "Addition funktioniert.",
        points: 3,
      },
      {
        data: ()=>{
          return {
            id: "Minus",
            type: "calc",
            f: (a,b)=>{return a-b}
          }
        },
        info: "Subtraktion funktioniert.",
        points: 3,
      },
      {
        data: ()=>{
          return {
            id: "Mal",
            type: "calc",
            f: (a,b)=>{return a*b}
          }
        },
        info: "Multiplikation funktioniert.",
        points: 3,
      },
      {
        data: ()=>{
          return {
            id: "Geteilt",
            type: "calc",
            f: (a,b)=>{return a/b}
          }
        },
        info: "Division funktioniert.",
        points: 3,
      },
    ],
    test: async (tc,init)=>{
      if(tc.type==="exists"){
        return (init[tc.id]!==null);
      }else if(tc.type==="calc"){
        for(let a in init){
          if(!init[a]) return false;
        }
        $Exercise.setUIBlocked(true);
        let a=Math.random()*1000;
        let b=Math.random()*1000;
        init.tf1.setValue(a);
        await $Exercise.sleep(500);
        init.tf2.setValue(b);
        await $Exercise.sleep(500);
        let but=init["button"+tc.id];
        console.log("Button",but);
        but.$el.click();
        await $Exercise.sleep(500);
        let ist=init.labelResult.getValue();
        let soll=tc.f(a,b);
        $Exercise.setUIBlocked(false);
        return (Math.abs(ist-soll)<0.0000001);
      }
      return false;
    },
  },
  project: {
    name: "Taschenrechner",
    clazzes: [
      {
        name: "Main",
        src: `
$void main(){
  
}`,
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