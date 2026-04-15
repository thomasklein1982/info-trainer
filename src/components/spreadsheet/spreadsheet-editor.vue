<template>
  <div id="menu">
    <div>{{ modelValue }}</div>
    <div>{{ selection }}</div>
    <div><input @change="updateSelectedCellToCurrentCellAdress()" id="current-cell-address" v-model="currentCellAdress"/></div>
  </div>
  <div id="table">
    <table>
      <tr>
        <th class="col-caption"></th><th class="col-caption" v-for="i in colCount">{{ String.fromCodePoint(64+i) }}</th>
      </tr>
      <tr v-for="(r,i) in modelValue">
        <th class="row-caption">{{i+1}}</th>
        <template v-for="(c,j) in r">
          <TableCell 
            :col="j" 
            :row="i" 
            :cell-data="modelValue"
            :selected="isInSelection(i,j)"
            :active="selection.from!==null && selection.from.row===i && selection.from.col===j"
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
        from: {row: 0, col: 0},
        to: {row: 0, col: 0}
      },
      currentCellAdress: "A1"
    };
  },
  mounted(){
    // this.createCellData();
    this.updateData();
  },
  methods: {
    isInSelection(row,col){
      let from=this.realSelection.from;
      if(!from) return false;
      let to=this.realSelection.to;
      return from.row<=row && row<=to.row && from.col<=col && col<=to.col;
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
    },
    mouseDownCell(pos){
      if(this.selectMode){
        this.selection.from=pos;
        this.selection.to=pos;
        this.updateCurrentCellAdressFromSelection();
        return;
      }
      console.log(pos);
    },
    hitEnterCell(pos){
      pos.row++;
      if(pos.row>=this.rowCount) pos=null;
      this.selection.from=pos;
      this.selection.to=pos;
      this.updateCurrentCellAdressFromSelection();
    },
    updateCurrentCellAdressFromSelection(){
      let name=getCellName(this.selection.from.row,this.selection.from.col);
      this.currentCellAdress=name;
    },
    updateSelectedCellToCurrentCellAdress(){
      let pos=getRowAndCol(this.currentCellAdress);
      if(Number.isNaN(pos.row) || Number.isNaN(pos.col) || pos.row<0 || pos.col<0){
        let name=getCellName(this.selection.from.row,this.selection.from.col);
        this.currentCellAdress=name;
        return;
      }
      this.selection.from=pos;
      this.selection.to=pos;
    },
    updateData(sourcePos){
      console.log("update data",sourcePos);
      let valid={};
      let queue=[];
      for(let i=0;i<this.rowCount;i++){
        for(let j=0;j<this.colCount;j++){
          let cell={
            row: i, col: j, name: getCellName(i,j)
          };
          queue.push(cell);
        }
      }
      while(queue.length>0){
        let cell=queue.splice(0,1)[0];
        if(!calcCellValue(valid,this.modelValue,cell)){
          queue.push(cell);
        }else{
          valid[cell.name]=true;
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

function calcCellValue(valid,cellData,cell){
  let c=cell.col;
  let r=cell.row;
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
  return v!==null;
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
  #menu{
    background-color: lightgray;
    color: black;
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
  th.col-caption{
    border-top: none;
  }
  .col-caption{
    text-align: center;
  }
  .row-caption{
    text-align: right;
    width: 2em;
  }
  #current-cell-address{
    width: 3em;
    height: 2em;
  }
</style>