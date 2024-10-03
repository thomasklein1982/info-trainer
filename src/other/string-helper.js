export function repeatString(s,count,sep){
  let t=[];
  if(!sep) sep="";
  for(let i=0;i<count;i++){
    t.push(s);
  }
  return t.join(sep);
}

export function countInString(s,c){
  let count=0;
  for(let i=0;i<s.length;i++){
    if(s[i]===c) count++;
  }
  return count;
}