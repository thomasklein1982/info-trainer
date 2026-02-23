export class BeepScope{
  constructor(gameworld, program){
    this.gameworld=gameworld;
    this.layers=[{}];
    this.blocks=[
      {
        program, nextStatement: 0
      }
    ];
    this.errors=[];
    this.moveCount=0;
  }

  getAllVariables(){
    let variables={};
    for(let i=0;i<this.layers.length;i++){
      let layer=this.layers[i];
      for(let varname in layer){
        variables[varname]=layer[varname];
      }
    }
    return variables;
  }

  getVariable(varname){
    for(let i=this.layers.length-1;i>=0;i--){
      let layer=this.layers[i];
      if(varname in layer){
        return layer[varname];
      }
    }
    return null;
  }

  addVariable(varname, value){
    this.layers[this.layers.length-1][varname]={name: varname, value: value};
  }
}