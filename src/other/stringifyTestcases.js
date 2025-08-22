export default function stringifyTestcases(testcases){
  let t="[";
  for(let i=0;i<testcases.length;i++){
    let tc=testcases[i];
    t+="{";
    for(let a in tc){
      let o=tc[a];
      if(typeof o==="function"){
        o=o.toString();
      }else{
        o=JSON.stringify(o);
      }
      t+=JSON.stringify(a)+": "+o+",\n";
    }
    t+="},\n";
  }
  t+="]";
  return t;
}