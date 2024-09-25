import { difficulty } from "../App.vue";

export function createMethodOutputExerciseCode(Random,methods,values){
  let methodNames=[];
  for(let i=0;i<methods.length;i++){
    methodNames.push("m"+(i+1));
  }
  methodNames=Random.mixArray(methodNames);
  let letters=[];
  let ints=[];
  for(let i=0;i<methods.length;i++){
    let m=methods[i];
    m.name=methodNames[i];
    let pos=m.code.indexOf("$out");
    m.output=0;
    while(pos>=0){
      letters.push(String.fromCodePoint(65+letters.length));
      m.output++;
      pos=m.code.indexOf("$out",pos+1);
    }
    pos=m.code.indexOf("$int");
    m.ints=0;
    while(pos>=0){
      ints.push(ints.length+1);
      m.ints++;
      pos=m.code.indexOf("$int",pos+1);
    }
  }
  letters=Random.mixArray(letters);
  ints=Random.mixArray(ints);
  let letterIndex=0;
  let intIndex=0;
  for(let i=0;i<methods.length;i++){
    let m=methods[i];
    let count=m.output;
    m.output=[];
    for(let j=0;j<count;j++){
      m.output.push(letters[letterIndex]);
      letterIndex++;
    }
    count=m.ints;
    m.ints=[];
    for(let j=0;j<count;j++){
      m.ints.push(ints[intIndex]);
      intIndex++;
    }
  }
  let randMethods=Random.mixArray(methods);
  let methodsCode=[];
  for(let i=0;i<randMethods.length;i++){
    let m=randMethods[i];
    let code=m.code;
    if(values){
      m.values=values;
      for(let a in values){
        let re=new RegExp("\\$"+a+"\\$","g");
        code=code.replace(re,values[a]);
      }
    }
    code=code.replace(/\$name/g,m.name);
    if(difficulty==="Easy"){
      code=code.replace(/\$void /g,"");
    }else{
      code=code.replace(/\$void /g,"void ");
    }
    let pos=code.indexOf("$call");
    while(pos>=0){
      let pos2=code.indexOf("(",pos+1);
      let call=code.substring(pos,pos2);
      let callNr=call.split(":")[1]*1;
      code=code.substring(0,pos)+methods[callNr].name+code.substring(pos2);
      pos=code.indexOf("$call");
    }
    for(let j=0;j<m.output.length;j++){
      code=code.replace(/\$out/,m.output[j]);
    }
    for(let j=0;j<m.ints.length;j++){
      code=code.replace(/\$int/,m.ints[j]);
    }
    methodsCode.push(code);
  }
  return methodsCode.join("\n");
}