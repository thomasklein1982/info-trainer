import { BeepScope } from "./BeepScope";
import { getParseFunction } from "./compile-functions";

export function parsePython(src,firstLineNode,errors){
  let scope=new BeepScope(null,null);
  scope.errors=errors;
  let program=[];
  let node=firstLineNode;
  while(node){
    let cf=getParseFunction(node);
    if(cf.error){
      errors.push(cf.error);
      node=node.nextSibling;
      continue;
    }
    let p=cf(node,src,scope);
    if(p.error){
      errors.push(p.error);
      node=node.nextSibling;
      continue;
    }
    program.push(p);
    node=node.nextSibling;
  }
  return {
    program, scope
  };
}