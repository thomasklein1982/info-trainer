<template>
  <div id="menu">
    <div id="current-cell-bar"><input @change="updateSelectedCellToCurrentCellAdress()" id="current-cell-address" v-model="currentCellAdress"/> = <input ref="currentCellFormula" id="current-cell-formula" v-model="currentCellFormula" @keyup.enter="handleEnterCurrentCellFormula" @focus="handleFocusCurrentCellFormula" @blur="handleBlurCurrentCellFormula"/></div>
  </div>
  <div id="table" @pointermove="handleMouseMove">
    <table>
      <tr>
        <th class="col-caption"></th><th class="col-caption" v-for="i in colCount">{{ String.fromCodePoint(64+i) }}</th>
      </tr>
      <tr v-for="(r,i) in modelValue">
        <th class="row-caption">{{i+1}}</th>
        <template v-for="(c,j) in r">
          <TableCell 
            ref="cell"
            :col="j" 
            :row="i"
            :cell-data="modelValue"
            :override-text="editMode===1? currentCellFormula+'': null"
            :selected="isInSelection(i,j)"
            :active="selection.from!==null && selection.from.row===i && selection.from.col===j"
            @down="mouseDownCell"
            @enter="mouseEntersCell"
            @hit-enter="hitEnterCell"
            @end-editing="handleEndEditing"
            @navigate="handleNavigate"
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
    currentCellAdress(nv,ov){
      console.log("change current cell adress");
      this.currentCellFormula=this.currentCell.f;
      //this.$refs.cell[0].$el.focus();
    },
    currentCellFormula(nv,ov){

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
    },
    currentCell(){
      let s=this.realSelection;
      if(s.from===null) return null;
      return this.getCell(s.from.row,s.from.col);
    }
  },
  data(){
    return {
      selection: {
        from: {row: 0, col: 0},
        to: {row: 0, col: 0}
      },
      currentCellAdress: null,
      currentCellFormula: "",
      editMode: 0 /**0: nichts wird editiert, 1: currentCellValue wird editiert, 2: ausgewählte Zelle wird editiert */
    };
  },
  mounted(){
    // this.createCellData();
    this.updateAllCells();
    this.updateData();
    this.currentCellAdress="A1";
  },
  methods: {
    handleMouseMove(event){
      if(event.buttons!==1) return;
      let x=event.clientX;
      let y=event.clientY;
      for(let i=0;i<this.$refs.cell.length;i++){
        let c=this.$refs.cell[i];
        let br=c.$el.getBoundingClientRect();
        if(x>=br.x && x<br.x+br.width && y>=br.y && y<br.y+br.height){
          this.mouseEntersCell(c);
          break;
        }
      }
      //this.$emit('enter',{row: this.row,col: this.col});
    },
    handleNavigate(dir){
      let pos=this.selection.from;
      pos.row+=dir.dy;
      pos.col+=dir.dx;
      if(pos.col<0) pos.col=0;
      if(pos.row<0) pos.row=0;
      if(pos.col>=this.colCount) pos.col--;
      if(pos.row>=this.rowCount) pos.row--;
      this.selection.to=pos;
      this.updateCurrentCellAdressFromSelection();
    },
    handleFocusCurrentCellFormula(){
      console.log("focus");
      this.editMode=1;
    },
    handleEnterCurrentCellFormula(){
      console.log("enter");
      this.$refs.currentCellFormula.blur();
      // this.editMode=0;
      // this.changeFormulaOfCurrentCell();
    },
    handleBlurCurrentCellFormula(){
      console.log("blur");
      this.editMode=0;
      this.changeFormulaOfCurrentCell();
    },
    getCell(row,col){
      return this.modelValue[row][col];
    },
    changeFormulaOfCurrentCell(){
      this.currentCell.f=this.currentCellFormula;
      this.updateCell(this.currentCell);
      try{
        this.updateData();
      }catch(e){
        if(e.zirkelbezug){
          alert(e.message);
        }
      }
      //this.$refs.currentCellFormula.blur();
    },
    isInSelection(row,col){
      let from=this.realSelection.from;
      if(!from) return false;
      let to=this.realSelection.to;
      return from.row<=row && row<=to.row && from.col<=col && col<=to.col;
    },
    isNeighbor(pos1,pos2){
      return Math.abs(pos1.row-pos2.row)===1 && pos1.col===pos2.col || Math.abs(pos1.col-pos2.col)===1 && pos1.row===pos2.row;
    },
    clickCell(pos){
      console.log("click cell",pos);
      this.currentCellFormula+=getCellName(pos.row,pos.col);
      setTimeout(()=>{
        this.$refs.currentCellFormula.focus();
      },40);
      return;
    },
    mouseEntersCell(pos){
      this.selection.to=pos;
    },
    clearSelection(){
      this.selection.from=null;
      this.selection.to=null;
    },
    mouseDownCell(pos){
      console.log("mouse down",pos);
      this.selection.from=pos;
      this.selection.to=pos;
      this.updateCurrentCellAdressFromSelection();
      return;
    },
    updateCurrentCellAdressFromSelection(){
      let name=getCellName(this.selection.from.row,this.selection.from.col);
      this.currentCellAdress=name;
      this.currentCellFormula=this.currentCell.f;
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
    hitEnterCell(pos){
      console.log("hit enter",pos);
      if(pos.row<this.rowCount-1) pos.row++;
      this.selection.from=pos;
      this.selection.to=pos;
      this.updateCurrentCellAdressFromSelection();
    },
    handleEndEditing(sourcePos){
      console.log("end editing",sourcePos)
      this.updateCell(sourcePos.row,sourcePos.col);
      try{
        this.updateData(sourcePos);
      }catch(e){
        if(e.zirkelbezug){
          alert(e.message);
        }
      }
      if(sourcePos.enter) this.hitEnterCell(sourcePos);
    },
    updateAllCells(){
      for(let i=0;i<this.rowCount;i++){
        for(let j=0;j<this.colCount;j++){
          this.updateCell(i,j);
        }
      }
    },
    /**parst die Formel der Zelle (null, wenn es kein =-Zeichen gibt) 
     * @param {Number|Object} row darf auch direkt die Zelldaten sein
     * @param {Number|undefined} column 
    */
    updateCell(row,column){
      let data;
      if(row.f){
        data=row;
      }else{
        data=this.modelValue[row][column];
      }
      data.parsedFormula=null;
      if(data.f===null || data.f===undefined){
        data.v="";
        return;
      };
      if(typeof data.f === "number"){
        data.v=data.f;
        return;
      }
      let f=data.f;
      if(!f.trim){
        data.v=f;
        return;
      }
      f=f.trim();
      data.f=f;
      if(!f.startsWith("=")){
        if(f*1+""===f) f*=1;
        data.v=f;
        return;
      }
      f=f.toUpperCase();
      data.f=f;
      try{
        let tree=parser.parse(f);
        data.parsedFormula=tree.topNode.firstChild;
      }catch(e){

      }
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
      let count=queue.length;
      while(queue.length>0){
        let cell=queue.splice(0,1)[0];
        if(!calcCellValue(valid,this.modelValue,cell)){
          queue.push(cell);
          count--;
        }else{
          valid[cell.name]=true;
        }
        if(count<0){
          let t="Die Zellen ";
          for(let i=0;i<queue.length;i++){
            let c=queue[i];
            this.modelValue[c.row][c.col].v="#ZIRKEL!";
            if(i>0){
              if(i<queue.length-1) t+=", ";
              else t+=" und ";
            }
            t+=c.name;
          }
          t+=" haben einen Zirkelbezug.\nD.h. die Formeln beziehen sich so aufeinander, dass die Ergebnisse wechselseitig voneinander abhängen.";
          throw {
            zirkelbezug: true,
            message: t
          }
        }
      }
    }
  }
}

import { parser } from '../../parsers/formula-parser/formula-parser';
import { CompileFunctions, getParseFunction } from './compile-functions';
import { nextTick } from 'vue';

export function getCellName(row,col){
  return String.fromCodePoint(65+col)+(row+1);
}

export function getRowAndCol(cellname){
  let c=cellname.toUpperCase().codePointAt(0)-65;
  let r=cellname.substring(1)*1-1;
  return { row: r, col: c};
}

function calcCellValue(valid,cellData,cell){
  let c=cell.col;
  let r=cell.row;
  let data=cellData[r][c];
  if(!data) return true;
  if(data.parsedFormula){
    let pf=getParseFunction(data.parsedFormula);
    try{
      let v=pf(data.parsedFormula,data.f,cellData,valid);
      data.v=v;
      return v!==null;
    }catch(e){
      data.v=e;
      data.error=e;
      return true;
    }
  }
  return true;
}
</script>


<style scoped>
  #table{
    touch-action: none;  
  }
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
  #current-cell-bar{
    display: flex;
    width: 100%;
    height: 2em;
    align-items: baseline;
  }
  #current-cell-bar>input{
    height: 100%;
  }
  #current-cell-address{
    width: 3em;
  }
  #current-cell-formula{
    flex: 1;
  }
</style>