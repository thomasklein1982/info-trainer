<template>
  <div :style="style">
    <JImage v-if="gameObject && gameObject.image || image" :src="realSrc" style="width:100%; height: 100%;"/>
    <JLabel class="game-object-text" :align="align" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; ">
      {{ realText }}{{ gameObject?.x }}{{gameObject?.y}}
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
  watch: {
    "gameObject.x": function(){
      console.log("test");
    },
    gameObject: {
      handler(){
        console.log("test");
      },
      deep: true
    }
  },
  mounted(){
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
    },
    gameObject: Object,
    gameWorld: Object
  },
  data(){
    return {
      
    }
  },
  computed: {
    realText(){
      return this.gameObject? this.gameObject.name: this.text;
    },
    realX(){
      return (this.gameObject.x-1)*this.widthUnit;
    },
    realY(){
      return (this.gameObject.y-1)*this.heightUnit;
    },
    widthUnit(){
      return 100/this.gameWorld.width;
    },
    heightUnit(){
      return 100/this.gameWorld.height;
    },
    style(){
      let style={
        transform: 'rotate('+this.angle+'deg)'
      }
      if(this.gameObject){
        let unit=100/this.gameWorld.width;
        style.position="absolute";
        // style.left=this.realX+"%";
        // style.bottom=this.realY+"%";
        style.transition="all 0.3s";
        style.left=this.realX+"%";
        style.bottom=this.realY+"%";
        style.width=this.widthUnit+"%";
        style.height=this.heightUnit+"%";
        //:style="{left: calcX(g.x), bottom: calcY(g.y), width: widthUnit+'%', height: heightUnit+'%'}"
      }else{
        style.position="relative";
        style["grid-row"]=this.field.y;
        style["grid-column"]=this.field.x;
      }
      return style;
    },
    angle(){
      if(this.gameObject) return this.gameObject.rotation;
      else return -this.rotation;
    },
    realSrc(){
      let image;
      if(this.gameObject) image=this.gameObject.image; else image=this.image;
      let src=image;
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
.game-object-text{
  color: black;
  text-shadow: 
    -1px -1px 0 white,  /* Oben links */
     1px -1px 0 white,  /* Oben rechts */
    -1px  1px 0 white,  /* Unten links */
     1px  1px 0 white;  /* Unten rechts */
}
</style>