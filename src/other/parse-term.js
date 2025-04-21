export function parseTerm(input){
  let term=parseUPNAndDisplay(input);
  return term;
}

export function evaluateTerm(upn,database){
  for(let i=0;i<upn.length;i++){
    let f=upn[i];
    if(f.length===1){
      try{
        let res=database.sql("select * from "+f[0]);
        upn[i]=res[0];
      }catch(e){
        return {
          error: "Datenbank kann nicht abgefragt werden: "+f[0]
        }
      }
    }else if(f.length===2){
      if(f[0]==="π"){
        let params=f[1];
        let res=upn[i-1];
        res=applyProjection(res,params.split(","));
        upn.splice(i-1,2,res);
        i-=1;
      }else if(f[0]==="σ"){
        let conditions=f[1];
        let res=upn[i-1];
        res=applySelection(res,conditions,database);
        upn.splice(i-1,2,res);
        i-=1;
      }else if(f[0]==="ρ"){
        let changes=f[1];
        let res=upn[i-1];
        res=applyRename(res,changes);
        upn.splice(i-1,2,res);
        i-=1;
      }
    }
  }
  if(upn.length!==1) throw "Syntax-Fehler";
  return {
    relation: upn[0]
  };
}

function parseUPNAndDisplay(input){
  let tokens=tokenizeTerm(input);
  let upn=[tokens];
  console.log("tokens:");
  console.log(JSON.stringify(upn));
  parseTermRecursive(upn,0);
  let display=createDisplayTerm(tokens);
  return {
    upn, display
  };
}

function indexOfIgnoreCase(array,string){
  string=string.toLowerCase();
  for(let i=0;i<array.length;i++){
    let a=array[i].toLowerCase();
    if(a===string) return i;
  }
  return -1;
}

function applyProjection(table,columns){
  for(let i=0;i<table.columns.length;i++){
    let col=table.columns[i];
    if(indexOfIgnoreCase(columns,col)<0){
      table.columns.splice(i,1);
      for(let j=0;j<table.values.length;j++){
        table.values[j].splice(i,1);
      }
      i--;
    }
  }
  return table;
}

function applySelection(table,conditions,database){
  createTempTable("temp_table_0",table,database);

  let res=database.sql("select * from temp_table_0 where "+conditions);
  return res[0];
}

function applyRename(table,changes){
  let alt=[];
  let neu=[];
  for(let i=0;i<changes.length;i++){
    let c=changes[i].split("→");
  }
  // for(let i=0;i<table.columns.length;i++){
  //   let col=table.columns[i];
  //   if(indexOfIgnoreCase(columns,col)<0){
  //     table.columns.splice(i,1);
  //     for(let j=0;j<table.values.length;j++){
  //       table.values[j].splice(i,1);
  //     }
  //     i--;
  //   }
  // }
  return table;
}

function createTempTable(tablename,table,database){
  let vals=table.values[0];
  let datatypes=[];
  for(let j=0;j<vals.length;j++){
    let v=vals[j];
    let t;
    if(v.substring){
      t="string";
    }else{
      t="numeric";
    }
    datatypes.push(t);
  }
  let sql="DROP Table if exists "+tablename+";";
  sql+="\ncreate table "+tablename+"("+table.columns[0]+" "+datatypes[0];
  for(let i=1;i<table.columns.length;i++){
    let col=table.columns[i];
    sql+=","+col+" "+datatypes[i];
  }
  sql+=");";
  for(let i=0;i<table.values.length;i++){
    let vals=table.values[i];
    sql+="\ninsert into "+tablename+" values (";
    for(let j=0;j<vals.length;j++){
      let v=vals[j];
      if(v.substring){
        v=JSON.stringify(v);
      }
      sql+=(j>0?",":"")+v;
    }
    sql+=");";
  }
  database.sql(sql);
}

function dropTempTable(tablename,database){
  let sql="Drop table if exists "+tablename+";";
  database.sql(sql);
}

function translateCharacter(c){
  switch (c) {
    case "p": 
      return "π";
    case "r":
      return "ρ";
    case "s":
      return "σ";
    case "ixi":
      return "⨝";
    case "n":
      return "∩";
    case "u":
      return "∪";
    case "x":
      return "×";
  }
  return c;
}

function createDisplayTerm(tokens){
  let term="";
  let mode=null;
  for(let i=0;i<tokens.length;i++){
    let t=tokens[i];
    if(!mode){
      if(t==="π"||t==="ρ"||t==="σ"){
        term+=t;
        mode="func";
      }else if(t==="⨝"){
        let next=tokens[i+1];
        if(next==="["){
          term+="<table style='text-align: center'><tr><td>⨝</td></tr><tr><td>"
          mode="joinParams";
          i++;
        }else{
          term+=t;
        }
      }else{
        term+=t;
      }
    }else if(mode==="joinParams"){
      if(t==="]"){
        term+="</td></tr></table>";
        mode=null;
      }else{
        term+=t;
      }
    }else if(mode==="func"){ 
      if(t==="["){
        term+="<sub>";
        mode="params";
      }
    }else if(mode==="params"){
      if(t==="]"){
        term+="</sub>";
        mode="bracket";
      }else{
        term+=t;
      }
    }else if(mode==="bracket"){
      if(t==="("){
        term+=t;
        mode=null;
      }
    }
  }
  return term;
}

function tokenizeTerm(input){
  let split=input.split('"');
  for(let i=0;i<split.length;i+=2){
    split[i]=split[i].replace(/(\b)(p|r|s|ixi|n|u|x)(\b)/g,(v,l,c,r)=>{
      return l+translateCharacter(c)+r;
    });
  }
  let neu=split.join('"');
  let rawTokens=neu.split(/(\[|\]|\(|\)|[πρσ⨝∩∪×])/);
  let tokens=[];
  for(let i=0;i<rawTokens.length;i++){
    let t=rawTokens[i].trim();
    if(t.length===0) continue;
    tokens.push(t);
  }
  return tokens;
}

function parseTermRecursive(upn,index){
  let operators=["∪","∩","×⨝","∖"];
  let funcs="πρσ";
  for(let i=0;i<operators.length;i++){
    let op=operators[i];
    let op1=op.charAt(0);
    let op2=op.charAt(op.length-1);
    let tokens=upn[index];
    while(tokens.length>=2 && tokens[0]==="(" && tokens[tokens.length-1]===")"){
      tokens.splice(0,1);
      tokens.splice(tokens.length-1,1);
    }
    upn[index]=tokens;
    let bracketsDepth=0;
    for(let k=tokens.length-1;k>=0;k--){
      let c=tokens[k];
      if(c===")"){
        bracketsDepth++;
      }else if(c==="("){
        if(bracketsDepth===0){
          throw "Schließende Klammer zu viel";
        }
        bracketsDepth--;
      }else if(bracketsDepth>0){
        continue;
      }else{
        if(c===op1||c===op2){
          upn.splice(index,1,tokens.slice(0,k),tokens.slice(k+1),[c]);
          let off1=parseTermRecursive(upn,index);
          let off2=parseTermRecursive(upn,index+1+off1);
          return off1+off2;
        }else if(funcs.indexOf(c)>=0){
          upn.splice(index,1,tokens.slice(k+4),[tokens[k],tokens[k+2]]);
          parseTermRecursive(upn,index);
          return 1;
        }
      }
    }
  }
  return 0;
}