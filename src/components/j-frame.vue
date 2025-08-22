<template>
  <div class="jframe" :style="style"><slot></slot></div>
</template>

<script>

export function layoutToStyle(layout){
  let style={};
  if(!layout){
    return style;
  }
  style.display="grid";
  
  if(isNaN(layout*1)){
    style.gridTemplate=layout;
  }else{
    let cols=layout*1;
    style.gridTemplateColumns=`repeat(${cols},minmax(0, 1fr))`;
  }
  return style;
}

export default{
  components: {

  },
  props: {
    layout: String
  },
  computed: {
    style(){
      return layoutToStyle(this.layout);
    }
  }
}
</script>

<style scoped>
.jframe{
  background-color: white;
  color: black;
  width: 100%;
  height: 100%;
  border-radius: 0;
  padding: 0;
  border: 2pt solid gray;
  align-items: stretch;
  justify-items: stretch;
  overflow: auto;
}
</style>