<template>
  <AppPreview :width="width" height="auto" style="position: relative; z-index: 1;">
    <JFrame :layout="infos.w+''" class="world">
      <template v-for="(f,i) in infos.fields">
        <template v-if="f.isImage">
          <JImage style="aspect-ratio: 1;" :style="{'grid-row': f.y, 'grid-column': f.x}" :src="f.dataurl"/>
        </template>
        <template v-else>
          <JLabel style="aspect-ratio: 1;" :style="{'grid-row': f.y, 'grid-column': f.x}"/>
        </template>
      </template>
      <slot></slot>
      <template v-if="writable">
        <div v-for="(f,i) in infos.fields" style="aspect-ratio: 1;position: relative;" :style="{'grid-row': f.y, 'grid-column': f.x}">
          <input v-model="values[f.x+','+f.y]" class="input-text" />
        </div>
      </template>
    </JFrame>
  </AppPreview>
</template>

<script>
import AppPreview from './app-preview.vue';
import JFrame from './j-frame.vue';
import JImage from './j-image.vue';
import JLabel from './j-label.vue';
import TreeJSON from './exercises/bee/graphics/tree.json';

export default{
  components: {
    AppPreview, JFrame, JLabel, JImage
  },
  props: {
    width: {
      type: String,
      default: "8rem"
    },
    world: {
      type: Array
    },
    writable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    infos(){
      let data={
        w: this.world[0].length,
        h: this.world.length,
        fields: [],
        namedFields: {}
      };
      let fields=data.fields;
      for(let i=0;i<this.world.length;i++){
        let line=this.world[i];
        for(let j=0;j<line.length;j++){
          let d=line.charAt(j);
          let f={
            isImage: false,
            dataurl: null,
            name: undefined,
            x: j+1,
            y: i+1
          };
          if(d==="W"){
            f.isImage=true;
            f.dataurl=TreeJSON.dataurl
          }else if(d==="."){

          }else{
            f.name=d;
            data.namedFields[d]=f;
          }
          fields.push(f);
        }
      }
      return data;
    }
  },
  data(){
    return {
      values: {}
    }
  },
  methods: {
    getNamedField(name){
      return this.infos.namedFields[name];
    },
    getField(x,y){
      for(let i=0;i<this.infos.fields.length;i++){
        let f=this.infos.fields[i];
        if(f.x===x && f.y===y) return f;
      }
      return null;
    }
  }
}
</script>

<style scoped>
.wrapper{
  overflow: hidden;

}
.world{
  background-color: lightgreen;
  container-type: inline-size;
}
.world>*{
  border: 1pt dotted darkgreen;
}
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