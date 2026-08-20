export default {
  wenn: function(args){
    checkArguments("WENN",1,3,args);
    let cond=args[0];
    let a=args[1];
    let b=args[2];
    if(a===undefined) a=true;
    if(b===undefined) b=false;
    if(cond) return a; else return b;
  },
  aufrunden: function(args){
    checkArguments("AUFRUNDEN",1,2,args);
    let a=args[0];
    let b=args[1];
    if(a===undefined) a=true;
    if(b===undefined) b=0;
    let r=api.roundToNachkommastellen(a,b,2);
    return r;
  },
  abrunden: function(args){
    checkArguments("ABRUNDEN",1,2,args);
    let a=args[0];
    let b=args[1];
    if(a===undefined) a=true;
    if(b===undefined) b=0;
    let r=api.roundToNachkommastellen(a,b,1);
    return r;
  },
  runden: function(args){
    checkArguments("RUNDEN",1,2,args);
    let a=args[0];
    let b=args[1];
    if(a===undefined) a=true;
    if(b===undefined) b=0;
    let r=api.roundToNachkommastellen(a,b,0);
    return r;
  },
  ggt: function(args){
    checkArguments("GGT",1,-1,args);
    return api.ggt(args);
  },
  kgv: function(args){
    checkArguments("KGV",1,-1,args);
    return api.kgv(args);
  },
  rest: function(args){
    checkArguments("REST",2,2,args);
    return args[0]%args[1];
  },
  wurzel: function(args){
    checkArguments("WURZEL",1,1,args);
    return Math.pow(args[0],0.5);
  },
  summe: function(args){
    checkArguments("SUMME",1,1,args);
    let array=args[0];
    if(!Array.isArray(array)){
      array=[array];
    }
    let s=0;
    for(let i=0;i<array.length;i++){
      let v=array[i];
      if(typeof v==="number") s+=array[i];
    }
    return s;
  },
  summenprodukt: function(args){
    checkArguments("SUMMENPRODUKT",2,2,args);
    let array=args[0];
    if(!Array.isArray(array)){
      array=[array];
    }
    let array2=args[1];
    if(!Array.isArray(array2)){
      array2=[array2];
    }
    let s=0;
    for(let i=0;i<array.length;i++){
      let v=array[i];
      let v2=array2[i];
      if(typeof v==="number" && typeof v2==="number") s+=v*v2;
    }
    return s;
  },
  mittelwert: function(args){
    checkArguments("MITTELWERT",1,1,args);
    let array=args[0];
    if(!Array.isArray(array)){
      array=[array];
    }
    let s=0;
    let n=0;
    for(let i=0;i<array.length;i++){
      let v=array[i];
      if(typeof v==="number"){
        s+=array[i];
        n++;
      }
    }
    if(n===0) throw "Bereich enthält keine Zahl";
    return s/n;
  },
  min: function(args){
    checkArguments("MIN",1,1,args);
    let array=args[0];
    if(!Array.isArray(array)){
      array=[array];
    }
    let min=undefined;
    for(let i=0;i<array.length;i++){
      let v=array[i];
      if(typeof v==="number"){
        if(min===undefined || v<min){
          min=v;
        }
      }
    }
    if(min===undefined) return 0;
    return min;
  },
  max: function(args){
    checkArguments("MAX",1,1,args);
    let array=args[0];
    if(!Array.isArray(array)){
      array=[array];
    }
    let max=undefined;
    for(let i=0;i<array.length;i++){
      let v=array[i];
      if(typeof v==="number"){
        if(max===undefined || v>max){
          max=v;
        }
      }
    }
    if(max===undefined) return 0;
    return max;
  }
};

function checkArguments(functionName,minArgs,maxArgs,args){
  if(minArgs>=0 && args.length<minArgs) throw functionName+"-Funktion: Zu wenig Argumente";
  if(maxArgs>=0 && args.length>maxArgs) throw functionName+"-Funktion: Zu viele Argumente";
}