<template>
  <span ref="root">
    <pre v-if="!inline" :class="classes" style="max-width: 70vw"><code :class="language"><slot></slot></code></pre>
    <code v-else :class="language"><slot></slot></code>
  </span>
</template>

<script>
import Prism from "prismjs";
//import {ParentNode} from "prismjs";


export default{
  props: {
    lang: {
      type: String,
      default: "java"
    },
    inline: {
      type: Boolean,
      default: false
    },
    noNumbers: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    language(){
      return "language-"+this.lang;
    },
    classes(){
      return this.language+(!this.noNumbers? " line-numbers":"");
    }
  },
  mounted(){
    // let t=this.$slots.default()[0].children;
    // console.log(t);
    
    Prism.highlightAllUnder(this.$refs.root);
  }
}
</script>