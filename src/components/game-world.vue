<template>
  <AppPreview :width="width" height="auto" style="position: relative; z-index: 1;">
    <template v-if="gameworld">
      <JFrame :layout="gameworld.width+''" class="world" style="background-color: lightgreen; container-type: inline-size; border: none;">
        <template v-for="(row,i) in gameworld.fields">
          <template v-for="(f,j) in row">
            <template v-if="f.isImage">
              <JImage style="outline: 1pt dotted darkgreen; aspect-ratio: 1;" :style="{'grid-row': f.row, 'grid-column': f.x}" :src="f.dataurl"/>
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
        <template v-if="reverse">
          <template v-for="(row,i) in gameworld.fields" >
            <div v-for="(f,j) in row" style="aspect-ratio: 1;position: relative;" :style="{'grid-row': f.y, 'grid-column': f.x}">
              <input v-model="values[f.x+','+f.y]" class="input-text" />
            </div>
          </template>
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
      gameworld: new GameWorld(this.beep.world,5,3,this.beep.setupFunc, this.beep.resetFunc, this.beep.testdata),
      values: {}
    };
  },
  mounted(){
    
  },
  computed: {
    reverse(){
      return this.beep.reverse===true;
    },
    language(){
      return this.beep.language? this.beep.language: "python";
    },
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
        "grid-row": field.row,
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
.input-text{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: none;
  text-align: center;
  border: none;
  color: black;
  text-shadow: 
    -1px -1px 0 white,  /* Oben links */
     1px -1px 0 white,  /* Oben rechts */
    -1px  1px 0 white,  /* Unten links */
     1px  1px 0 white;  /* Unten rechts */
}
</style>