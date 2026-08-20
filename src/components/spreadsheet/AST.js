const AST= {
  getChild: function(ast,index){
    if(ast.children){
      if(Array.isArray(ast.children)) return ast.children[index];
      else return ast.children;
    }
    return ast[index];
  },
  getName: function(ast){
    if(Array.isArray(ast)) return "group";
    return ast.name;
  },
  getLine: function(ast){
    if(Array.isArray(ast)) return AST.getLine(ast[0]);
    return ast.line;
  },
  getStart: function(ast){
    if(Array.isArray(ast)) return AST.getStart(ast[0]);
    return ast.start;
  },
  getEnd: function(ast){
    if(Array.isArray(ast)) return AST.getStart(ast[ast.length-1]);
    return ast.end;
  },
  getText: function(ast,src){
    return src.substring(AST.getStart(ast),AST.getEnd(ast));
  }
}

export default AST;