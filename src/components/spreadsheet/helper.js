import AST from "./AST";
import compile from "./compile";

export function getRowAndCol(cellname){
  let c=cellname.toUpperCase().codePointAt(0)-65;
  let r=cellname.substring(1)*1-1;
  return { row: r, col: c};
}

export function getCellName(row,col){
  return String.fromCodePoint(65+col)+(row+1);
}

export function everythingButStringsToUpperCase(text){
  let inString=false;
  let neu="";
  for(let i=0;i<text.length;i++){
    let c=text.charAt(i);
    if(c==="\""){
      inString=!inString;
    }
    if(!inString) c=c.toUpperCase();
    neu+=c;
  }
  return neu;
}

export function calcCellValue(valid,cellData,cell){
  let c=cell.col;
  let r=cell.row;
  let data=cellData[r][c];
  if(!data) return true;
  delete data.error;
  data.bezuege=[];
  if(data.parsedFormula){
    let pf=getParseFunction(data.parsedFormula);
    let bezuege=[];
    try{
      let f;
      f=data.f;
      let v=pf(data.parsedFormula,f.substring(1),cellData,valid,bezuege);
      data.v=v;
      data.bezuege=bezuege;
      return v!==null;
    }catch(e){
      data.v=e;
      data.error=e;
      return true;
    }
  }
  return true;
}

/**
 * Passt in der Zelle alle relativen Bezuege an
 * @param cell 
 * @param dRow 
 * @param dCol 
 */
export function adaptBezuege(cell,dRow,dCol){
  if(!cell.bezuege || cell.bezuege.length===0 || dRow===0 && dCol===0) return;
  let f=cell.f;
  let parts=[];
  let offset=0;
  for(let i=0;i<cell.bezuege.length;i++){
    let b=cell.bezuege[i];
    let pos=b.pos-offset;
    parts.push(f.substring(0,pos));
    let n=getRowAndCol(b.name);
    n.row+=dRow;
    n.col+=dCol;
    let neu=getCellName(n.row,n.col);
    parts.push(neu);
    f=f.substring(pos+b.name.length);
    offset+=pos+b.name.length;
  }
  parts.push(f);
  cell.f=parts.join("");
}

export function getParseFunction(node){
    let cf=compile[AST.getName(node)];
    if(!cf){
      throw "#NAME?";
    }
    return cf.parse;
  }