export function parseTerm(input){
  let term=parseUPNAndDisplay(input);
  if(!term.error){
    term.sql=upnToSQL(term.upn);
  }
  return term;
}

function upnToSQL(upn){
  console.log("to SQL (klappt noch nicht):",upn);
  //let sql="";
  for(let i=0;i<upn.length;i++){
    let f=upn[i];
    if(f==="π"){
      let params=upn[i+2];
      let sql="select "+params+" from ("+upn[i-1]+")";
      upn.splice(i-1,4,sql);
      i-=3;
    }else if(f==="σ"){
      let cond=upn[i+2];
      let sql="select * from ("+upn[i-1]+") where "+cond;
      upn.splice(i-1,4,sql);
      i-=3;
    }
  }
  return upn[0];
}

function parseUPNAndDisplay(input){
  let tokens=tokenizeTerm(input);
  let upn=[tokens];
  parseTermRecursive(upn,0);
  let display=createDisplayTerm(tokens);
  return {
    upn, display
  };
}

function translateCharacter(c){
  switch (c) {
    case "p": 
      return "π";
    case "r":
      return "ρ";
    case "s":
      return "σ";
    case "ixi":
      return "⨝";
    case "n":
      return "∩";
    case "u":
      return "∪";
    case "x":
      return "×";
  }
  return c;
}

function createDisplayTerm(tokens){
  let term="";
  let mode=null;
  for(let i=0;i<tokens.length;i++){
    let t=tokens[i];
    if(!mode){
      if(t==="π"||t==="ρ"||t==="σ"){
        term+=t;
        mode="func";
      }else if(t==="⨝"){
        let next=tokens[i+1];
        if(next==="["){
          term+="<table style='text-align: center'><tr><td>⨝</td></tr><tr><td>"
          mode="joinParams";
          i++;
        }else{
          term+=t;
        }
      }else{
        term+=t;
      }
    }else if(mode==="joinParams"){
      if(t==="]"){
        term+="</td></tr></table>";
        mode=null;
      }else{
        term+=t;
      }
    }else if(mode==="func"){ 
      if(t==="["){
        term+="<sub>";
        mode="params";
      }
    }else if(mode==="params"){
      if(t==="]"){
        term+="</sub>";
        mode="bracket";
      }else{
        term+=t;
      }
    }else if(mode==="bracket"){
      if(t==="("){
        term+=t;
        mode=null;
      }
    }
  }
  return term;
}

function tokenizeTerm(input){
  let split=input.split('"');
  for(let i=0;i<split.length;i+=2){
    split[i]=split[i].replace(/(\b)(p|r|s|ixi|n|u|x)(\b)/g,(v,l,c,r)=>{
      return l+translateCharacter(c)+r;
    });
  }
  let neu=split.join('"');
  let rawTokens=neu.split(/(\[|\]|\(|\)|[πρσ⨝∩∪×])/);
  let tokens=[];
  for(let i=0;i<rawTokens.length;i++){
    let t=rawTokens[i].trim();
    if(t.length===0) continue;
    tokens.push(t);
  }
  return tokens;
}

function parseTermRecursive(upn,index){
  let operators=["∪","∩","×⨝","∖"];
  for(let i=0;i<operators.length;i++){
    let op=operators[i];
    let op1=op.charAt(0);
    let op2=op.charAt(op.length-1);
    let tokens=upn[index];
    while(tokens.length>=2 && tokens[0]==="(" && tokens[tokens.length-1]===")"){
      tokens.splice(0,1);
      tokens.splice(tokens.length-1,1);
    }
    upn[index]=tokens;
    let bracketsDepth=0;
    for(let k=tokens.length-1;k>=0;k--){
      let c=tokens[k];
      if(c===")"){
        bracketsDepth++;
      }else if(c==="("){
        if(bracketsDepth===0){
          throw "Schließende Klammer zu viel";
        }
        bracketsDepth--;
      }else if(bracketsDepth>0){
        continue;
      }else{
        if(c===op1||c===op2){
          upn.splice(index,1,tokens.slice(0,k),tokens.slice(k+1),c);
          let off1=parseTermRecursive(upn,index);
          let off2=parseTermRecursive(upn,index+1+off1);
          return off1+off2;
        }
      }
    }
  }
  return 0;
}