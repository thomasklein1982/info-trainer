<template>
  <div id="menu">
    <div>{{ modelValue }}</div>
    <div>{{ selection }}</div>
  </div>
  <div id="table">
    <table>
      <tr>
        <th></th><th class="col-caption" v-for="i in colCount">{{ String.fromCodePoint(64+i) }}</th>
      </tr>
      <tr v-for="(r,i) in modelValue">
        <th class="row-caption">{{i+1}}</th>
        <template v-for="(c,j) in r">
          <TableCell 
            :col="j" 
            :row="i" 
            :cell-data="modelValue"
            :selected="isInSelection(i,j)"
            :edited="selection.from!==null && selection.from.row===i && selection.from.col===j"
            @down="mouseDownCell"
            @enter="mouseEntersCell"
            @hit-enter="hitEnterCell"
            @end-editing="updateData"
          />
        </template>
      </tr>
    </table>
  </div>
</template>

<script>
import Menubar from 'primevue/menubar';
import TableCell from './table-cell.vue';

export default{
  components: {
    Menubar, TableCell
  },
  props: {
    modelValue: Array,
  },
  emits: [
    "update:modelValue"
  ],
  watch: {
    modelValue(nv,ov){
      console.log("change",nv);
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    },
    colCount(){
      return this.modelValue[0].length;
    },
    rowCount(){
      return this.modelValue.length;
    },
    realSelection(){
      let from,to;
      if(this.selection.from){
        from={row: Math.min(this.selection.from.row,this.selection.to.row), col: Math.min(this.selection.from.col,this.selection.to.col)};
        to={row: Math.max(this.selection.from.row,this.selection.to.row), col: Math.max(this.selection.from.col,this.selection.to.col)};
      }else{
        from=null;
        to=null;
      }
      return {from, to};
    }
  },
  data(){
    return {
      selectMode: true,
      selection: {
        from: null,
        to: null,
        lastCell: null
      }
    };
  },
  mounted(){
    // this.createCellData();
  },
  methods: {
    isInSelection(row,col){
      let from=this.realSelection.from;
      if(!from) return false;
      let to=this.realSelection.to;
      return from.row<=row && row<=to.row && from.col<=col && col<=to.col;
    },
    updateSelection(pos){
      for(let i=0;i<this.selectedCells.length;i++){
        let p=this.selectedCells[i];

      }
      this.selectedCells=[];
      this.selectedCells.push(pos);
    },
    isNeighbor(pos1,pos2){
      return Math.abs(pos1.row-pos2.row)===1 && pos1.col===pos2.col || Math.abs(pos1.col-pos2.col)===1 && pos1.row===pos2.row;
    },
    mouseEntersCell(pos){
      this.selection.to=pos;
    },
    clearSelection(){
      this.selection.from=null;
      this.selection.to=null;
      this.selection.lastCell=null;
    },
    mouseDownCell(pos){
      if(this.selectMode){
        this.selection.from=pos;
        this.selection.to=pos;
        this.selection.lastCell=pos;
        return;
      }
      console.log(pos);
    },
    hitEnterCell(pos){
      pos.row++;
      if(pos.row>=this.rowCount) pos=null;
      this.selection.from=pos;
      this.selection.to=pos;
      this.selection.lastCell=pos;
    },
    updateData(sourcePos){
      console.log("update data",sourcePos);
      let valid={};
      let queue=[];
      for(let i=0;i<this.rowCount;i++){
        for(let j=0;j<this.colCount;j++){
          queue.push([i,j]);
        }
      }
      while(queue.length>0){
        let p=queue.splice(0,1)[0];
        let v=calcCellValue(valid,this.modelValue,p);
        if(v===null){
          queue.push(p);
        }else{
          valid[getCellName(p[0],p[1])]=true;
        }
      }
    }
  }
}

import { parser } from '../../parsers/formula-parser/formula-parser';
import { CompileFunctions, getParseFunction } from './compile-functions';

export function getCellName(row,col){
  return String.fromCodePoint(65+col)+(row+1);
}

export function getRowAndCol(cellname){
  let c=cellname.codePointAt(0)-65;
  let r=cellname.substring(1)*1-1;
  return { row: r, col: c};
}

function calcCellValue(valid,cellData,posArray){
  let c=posArray[1]
  let r=posArray[0];
  let data=cellData[r][c];
  if(!data) return true;
  if(data.f===null || data.f===undefined) return true;
  if(typeof data.f === "number"){
    data.v=data.f;
    return true;
  }
  let f=data.f;
  if(!f.trim){
    data.v=f;
    return true;
  }
  f=f.trim();
  if(!f.startsWith("=")){
    data.v=f;
    return true;
  }
  let tree=parser.parse(f);
  console.log(tree.toString());
  let node=tree.topNode.firstChild;
  console.log(node);
  let pf=getParseFunction(node);
  let v=pf(node,f,cellData,valid);
  data.v=v;
  return true;
}
</script>


<style scoped>
  table{
    border-collapse: collapse;
  }
  td{
    border: 0.5pt solid gray;
    background-color: white;
    color: black;
    height: 2em;
  }
  th{
    border: 0.5pt solid gray;
    color: black;
    height: 2em;
    background-color: lightgray;
    -moz-user-select: none;
    user-select: none;
    min-width: 2em;
  }
  .col-caption{
    text-align: center;
  }
  .row-caption{
    text-align: right;
    width: 2em;
  }
</style>