export function boolArrayToInt(array){
  if(!array || !Array.isArray(array) || array.length===0) return 0;
  let n=1;
  for(let i=array.length-1;i>=0;i--){
    let w=array[i]===true?1:0;
    n=n*2+w;
  }
  
  return n;
}

export function intToBoolArray(n){
  let array=[];
  if(n<=0) return array;
  let i=0;
  while(n>1){
    let r=n%2;
    array.push(r===1);
    n=(n-r)/2;
  }
  return array;
}

export function setArrayToValue(array, value){
  for(let i=0;i<array.length;i++){
    array[i]=value;
  }
}

export function createBoolArray(n,value){
  if(!value) value=false; else value=true;
  let array=[];
  for(let i=0;i<n;i++){
    array.push(value);
  }
  return array;
}

export function isCompletelyTrue(array){
  if(!array || array.length<=0) return false;
  for(let i=0;i<array.length;i++){
    if(array[i]!==true) return false;
  }
  return true;
}