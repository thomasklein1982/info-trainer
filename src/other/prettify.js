export function prettify(code,options){
  if(!options) options={};
  let tabSize=options.tabSize;
  if(!tabSize) tabSize=2;
  let grow="";
  for(let i=0;i<tabSize;i++) grow+=" ";
  let indentStart=options.indentStart;
  let indentStop=options.indentStop;
  if(!indentStart) indentStart="{";
  if(!indentStop) indentStop="}";
  let indent="";
  let pretty="";
  let lines=code.split("\n");
  for(let i=0;i<lines.length;i++){
    let line=lines[i].trimStart();
    pretty+="\n";
    if(line.length<=0){
      pretty+=indent;
      continue;
    };
    let c=line.charAt(line.length-1);
    if(c===indentStart){
      pretty+=indent+line;
      indent+=grow;
    }else{
      if(c===indentStop){
        let newIndent=indent.substring(tabSize);
        if(line.length===1){
          pretty+=newIndent+c;
        }else{
          pretty+=indent+line.substring(0,line.length-1);
          pretty+="\n"+newIndent+c;
        }
        indent=newIndent;
      }else{
        if(line.endsWith("});")||line.endsWith("} );")){
          indent=indent.substring(tabSize);
          pretty+=indent+line;
        }else{
          pretty+=indent+line;
        }
      }
    } 
  }
  return pretty.trim();
}