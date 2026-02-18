export function createASCIIArt(text){
  let lines=text.split("\n");
  let points=[];
  let world=[];
  for(let i=0;i<lines.length;i++){
    let line=lines[i];
    let row="";
    for(let j=0;j<line.length;j++){
      let c=line.charAt(j);
      row+=".";
      if(c.trim().length>0){
        let p={
          row: i,
          col: j,
          c: c
        };
        points.push(p);
      }
    }
    world.push(row);
  }
  console.log("world",world)
  return {
    points,
    text,
    lines,
    world
  };
}