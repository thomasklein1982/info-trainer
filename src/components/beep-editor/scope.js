

export function getVariable(scope,varname){
  for(let i=scope.layers.length-1;i>=0;i--){
    let layer=scope.layers[i];
    if(varname in layer){
      return layer[varname];
    }
  }
  return null;
}

export function addVariable(scope,varname, value){
  scope.layers[scope.layers.length-1][varname]={name: varname, value: value};
  return null;
}