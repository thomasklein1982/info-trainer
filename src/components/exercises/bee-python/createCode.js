export function createCode(Random,program){
  let code;
  for(let i=0;i<program.length;i++){
    let line=program[i];
    if(Array.isArray(line)){
      let n=line.length;
      line=line[Random.int(0,n-1)];  
    }
    if(line.length===0) continue;
    if(!code) code=line;
    else code+="\n"+line;
  }
  let regex;
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
    let index=0;
    let oldCode=code;
    while(true){
      regex=new RegExp("§"+type.id+index+"§","g");
      let v=type.value();
      code=code.replace(regex,v);
      if(code===oldCode) break;
      oldCode=code;
      index++;
    }
  }
  return code;
}