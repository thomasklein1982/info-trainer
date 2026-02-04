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
  methods: {
    getNamedField(name){
      return this.infos.namedFields[name];
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
</style>