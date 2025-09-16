export function chooseExercises(ids, paths, random){
    /**
   * Bsp: AA AB BA BB BAA BA
   * 
   */
  if(!paths) return ids;
  let letters=[];
  for(let a in paths){
    let p=paths[a];
    for(let j=0;j<p.length;j++){
      let c=p.charAt(j).toLowerCase();
      if(j>=letters.length){
        letters.push("");
      }
      if(c!=="*" && letters[j].indexOf(c)<0){
        letters[j]+=c;
      }
    }
  }
  //pro Stelle einen Buchstaben auswürfeln:
  let path="";
  for(let i=0;i<letters.length;i++){
    let N=letters[i].length;
    let index=random.int(0,N-1);
    let l=letters[i].charAt(index);
    path+=l;
  }
  path=path.toLowerCase();
  console.log("path",path);
  let exercises=[];
  for(let i=0;i<ids.length;i++){
    let id=ids[i];
    let p=paths[id];
    if(!p){
      exercises.push(id);
      continue;
    }
    p=p.toLowerCase();
    let ok=true;
    for(let j=0;j<p.length;j++){
      let c1=p.charAt(j);
      let c2=path.charAt(j);
      if(c1!=="*" && c1!==c2){
        ok=false;
        break;
      }
    }
    if(ok){
      exercises.push(id);
    }
  }
  return exercises;
}