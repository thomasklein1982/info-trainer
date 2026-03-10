import { sql } from "@codemirror/lang-sql";

/**
 * Soll checken, ob bare columns in einer Abfrage vorkommen. Macht aber wenig Sinn, wird nicht verwendet (zumindest vorerst nicht).
 * @param {*} code 
 */
export function checkSQL(code){
  let parser=sql().language.parser;
  code=code.toLowerCase();
  let tree=parser.parse(code);
  let node=tree.topNode;
  console.log(node);
  let ok=tree.cursor().iterate((cursor)=>{
    if(cursor.name==="Statement"){
      let node=cursor.node;
      node=node.firstChild;
      let cmd=code.substring(node.from,node.to);
      if(cmd!=="select") return;
      let columns=[];
      let content;
      do{
        node=node.nextSibling;
        if(!node) return true;
        content=code.substring(node.from,node.to);
        console.log(node.name,content);
        columns.push(content);
      }while(!(node.name==="Keyword" && content==="from"));
      columns.pop();
      columns=columns.join("").split(",");
      console.log(columns);
      while(!(node.name==="Keyword" && content==="group")){
        node=node.nextSibling;
        content=code.substring(node.from,node.to);
        if(!node) return true;
      }
      node=node.nextSibling;
      content=code.substring(node.from,node.to);
      if(!node.name==="Keyword" && content==="by") return true;
      let groupByColumns=[];
      do{
        node=node.nextSibling;
        if(!node) break;
        content=code.substring(node.from,node.to);
        console.log(node.name,content);
        if(node.name==="Punctuation") continue;
        groupByColumns.push(content);
      }while(node.name!=="Keyword");
      console.log(groupByColumns);
      for(let i=0;i<columns.length;i++){
        let col=columns[i];
        let pos=col.indexOf("(");
        if(pos>0) continue;
        pos=col.indexOf(" ");
        if(pos>0) col=col.substring(0,pos).trim();
        if(groupByColumns.indexOf(col)<0){
          console.log("bare column:",col);
          return false;
        }
      }
    }
    return true;
  });
  console.log("ok",ok);
}