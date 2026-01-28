import * as BeeJSON from './graphics/bee.json';
import * as TreeJSON from './graphics/tree.json';

export function createBeeClazz(methods){
  let data={
    name: "Bee",
    isHidden: true,
    uml: true,
    src: null
  }
  let src=`private GameObject obj;
  private HashMap<JLabel,int> fieldCounts=new HashMap<>();
  private Bee( String name, GameWorld world ) {
    obj=new GameObject(name, world, "${BeeJSON.dataurl}");
    obj.setBlocking(true);
    obj.setImageSize(0.7,0.7);
  }
  void setSpeed(int s){
    obj.setSpeed(s);
  }
  private void toMaxSpeed(){
    obj.toMaxSpeed();
  }
  private JLabel getField(){
    return obj.getField();
  }
  private boolean isOnSameField(GameObject o){
    return obj.isOnSameField(o);
  }
  private void insertAt( String namedPosition ){
    obj.insertAt(namedPosition);
    incFieldCount();
  }
  private void incFieldCount(){
    JLabel f=getField();
    int c=getFieldCount(f);
    fieldCounts.put(f,c+1);
  }
  private int getFieldCount(JLabel f){
    int c;
    if(fieldCounts.containsKey(f)){
      c=fieldCounts.get(f);
    }else{
      c=0;
    }
    return c;
  }
  private void turnLeftInstantly(int n){
    for(int i=0;i<n;i++) {obj.turnLeft(false);}
  }
  `;
  if(!methods || methods.indexOf("move")>=0){
    src+=`/*Bewegt die Biene um 1 Feld*/
    void move( ) {
      obj.move();
      incFieldCount();
    }
    `;
  }
  if(!methods || methods.indexOf("read")>=0){
    src+=`/*Liest den Text auf dem Feld vor der Biene.*/
    String read(){
      return obj.read();
    }
    `;
  }
  if(!methods || methods.indexOf("turn")>=0){
    src+=`/*Dreht die Biene nach links.*/
    void turnLeft( ) {
      obj.turnLeft(true);
    }
    /*Dreht die Biene nach rechts.*/
    void turnRight( ) {
      obj.turnRight(true);
    }
    `;
  }
  if(!methods || methods.indexOf("print")>=0){
    src+=`/*Schreibt auf das Feld vor der Biene.*/
    void print( Object text ) {
      obj.print(text);
    }
    `;
  }
  data.src=src;
  return data;
}

export const GameObjectClazz={
  name: "GameObject",
  isHidden: true,
  uml: false,
  src: `
  private GameWorld world;
  private String name;
  public Canvas ui;
  private JLabel label;
  private JImage image;
  int speed = 50;
  boolean maxSpeed=false;
  boolean blocking=false;
  GameObject( String name, GameWorld w, String dataurl ) {
    this.name=name;
    world = w;
    ui = new Canvas( 0,1,0,1 );
    image=new JImage(dataurl);
    image.setPosition(0.5,0.5);
    ui.add(image);
    label=new JLabel(name);
    label.setStyle("font-size","25cqw");
    label.setStyle("text-shadow", "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white");
    label.setPosition(0.5,0.5);
    label.setAlignment("top");
    ui.add(label);
    ui.setSize( 1, 1 );
    ui.setDirection( 0 );
  }
  void setBlocking(boolean v){
    blocking=v;
  }
  boolean isBlocking(){
    return blocking;
  }
  void insertAt(String namedPosition){
    world.addAt(this,namedPosition);
    Thread.sleep(10);
    setTransition(true);
  }
  void setImageSize(double w, double h){
    image.setSize(w,h);
  }
  void toMaxSpeed(){
    maxSpeed=true;
    setTransition(false);
  }
  void setTransition(boolean e){
    HtmlElement wrapper=ui.getWrapperElement();
    if(e){
      
      wrapper.setStyle("transition",(getDelay()/1000.0)+"s all");
    }else{
      wrapper.setStyle("transition","");
    }
  }
  void setSpeed( int s){
    if(maxSpeed) return;
    speed=s;
    setTransition(true);
  }
  /*Bewegt die Biene um 1 Feld*/
  void move( ) {
    sleep( );
    JLabel f=getFieldAhead();
    String fieldAhead = getFieldTypeAhead( );
    if ( fieldAhead == "border" ) {
      ui.move( 1 );
      throw new Exception("O nein! "+name+" hat die Spielwelt verlassen.");
    }else if(fieldAhead=="tree"){
      throw new Exception("Autsch! "+name+" ist mit einem Baum zusammengestoßen.");
    }else{
      GameObject co=world.getBlockingGameObject(f);
      if(co!=null){
        String name="einem Hindernis";
        if(co.name.length()>0){
          name=co.name;
        }
        throw new Exception("Autsch! "+this.name+" ist mit "+name+" zusammengestoßen.");
      }
    }
    ui.move( 1 );
    if(f!=null) f.scrollIntoView();
  }
  
  private int getDelay(){
    return 1000 - speed * 10;
  }

  private void sleep( ) {
    if(maxSpeed) return;
    Thread.sleep( getDelay() );
  }
  
  void turnLeft( boolean w ) {
    if(w) sleep( );
    ui.setRotation( ui.getRotation( ) + 90 );
    ui.setDirection( ( ui.getDirection( ) + 90 ) % 360 );
  }
  
  void turnRight( boolean w ) {
    if(w) sleep( );
    ui.setRotation( ui.getRotation( )-90 );
    ui.setDirection( ( ui.getDirection( ) + 270 ) % 360 );
  }

  JComponent scanEffect(){
    sleep();
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

  boolean isOnSameField(GameObject o){
    System.out.println(getField());
    System.out.println(o.getField());
    return getField()==o.getField();
  }

  boolean isAt(JLabel field){
    return getField()==field;
  }

  JLabel getFieldAhead( ) {
    ui.move( 1 );
    JLabel field = world.getField( Math.round( ui.getX( ) ), Math.round( ui.getY( ) ) );
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
  ArrayList<GameObject> gameObjects=new ArrayList<>();

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
    HtmlElement wrapper=gw.canvas.getWrapperElement();
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
        c.setStyle("font-size",(25.0/gw.maxX)+"cqw");
        c.setPosition( x, gw.maxY - y );
        c.setStyle( "outline", "1pt dotted darkgreen" );
        gw.canvas.add( c );
        gw.fields[ x ][ gw.maxY - y ] = c;
      }
    }
    gw.frame.add( gw.window );
    return gw;
  }
  
  GameObject getBlockingGameObject(JLabel field){
    for(int i=0;i<gameObjects.size();i++){
      GameObject g=gameObjects.get(i);
      if(g.isBlocking() && g.isAt(field)) return g;
    }
    return null;
  }

  void add( GameObject c, double x, double y ) {
    c.ui.setPosition(x,y);
    canvas.add( c.ui );
    gameObjects.add(c);
  }

  JLabel getNamedField(String name){
    return namedFields.get(name);
  }

  void addAt(GameObject c, String locationName){
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
    HtmlElement wrapper=canvas.getWrapperElement();
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