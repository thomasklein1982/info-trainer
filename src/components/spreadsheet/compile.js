import AST from "./AST";
import { getCellName, getParseFunction, getRowAndCol } from "./helper";
import parseTerm from "./parseTerm";
import SpreadsheetFunctions from "./SpreadsheetFunctions";

export default {
  Bezug: {
      parse: (node,src,cellData,valid,bezuege)=>{
        let bezug=src.substring(node.start,node.end);
        if(node.children[2]!==""){ //brittle maybe???
          //bereich
          let parts=bezug.split(":");
          let start=parts[0];
          let end=parts[1];
          let posStart=getRowAndCol(start);
          let posEnd=getRowAndCol(end);
          if(posStart.row>posEnd.row || posStart.col>posEnd.col){
            throw "Ungültiger Zellbereich '"+bezug+"'";
          }
          if(posEnd.row>=cellData.length || posEnd.col>=cellData[0].length){
            throw "Zellbereich außerhalb des Tabellenblatts "+bezug;
          }
          let array=[];
          for(let i=posStart.row;i<=posEnd.row;i++){
            for(let j=posStart.col;j<=posEnd.col;j++){
              let data=cellData[i][j];
              let b=getCellName(i,j);
              if(!valid[b]) return null;
              let v=data.v;
              if(typeof v==="string"){
                let n=v.replace(",",".")*1;
                if(!isNaN(n)) v=n;
              }
              array.push(v);
            }
          }
          return array;
        }
        bezuege.push({name: bezug, pos: node.start+1}); //+1 wegen =
        let pos=getRowAndCol(bezug);
        if(pos.row>=cellData.length || pos.col>=cellData[0].length){
          throw "Ungültiger Zellbezug "+bezug;
        }
        let data=cellData[pos.row][pos.col];
        if(!valid[bezug]) return null;
        let v=data.v;
        if(typeof v==="string"){
          let n=v.replace(",",".")*1;
          if(!isNaN(n)) v=n;
        }
        return v;
      }
    },
    Term: {
      parse: (node,src,cellData,valid,bezuege)=>{
        return parseTerm(node,src,cellData,valid,bezuege);
      }
    },
    Term3: {
      parse: (node,src,cellData,valid,bezuege)=>{
        return parseTerm(node,src,cellData,valid,bezuege);
      }
    },
    Term2: {
      parse: (node,src,cellData,valid,bezuege)=>{
        return parseTerm(node,src,cellData,valid,bezuege);
      }
    },
    Term1: {
      parse: (node,src,cellData,valid,bezuege)=>{
        return parseTerm(node,src,cellData,valid,bezuege);
      }
    },
    Term0: {
      parse: (node,src,cellData,valid,bezuege)=>{
        return parseTerm(node,src,cellData,valid,bezuege);
      }
    },
    Funktionsaufruf: {
      parse: (node,src,cellData,valid,bezuege)=>{
        let n=AST.getChild(node,0);
        let name=src.substring(n.start,n.end).toLowerCase();
        //argumente:
        let args=[];
        n=AST.getChild(node,4);
        let cf=getParseFunction(n);
        let a=cf(n,src,cellData,valid,bezuege);
        if(a===null) return a;
        args.push(a);
        let rest=AST.getChild(node,5);
        for(let i=0;i<rest.length;i++){
          let r=rest[i];
          n=AST.getChild(r,3);
          cf=getParseFunction(n);
          a=cf(n,src,cellData,valid,bezuege);
          if(a===null) return a;
          args.push(a);
        }
        let f=SpreadsheetFunctions[name];
        if(!f){
          throw "#NAME!";
        }
        return f(args);
      }
    },
    Wert: {
      parse: (node,src,cellData,valid,bezuege)=>{
        let n=AST.getChild(node,0);
        if(n==="\""){
          if(node.children.length!==3 || AST.getChild(node,2)!=="\""){
            throw "Fehlerhafter String: "+src.substring(node.start,node.end);
          }
          n=AST.getChild(node,1);
          return src.substring(n.start,n.end);
        }
        let cf=getParseFunction(n);
        return cf(n,src,cellData,valid,bezuege);
      }
    },
    Zahl: {
      parse: (node,src,cellData,valid,bezuege)=>{
        let x=src.substring(node.start,node.end);
        if(/^-?\d+,\d+$/.test(x)){
          x=x.replace(",",".")*1;
        }else{
          x*=1;
        }
        return x;
      }
    },
    Klammerausdruck: {
      parse: (node,src,cellData,valid,bezuege)=>{
        let n=AST.getChild(node,2);
        let cf=getParseFunction(n);
        return cf(n,src,cellData,valid,bezuege);
      }
    }
  }

  