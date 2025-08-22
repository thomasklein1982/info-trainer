//TODO:
//select name="Gertrud", wenn keine Gertrud vorhanden: Absturz

export function parseTerm(input){
  let term=parseUPNAndDisplay(input);
  return term;
}

// case "n":
//       return "∩";
//     case "u":
//       return "∪";
//     case "x":
//       return "×";
//     case "\\":
//       return "∖";

export function evaluateTerm(upn,database){
  try{
    for(let i=0;i<upn.length;i++){
      let f=upn[i];
      if(f.length===1){
        if(f[0]==="×"){
          let res=applyCartesianProduct(upn[i-2],upn[i-1]);
          upn.splice(i-2,3,res);
          i-=2;
        }else if(f[0]==="⨝"){
          let res=applyJoin(upn[i-2],upn[i-1],database);
          upn.splice(i-2,3,res);
          i-=2;
        }else if(f[0]==="∩"){
          let res=applyIntersect(upn[i-2],upn[i-1],database);
          upn.splice(i-2,3,res);
          i-=2;
        }else if(f[0]==="∪"){
          let res=applyUnion(upn[i-2],upn[i-1],database);
          upn.splice(i-2,3,res);
          i-=2;
        }else if(f[0]==="∖"){
          let res=applyMinus(upn[i-2],upn[i-1],database);
          upn.splice(i-2,3,res);
          i-=2;
        }else{
          try{
            let res=database.sql("select distinct * from "+f[0])[0];
            if(!res) res=null;
            upn[i]=res;
          }catch(e){
            return {
              error: "Datenbank kann nicht abgefragt werden: "+f[0]
            }
          }
        }
      }else if(f.length===2){
        if(f[0]==="π"){
          let params=f[1];
          let res=upn[i-1];
          res=applyProjection(res,params,database);
          upn.splice(i-1,2,res);
          i-=1;
        }else if(f[0]==="⨝"){
          let res=applyJoin(upn[i-2],upn[i-1],database,f[1]);
          upn.splice(i-2,3,res);
          i-=2;
        }else if(f[0]==="σ"){
          let conditions=f[1];
          let res=upn[i-1];
          res=applySelection(res,conditions,database);
          upn.splice(i-1,2,res);
          i-=1;
        }else if(f[0]==="ρ"){
          let changes=f[1].split(",");
          let res=upn[i-1];
          res=applyRename(res,changes);
          upn.splice(i-1,2,res);
          i-=1;
        }
      }
    }
    if(upn.length!==1) throw "Syntax-Fehler: Eingabe kann nicht geparst werden :(";
  }catch(e){
    return {
      error: e
    }
  }
  return {
    relation: upn[0]
  };
}

export function parseDisplay(input){
  input=translateSpecialCharacters(input);
  let tokens;
  try{
    tokens=tokenizeTerm(input);
  }catch(e){
    return {
      display: input,
      error: e
    };
  }
  let display=createDisplayTerm(tokens);
  return {
    display
  };
}

function parseUPNAndDisplay(input){
  let tokens;
  try{
    tokens=tokenizeTerm(input);
  }catch(e){
    return {
      error: e
    };
  }
  let display=createDisplayTerm(tokens);
  let upn=[tokens];
  try{
    parseTermRecursive(upn,0);
  }catch(e){
    return {
      error: e,
      display
    }
  }
  
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

function applyProjection(table,columns,database){
  if(!table) return null;
  createTempTable("temp_table_0",table,database);

  let res=database.sql("select distinct "+columns+" from temp_table_0")[0];
  dropTempTable("temp_table_0",database);
  if(!res) res=null;
  return res;
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
  // return table;
}

function applySelection(table,conditions,database){
  if(!table) return null;
  createTempTable("temp_table_0",table,database);
  conditions=conditions.replace(/ ∧ /g," and ");
  conditions=conditions.replace(/ ∨ /g," or ");
  let res=database.sql("select distinct * from temp_table_0 where "+conditions)[0];
  dropTempTable("temp_table_0",database);
  if(!res) res=null;
  return res;
}

function applyRename(table,changes){
  if(!table) return null;
  let alt=[];
  let neu=[];
  for(let i=0;i<changes.length;i++){
    let c=changes[i].split("→");
    alt.push(c[0].trim());
    neu.push(c[1].trim());
  }
  for(let i=0;i<table.columns.length;i++){
    let col=table.columns[i];
    let index=indexOfIgnoreCase(alt,col);
    if(index>=0){
      table.columns[i]=neu[index];
    }
  }
  return table;
}

function getFirstEqualAttribute(table1,table2){
  if(!table1 || !table2) return null;
  for(let i=0;i<table1.columns.length;i++){
    let col1=table1.columns[i];
    if(indexOfIgnoreCase(table2.columns,col1)>=0){
      return col1;
    }
  }
  return null;
}

function applyCartesianProduct(table1,table2){
  if(!table1 || !table2) return null;
  let col=getFirstEqualAttribute(table1,table2);
  if(col) throw "Fehler: Das kartesische Produkt kann nicht gebildet werden, da beide Relationen ein Attribut '"+col+"' besitzen.";
  // for(let i=0;i<table1.columns.length;i++){
  //   let col1=table1.columns[i];
  //   if(indexOfIgnoreCase(table2.columns,col1)>=0){
  //     throw "Fehler: Das kartesische Produkt kann nicht gebildet werden, da beide Relationen ein Attribut '"+col1+"' besitzen.";
  //   }
  // }
  let table={
    columns: [],
    values: []
  };
  for(let i=0;i<table1.columns.length;i++){
    table.columns.push(table1.columns[i]);
  }
  for(let i=0;i<table2.columns.length;i++){
    table.columns.push(table2.columns[i]);
  }
  for(let i=0;i<table1.values.length;i++){
    let v1=table1.values[i];
    for(let j=0;j<table2.values.length;j++){
      let v2=table2.values[j];
      let v=v1.concat(v2);
      table.values.push(v);
    }
  }
  return table;
}

function applyJoin(table1,table2,database,params){
  if(!table1 || !table2) return null;
  if(params){
    let col=getFirstEqualAttribute(table1,table2);
    if(col) throw "Fehler: Der Equi-Join kann nicht gebildet werden, da beide Relationen ein Attribut '"+col+"' besitzen.";
  }
  createTempTable("temp_table_0",table1,database);
  createTempTable("temp_table_1",table2,database);
  let res;
  if(params){
    let condition=params.replace(/,/g," and ");
    res=database.sql("select distinct * from temp_table_0 join temp_table_1 on "+condition)[0];
  }else{
    res=database.sql("select distinct * from temp_table_0 natural join temp_table_1;")[0];
  }
  dropTempTable("temp_table_0",database);
  dropTempTable("temp_table_1",database);
  if(!res) res=null;
  return res;
}

function areTablesCompatible(table1,table2){
  if(!table1 || !table2) return true;
  if(table1.columns.length!==table2.columns.length) return false;
  for(let i=0;i<table1.columns.length;i++){
    let col1=table1.columns[i];
    if(indexOfIgnoreCase(table2.columns,col1)<0){
      return false;
    }
  }
  return true;
}

function applyIntersect(table1,table2,database){
  if(!table1 || !table2) return null;
  if(!areTablesCompatible(table1,table2)) throw "Fehler: Schnitt-Bildung ist nur möglich, wenn ...";
  createTempTable("temp_table_0",table1,database);
  createTempTable("temp_table_1",table2,database);
  let res=database.sql("select * from temp_table_0 intersect select * from temp_table_1;")[0];
  dropTempTable("temp_table_0",database);
  dropTempTable("temp_table_1",database);
  if(!res) res=null;
  return res;
}

function applyUnion(table1,table2,database){
  if(!table1){
    if(!table2) return null;
    return table2;
  }else if(!table2) return table1;
  if(!areTablesCompatible(table1,table2)) throw "Fehler: Vereinigungs-Bildung ist nur möglich, wenn ...";
  createTempTable("temp_table_0",table1,database);
  createTempTable("temp_table_1",table2,database);
  let res=database.sql("select * from temp_table_0 union select * from temp_table_1;")[0];
  dropTempTable("temp_table_0",database);
  dropTempTable("temp_table_1",database);
  if(!res) res=null;
  return res;
}

function swapIfBigger(array1,array2,i){
  if(array1[i]>array1[i+1]){
    let c=array1[i];
    array1[i]=array1[i+1];
    array1[i+1]=c;
    c=array2[i];
    array2[i]=array2[i+1];
    array2[i+1]=c;
  }
}

function areRecordsEqual(r1,r2,colIndices1,colIndices2){
  for(let k=0;k<r1.length;k++){
    if(r1[colIndices1[k]]!==r2[colIndices2[k]]) return false;
  }
  return true;
}

function applyMinus(table1,table2,database){
  if(!table2) return table1;
  if(!table1) return null;
  if(!areTablesCompatible(table1,table2)) throw "Fehler: Differenz-Bildung ist nur möglich, wenn ...";
  let colIndices1=[];
  let colIndices2=[];
  for(let i=0;i<table1.columns.length;i++){
    colIndices1.push(i);
    colIndices2.push(i);
  }
  let columns=JSON.parse(JSON.stringify(table1.columns));
  for(let i=0;i<table2.columns.length;i++){
    for(let j=0;j<table2.columns.length-i-1;j++){
      swapIfBigger(table1.columns,colIndices1,j);
      swapIfBigger(table2.columns,colIndices2,j);
    }
  }
  table1.columns=columns;
  for(let i=0;i<table2.values.length;i++){
    let vMinus=table2.values[i];
    for(let j=0;j<table1.values.length;j++){
      let v=table1.values[j];
      if(areRecordsEqual(v,vMinus,colIndices1,colIndices2)){
        table1.values.splice(j,1);
        break;
      }
    }
  }
  if(table1.values.length===0) return null;
  return table1;
  // createTempTable("temp_table_0",table1,database);
  // createTempTable("temp_table_1",table2,database);
  // let res=database.sql("select * from temp_table_0 minus (select * from temp_table_1);")[0];
  // return res;
}

function getDatatype(table,index){
  if(table.values.length===0) return "string";
  let row=0;
  while(true){
    let v=table.values[row][index];
    if(v!==null){
      if(v.substring){
        return "string";
      }else{
        return "numeric";
      }
    }
    row++;
    if(row>=table.values.length) return "string";
  }
}

function createTempTable(tablename,table,database){
  let vals=table.values[0];
  let datatypes=[];
  for(let j=0;j<vals.length;j++){
    let v=vals[j];
    let t=getDatatype(table,j);
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
      if(v && v.substring){
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
    case "\\":
      return "∖";
  }
  return c;
}

function createDisplayTerm(tokens){
  let term="";
  let mode=null;
  for(let i=0;i<tokens.length;i++){
    let t=tokens[i];
    t=t.replace(/</g,"&lt;");
    t=t.replace(/>/g,"&gt;");
    if(!mode){
      if(t==="π"||t==="ρ"||t==="σ"){
        term+=t;
        mode="func";
      }else if(t==="⨝"){
        let next=tokens[i+1];
        if(next==="["){
          term+=" <table style='text-align: center;display: inline'><tr><td>⨝</td></tr><tr><td style='font-size: x-small'>"
          mode="joinParams";
          i++;
        }else{
          term+=" "+t+" ";
        }
      }else if(t==="×"||t==="∩"||t==="∪"||t==="∖"){
        term+="&thinsp;"+t+"&thinsp;";
      }else if(t===")"){
        term+=" )";
      }else{
        term+=t;
      }
    }else if(mode==="joinParams"){
      if(t==="]"){
        term+="</td></tr></table> ";
        mode=null;
      }else{
        term+=t;
      }
    }else if(mode==="func"){ 
      if(t==="["){
        term+="<sub style='font-size: x-small'>";
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
        term+=t+" ";
        mode=null;
      }
    }
  }
  return term;
}

function translateSpecialCharacters(input){
  let split=input.split('"');
  for(let i=0;i<split.length;i+=2){
    split[i]=split[i].replace(/(\b)(p|r|s|ixi|n|u|x)(\b)/g,(v,l,c,r)=>{
      return l+translateCharacter(c)+r;
    });
    split[i]=split[i].replace("\\","∖")
  }
  let neu=split.join('"');
  let rhos=neu.split("ρ");
  for(let i=1;i<rhos.length;i++){
    let rho=rhos[i];
    let res=/^\s*\[([^\]]*)\]/.exec(rho);
    if(res){
      let params="["+res[1].replace(/>/g,"→")+"]";
      rhos[i]=rhos[i].replace(res[0],params);
    }
  }
  neu=rhos.join("ρ");
  let selects=neu.split("σ");
  for(let i=1;i<selects.length;i++){
    let sel=selects[i];
    let res=/^\s*\[([^\]]*)\]/.exec(sel);
    if(res){
      res[1]=res[1].replace(/ \^ /g," ∧ ");
      res[1]=res[1].replace(/ v /g," ∨ ");
      let params="["+res[1]+"]";

      selects[i]=selects[i].replace(res[0],params);
    }
  }
  neu=selects.join("σ");
  return neu;
}

function tokenizeTerm(input){
  let neu=translateSpecialCharacters(input);
  let rawTokens=neu.split(/(\[|\]|\(|\)|[πρσ⨝∩∪×∖])/);
  let tokens=[];
  for(let i=0;i<rawTokens.length;i++){
    let t=rawTokens[i].trim();
    if(t.length===0) continue;
    tokens.push(t);
  }
  let funcs="πρσ";
  for(let i=0;i<tokens.length;i++){
    let t=tokens[i];
    if(t.length===1 && funcs.indexOf(t)>=0){
      if(tokens[i+1]!=="["){
        throw "Syntax-Fehler: '[' hinter '"+t+"' erwartet.";
      }
      if(tokens[i+2]==="]"){
        if(t==="π") throw "Syntax-Fehler: Attributsnamen der Projektion erwartet.";
        if(t==="ρ") throw "Syntax-Fehler: Umbenennungen erwartet.";
        if(t==="σ") throw "Syntax-Fehler: Bedingung der Selektion erwartet.";
      }
      if(tokens[i+3]!=="]"){
        throw "Syntax-Fehler: ']' hinter '"+t+"[...' erwartet.";
      }
      if(tokens[i+4]!=="("){
        throw "Syntax-Fehler: '(' hinter '"+t+"[...]' erwartet.";
      }
      if(tokens[i+5]===")"){
        throw "Syntax-Fehler: Tabelle fehlt.";
      }
    }
  }
  return tokens;
}

function checkParams(func,params){
  if(func==="π"){
    //liste von attributen:
    if(!params){
      console.log("pi: params undefined");
    }
    let parts=params.split(",");
    for(let i=0;i<parts.length;i++){
      let p=parts[i].trim();
      if(p.length===0){
        return "Die Liste der Attribute in einer Projektion darf keinen leeren Eintrag enthalten.";
      }
      if(!/^[A-Za-zäöüÄÖÜß_][A-Za-zäöüÄÖÜß_0-9]*$/.test(p)){
        return "Ungültige Attributsbezeichnung in Projektion '"+p+"'";
      }
    }
  }else if(func==="ρ"){
    //liste von umbenennungen:
    if(!params){
      console.log("pi: params undefined");
    }
    let parts=params.split(",");
    for(let i=0;i<parts.length;i++){
      let p=parts[i].trim();
      if(p.length===0){
        return "Die Liste in einer Umbenennung darf keinen leeren Eintrag enthalten.";
      }
      if(!/^[A-Za-zäöüÄÖÜß_][A-Za-zäöüÄÖÜß_0-9]*→[A-Za-zäöüÄÖÜß_][A-Za-zäöüÄÖÜß_0-9]*$/.test(p)){
        return "Ungültige Umbenennung '"+p+"'";
      }
    }
  }else if(func==="σ"){

  }
  return undefined;
}

function parseTermRecursive(upn,index){
  let operators=["∪","∩","×⨝","∖","πρσ"];
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
          throw "')' erwartet";
        }
        bracketsDepth--;
      }else if(bracketsDepth>0){
        continue;
      }else{
        if(i<operators.length-1 && (c===op1||c===op2)){
          let t1,t2,t3;
          let standard=true;
          if(c==="⨝"){
            if(tokens[k+1]==="["){
              t1=tokens.slice(0,k);
              t2=tokens.slice(k+4);
              t3=[c,tokens[k+2]];
              standard=false;
            }
          }
          if(standard){
            t1=tokens.slice(0,k);
            t2=tokens.slice(k+1);
            t3=[c];
          }
          upn.splice(index,1,t1,t2,t3);
          //upn.splice(index,1,tokens.slice(0,k),tokens.slice(k+1),[c]);
          let off1=parseTermRecursive(upn,index);
          let off2=parseTermRecursive(upn,index+1+off1);
          return off1+off2;
        }else if(i===operators.length-1 && funcs.indexOf(c)>=0){
          //if(tokens.length===2) continue;
          let params=tokens[k+2];
          if(!params){
            console.log("error params",tokens,k);
          }
          let error=checkParams(c,params);
          if(error) throw error;
          upn.splice(index,1,tokens.slice(k+4),[tokens[k],params]);
          let off=parseTermRecursive(upn,index);
          return off+1;
        }
      }
    }
  }
  return 0;
}