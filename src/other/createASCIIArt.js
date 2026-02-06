export function createASCIIArt(text){
  let lines=text.split("\n");
  let points=[];
  for(let i=0;i<lines.length;i++){
    let line=lines[i];
    for(let j=0;j<line.length;j++){
      let c=line.charAt(j);
      if(c.trim().length>0){
        let p={
          row: i,
          col: j,
          c: c
        };
        points.push(p);
      }
    }
  }
  return {
    points,
    text,
    lines
  };
}