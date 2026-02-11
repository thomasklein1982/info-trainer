export function checkPosition(result,letter,objectname){
  let bee=result.gameworld.objects[objectname];
  let soll=bee.x+","+bee.y;
  for(let a in result.ist){
    let f=result.ist[a];
    if(soll===a){
      if(f!==letter) return false;
    }else{
      if(f===letter) return false;
    }
  }
  if(result.ist[soll]!==letter) return false;
  return true;
}