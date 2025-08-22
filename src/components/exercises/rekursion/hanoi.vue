<template>
  <ExerciseBody :exercise="$data" :java="project">
    "Die Türme von Hanoi" ist ein Geduldsspiel, bei dem ein Turm, der aus mehreren Scheiben besteht, die nach unten immer breiter werden, von seiner Position um eine Position nach rechts versetzt werden muss. 
    <HanoiDisplay class="float-right" style="width: 6cm; height: 4cm" :width-factor="10" :height-factor="10" :tuerme="[[8,7,6,5,4,3,2,1],[],[]]"/>
    
    Die Schwierigkeit besteht darin, dass immer nur eine Scheibe gleichzeitig bewegt werden darf und dass eine Scheibe immer nur auf eine breitere Scheibe gelegt werden darf.
    <ol class="teilaufgaben">
      <li>Öffne JavaApp unten und führe das Programm aus. Spiele das Spiel für verschiedene Turmhöhen und mache dich mit den Regeln vertraut. Das Ziel besteht darin, den Turm von links in die Mitte zu bewegen.</li>
      <li>
        Implementiere die Methode <Code>versetzeTurm( int start, int ziel, int dritteStange, int anzahlScheiben )</Code> Diese soll die obersten <Code inline>anzahlScheiben</Code> Scheiben von dem Turm an Position <Code inline>start</Code> auf den Turm an Position <Code inline>ziel</Code> versetzen (natürlich regelkonform, die Nummerierung der Türme beginnt bei 0). Der Parameter <Code inline>dritteStange</Code> gibt dabei die Position der dritten Stange an, die weder <Code inline>start</Code> noch <Code inline>ziel</Code> ist.
        <Example>
          Auf die folgende Spielsituation wird <Code inline>versetzeTurm( 0, 2, 1, 2 )</Code> angewendet:
          <HanoiDisplay show-positions style="width: 6cm; height: 4cm" :width-factor="10" :height-factor="10" :tuerme="[[3,{width: 2, color: 'yellow'},{width: 1, color: 'yellow'}],[6,4],[6]]"/>
          Das bedeutet, dass die beiden gelb markierten Steine von Position 0 zu Position 2 versetzt werden sollen.
          <p>Das Ergebnis würde folgendermaßen aussehen:</p>
          <HanoiDisplay show-positions style="width: 6cm; height: 4cm" :width-factor="10" :height-factor="10" :tuerme="[[3],[6,4],[6,{width: 2, color: 'yellow'},{width: 1, color: 'yellow'}]]"/>
          <p>Das geht aber natürlich nicht direkt. Die Methode müsste in mehreren Schritten vorgehen, zum Beispiel folgendermaßen:</p>
          <div class="responsive-grid-2-1" style="display: grid; justify-content: center; gap: 0.5rem 2rem;">
            <HanoiDisplay label="A" show-positions style="width: 6cm; height: 4cm" :width-factor="10" :height-factor="10" :tuerme="[[3,{width: 2},{width: 1, color: 'yellow'}],[6,4],[6]]"/>
            <HanoiDisplay label="B" show-positions style="width: 6cm; height: 4cm" :width-factor="10" :height-factor="10" :tuerme="[[3,{width: 2}],[6,4,{width: 1, color: 'yellow'}],[6]]"/>
            <HanoiDisplay label="C" show-positions style="width: 6cm; height: 4cm" :width-factor="10" :height-factor="10" :tuerme="[[3,{width: 2,color: 'yellow'}],[6,4,{width: 1}],[6]]"/>
            <HanoiDisplay label="D" show-positions style="width: 6cm; height: 4cm" :width-factor="10" :height-factor="10" :tuerme="[[3],[6,4,{width: 1}],[6,{width: 2,color: 'yellow'}]]"/>
            <HanoiDisplay label="E" show-positions style="width: 6cm; height: 4cm" :width-factor="10" :height-factor="10" :tuerme="[[3],[6,4,{width: 1,color: 'yellow'}],[6,{width: 2}]]"/>
            <HanoiDisplay label="F" show-positions style="width: 6cm; height: 4cm" :width-factor="10" :height-factor="10" :tuerme="[[3],[6,4],[6,{width: 2},{width: 1,color: 'yellow'}]]"/>
          </div>
        </Example>
      </li>
      <li>Analysiere die Laufzeit deiner Implementierung.</li>
    </ol>
  </ExerciseBody>
</template>

<script>
import HanoiDisplay from './hanoi-display.vue';



export const data={
  id: "hanoi",
  title: "Die Türme von Hanoi",
  check: {
    init: async ()=>{
      //$Exercise.deleteMain();
      return {
        startButton: $Exercise.getComponent("JButton",(e)=>{return e.getValue().trim()==="Starten"}),
        heightCombobox: $Exercise.getComponent("JComboBox",(e)=>{return true})
      };
    },
    test: async (tc,init)=>{
      $Exercise.setUIBlocked(true);
      let n=$Exercise.randomFrom(tc.n,1)[0];
      console.log(n);
      init.heightCombobox.setValue(n);
      await $Exercise.sleep(500);
      init.startButton.$el.click();
      await $Exercise.sleep(500);
      await $main.versetzeTurm(0,1,2,n);
      return (await $main.tuerme[1].getHoehe())===n;
    },
    testcases: [
        {
          data: ()=>{
            return {
              n: [1]
            }
          },
          count: 1,
          info: "Die Methode funktioniert für n = 1.",
        },
        {
          data: ()=>{
            return {
              n: [8,9,10]
            }
          },
          count: 1,
          info: "Die Methode funktioniert für n > 1.",
        },
      ]
  },

  project: {
    name: "Hanoi",
    clazzes: [
      {
        "name":"Main",
        "src":`Turm[] tuerme;
Turm markiert=null;
int aktuellerSchritt;

void versetzeTurm(int start, int ziel, int dritteStange, int anzahlScheiben){
  //hierhin kommt der Code:

}

void main( ) {
  tuerme=new Turm[3];
  tuerme[0]=new Turm(Screen.turm1);
  tuerme[1]=new Turm(Screen.turm2);
  tuerme[2]=new Turm(Screen.turm3);

  Screen.close.addActionListener((ev)->{
    Startscreen.show();
  });

  Startscreen.start.addActionListener((ev)->{
    int hoehe=Integer.parseInt(Startscreen.hoehe.getValue());
    startGame(hoehe);
  });

  Screen.turm1.addActionListener((ev)->{
    clickTurm(tuerme[0]);
  });
  Screen.turm2.addActionListener((ev)->{
    clickTurm(tuerme[1]);
  });
  Screen.turm3.addActionListener((ev)->{
    clickTurm(tuerme[2]);
  });

  Screen.solve.addActionListener((ev)->{
    versetzeTurm(0, 1, 2, tuerme[0].getHoehe());
  });
  
  Startscreen.show();
}

void startGame(int hoehe){
  Turm t;
  for (int i = 0; i < tuerme.length; i++) {
    t=tuerme[i];
    t.leeren();  
  }
  t=tuerme[0];
  for (int i = 0; i < hoehe; i++) {
    Scheibe s=new Scheibe(hoehe-i+1);
    t.drauflegen(s);
  }
  Screen.show();
}

void demarkiereAlleTuerme(){
  for (int i = 0; i < tuerme.length; i++) {
    tuerme[i].markiereObersteScheibe(false);  
  }
  markiert=null;
}

void markiereTurm(Turm t){
  demarkiereAlleTuerme();
  t.markiereObersteScheibe(true);
  markiert=t;
}

void clickTurm(Turm t){
  if (markiert==t) {
    demarkiereAlleTuerme();
  }else{
    if (markiert==null) {
      if (t.istLeer()) return;
      markiereTurm(t);
    }else{
      Scheibe s=markiert.wegnehmen();
      if (t.passtScheibeDrauf(s)) {
        t.drauflegen(s);  
      }else{
        markiert.drauflegen(s);
        System.toast("Scheibe zu groß", "center");
      }
      demarkiereAlleTuerme();
    }
  }
}
`,
        "isHidden":false
      },
      {
        "name":"Screen",
        type: "UI",
        code: {
          name: "Screen",
          "components":[{"type":"JPanel","components":[{"type":"JButton","value":"Lösen","valueType":"html","onAction":true,"actionCommand":"","disabled":false,"x":50,"y":50,"width":100,"height":100,"cssClass":"jbutton","cssCode":"","invisible":false,"name":"solve","previewID":"P119343"},{"type":"JLabel","value":"","valueType":"html","onAction":false,"actionCommand":"","align":"center","x":50,"y":50,"width":100,"height":100,"cssClass":"jlabel","cssCode":"","invisible":false,"previewID":"P3431681"},{"type":"JButton","value":"Beenden","x":50,"y":50,"width":100,"height":100,"name":"close","previewID":"P6917867"}],"template":"auto 1fr auto","onAction":false,"actionCommand":"","x":50,"y":50,"width":100,"height":100,"cssClass":"jpanel","cssCode":"","invisible":false,"hideContent":false,"previewID":"P6222400"},{"type":"JPanel","components":[{"type":"Canvas","components":[{"type":"JLabel","value":"","valueType":"html","onAction":false,"actionCommand":"","align":"center","x":"5","y":"5","width":"0.5","height":"11","cssClass":"jlabel","cssCode":"background: black; pointer-events: none","invisible":false,"previewID":"P724896"}],"minX":"-0.5","maxX":"10.5","minY":"-0.5","maxY":"10.5","onAction":true,"actionCommand":"","onMouseUp":true,"onMouseDown":true,"onMouseMove":true,"sizePolicy":"fit","x":50,"y":50,"width":100,"height":100,"cssClass":"canvas","cssCode":"","invisible":false,"name":"turm1","hideContent":false,"previewID":"P6308925"},{"type":"Canvas","components":[{"type":"JLabel","value":"","valueType":"html","onAction":true,"actionCommand":"","align":"center","x":"5","y":"5","width":"0.5","height":"11","cssClass":"jlabel","cssCode":"background: black; pointer-events: none","invisible":false,"previewID":"P4204320"}],"minX":"-0.5","maxX":"10.5","minY":"-0.5","maxY":"10.5","onAction":true,"actionCommand":"","onMouseUp":true,"onMouseDown":true,"onMouseMove":true,"sizePolicy":"fit","x":50,"y":50,"width":100,"height":100,"cssClass":"canvas","cssCode":"","invisible":false,"name":"turm2","hideContent":false,"previewID":"P647371"},{"type":"Canvas","components":[{"type":"JLabel","value":"","valueType":"html","onAction":true,"actionCommand":"","align":"center","x":"5","y":"5","width":"0.5","height":"11","cssClass":"jlabel","cssCode":"background: black; pointer-events: none","invisible":false,"previewID":"P9028504"}],"minX":"-0.5","maxX":"10.5","minY":"-0.5","maxY":"10.5","onAction":true,"actionCommand":"","onMouseUp":true,"onMouseDown":true,"onMouseMove":true,"sizePolicy":"fit","x":50,"y":50,"width":100,"height":100,"cssClass":"canvas","cssCode":"","invisible":false,"name":"turm3","hideContent":false,"previewID":"P2710599"}],"template":"3","onAction":false,"actionCommand":"","x":50,"y":50,"width":100,"height":100,"cssClass":"jpanel","cssCode":"","invisible":false,"hideContent":false,"previewID":"P4745151"}],"cssClass":"","cssCode":"","template":"2cm 1fr/"
        }
      },
      {
        isHidden: true,
        "name":"Turm",
        "src": `private Scheibe[] scheiben;
  private int hoehe;
  private Canvas canvas;
  
  Turm(Canvas canvas){
    this.canvas=canvas;
    this.hoehe=0;
    scheiben=new Scheibe[10];
  }

  int getHoehe(){
    return hoehe;
  }
  
  void markiereObersteScheibe(boolean mark){
    Scheibe s=getObersteScheibe();
    if(s==null) return;
    s.markieren(mark);
  }
  
  Scheibe getObersteScheibe(){
    if (hoehe==0) {
      return null;
    }else{
      return scheiben[hoehe-1];
    }
  }

  boolean istLeer(){
    return hoehe==0;
  }
  
  boolean passtScheibeDrauf(Scheibe s){
    if (istLeer()) {
      return true;
    }
    Scheibe o=getObersteScheibe();
    return s.passtAuf(o);
  }
  
  Scheibe wegnehmen(){
    Scheibe s=getObersteScheibe();
    if(s==null) return null;
    canvas.remove(s.getUI());
    scheiben[hoehe-1]=null;
    hoehe--;
    return s;
  }

  void leeren(){
    while (!istLeer()) {
      wegnehmen();
    }
  }
  
  void drauflegen(Scheibe s){
    if(!passtScheibeDrauf(s)) throw new Exception("Diese Scheibe passt nicht auf diesen Turm!");
    canvas.add(s.getUI());
    scheiben[hoehe]=s;
    s.getUI().setX(5);
    s.getUI().setY(hoehe);
    hoehe++;
  }
`
      },
      {
        isHidden: true,
        "name":"Scheibe",
        "src": `  private int breite;
  private JLabel ui;
  Scheibe(int breite){
    this.breite=breite;
    ui=new JLabel("");
    ui.setCSS("background: red; border: 2pt solid black; ponter-events: none;");
    ui.setHeight(1);
    ui.setWidth(breite);
  }

  JLabel getUI(){
    return ui;
  }

  void markieren(boolean mark){
    if(mark){
      ui.setStyle("background", "orange");
    }else{
      ui.setStyle("background", "red");
    }
  }

  boolean passtAuf(Scheibe s){
    if(breite<s.breite) return true;
    else return false;
  }`
      },
      {
        "name":"Startscreen",
        type: "UI",
        code: {
          name: "Startscreen",
          "src":"","components":[{"type":"JLabel","value":"<h1>Die Türme von Hanoi</h1>","valueType":"html","onAction":false,"actionCommand":"","align":"center","x":50,"y":50,"width":100,"height":100,"cssClass":"jlabel","cssCode":"","invisible":false,"previewID":"P4486344"},{"type":"JLabel","value":"Versetze den Turm vollständig.","valueType":"html","onAction":false,"actionCommand":"","align":"center","x":50,"y":50,"width":100,"height":100,"cssClass":"jlabel","cssCode":"","invisible":false,"previewID":"P9520963"},{"type":"JPanel","components":[{"type":"JLabel","value":"Höhe des Turms:","valueType":"html","onAction":false,"actionCommand":"","align":"center","x":50,"y":50,"width":100,"height":100,"cssClass":"jlabel","cssCode":"","invisible":false,"previewID":"P8603955"},{"type":"JComboBox","value":"3","options":"[\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\"]","valueType":"text","onAction":false,"actionCommand":"","disabled":false,"x":50,"y":50,"width":100,"height":100,"cssClass":"jcombobox","cssCode":"","invisible":false,"name":"hoehe","previewID":"P2605931"}],"template":"2","onAction":false,"actionCommand":"","x":50,"y":50,"width":100,"height":100,"cssClass":"jpanel","cssCode":"","invisible":false,"hideContent":false,"previewID":"P4385497"},{"type":"JButton","value":"Starten","valueType":"html","onAction":true,"actionCommand":"","disabled":false,"x":50,"y":50,"width":100,"height":100,"cssClass":"jbutton","cssCode":"","invisible":false,"name":"start","previewID":"P5999211"}],"cssClass":"","cssCode":"","template":"1"
        }
      }
    ],

  }
}

export default{
  components: {
    HanoiDisplay
  },
  data() {
      return data;
  },
}
</script>