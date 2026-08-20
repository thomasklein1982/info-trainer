import { getRowAndCol } from "./helper";

export function setInSpreadsheet(exercise,object){
  let data=exercise.spreadsheet.data;
  for(let a in object){
    let pos=getRowAndCol(a);
    let o=object[a];
    if(o.f!==undefined) o=o.f;
    data[pos.row][pos.col].f=o;
  }

}