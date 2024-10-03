<template>
  <ExerciseBody :exercise="$data" :java="project">
    Diese Aufgabe ist noch nicht fertig.
  </ExerciseBody>
</template>

<script>


export const data={
  id: "hanoi",
  title: "Die Türme von Hanoi",
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {a: await $new(Aufgabe)};
    },
    test: async (tc,init)=>{
      
    },
    testcases: [
        {
          data: ()=>{
            return {
              
            }
          },
          count: 1,
          info: "Die Methode funktioniert.",
        }
      ]
  },

  project: {
    name: "Hanoi",
    clazzes: [
      {
        "name":"Main",
        "src":"\nTurm[] tuerme;\nTurm markiert=null;\nint aktuellerSchritt;\n\nvoid main( ) {\n  tuerme=new Turm[3];\n  tuerme[0]=new Turm(Screen.turm1);\n  tuerme[1]=new Turm(Screen.turm2);\n  tuerme[2]=new Turm(Screen.turm3);\n\n  Screen.close.addActionListener((ev)->{\n    Startscreen.show();\n  });\n\n  Startscreen.start.addActionListener((ev)->{\n    int hoehe=Integer.parseInt(Startscreen.hoehe.getValue());\n    startGame(hoehe);\n  });\n\n  Screen.turm1.addActionListener((ev)->{\n    clickTurm(tuerme[0]);\n  });\n  Screen.turm2.addActionListener((ev)->{\n    clickTurm(tuerme[1]);\n  });\n  Screen.turm3.addActionListener((ev)->{\n    clickTurm(tuerme[2]);\n  });\n\nScreen.solve.addActionListener((ev)->{\nversetzeTurm(0, 1, tuerme[0].hoehe);\n});\n  \n  Startscreen.show();\n}\n\nvoid versetzeTurm(int von, int nach, int anzahlScheiben){\n  \n}\n\nvoid startGame(int hoehe){\n  Turm t;\n  for (int i = 0; i < tuerme.length; i++) {\n    t=tuerme[i];\n    t.leeren();  \n  }\n  t=tuerme[0];\n  for (int i = 0; i < hoehe; i++) {\n    Scheibe s=new Scheibe(hoehe-i+1);\n    t.drauflegen(s);\n  }\n  Screen.show();\n}\n\nvoid demarkiereAlleTuerme(){\n  for (int i = 0; i < tuerme.length; i++) {\n    tuerme[i].markiereObersteScheibe(false);  \n  }\n  markiert=null;\n}\n\nvoid markiereTurm(Turm t){\n  demarkiereAlleTuerme();\n  t.markiereObersteScheibe(true);\n  markiert=t;\n}\n\nvoid clickTurm(Turm t){\n  if (markiert==t) {\n    demarkiereAlleTuerme();\n  }else{\n    if (markiert==null) {\n      if (t.istLeer()) return;\n      markiereTurm(t);\n    }else{\n      Scheibe s=markiert.wegnehmen();\n      if (t.passtScheibeDrauf(s)) {\n        t.drauflegen(s);  \n      }else{\n        markiert.drauflegen(s);\n        System.toast(\"Scheibe zu groß\", \"center\");\n      }\n      demarkiereAlleTuerme();\n    }\n  }\n}\n\n",
        "isHidden":false
      },
      {
        "name":"Screen",
        type: "UI",
        "components":[{"type":"JPanel","components":[{"type":"JButton","value":"Lösen","valueType":"html","onAction":true,"actionCommand":"","disabled":false,"x":50,"y":50,"width":100,"height":100,"cssClass":"jbutton","cssCode":"","invisible":false,"name":"solve","previewID":"P119343"},{"type":"JLabel","value":"","valueType":"html","onAction":false,"actionCommand":"","align":"center","x":50,"y":50,"width":100,"height":100,"cssClass":"jlabel","cssCode":"","invisible":false,"previewID":"P3431681"},{"type":"JButton","value":"Beenden","x":50,"y":50,"width":100,"height":100,"name":"close","previewID":"P6917867"}],"template":"auto 1fr auto","onAction":false,"actionCommand":"","x":50,"y":50,"width":100,"height":100,"cssClass":"jpanel","cssCode":"","invisible":false,"hideContent":false,"previewID":"P6222400"},{"type":"JPanel","components":[{"type":"Canvas","components":[{"type":"JLabel","value":"","valueType":"html","onAction":false,"actionCommand":"","align":"center","x":"5","y":"5","width":"0.5","height":"11","cssClass":"jlabel","cssCode":"background: black; pointer-events: none","invisible":false,"previewID":"P724896"}],"minX":"-0.5","maxX":"10.5","minY":"-0.5","maxY":"10.5","onAction":true,"actionCommand":"","onMouseUp":true,"onMouseDown":true,"onMouseMove":true,"sizePolicy":"fit","x":50,"y":50,"width":100,"height":100,"cssClass":"canvas","cssCode":"","invisible":false,"name":"turm1","hideContent":false,"previewID":"P6308925"},{"type":"Canvas","components":[{"type":"JLabel","value":"","valueType":"html","onAction":true,"actionCommand":"","align":"center","x":"5","y":"5","width":"0.5","height":"11","cssClass":"jlabel","cssCode":"background: black; pointer-events: none","invisible":false,"previewID":"P4204320"}],"minX":"-0.5","maxX":"10.5","minY":"-0.5","maxY":"10.5","onAction":true,"actionCommand":"","onMouseUp":true,"onMouseDown":true,"onMouseMove":true,"sizePolicy":"fit","x":50,"y":50,"width":100,"height":100,"cssClass":"canvas","cssCode":"","invisible":false,"name":"turm2","hideContent":false,"previewID":"P647371"},{"type":"Canvas","components":[{"type":"JLabel","value":"","valueType":"html","onAction":true,"actionCommand":"","align":"center","x":"5","y":"5","width":"0.5","height":"11","cssClass":"jlabel","cssCode":"background: black; pointer-events: none","invisible":false,"previewID":"P9028504"}],"minX":"-0.5","maxX":"10.5","minY":"-0.5","maxY":"10.5","onAction":true,"actionCommand":"","onMouseUp":true,"onMouseDown":true,"onMouseMove":true,"sizePolicy":"fit","x":50,"y":50,"width":100,"height":100,"cssClass":"canvas","cssCode":"","invisible":false,"name":"turm3","hideContent":false,"previewID":"P2710599"}],"template":"3","onAction":false,"actionCommand":"","x":50,"y":50,"width":100,"height":100,"cssClass":"jpanel","cssCode":"","invisible":false,"hideContent":false,"previewID":"P4745151"}],"cssClass":"","cssCode":"","template":"2cm 1fr/"
      },
      {
        "name":"Turm",
        "src":"\n  Scheibe[] scheiben;\n  int hoehe;\n  Canvas canvas;\n  \n  Turm(Canvas canvas){\n    this.canvas=canvas;\n    this.hoehe=0;\n    scheiben=new Scheibe[10];\n  }\n\n  void markiereObersteScheibe(boolean mark){\n    Scheibe s=getObersteScheibe();\n    if(s==null) return;\n    s.markieren(mark);\n  }\n  \n  Scheibe getObersteScheibe(){\n    if (hoehe==0) {\n      return null;\n    }else{\n      return scheiben[hoehe-1];\n    }\n  }\n\n  boolean istLeer(){\n    return hoehe==0;\n  }\n  \n  boolean passtScheibeDrauf(Scheibe s){\n    if (istLeer()) {\n      return true;\n    }\n    Scheibe o=getObersteScheibe();\n    return s.passtAuf(o);\n  }\n  \n  Scheibe wegnehmen(){\n    Scheibe s=getObersteScheibe();\n    if(s==null) return null;\n    canvas.remove(s.ui);\n    scheiben[hoehe-1]=null;\n    hoehe--;\n    return s;\n  }\n\n  void leeren(){\n    while (!istLeer()) {\n      wegnehmen();\n    }\n  }\n  \n  void drauflegen(Scheibe s){\n    canvas.add(s.ui);\n    scheiben[hoehe]=s;\n    s.ui.setX(5);\n    s.ui.setY(hoehe);\n    hoehe++;\n  }\n\n  void click(){\n    \n  }",
        "isHidden":false
      },
      {
        "name":"Scheibe",
        "src":"\n  int breite;\n  JLabel ui;\n  Scheibe(int breite){\n    this.breite=breite;\n    ui=new JLabel(\"\");\n    ui.setCSS(\"background: red; border: 2pt solid black; ponter-events: none;\");\n    ui.setHeight(1);\n    ui.setWidth(breite);\n  }\n\n  void markieren(boolean mark){\n    if(mark){\n      ui.setStyle(\"background\", \"orange\");\n    }else{\n      ui.setStyle(\"background\", \"red\");\n    }\n  }\n\n  boolean passtAuf(Scheibe s){\n    if(breite<s.breite) return true;\n    else return false;\n  }",
        "isHidden":false
      },
      {
        "name":"Startscreen",
        type: "UI",
        "src":"","components":[{"type":"JLabel","value":"<h1>Die Türme von Hanoi</h1>","valueType":"html","onAction":false,"actionCommand":"","align":"center","x":50,"y":50,"width":100,"height":100,"cssClass":"jlabel","cssCode":"","invisible":false,"previewID":"P4486344"},{"type":"JLabel","value":"Versetze den Turm vollständig.","valueType":"html","onAction":false,"actionCommand":"","align":"center","x":50,"y":50,"width":100,"height":100,"cssClass":"jlabel","cssCode":"","invisible":false,"previewID":"P9520963"},{"type":"JPanel","components":[{"type":"JLabel","value":"Höhe des Turms:","valueType":"html","onAction":false,"actionCommand":"","align":"center","x":50,"y":50,"width":100,"height":100,"cssClass":"jlabel","cssCode":"","invisible":false,"previewID":"P8603955"},{"type":"JComboBox","value":"3","options":"[\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\"]","valueType":"text","onAction":false,"actionCommand":"","disabled":false,"x":50,"y":50,"width":100,"height":100,"cssClass":"jcombobox","cssCode":"","invisible":false,"name":"hoehe","previewID":"P2605931"}],"template":"2","onAction":false,"actionCommand":"","x":50,"y":50,"width":100,"height":100,"cssClass":"jpanel","cssCode":"","invisible":false,"hideContent":false,"previewID":"P4385497"},{"type":"JButton","value":"Starten","valueType":"html","onAction":true,"actionCommand":"","disabled":false,"x":50,"y":50,"width":100,"height":100,"cssClass":"jbutton","cssCode":"","invisible":false,"name":"start","previewID":"P5999211"}],"cssClass":"","cssCode":"","template":"1"
      }
    ],

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