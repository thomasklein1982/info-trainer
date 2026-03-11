export function createCode(Random,program,values,indent){
  if(!indent) indent="";
  if(!values) values=createValues(Random);
  let code;
  for(let i=0;i<program.length;i++){
    let line=program[i];
    if(Array.isArray(line)){
      let n=line.length;
      line=line[Random.int(0,n-1)];  
    }else if(line.type){
      //Objekt, Kontrollstruktur
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
    if(line.length===0) continue;
    if(!code) code=indent+line;
    else code+="\n"+indent+line;
  }
  code=replaceVariables(Random,code,values);
  // let regex;
  // let types=[
  //   {
  //     id: "s",
  //     value: ()=>{
  //       let strings=["Honig","Info","Flug","Biene","Wabe","Wiese","Blume"];
  //       return strings[Random.int(0,strings.length-1)];
  //     }
  //   },
  //   {
  //     id: "i",
  //     value: ()=>{
  //       return Random.int(0,99);
  //     }
  //   },
  //   {
  //     id: "c",
  //     value: ()=>{
  //       return String.fromCodePoint(Random.int(65,90));
  //     }
  //   }
  // ];
  // for(let i=0;i<types.length;i++){
  //   let type=types[i];
  //   let index=values[type.id].length;
  //   let oldCode=code;
  //   while(true){
  //     regex=new RegExp("§"+type.id+index+"§","g");
  //     let v=type.value();
  //     values[type.id].push(v);
  //     code=code.replace(regex,v);
  //     if(code===oldCode && index>9) break;
  //     oldCode=code;
  //     index++;
  //   }
  // }
  return {
    code,
    values
  }
  ;
}

function createValues(Random){
  let values={i: [], c: [], s: []};
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
    for(let j=0;j<vals.length;j++){
      regex=new RegExp("§"+a+j+"§","g");
      let v=vals[j];
      code=code.replace(regex,v);
    }
  }
  return code;
}