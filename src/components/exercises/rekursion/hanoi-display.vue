<template>
  <div style="position: relative; background-color: white">
    <div v-for="(t,i) in tuerme" :style="{left: (i*100/3)+'%'}" style="display: grid; position: absolute; width: 33.333%; height: 95%; bottom: 5%;">
      <div class="stange" />
      <div v-for="(s,j) in t" class="scheibe" :style="{width: ((getWidth(s)+2)*widthFactor)+'%', height: heightFactor+'%', left: (50-(getWidth(s)+2)*widthFactor/2)+'%', bottom: ((j)*heightFactor)+'%', backgroundColor: s.color? s.color: 'red'}"/>
      <div class="positionLabel" v-if="showPositions">{{ i }}</div>
    </div>
    <span style="position: absolute; left: -1rem; top: 0.1rem; font-weight: bold; text-align: right">{{ label }}</span>
  </div>
</template>

<script>



export default{
  components: {
    
  },
  props: {
    tuerme: Array,
    widthFactor: Number,
    heightFactor: Number,
    showPositions: {
      type: Boolean,
      default: false
    },
    label: String
  },
  data() {
    return {};
  },
  methods: {
    getWidth(s){
      if(s.width) return s.width;
      else return s;
    }
  }
}
</script>

<style scoped>
  .stange{
    position: absolute;
    bottom: 0;
    width: 6%;
    left: 47%;
    height: 80%;
    background-color: black;
  }
  .scheibe{
    position: absolute;
    background-color: red;
    border: 2pt solid black;
  }
  .positionLabel{
    align-self: start; 
    color: black;
    background-color: white;
    justify-self: center;
    border: 1pt solid black;
    border-radius: 0.1rem;
    padding: 0.1rem;
  }
</style>