<template>
  <td @click="handleClick" @pointerdown.left="handleMouseDown" @pointerenter="handleMouseEnter" :class="active? 'active' : (selected? 'selected':'')">
    <input v-show="!selectionMode" class="starterInput" :class="edited? 'edited':''" v-model="starterInputValue" @input="startInput" @keyup.enter="hitEnter" @change="endEditing(true)" @blur="endEditing(false)" :style="{opacity: edited? 1: 0}"/><span>{{ displayedValue }}</span>
    </td>
</template>

<script>
import { nextTick } from 'vue';

export default{
  components: {
    
  },
  // watch: {
  //   edited(nv,ov){
  //     if(!nv){
        
  //       return;
  //     }
  //     setTimeout(()=>{
  //       this.$refs.input.focus();
  //     },100);
  //   }
  // },
  props: {
    row: Number,
    col: Number,
    cellData: Array,
    selected: Boolean,
    active: Boolean,
    selectionMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cell(){
      return this.cellData[this.row][this.col];
    },
    displayedValue(){
      if(this.cell.v){
        return this.cell.v;
      }
      return "";
    }
  },
  data(){
    return {
      edited: false,
      starterInputValue: ""
    };
  },
  methods: {
    startInput(event){
      this.edited=true;
    },
    handleClick(){
      console.log("click cell",this.selectionMode)
      if(this.selectionMode){
        this.$emit('click-cell',{row: this.row,col: this.col});
      }
    },
    handleMouseDown(event){
      console.log("mouse down cell", this.selectionMode);
      if(this.selectionMode) return;
      if(event.buttons!==1) return;
      this.$emit('down',{row: this.row,col: this.col});
    },
    handleMouseEnter(event){
      console.log("pointer enter");
      if(this.selectionMode) return;
      if(event.buttons!==1) return;
      this.$emit('enter',{row: this.row,col: this.col});
    },
    hitEnter(ev){
      ev.preventDefault();
      if(this.edited) return;
      this.edited=false;
      this.$emit('hit-enter',{row: this.row,col: this.col});
    },
    endEditing(withEnter){
      if(!this.edited){
        if(withEnter) this.$emit('hit-enter',{row: this.row,col: this.col});
        return;
      }
      this.cell.f=this.starterInputValue;
      this.starterInputValue="";
      this.edited=false;
      this.$emit('end-editing',{enter: withEnter, row: this.row,col: this.col});
    }

  }
}
</script>

<style scoped>
.selected{
  border: 0.5pt solid red;
  background-color: tan;
}
.active{
  border: 2pt solid red;
}
td{
  -moz-user-select: none;
  user-select: none;
  position: relative;
  padding: 0;
}
input{
  outline: none;
  width: 100%;
  height: 100%;
  min-width: 0;
  background-color: transparent;
  display: inline-block;
  color: black;
  font-size: inherit;
  padding: 0;
  field-sizing: content;
}
.starterInput{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: lightblue;
  cursor: default;
}
.starterInput.edited{
  cursor: text;
}
</style>