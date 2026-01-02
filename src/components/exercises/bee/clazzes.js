import * as BeeJSON from './graphics/bee.json';
import * as TreeJSON from './graphics/tree.json';

export const BeeClazz={
  name: "Bee2",
  isHidden: true,
  uml: false,
  src: `
  private GameWorld world;
  private String name;
  private Canvas ui;
  private JLabel label;
  private JImage image;
  int speed = 50;
  boolean maxSpeed=false;
  Bee2( String name, GameWorld w ) {
    this.name=name;
    world = w;
    ui = new Canvas( 0,1,0,1 );
    image=new JImage("${BeeJSON.dataurl}");
    image.setPosition(0.5,0.5);
    ui.add(image);
    label=new JLabel(name);
    label.setStyle("font-size","25cqw");
    label.setPosition(0.5,0.5);
    label.setAlignment("top");
    ui.add(label);
    ui.setSize( 0.7, 0.7 );
    ui.setDirection( 0 );
    ui.setStyle("transition","all 0.2s");
    image.setStyle("transition","all 0.2s");
  }
  /*Bewegt die Biene um 1 Feld*/
  void move( ) {
    sleep( );
    String fieldAhead = getFieldTypeAhead( );
    if ( fieldAhead == "tree" || fieldAhead == "border" ) {
      throw new Exception("Autsch! "+name+" ist gegen ein Hindernis geflogen.");
    }
    ui.move( 1 );
    JComponent f=getFieldAhead();
    if(f!=null) f.scrollIntoView();
  }
  
  private void sleep( ) {
    if(maxSpeed) return;
    Thread.sleep( 1000 - speed * 10 );
  }
  
  void turnLeft( ) {
    sleep( );
    ui.setRotation( ui.getRotation( ) + 90 );
    ui.setDirection( ( ui.getDirection( ) + 90 ) % 360 );
  }
  
  void turnRight( ) {
    sleep( );
    ui.setRotation( ui.getRotation( )-90 );
    ui.setDirection( ( ui.getDirection( ) + 270 ) % 360 );
  }

  JComponent scanEffect(){
    JComponent field = getFieldAhead( );
    if ( field == null ) {
      throw new Exception("Vor dir ist kein Feld mehr!");
    }
    String bg=field.getStyle("background-color");
    field.setStyle( "background-color", "white" );
    field.setStyle( "opacity", "0.5" );
    sleep( );
    field.setStyle( "background-color", bg );
    field.setStyle( "opacity", "1" );
    return field;
  }

  void scrollIntoView(){
    this.ui.scrollIntoView();
  }

  String read(){
    JComponent field = scanEffect();
    return field.getValue();
  }

  void print(Object text){
    JComponent field = scanEffect();
    String t="";
    if(text==null) t="null";
    else if(text instanceof Integer) t=((Integer) text).intValue()+"";
    else if(text instanceof Double) t=((Double) text).doubleValue()+"";
    else if(text instanceof Character) t=((Character) text).charValue()+"";
    else if(text instanceof String) t=(String)text;
    field.setValue(t);
  }
  
  String getFieldType(){
    JComponent c = world.getField( Math.round( ui.getX( ) ), Math.round( ui.getY( ) ) );
    if ( c == null ) return "border";
    return c.actionCommand;
  }

  JLabel getField(){
    return world.getField( Math.round( ui.getX( ) ), Math.round( ui.getY( ) ) );
  }

  JComponent getFieldAhead( ) {
    ui.move( 1 );
    JComponent field = world.getField( Math.round( ui.getX( ) ), Math.round( ui.getY( ) ) );
    ui.move( -1 );
    return field;
  }
  
  String getFieldTypeAhead( ) {
    JComponent c = getFieldAhead( );
    if ( c == null ) return "border";
    return c.actionCommand;
  }
  
`
}

export const GameWorldClazz={
  name: "GameWorld",
  uml: false,
  isHidden: true,
  src: `
  private JFrame frame;
  private Canvas canvas;
  private JPanel window;
  int maxX, maxY, windowWidth, windowHeight;
  HashMap<String,JLabel> namedFields=new HashMap<>();
  JLabel[ ][ ] fields;

  GameWorld( int windowWidth, int windowHeight ) {
    this.windowWidth=windowWidth;
    this.windowHeight=windowHeight;
    frame = new JFrame( "1" );
    frame.setStyle( "background", "lightgreen" );
  }

  static GameWorld createFromDefString( String[] def, int windowWidth, int windowHeight ){
    GameWorld gw=new GameWorld( windowWidth, windowHeight );
    gw.maxX = def[ 0 ].length( ) - 1;
    gw.maxY = def.length - 1;
    gw.fields = new JLabel[ gw.maxX + 1 ][ gw.maxY + 1 ];
    gw.window = new JPanel( null );
    gw.canvas = new Canvas( -0.5, gw.maxX + 0.5, -0.5, gw.maxY + 0.5 );
    //gw.canvas.setSizePolicy("stretch");
    HTMLElement wrapper=gw.canvas.getWrapperElement();
    wrapper.setAttribute("style", "width: "+(100*def[0].length()/gw.windowWidth)+"%; height: "+(100*def.length/gw.windowHeight)+"%;");
    gw.window.setStyle("overflow", "auto");
    gw.window.add(gw.canvas);
    for ( int y = 0; y <= gw.maxY; y++ ) {
      for ( int x = 0; x <= gw.maxX; x++ ) {
        String d = def[ y ].charAt( x ) + "";
        JLabel c = new JLabel( "" );
        c.actionCommand="";
        if ( d == "W" ) {
          c.setStyle("background-image","url(${TreeJSON.dataurl})");
          c.setStyle("background-repeat","no-repeat");
          c.setStyle("background-size","cover");
          c.actionCommand = "tree";
        }else if(d!="."){
          gw.namedFields.put(d,c);
        }
        c.setStyle("font-size",(25.0/gw.windowWidth)+"cqw");
        c.setPosition( x, gw.maxY - y );
        c.setStyle( "border", "1pt dotted darkgreen" );
        gw.canvas.add( c );
        gw.fields[ x ][ gw.maxY - y ] = c;
      }
    }
    gw.frame.add( gw.window );
    return gw;
  }
  
  void add( JComponent c, int x, int y ) {
    c.setPosition(x,y);
    canvas.add( c );
  }

  JLabel getNamedField(String name){
    return namedFields.get(name);
  }

  void addAt(JComponent c, String locationName){
    JComponent l=namedFields.get(locationName);
    add(c, l.getX(), l.getY());
  }
  
  JLabel getField( int x, int y ) {
    if ( x < 0 || x > maxX || y < 0 || y > maxY ) return null;
    return fields[ x ][ y ];
  }
  
  String getFieldType( int x, int y ) {
    JComponent c = getField( x, y );
    if ( c == null ) return null;
    return c.actionCommand;
  }
  `
}

export function createGameWorldClazz(def,viewBox){
  let defString=JSON.stringify(def);
  if(!viewBox){
    viewBox={
      left: 0,
      top: 0,
      width: def[0].length,
      height: def.length
    };
  }
  defString=defString.substring(1,defString.length-1);
  return {
    name: "GameWorld",
    visibility: "",
    isHidden: false,
    src: `private Canvas canvas;
    private JPanel window;
  int maxX, maxY;
  int[ ] beeStart = {
    0,
    0
  };
  JComponent[ ][ ] fields;
  private String[ ] def = {`+defString+`};
  private int viewWidth = ${viewBox.width};
  private int viewHeight = ${viewBox.height};

  GameWorld( ) {
    JFrame frame = new JFrame( "1" );
    frame.setStyle( "background", "lightgreen" );
    maxX = def[ 0 ].length( ) - 1;
    maxY = def.length - 1;
    fields = new JComponent[ maxX + 1 ][ maxY + 1 ];
    window = new JPanel( null );
    canvas = new Canvas( -0.5, maxX + 0.5, -0.5, maxY + 0.5 );
    canvas.setSizePolicy("stretch");
    HTMLElement wrapper=canvas.getWrapperElement();
    wrapper.setAttribute("style", "width: ${100*def[0].length/viewBox.width}%; height: ${100*def.length/viewBox.height}%;");
    window.setStyle("overflow", "auto");
    window.add(canvas);
    for ( int y = 0; y <= maxY; y++ ) {
      for ( int x = 0; x <= maxX; x++ ) {
        String d = def[ y ].charAt( x ) + "";
        JComponent c;
        if ( d == "B" ) {
          beeStart[ 0 ] = x;
          beeStart[ 1 ] = y;
          d = ".";
        }
        
        if ( d == "F" ) {
          c = new JImage( "https://opengameart.org/sites/default/files/styles/medium/public/3_hot.png" );
          c.actionCommand = "flower";
        } else if ( d == "." ) {
          c = new JLabel( "" );
          c.actionCommand = "empty";
        } else if ( d == "W" ) {
          c = new JImage( "https://thomaskl.uber.space/Webapps/Assets/graphics/overworld/tree-1.png" );
          c.actionCommand = "tree";
        }
        c.setPosition( x, maxY - y );
        c.setStyle( "border", "1pt dotted darkgreen" );
        canvas.add( c );
        fields[ x ][ maxY - y ] = c;
      }
    }
    frame.add( window );
  }
  
  void addBee( JComponent c ) {
    c.setPosition( beeStart[ 0 ], maxY - beeStart[ 1 ] );
    canvas.add( c );
  }
  
  JComponent getField( int x, int y ) {
    if ( x < 0 || x > maxX || y < 0 || y > maxY ) return null;
    return fields[ x ][ y ];
  }
  
  String getFieldType( int x, int y ) {
    JComponent c = getField( x, y );
    if ( c == null ) return null;
    return c.actionCommand;
  }`
  };
}