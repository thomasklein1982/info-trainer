<template>
  <ExerciseBody :exercise="$data" :java="project">
    Es soll eine App programmiert werden, die es erlaubt, mathematische Funktionen bis einschließlich Grad 3 zu untersuchen und zu verarbeiten. Eine solche Funktion kann in der Form
    <p>f(x)=ax³ + bx² + cx + d</p>
    mit a, b, c, d &isin; &#8477;.
    <p>Eine grafische Oberfläche wurde bereits erstellt. Außerdem wurden zwei Klassen <Code inline>Funktion</Code> und <Code inline>Punkt</Code> rudimentär implementiert:</p>

    <Code>class Punkt {
  double x, y;
  Punkt(double x, double y){

  }
  String alsString(){
    //gibt den Punkt in der Form (x|y) als String zurück
  }
}

class Funktion {
  double a,b,c,d;
  Funktion(double a, double b, double c, double d){

  }
  String alsString(){
    return a+"x³ + "+b+"x² + "+c+"x + "+d;
  }
  double[] nullstellen(){
    //liefert die Nullstellen der Funktion zurück.
    //es reicht, diese Methode für Grad <=2 zu implementieren
    //wenn es unendlich viele Nullstellen gibt oder wenn grad=3, 
    //soll null zurückgegeben werden
  }
  Funktion ableitung(){
    //liefert die Ableitung von f als neue Funktion zurück
  }
  Punkt[] extrema(){
    //liefert die "echten" Extrempunkte der Funktion zurück
  }
  Punkt[] wendepunkte(){
    //liefert die "echten" Wendepunkte der Funktion zurück
  }
  int grad(){
    //liefert den tatsächlichen Grad der Funktion zurück
  }
  double auswerten(double x){
    //liefert den Wert von f(x) zurück
  }
  boolean steigt(double x){
    //liefert zurück, ob f an der Stelle x (monoton) steigt
  }
  double flaeche(double von, double bis){
    //liefert näherungsweise die Fläche zurück,
    //die f mit der x-Achse im Intervall [von,bis] einschließt
  }
}
</Code>
    Implementiere die Klassen <Code inline>Funktion</Code> und <Code inline>Punkt</Code>.
    <Example>
      Für die Funktion f(x)=-x²+3x+2 sollten die folgenden Ergebnisse herauskommen:
      <ul>
        <li>f.auswerten(3.5) = 0.25</li>
        <li>f.steigt(-2) = true</li>
        <li>f.grad() = 2</li>
        <li>f.ableitung() = { a: 0, b: 0, c: -2, d: 1.5 }</li>
        <li>f.nullstellen() &asymp; [ -0.5616, 3.5616 ] </li>
        <li>f.extrema() = [ {x: 1.5, y: 4.25} ] </li>
        <li>f.wendepunkte() = [ ] </li>
        <li>f.flaeche(1, 4.5) &asymp; 10.0155</li>
      </ul>
    </Example>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "oo-funktion",
  title: "Analyse einer mathematischen Funktion",
  check: {
    init: async ()=>{
      return {
        
      };
    },
    test: async (tc,init)=>{
      $Exercise.clearConsole();
      let marke=$Exercise.randomFrom(["VW","Mercedes","BMW","Opel","Citroen","Renault"],1)[0];
      let kmStand=$Exercise.random(100,2000);
      let auto=await init.a.auto(marke,kmStand);
      let out=$Exercise.getConsoleContent().join("");
      let auto2=await $Exercise.createInstance(Auto,marke,kmStand);//await $App.asyncFunctionCall(new Auto(),"$constructor",[null,marke,kmStand]);
      await auto2.fahren(100);
      return (await tc.check(auto,kmStand,marke,out,auto2));
    },
    testcases: [
        {
          data: ()=>{
            return {
              check: async (funktion,grad)=>{
                let g=await funktion.grad();
                return funktion!==undefined && funktion!==null && funktion instanceof Funktion && g===grad;
              },
            };
          },
          count: 4,
          info: "Die Methode <code>grad</code> funktioniert.",
        },
        
      ]
  },

  project: {
    name: "OO-Funktion",
    clazzes: [
      {
        name: "Main",
        src: `Funktion f;
$void main( ) {
  JFrame frame = new JFrame( "1" );
  JPanel pFunktion = new JPanel( "4" );
  frame.add( pFunktion );
  JTextField in_a = new JTextField( "number", "a" );
  JTextField in_b = new JTextField( "number", "b" );
  JTextField in_c = new JTextField( "number", "c" );
  JTextField in_d = new JTextField( "number", "d" );
  pFunktion.add( in_a );
  pFunktion.add( in_b );
  pFunktion.add( in_c );
  pFunktion.add( in_d );
  JButton bUebernehmen = new JButton( "Übernehmen" );
  frame.add( bUebernehmen );
  JPanel pButtons = new JPanel( "4" );
  frame.add( pButtons );
  JButton bExtrema = new JButton( "Extrema" );
  pButtons.add( bExtrema );
  JButton bWende = new JButton( "Wendepunkte" );
  pButtons.add( bWende );
  JButton bGrad = new JButton( "Grad" );
  pButtons.add( bGrad );
  JButton bAbleiten = new JButton( "Ableiten" );
  pButtons.add( bAbleiten );
  JPanel pAuswerten=new JPanel("3");
  frame.add(pAuswerten);
  JTextField in_x=new JTextField("number","x");
  pAuswerten.add(in_x);
  JButton bAuswerten=new JButton("Auswerten");
  pAuswerten.add(bAuswerten);
  JButton bSteigt=new JButton("Steigt?");
  pAuswerten.add(bSteigt);
  JPanel pFlaeche = new JPanel("3");
  frame.add(pFlaeche);
  JTextField in_von=new JTextField("number","von");
  pFlaeche.add(in_von);
  JTextField in_bis=new JTextField("number","bis");
  pFlaeche.add(in_bis);
  JButton bFlaeche=new JButton("Fläche");
  pFlaeche.add(bFlaeche);
  JLabel anzeige = new JLabel( "Ergebnis" );
  frame.add( anzeige );
  bUebernehmen.addActionListener( ( ev ) -> {
    double a = Double.parseDouble( in_a.getValue( ) );
    double b = Double.parseDouble( in_b.getValue( ) );
    double c = Double.parseDouble( in_c.getValue( ) );
    double d = Double.parseDouble( in_d.getValue( ) );
    f = new Funktion( a, b, c, d );
    anzeige.setValue(f.alsString());
  } );
  bExtrema.addActionListener( ( ev ) -> {
    Punkt[ ] extrema = f.extrema( );
    anzeige.setValue( arrayToString(extrema) );
  } );
  bWende.addActionListener( ( ev ) -> {
    Punkt[ ] wp = f.wendepunkte( );
    anzeige.setValue( arrayToString(wp) );
  } );
  bGrad.addActionListener( ( ev ) -> {
    anzeige.setValue( f.grad( )+"" );
  } );
  bAbleiten.addActionListener( (ev) ->{
    f=f.ableitung();
    anzeige.setValue(f.alsString());
  });
  bAuswerten.addActionListener( ( ev )->{
    double x = Double.parseDouble( in_x.getValue( ) );
    double y=f.auswerten( x );
    anzeige.setValue( y + "");
  });
  bSteigt.addActionListener( ( ev )->{
    double x = Double.parseDouble( in_x.getValue( ) );
    boolean s=f.steigt( x );
    anzeige.setValue( s + "");
  });
  bFlaeche.addActionListener( ( ev )->{
    double von = Double.parseDouble( in_von.getValue( ) );
    double bis = Double.parseDouble( in_bis.getValue( ) );
    double a=f.flaeche(von, bis);
    anzeige.setValue( a+"" );
  });
}

String arrayToString(Punkt[] array){
  String t="";
  for (int i = 0; i < array.length; i++) {
    t+=array[i].alsString();
  }
  return t;
}
`
      },
      {
        name: "Funktion",
        src: `double a,b,c,d;
Funktion(double a, double b, double c, double d){

}
String alsString(){
  return a+"x³ + "+b+"x² + "+c+"x + "+d;
}
double[] nullstellen(){
  //liefert die Nullstellen der Funktion zurück.
  //es reicht, diese Methode für Grad <=2 zu implementieren
  //wenn es unendlich viele Nullstellen gibt oder wenn grad=3, 
  //soll null zurückgegeben werden
}
Funktion ableitung(){
  //liefert die Ableitung von f als neue Funktion zurück
}
Punkt[] extrema(){
  //liefert die "echten" Extrempunkte der Funktion zurück
}
Punkt[] wendepunkte(){
  //liefert die "echten" Wendepunkte der Funktion zurück
}
int grad(){
  //liefert den tatsächlichen Grad der Funktion zurück
}
double auswerten(double x){
  //liefert den Wert von f(x) zurück
}
boolean steigt(double x){
  //liefert zurück, ob f an der Stelle x (monoton) steigt
}
double flaeche(double von, double bis){
  //liefert näherungsweise die Fläche zurück,
  //die f mit der x-Achse im Intervall [von,bis] einschließt
}`
      },
      {
        name: "Punkt",
        src: `double x, y;
Punkt(double x, double y){

}
String alsString(){
  //gibt den Punkt in der Form (x|y) als String zurück
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