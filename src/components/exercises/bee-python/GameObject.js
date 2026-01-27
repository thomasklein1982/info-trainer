export class GameObject{
  constructor(locationName, name, world, image ) {
    this.locationName=locationName;
    this.maxSpeed=false;
    this.blocking=false;
    this.world=world;
    this.image=image;
    this.name=name;
    this.imageSize=1;
    this.rotation=0;
    this.x=0;
    this.y=0;
  }
  setX(x){
    this.x=x;
    console.log("set x",this.x)
  }
  move(  ) {
    let f=getFieldAhead();
    let fieldAhead = getFieldTypeAhead( );
    if ( fieldAhead == "border" ) {
      ui.move( 1 );
      throw new Exception("O nein! "+name+" hat die Spielwelt verlassen.");
    }else if(fieldAhead=="tree"){
      throw new Exception("Autsch! "+name+" ist mit einem Baum zusammengestoßen.");
    }else{
      let co=world.getBlockingGameObject(f);
      if(co!=null){
        let name="einem Hindernis";
        if(co.name.length()>0){
          name=co.name;
        }
        throw new Exception("Autsch! "+this.name+" ist mit "+name+" zusammengestoßen.");
      }
    }
    ui.move( 1 );
    if(f!=null) f.scrollIntoView();
  }
  
  turnLeft( ) {
    this.rotation+=90;
  }
  
  turnRight( ) {
    this.rotation-=90;
  }
}