export class Database{
  tables=[];
  name=null;
  create=null;
  constructor(){

  }
  addTable(name, attributes){
    this.tables.push(new Table(name,attributes));
  }
}

export class Table{
  name=null;
  attributes=null;
  constructor(name,attributes){
    this.name=name;
    this.attributes=attributes;
  }
  insert(){
    if(this.attributes.length!==arguments.length) throw "Insert impossible, wrong data count";
    let code="insert into "+this.name+""
    for(let i=0;i<this.attributes.length;i++){
      let attr=this.attributes[i];

    }
  }
}