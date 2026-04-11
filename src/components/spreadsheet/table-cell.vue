<template>
  <td @mousedown.left="handleMouseDown" @mouseenter="handleMouseEnter" :class="edited? 'edited' : (selected? 'selected':'')"><input ref="input" @blur="endEditing()" @keydown.enter="hitEnter()" v-if="edited" v-model="cell.f"/><span v-else>{{ displayedValue }}</span></td>
</template>

<script>
import { nextTick } from 'vue';

export default{
  components: {
    
  },
  watch: {
    edited(nv,ov){
      if(!nv){
        
        return;
      }
      setTimeout(()=>{
        this.$refs.input.focus();
      },100);
    }
  },
  props: {
    row: Number,
    col: Number,
    cellData: Array,
    selected: Boolean,
    edited: Boolean
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
      
    };
  },
  methods: {
    handleMouseDown(event){
      if(event.buttons!==1) return;
      this.$emit('down',{row: this.row,col: this.col});
    },
    handleMouseEnter(event){
      if(event.buttons!==1) return;
      this.$emit('enter',{row: this.row,col: this.col});
    },
    hitEnter(){
      this.$emit('hit-enter',{row: this.row,col: this.col});
    },
    endEditing(){
      this.$emit('end-editing',{row: this.row,col: this.col});
    }

  }
}
</script>

<style scoped>
.edited{
  border: 1pt solid red;
}
.selected{
  border: 1pt solid red;
  background-color: tan;
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
</style>