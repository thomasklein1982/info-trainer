<template>
  <td @click="handleClick" @keydown.delete="handleDelete()" @keydown.left="handleDirection(-1,0)" @keydown.right="handleDirection(1,0)" @keydown.up="handleDirection(0,-1)" @keydown.down="handleDirection(0,1)" @pointerdown.left="handleMouseDown" >
    <div class="wrapper" :class="(active? 'active' : (selected? 'selected':'')) + ' '+(selectedToCopy? 'selected-to-copy': '') +' '+(isInputCell? 'input-cell': '')">
      <input ref="input" class="starterInput" @keydown.delete="handleDeleteInput" @keyup.enter="hitEnter" :class="edited? 'edited':''" v-model="starterInputValue" @input="startInput" @change="endEditing(true)" @blur="endEditing(false)" :style="{opacity: edited? 1: 0}"/><span class="display-value">{{ displayedValue }}</span>
    </div>
  </td>
</template>

<script>
import { nextTick } from 'vue';

export default{
  components: {
    
  },
  watch: {
    active(nv,ov){
      if(nv && !ov){
        this.$refs.input.focus();
      }
    }
  },
  props: {
    row: Number,
    col: Number,
    cellData: Array,
    selected: Boolean,
    selectedToCopy: Boolean,
    active: Boolean,
    overrideText: {
      type: String,
      default: null
    }
  },
  computed: {
    isInputCell(){
      return this.cell.input;
    },
    cell(){
      return this.cellData[this.row][this.col];
    },
    displayedValue(){
      if(this.active && this.overrideText) return this.overrideText;
      if(this.cell.v!==undefined && this.cell.v!==null){
        let v=this.cell.v;
        if(typeof v==="number"){
          v=v.toPrecision(9)*1;
        }
        let vs=v+"";
        if(/^-?\d+\.\d+$/.test(vs)){
          v=vs.replace(".",",");
        }
        return v;
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
    handleDeleteInput(ev){
      if(this.edited){
        ev.stopPropagation();
      }
    },
    handleDelete(){
      this.cell.f="";
      this.$emit('end-editing',{enter: false, row: this.row,col: this.col});
    },
    handleDirection(dx,dy){
      this.$emit('navigate',{dx,dy});
    },
    startInput(event){
      this.edited=true;
      this.$emit("input-start");
    },
    handleMouseDown(event){
      console.log("mouse down cell", this.selectionMode);
      try{
        event.target.releasePointerCapture(event.pointerId);
      }catch(e){}
      if(event.buttons!==1) return;
      this.$emit('down',this);
    },
    handleMouseEnter(event){
      event.preventDefault();
      console.log("pointer enter",event.target,this.row,this.col)
      try{
        event.target.releasePointerCapture(event.pointerId);
      }catch(e){
        console.log(e);
      }
      if(event.buttons!==1) return;
      this.$emit('enter',{row: this.row,col: this.col});
    },
    hitEnter(ev){
      if(this.edited){
        this.endEditing(true);
      }else{
        this.$emit('hit-enter',{row: this.row,col: this.col});
      }
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
.wrapper.selected{
  border-color: tan;
  background-color: tan;
}
.wrapper.selected-to-copy{
  border-style: dashed;
  border-color: blue;
}
.wrapper.active{
  border-color: red;
}
td{
  -moz-user-select: none;
  user-select: none;
  position: relative;
  padding: 0;
  box-sizing: border-box;
  min-width: 3em;
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
.wrapper{
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  align-content: center;
  border: 2pt solid white;
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
.input-cell{
  background-color: yellow;
}
</style>