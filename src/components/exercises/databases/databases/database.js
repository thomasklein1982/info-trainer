import SQL from "../../../../other/sql";

// drop table if exists test;
// drop table if exists test2;
// create table test(
// 	a varchar(100),
//     b string not null,
//     c numeric,
//     d integer,
//     primary key (b,c),
//     foreign key (d) references test2(z)
// );

// create table test2(
// 	z numeric
// );

// pragma table_info(test);
// PRAGMA foreign_key_list(test);

let database=SQL;

export class Database{
  tables={};
  name=null;
  create=null;
  info=null;
  $db=database;
  constructor(name){
    this.name=name;
  }
  addTable(name, attributes, primaryKey, foreignKeys){
    this.tables[name]=new Table(name,attributes,primaryKey, foreignKeys);
  }
  sql(cmd){
    if(!cmd || cmd.length===0) return null;
    
    let res=database.exec(cmd);
    return res;
  }
  sqlParams(cmd,params){
    let res=database.exec(cmd,params);
    return res;
  }
  clear(){
    let tables=database.exec("select name from sqlite_master where type='table'");
    if(tables && tables[0]){
      for(let i=0;i<tables[0].values.length;i++){
        let c="drop table if exists "+tables[0].values[i];
        try{
          database.run(c);
        }catch(e){
          console.log(e);
        }
      }
    }
  }
  refresh(options){
    let p=new Promise((resolve,reject)=>{
      setTimeout(()=>{
        this.clear();
        if(!options || !options.dontCreateTables){
          for(let a in this.tables){
            console.log("create table "+a);
            this.tables[a].create();
          }
          this.create(options);
        }
        resolve();
      },100);
    });
    return p;
  }
}

export class Table{
  name=null;
  attributes=null;

  constructor(name,attributes, primaryKey, foreignKeys){
    this.name=name;
    this.attributes=[];
    for(let i=0;i<attributes.length;i++){
      let attr=attributes[i];
      let name,type;
      if(attr.substring){
        name=attr;
        type="STRING";
      }else{
        name=attr.name;
        type=attr.type;
      }
      let primary=primaryKey && primaryKey.indexOf(name)>=0;
      let foreign=foreignKeys && foreignKeys.indexOf(name)>=0;
      this.attributes.push({
        name, type, primary, foreign
      });
    }
  }
  create(){
    let code="drop table if exists "+this.name+";\n";
    code+="create table "+this.name+"(\n";
    for(let i=0;i<this.attributes.length;i++){
      let attr=this.attributes[i];
      code+=(i>0? ",\n": "")+attr.name+" "+attr.type;
    }
    code+=")";
    database.run(code);
  }
  insert(){
    if(this.attributes.length!==arguments.length) throw "Insert impossible, wrong data count";
    let code="insert into "+this.name+" values ("
    for(let i=0;i<this.attributes.length;i++){
      let attr=this.attributes[i];
      let name,type;
      let val=arguments[i];
      if(val!==null){
        if(attr.type==="STRING"){
          val=JSON.stringify(val);
        }else if(attr.type==="DATE"){
          val="'"+val+"'";
        }
      }else{
        val="null";
      }
      code+=(i>0?", ":"")+val;
    }
    code+=")";
    try{
      database.run(code);
    }catch(e){
      console.log("insert error",code);
      throw e;
    }
  }
}

function inititalChecks(res1,res2,alwaysCheckColumnNames,checkColumnOrder){
  if(!res1 || !res2) return false;
  //spaltennamen checken
  if(res1.columns.length!==res2.columns.length) return false;
  if(alwaysCheckColumnNames || res1.columns.length>1){
    let order1=getOrder(res1.columns);
    let order2=getOrder(res2.columns);
    for(let i=0;i<order1.length;i++){
      if(checkColumnOrder && order1[i].index!==order2[i].index) return false;
      if(order1[i].column.toLowerCase()!==order2[i].column.toLowerCase()) return false;
    }
  }
  if(res1.values.length===0){
    if(res2.values.length===0){
      return true;
    }else{
      return false;
    }
  }else{
    if(res2.values.length===0 || res2.values.length!==res1.values.length){
      return false;
    }
  }
  return true;
}

function getOrder(columns){
  let order=[];
  for(let i=0;i<columns.length;i++){
    order[i]={index: i, column: columns[i]};
  }
  order.sort((a,b)=>{
    return a.column.toLowerCase()>=b.column.toLowerCase() ? 1: -1;
  });
  return order;
}

export function areResultsEqualIgnoreOrder(res1,res2,alwaysCheckColumnNames,checkColumnOrder
){
  if(!inititalChecks(res1,res2,alwaysCheckColumnNames,checkColumnOrder)) return false;
  let order1=getOrder(res1.columns);
  let order2=getOrder(res2.columns);
  let sortFunc1=(r,s)=>{
    for(let i=0;i<res1.columns.length;i++){
      let w1=r[order1[i].index]+"";
      let w2=s[order1[i].index]+"";
      if(w1<w2){
        return -1;
      }else if(w1>w2){
        return 1;
      }
    }
    return -1;
  };
  let sortFunc2=(r,s)=>{
    for(let i=0;i<res1.columns.length;i++){
      let w1=r[order2[i].index]+"";
      let w2=s[order2[i].index]+"";
      if(w1<w2){
        return -1;
      }else if(w1>w2){
        return 1;
      }
    }
    return -1;
  };
  res1.values.sort(sortFunc1);
  res2.values.sort(sortFunc2);
  return areResultsEqual(res1,res2, alwaysCheckColumnNames, checkColumnOrder, true );
}

export function areResultsEqual(res1,res2,alwaysCheckColumnNames,checkColumnOrder,noInitChecks){
  if(!noInitChecks){
    let ok=inititalChecks(res1,res2,alwaysCheckColumnNames,checkColumnOrder);
    if(!ok) return false;
  }
  let array1=res1.values;
  let array2=res2.values;
  let n=array1.length;
  let order1=getOrder(res1.columns);
  let order2=getOrder(res2.columns);
  for(let i=0;i<n;i++){
    let r1=array1[i];
    let r2=array2[i];
    for(let j=0;j<r1.length;j++){
      if(r1[order1[j].index]+""!==r2[order2[j].index]+"") {
        return false;
      }
    }
  }
  return true;
}