
alasql.options.casesensitive=false;

export class Database{
  tables={};
  name=null;
  create=null;
  constructor(){

  }
  addTable(name, attributes, primaryKey, foreignKeys){
    this.tables[name]=new Table(name,attributes,primaryKey, foreignKeys);
  }
  prepareStatement(sqlSource){
    /**muss kopiert werden in additionalJScode! */
    let ast=alasql.parse(sqlSource);
    /**untersucht die statements darauf, ob mehr als eine Tabelle abgefragt wird
     * falls ja, werden alle mehrfach vorkommenden Spaltennamen per 'as' in 'Tabelle.Spalte' umbenannt
     * Sinn: doppelt vorkommende Spaltennamen kollabieren ansonsten
     * damit StringValue erzeugt werden kann, musste in alasql.min.ja folgender Code eingefügt werden:
     * window.alasqlX=X;
     * an der Stelle:
     * X=(T.Recordset=function(e){q(this,e)},y.yy=T.yy={});window.alasqlX=X;X.extend=
     */
    for(let i=0;i<ast.statements.length;i++){
      let s=ast.statements[i];
      if(!s || !s.columns || !s.from || s.from.length===0) continue;
      let tables={};
      for(let j=0;j<s.from.length;j++){
        let t=s.from[j];
        let label=t.as? t.as:t.tableid;
        tables[label]=t.tableid;
      }
      /**spezialfall 'select *': * durch alle Spalten ersetzen: */
      if(s.columns.length===1 && s.columns[0].columnid==='*'){
        let spalten=[];
        for(let j=0;j<s.from.length;j++){
          let t=s.from[j];
          let label=t.as? t.as:t.tableid;
          let table=alasql.tables[t.tableid];
          if(!table) continue;
          for(let k=0;k<table.columns.length;k++){
            let c=table.columns[k];
            let spalte=label+"."+c.columnid;
            spalten.push({
              spalte, columnid: c.columnid, tableid: label
            });
          }
        }
        for(let j=0;j<spalten.length;j++){
          let spalte=spalten[j];
          s.columns[j]=new alasqlX.Column({columnid: spalte.columnid, tableid: spalte.tableid});
        }
      }
      /**finde doppelte spalten: */
      for(let j=0;j<s.columns.length;j++){
        let c=s.columns[j];
        if(c.as) continue;
        let changeC=false;
        for(let k=j+1;k<s.columns.length;k++){
          let c2=s.columns[k];
          if(c2.as) continue;
          if(c2.columnid===c.columnid){
            changeC=true;
            let tableid=tables[c2.tableid];
            c2.as=new window.alasqlX.StringValue({value: tableid+"."+c2.columnid});
          }
        }
        if(changeC){
          let tableid=tables[c.tableid];
          c.as=new window.alasqlX.StringValue({value: tableid+"."+c.columnid});
        }
      }
    }
    let r=ast.toString();
    r=r.replace(/AS 'undefined.undefined'/gi,"");
    return r;
  }
  sql(cmd){
    if(!cmd || cmd.length===0) return null;
    let prep;
    if(cmd.trim().toLowerCase().startsWith("insert")){
      prep=cmd;
    }else{
      prep=this.prepareStatement(cmd);
    }
    let res=alasql(prep);
    return res;
  }
  clear(){
    let tables=Object.keys(alasql.tables);
    if(tables){
      for(let i=0;i<tables.length;i++){
        let c="drop table "+tables[i];
        try{
          alasql(c);
        }catch(e){
          console.log(e);
        }
      }
    }
  }
  refresh(){
    this.clear();
    for(let a in this.tables){
      this.tables[a].create();
    }
    this.create();
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
    let code="create table "+this.name+"(\n";
    for(let i=0;i<this.attributes.length;i++){
      let attr=this.attributes[i];
      code+=(i>0? ",\n": "")+attr.name+" "+attr.type;
    }
    code+=")";
    alasql(code);
  }
  insert(){
    if(this.attributes.length!==arguments.length) throw "Insert impossible, wrong data count";
    let code="insert into "+this.name+"("
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
      alasql(code);
    }catch(e){
      console.log("insert error",code);
      throw e;
    }
  }
}

export function areResultsEqualIgnoreOrder(array1,array2){
  if(!array1 || !array2) return false;
  if(array1.length===0){
    if(array2.length===0){
      return true;
    }else{
      return false;
    }
  }else{
    if(array2.length===0 || array2.length!==array1.length){
      return false;
    }
  }
  var r1=array1[0];
  var r2=array2[0];
  var attributes=[];
  var sortFunc=(r,s)=>{
    for(var attr in r1){
      if(r[attr]<s[attr]){
        return -1;
      }else if(r[attr]>s[attr]){
        return 1;
      }
    }
    return -1;
  };
  array1.sort(sortFunc);
  array2.sort(sortFunc);
  return areResultsEqual(array1,array2);
}

export function areResultsEqual(array1,array2){
  if(!array1 || !array2) return false;
  if(array1.length!==array2.length){
    return false;
  }
  if(array1.length===0){
    return true;
  }
  var n1=0;
  var r1=array1[0];
  for(var a in r1){
    n1++;
  }
  var r2=array2[0];
  var n2=0;
  for(var a in r2){
    n2++;
  }
  if(n1!==n2) return false;
  for(var i=0;i<n1;i++){
    var r1=array1[i];
    var s1=0;
    for(var a in r1){
      s1++;
    }
    var s2=0;
    for(var a in r2){
      s2++;
    }
    if(s1!==s2) return false;
    var r2=array2[i];
    for(var a in r1){
      if(a in r2){
        if(r1[a]!==r2[a]) return false;
      }else{
        return false;
      }
    }
  }
  return true;
}