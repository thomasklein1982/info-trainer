import TreeJSON from '../bee/graphics/tree.json';

export class GameWorld{
  constructor(worldArray, windowWidth, windowHeight, setupFunc){
    this.worldArray=worldArray;
    this.windowWidth=windowWidth;
    this.windowHeight=windowHeight;
    this.setupFunc=setupFunc;
    this.create();
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
      for(let j=0;j<line.length;j++){
        let d=line.charAt(j);
        let f={
          isImage: false,
          dataurl: null,
          name: undefined,
          x: j+1,
          y: i+1
        };
        if(d==="W"){
          f.isImage=true;
          f.dataurl=TreeJSON.dataurl
        }else if(d==="."){

        }else{
          f.name=d;
          data.namedFields[d]=f;
        }
        fields.push(f);
      }
    }
    for(let a in data.objects){
      let go=data.objects[a];
      let field=data.namedFields[go.locationName];
      go.x=field.x;
      go.y=field.y;
    }
    this.fields=data.fields;
    this.namedFields=data.namedFields;
    this.objects=data.objects;
  }

}