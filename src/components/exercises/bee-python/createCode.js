export function createCode(Random,program,values,indent){
  if(!indent) indent="";
  values=completeValues(values,Random);
  let code;
  for(let i=0;i<program.length;i++){
    let line=program[i];
    if(Array.isArray(line)){
      let n=line.length;
      line=line[Random.int(0,n-1)];  
    }else if(line.type){
      if(line.type==="select"){
        let index=values.selects[line.name];
        if(index===undefined){
          let n=line.values.length;
          index=Random.int(0,n-1);
          values.selects[line.name]=index;
        }
        line=line.values[index];
      }else{
        //Kontrollstruktur
        let cond=createCode(Random,[line.condition],values,"");
        let c=line.type+" "+cond.code+":\n";
        let sub1=createCode(Random, line.sub1, values, indent+"  ");
        c+=sub1.code;
        if(line.sub2){
          c+="\n"+indent+"else:\n";
          let sub2=createCode(Random,line.sub2,values, indent+"  ");
          c+=sub2.code;
        }
        line=c;
      }
    }
    if(line.length===0) continue;
    if(!code) code=indent+line;
    else code+="\n"+indent+line;
  }
  code=replaceVariables(Random,code,values);
  return {
    code,
    values
  }
  ;
}

function completeValues(givenValues,Random){
  if(givenValues.selects) return givenValues;
  let values={i: [], c: [], s: [], selects: {}};
  values.variables=givenValues;
  let types=[
    {
      id: "s",
      value: ()=>{
        let strings=["Honig","Info","Flug","Biene","Wabe","Wiese","Blume"];
        return strings[Random.int(0,strings.length-1)];
      }
    },
    {
      id: "i",
      value: ()=>{
        return Random.int(0,99);
      }
    },
    {
      id: "c",
      value: ()=>{
        return String.fromCodePoint(Random.int(65,90));
      }
    }
  ];
  for(let i=0;i<types.length;i++){
    let type=types[i];
    for(let j=0;j<10;j++){
      let v=type.value();
      values[type.id].push(v);
    }
  }
  return values;
}

function replaceVariables(Random,code,values){
  let regex;
  for(let a in values){
    let vals=values[a];
    if(a==="variables"){
      for(let j in vals){
        regex=new RegExp("§"+j+"§","g");
        let v=vals[j];
        code=code.replace(regex,v);
      }
      continue;
    }
    for(let j=0;j<vals.length;j++){
      regex=new RegExp("§"+a+j+"§","g");
      let v=vals[j];
      code=code.replace(regex,v);
    }
  }
  return code;
}