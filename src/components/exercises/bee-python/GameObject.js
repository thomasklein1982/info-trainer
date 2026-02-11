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
    this.style={};
  }
  reset(){
    this.setPosition(1,1);
    this.rotation=0;
  }
  setPosition(x,y){
    this.x=x;
    this.y=y;
  }
  print(text){
    let f=this.getFieldAhead();
    if ( !f ) {
      throw "Da ist kein Feld mehr, auf das du schreiben kannst.";
    }
    f.text=text;
  }
  read(){
    let f=this.getFieldAhead();
    if ( !f ) {
      throw "Hier kannst du nicht lesen.";
    }
    return f.text;
  }
  move(  ) {
    let f=this.getFieldAhead();
    if ( !f ) {
      f=this.getCoordinatesAhead();
      this.setPosition(f.x,f.y);
      throw "O nein! "+this.name+" hat die Spielwelt verlassen.";
    }else if(this.world.isFieldBlocked(f)){
      throw "Autsch! "+this.name+" ist mit einem Hindernis zusammengestoßen.";
    }
    this.setPosition(f.x,f.y);
  }
  
  getCoordinatesAhead(){
    let x=this.x;
    let y=this.y;
    let dir=(this.rotation%360);
    dir=(dir+360)%360;
    if(dir===0){
      x++;
    }else if(dir===90){
      y++;
    }else if(dir===180){
      x--;
    }else{
      y--;
    }
    return {x,y};
  }

  getFieldAhead(){
    let xy=this.getCoordinatesAhead();
    let f=this.world.getField(xy.x,xy.y);
    return f;
  }

  isOnSameField(go){
    return this.x===go.x && this.y===go.y;
  }

  turnLeft( ) {
    this.rotation+=90;
  }
  
  turnRight( ) {
    this.rotation-=90;
  }
}