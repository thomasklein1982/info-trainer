export const BeeClazz={
  name: "Bee2",
  isHidden: true,
  visibility: "",
  src: `
  private GameWorld world;
  private JImage ui;
  int speed = 75;
  Bee2( GameWorld w ) {
    world = w;
    ui = new JImage( "https://thomaskl.uber.space/Webapps/Assets/graphics/animal/bee.svg" );
    ui.setSize( 0.7, 0.7 );
    ui.setDirection( 0 );
    world.addBee( ui );
  }
  /*Bewegt die Biene um 1 Feld*/
  void move( ) {
    sleep( );
    String fieldAhead = getFieldTypeAhead( );
    if ( fieldAhead == "tree" || fieldAhead == "border" ) {
      System.toast( "Bumm", "center" );
      return;
    }
    ui.move( 1 );
    
  }
  
  private void sleep( ) {
    Thread.sleep( 2000 - speed * 20 );
  }
  
  void turnLeft( ) {
    sleep( );
    ui.setDirection( ( ui.getDirection( ) + 90 ) % 360 );
    ui.setRotation( ui.getDirection( ) );
  }
  
  void turnRight( ) {
    sleep( );
    ui.setDirection( ( ui.getDirection( ) + 270 ) % 360 );
    ui.setRotation( ui.getDirection( ) );
  }

  String scan( ) {
    JComponent field = getFieldAhead( );
    if ( field == null ) {
      return "border";
    }
    field.setStyle( "background-color", "white" );
    field.setStyle( "opacity", "0.5" );
    sleep( );
    field.setStyle( "background-color", "" );
    field.setStyle( "opacity", "1" );
    return field.actionCommand;
  }
  
  String getFieldType(){
    JComponent c = world.getField( Math.round( ui.getX( ) ), Math.round( ui.getY( ) ) );
    if ( c == null ) return "border";
    return c.actionCommand;
  }

  private JComponent getFieldAhead( ) {
    ui.move( 1 );
    JComponent field = world.getField( Math.round( ui.getX( ) ), Math.round( ui.getY( ) ) );
    ui.move( -1 );
    return field;
  }
  
  private String getFieldTypeAhead( ) {
    JComponent c = getFieldAhead( );
    if ( c == null ) return "border";
    return c.actionCommand;
  }
  
`
}

export function createGameWorldClazz(def){
  let defString=JSON.stringify(def);
  defString=defString.substring(1,defString.length-1);
  return {
    name: "GameWorld",
    visibility: "",
    isHidden: true,
    src: `private Canvas canvas;
  int maxX, maxY;
  int[ ] beeStart = {
    0,
    0
  };
  JComponent[ ][ ] fields;
  private String[ ] def = {`+defString+`};

  GameWorld( ) {
    JFrame frame = new JFrame( "1" );
    frame.setStyle( "background", "lightgreen" );
    maxX = def[ 0 ].length( ) - 1;
    maxY = def.length - 1;
    fields = new JComponent[ maxX + 1 ][ maxY + 1 ];
    canvas = new Canvas( -0.5, maxX + 0.5, -0.5, maxY + 0.5 );
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
    frame.add( canvas );
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