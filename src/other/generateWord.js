/**
 * erzeugt ein "deutschklingendes" Pseudo-Nomen
 * 
 */
export function generateNomen(random,tokenzahl){
  if(!tokenzahl) tokenzahl=random.int(2,3);
  let vokale=["a","e","i","o","u","au","ei"];
  let konsonanten=["b","ch","d","f","g","h","j","k","kn","l","m","n","p","r","s","st","sch","sp","t","v","w","z"];
  let endingsAfterVokal=["ng","ch","m","n","p","s","t"];
  let allowR=["b","ch","d","f","g","p","st","sp","t"];
  let chanceR=0.25;
  let nextVokal=random.int(0,1)===1;
  let word="";
  if(nextVokal && tokenzahl%2===0) tokenzahl++;
  else if(!nextVokal && tokenzahl%2===1) tokenzahl++;
  for(let i=0;i<tokenzahl;i++){
    let part;
    if(nextVokal){
      part=random.drawFrom(vokale)[0];
    }else{
      part=random.drawFrom(konsonanten)[0];
      if(allowR.indexOf(part)>=0 && random.randomSeeded()<=chanceR){
        part+="r";
      }
    }
    word+=part;
    nextVokal=!nextVokal;
  }
  let part=random.drawFrom(endingsAfterVokal)[0];
  word+=part;
  word=word.charAt(0).toUpperCase()+word.substring(1);
  return word;
}

export function generateAdjektiv(random,tokenzahl){
  if(!tokenzahl) tokenzahl=random.int(2,3);
  let vokale=["a","e","i","o","u","au","ei"];
  let konsonanten=["b","ch","d","f","g","h","j","k","kn","l","m","n","p","r","s","st","sch","sp","t","v","w","z"];
  let endings=["tig","sch","lich","ch","nt"];
  let allowR=["b","ch","d","f","g","p","st","sp","t"];
  let chanceR=0.25;
  let nextVokal=random.int(0,2)===1;
  let word="";
  if(nextVokal && tokenzahl%2===0) tokenzahl++;
  else if(!nextVokal && tokenzahl%2===1) tokenzahl++;
  for(let i=0;i<tokenzahl;i++){
    let part;
    if(nextVokal){
      part=random.drawFrom(vokale)[0];
    }else{
      part=random.drawFrom(konsonanten)[0];
      if(allowR.indexOf(part)>=0 && random.randomSeeded()<=chanceR){
        part+="r";
      }
    }
    word+=part;
    nextVokal=!nextVokal;
    if(i==1){
      vokale.pop();
      vokale.pop();
    }
  }
  let part=random.drawFrom(endings)[0];
  word+=part;
  return word;
}

export function generateVerb(random,tokenzahl){
  if(!tokenzahl) tokenzahl=random.int(2,3);
  let vokale=["a","e","i","o","u","au","ei"];
  let konsonanten=["b","ch","d","f","g","h","j","k","kn","l","m","n","p","r","s","st","sch","sp","t","v","w","z"];
  let endings=["en","sch","lich","ch","nt"];
  let allowR=["b","ch","d","f","g","p","st","sp","t"];
  let chanceR=0.25;
  let nextVokal=random.int(0,2)===1;
  let word="";
  if(nextVokal && tokenzahl%2===1) tokenzahl--;
  else if(!nextVokal && tokenzahl%2===0) tokenzahl--;
  for(let i=0;i<tokenzahl;i++){
    let part;
    if(nextVokal){
      part=random.drawFrom(vokale)[0];
    }else{
      part=random.drawFrom(konsonanten)[0];
      if(allowR.indexOf(part)>=0 && random.randomSeeded()<=chanceR){
        part+="r";
      }
    }
    word+=part;
    nextVokal=!nextVokal;
  }
  let part="en";
  word+=part;
  return word;
}