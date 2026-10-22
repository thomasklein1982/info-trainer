import { difficulty } from "../App.vue";

export function parseABLink(link){
  let pos=link.indexOf("#");
  let hash=link;
  if(pos>=0){
    hash=hash.substring(pos);
  }
  if(!hash.toLowerCase().startsWith("#ab=")) return null;
  hash=hash.substring(4);
  try{
    hash=decodeURI(hash);
  }catch(e){
    
  }
  let pos1=hash.indexOf("[");
  let pos2=hash.indexOf("]");
  if(pos1>=0 && pos2>pos1){
    let before=hash.substring(0,pos1);
    let posInfos1=before.lastIndexOf("(");
    let posInfos2=before.lastIndexOf(")");
    let title;
    let challenge=false;
    if(posInfos1>=0 && posInfos1<posInfos2){
      let infos=before.substring(posInfos1+1,posInfos2);
      challenge=infos==="1";
      title=before.substring(0,posInfos1);
    }else{
      title=hash.substring(0,pos1);
    }
    let ids=hash.substring(pos1+1,pos2);
    ids=ids.split(",");
    let paths={};
    for(let i=0;i<ids.length;i++){
      let id=ids[i];
      let posA=id.indexOf("{");
      let posB=id.indexOf("}",posA+1);
      if(posB>0){
        let p=id.substring(posA+1,posB);
        id=id.substring(0,posA);
        paths[id]=p;
        ids[i]=id;
      }
    }
    let diff=hash.substring(pos2+1);
    if(["Hard","Normal","Easy"].indexOf(diff)<0){
      diff=null;
    }
    return {
      title, ids, paths, difficulty: diff, challenge
    };
  }
}