<template>
  <div class="clazz-wrapper">
    <div class="clazz-name">
      {{ clazz.name }}
    </div>
    <div class="clazz-attributes">
      <div v-for="(a,j) in attributes" v-html="a"></div>
    </div>
    <div class="clazz-methods">
      <div v-for="(m,j) in methods" v-html="m"></div>
    </div>
  </div>
</template>

<script>

function variable(v){
  return v.name+": "+v.type;
}

function method(m, clazzName){
  let t;
  if(m.name===clazzName){
    t="c "+clazzName;
  }else{
    if(m.visibility==="public") t="+";
    else if(m.visibility==="protected") t="#";
    else t="-";
    t+=" "+m.name;
  }
  t+="(";
  if(m.args){
    for(let i=0;i<m.args.length;i++){
      if(i>0) t+=", ";
      let a=m.args[i];
      t+=variable(a);
    }
  }
  t+=")";
  if(m.type){
    t+=": "+m.type;
  }
  return t;
}

export default{
  props: {
    clazz: Object
  },
  mounted(){
  },
  computed: {
    methods(){
      let methods=[];
      for(let i=0;i<this.clazz.methods.length;i++){
        let m=this.clazz.methods[i];
        if(m.substring){
          methods.push(m);
        }else{
          let t=method(m,this.clazz.name);
          methods.push(t);
        }
      }
      return methods;
    },
    attributes(){
      let attributes=[];
      for(let i=0;i<this.clazz.attributes.length;i++){
        let a=this.clazz.attributes[i];
        if(a.substring){
          attributes.push(a);
        }else{
          let t;
          if(a.visibility==="public") t="+";
          else if(a.visibility==="protected") t="#";
          else t="-";
          t+=" "+variable(a);
          attributes.push(t);
        }
      }
      return attributes;
    }
  }
}
</script>

<style scoped>
  .clazz-wrapper{
    border: 1pt solid black;
    background-color: white;
    color: black;
    font-family: 'Courier New', Courier, monospace;
  }
  .clazz-name{
    border-bottom: 1pt solid black;
    font-weight: bold;
    text-align: center;
  }
  .clazz-attributes{
    border-bottom: 1pt solid black;
    
  }
</style>