<template>
  <ExerciseBody :exercise="$data" :java="project">
      Es soll eine UI für einen einfachen Taschenrechner erstellt werden.
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
      <Hint>Der Taschenrechner muss noch nicht funktionieren, er soll nur so aussehen wie oben abgebildet.</Hint>
  </ExerciseBody>
</template>

<script>

export const data={
  id: "ui-tr",
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
            type: "placement"
          }
        },
        info: "Die Komponenten sind korrekt angeordnet."
      },
    ],
    test: async (tc,init)=>{
      if(tc.type==="exists"){
        return (init[tc.id]!==null);
      }else if(tc.type==="placement"){
        for(let a in init){
          if(!init[a]) return false;
        }
        if(!$Exercise.isTopBottom(init.labelTR,init.tf1)){
          return false;
        }
        if(!$Exercise.isLeftRight(init.tf1,init.tf2)){
          return false;
        }
        if(!$Exercise.isTopBottom(init.tf1,init.buttonPlus)){
          return false;
        }
        if(!$Exercise.isLeftRight(init.buttonPlus,init.buttonMinus,init.buttonMal,init.buttonGeteilt)){
          return false;
        }
        if(!$Exercise.isTopBottom(init.buttonPlus,init.labelResult)){
          return false;
        }
        return true;
      }
      return false;
    },
  },
  project: {
    name: "Taschenrechner",
    clazzes: [
      {
        name: "Main",
        src: `$void main(){
  
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