import TreeJSON from '../bee/graphics/tree.json';

export class GameWorld{
  constructor(worldArray, windowWidth, windowHeight, setupFunc, resetFunc){
    this.worldArray=worldArray;
    this.windowWidth=windowWidth;
    this.windowHeight=windowHeight;
    this.setupFunc=setupFunc;
    this.resetFunc=resetFunc;
    this.create();
  }
  getNamedField(name){
    return this.namedFields[name];
  }
  isFieldBlocked(f){
    if(f.blocked) return true;
    return false;
  }
  getField(x,y){
    return this.fields[y-1][x-1];
  }
  reset(){
    for(let i=0;i<this.fields.length;i++){
      let row=this.fields[i];
      for(let j=0;j<row.length;j++){
        let f=row[j];
        f.text="";
        f.style={};
      }
    }
    for(let a in this.objects){
      let go=this.objects[a];
      let field=this.namedFields[go.locationName];
      go.reset();
      go.x=field.x;
      go.y=field.y;
    }
    if(this.resetFunc) this.resetFunc(this);
  }
  create(){
    let world=this.worldArray;
    let data={
      w: world[0].length,
      h: world.length,
      fields: [],
      namedFields: {},
      objects: null
    };
    this.width=data.w;
    this.height=data.h;
    let res=this.setupFunc(this);
    data.objects=res;
    let fields=data.fields;
    for(let i=0;i<world.length;i++){
      let line=world[i];
      let fieldLine=[];
      fields.push(fieldLine);
      for(let j=0;j<line.length;j++){
        let d=line.charAt(j);
        let f={
          isImage: false,
          dataurl: null,
          name: undefined,
          x: j+1,
          y: i+1,
          text: "",
          style: {},
          blocked: false
        };
        if(d==="W"){
          f.isImage=true;
          f.dataurl=TreeJSON.dataurl
          f.blocked=true;
        }else if(d==="."){

        }else{
          f.name=d;
          data.namedFields[d]=f;
        }
        fieldLine.push(f);
      }
    }
    this.fields=data.fields;
    this.namedFields=data.namedFields;
    this.objects=data.objects;
    this.reset();
  }

}