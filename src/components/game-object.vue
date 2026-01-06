<template>
  <div style="position: relative" :style="{'grid-row': field.y, 'grid-column': field.x, transform: 'rotate('+angle+'deg)'}">
    <JImage v-if="image" :src="realSrc" style="width:100%; height: 100%;"/>
    <JLabel :align="align" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0;">
      {{ text }}
    </JLabel>
  </div>
</template>

<script>
import JImage from './j-image.vue';
import JLabel from './j-label.vue';
import FlowerJSON from "./exercises/bee/graphics/flower.json";
import BeeJSON from "./exercises/bee/graphics/bee.json";

export default{
  components: {
    JLabel, JImage
  },
  props: {
    image: String,
    text: String,
    rotation: {
      type: Number,
      default: 0
    },
    pos: {
      type: String
    },
    align: {
      type: String,
      default: "top"
    }
  },
  computed: {
    angle(){
      return -this.rotation;
    },
    realSrc(){
      let src=this.image;
      if(src==="bee"){
        return BeeJSON.dataurl;
      }else if(src==="flower"){
        return FlowerJSON.dataurl;
      }else{
        return src;
      }
    },
    field(){
      let f=this.$parent.$parent.$parent.getNamedField(this.pos);
      return f;
    }
  }
}
</script>

<style scoped>

</style>