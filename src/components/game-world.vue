<template>
  <AppPreview :width="width" height="auto" style="position: relative; z-index: 1;">
    <template v-if="gameworld">
      <JFrame :layout="gameworld.width+''" class="world" style="background-color: lightgreen; container-type: inline-size;">
        <template v-for="(row,i) in gameworld.fields">
          <template v-for="(f,i) in row">
            <template v-if="f.isImage">
              <JImage style="outline: 1pt dotted darkgreen; aspect-ratio: 1;" :style="{'grid-row': f.y, 'grid-column': f.x}" :src="f.dataurl"/>
            </template>
            <template v-else>
              <JLabel style="outline: 1pt dotted darkgreen; aspect-ratio: 1; font-size: 5cqw;" :style="labelStyle(f)">{{ f.text }}</JLabel>
            </template>
          </template>
        </template>
        <template v-for="(g,i) in gameworld.objects">
          <GameObject
            :game-object="g"
            :game-world="gameworld"
          />
        </template>
      </JFrame>
    </template>
  </AppPreview>
</template>

<script>
  import AppPreview from './app-preview.vue';
import JFrame from './j-frame.vue';
import JImage from './j-image.vue';
import JLabel from './j-label.vue';
import GameObject from './game-object.vue';
import { GameWorld } from './exercises/bee-python/GameWorld';

export default{
  components: {
    AppPreview, JFrame, JLabel, JImage, GameObject
  },
  props: {
    beep: Object,
    width: String
  },
  data(){
    return {
      gameworld: new GameWorld(this.beep.worlds[0],5,3,this.beep.setupFunc, this.beep.resetFunc)
    };
  },
  mounted(){
    
  },
  computed: {
    widthUnit(){
      return 100/this.gameworld.width;
    },
    heightUnit(){
      return 100/this.gameworld.height;
    }
  },
  methods: {
    labelStyle(field){
      let style={
        "grid-row": field.y,
        "grid-column": field.x
      };
      for(let s in field.style){
        style[s]=field.style[s];
      }
      return style;
    },
    calcX(x){
      let unit=100/this.gameworld.width;
      return (x-1)*unit+"%";
    },
    calcY(y){
      let unit=100/this.gameworld.height;
      return (y-1)*unit+"%";
    },
    getNamedField(name){
      return this.gameworld.namedFields[name];
    }
  }
}
</script>

<style scoped>

</style>