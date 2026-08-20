import AST from "./AST";
import { getParseFunction } from "./helper";

export default function parseTerm(node,src,cellData,valid,bezuege){
  let n=AST.getChild(node,0);
  let cf=getParseFunction(n);
  let a=cf(n,src,cellData,valid,bezuege);
  if(a===null) return null;
  let rest=AST.getChild(node,1);
  if(!rest) return a;
  for(let i=0;i<rest.length;i++){
    let part=rest[i];
    let op=AST.getText(part[1],src);
    let n1=part[3];
    let cf=getParseFunction(n1);
    let b=cf(n1,src,cellData,valid,bezuege);
    if(b===null) return null;
    if(op==="+") a+=b;
    else if(op==="-") a-=b;
    else if(op==="*") a*=b;
    else if(op==="/") a/=b;
    else if(op==="^") a=Math.pow(a,b);
    else if(op==="=") a=a===b;
    else if(op==="<") a=a<b;
    else if(op===">") a=a>b;
    else if(op==="<>") a=a!==b;
    else if(op==="<=") a=a<=b;
    else if(op===">=") a=a>=b;
  }
  return a;
}