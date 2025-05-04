export function fillZeroes(s,length){
  s=s+"";
  for(let i=s.length;i<length;i++){
    s="0"+s;
  }
  return s;
}