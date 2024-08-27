export function repeatString(s,count,sep){
  let t=[];
  if(!sep) sep="";
  for(let i=0;i<count;i++){
    t.push(s);
  }
  return t.join(sep);
}