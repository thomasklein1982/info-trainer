import { fillZeroes } from "./fillZeroes";

export function formatDate(date,format){
  let replacements={
    "YYYY": date.getFullYear(),
    "YY": (date.getFullYear()+"").substring(2,4),
    "MM": fillZeroes(date.getMonth()+1,2),
    "DD": fillZeroes(date.getDate(),2),
    "hh": fillZeroes(date.getHours(),2),
    "mm": fillZeroes(date.getMinutes(),2),
    "ss": fillZeroes(date.getSeconds(),2)
  };
  let res=format;
  for(let a in replacements){
    let r=replacements[a];
    let re=new RegExp(a);
    res=res.replace(re,r);
  }
  return res;
}