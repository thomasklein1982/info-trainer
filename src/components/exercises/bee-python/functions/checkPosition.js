export function checkPosition(result,letter,objectname){
  letter=letter.toLowerCase();
  let bee=result.gameworld.objects[objectname];
  let soll=bee.x+","+bee.y;
  for(let a in result.ist){
    let f=result.ist[a];
    f=f.toLowerCase();
    if(soll===a){
      if(f!==letter) return false;
    }else{
      if(f===letter) return false;
    }
  }
  if(result.ist[soll].toLowerCase()!==letter) return false;
  return true;
}