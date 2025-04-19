export function parseTerm(input){
  //operator precendence:
  // u (union)
  // n (intersect)
  // x ixi (products)
  // \ (set minus)
  // s,p,r (functions)
  // () (parentheses)
  
  console.log(input);

  input=input.replace(/\s+u\s+/g,"∪");
  input=input.replace(/\s+n\s+/g,"∩");
  input=input.replace(/\s+x\s+/g,"×");
  input=input.replace(/\s+ixi\s+/g,"⨝");
  input=input.replace(/\s*\\\s*/g,"∖");
  
  console.log(input);

  let upn=[{text: input,from: 0, len: input.length}];
  parseTermRecursive(upn,0);
  return upn;
  for(let i=0;i<operators.length;i++){
    let op=operators[i];
    for(let j=upn.length-1;j>=0;j--){
      let p=upn[j];
      while(p.length>=2 && p.charAt(0)==="(" && p.charAt(p.length-1)===")"){
        p=p.substring(1,p.length-1);
      }
      upn[j]=p;
      let bracketsDepth=0;
      for(let k=p.length-1;k>=0;k--){
        let c=p.charAt(k);
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
          let rop=p.substring(k-op.length+1,k+1);
          if(rop===op){
            upn.splice(j,1,p.substring(0,k-op.length+1),p.substring(k+1),op.trim());
            j+=2;
            break;
          }
        }
      }
    }
  }
  return upn;
}

function parseTermRecursive(upn,index){
  let offset=0;
  let operators=["∪","∩","×⨝","∖"];
  for(let i=0;i<operators.length;i++){
    let op=operators[i];
    let part=upn[index];
    let p=part.text;
    let from=part.from;
    let len=0;
    while(p.length>=2 && p.charAt(0)==="(" && p.charAt(p.length-1)===")"){
      p=p.substring(1,p.length-1);
      from++;
      len+=2;
    }
    upn[index].text=p;
    let bracketsDepth=0;
    for(let k=p.length-1;k>=0;k--){
      let c=p.charAt(k);
      len++;
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
        if(c===op.charAt(0)||c===op.charAt(op.length-1)){
          upn.splice(index,1,{text: p.substring(0,k), from: from, len: part.len-len},{text: p.substring(k+1), from: from+part.len-len+1, len: len-1},{text: op.trim(),from: 0, len: 1});
          let off1=parseTermRecursive(upn,index);
          let off2=parseTermRecursive(upn,index+1+off1);
          return off1+off2;
        }
      }
    }
  }
  return offset;
}