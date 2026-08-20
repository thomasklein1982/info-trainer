import {getCellName, getRowAndCol} from "./helper";

export default function convertToSpreadsheet(object){
    let maxRow=0;
    let maxCol=0;
    for(let a in object){
      let d=object[a];
      let rc=getRowAndCol(a);
      let row=rc.row;
      let col=rc.col;
      if(typeof d !== "string"){
        if(d.colSpan>1){
          col+=d.colSpan-1;
        }
        if(d.rowSpan>1){
          row+=d.rowSpan-1;
        }
      }
      if(maxRow<row) maxRow=row;
      if(maxCol<col) maxCol=col;
    }
    let lines=[];
    for(let i=0;i<=maxRow;i++){
      let line=[];
      lines.push(line);
      for(let j=0;j<=maxCol;j++){
        let name=getCellName(i,j);
        if(object[name]){
          let d=object[name];
          if(typeof d === "string"){
            line.push({f: d});
          }else{
            line.push(d);
          }
        }else{
          line.push({});
        }
      }
    }
    return lines;
  }