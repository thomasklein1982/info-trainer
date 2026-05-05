<template>
  <div id="menu">
    <ButtonGroup>
      <Button style="color: black" text icon="pi pi-copy" @click="copySelection()"/>
      <Button style="color: black" text icon="pi pi-clipboard" :disabled="selectionCopy.from===null" @click="paste()"/>
    </ButtonGroup>
    <div id="current-cell-bar"><input @change="updateSelectedCellToCurrentCellAdress()" id="current-cell-address" v-model="currentCellAdress"/> <span style="margin-left: 0.3rem; margin-right: 0.3rem">=</span> <input ref="currentCellFormula" id="current-cell-formula" v-model="currentCellFormula" @keyup.enter="handleEnterCurrentCellFormula" @focus="handleFocusCurrentCellFormula" @blur="handleBlurCurrentCellFormula"/></div>
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
            :selected-to-copy="isInSelectionCopy(i,j)"
            :active="selection.from!==null && selection.from.row===i && selection.from.col===j"
            @down="mouseDownCell"
            @enter="mouseEntersCell"
            @hit-enter="hitEnterCell"
            @end-editing="handleEndEditing"
            @navigate="handleNavigate"
            @input-start="cancelCopySelection"
          />
        </template>
      </tr>
    </table>
  </div>
</template>

<script>
import Menubar from 'primevue/menubar';
import ButtonGroup from 'primevue/buttongroup';
import TableCell from './table-cell.vue';

export default{
  components: {
    Menubar, TableCell, ButtonGroup
  },
  props: {
    modelValue: Array,
  },
  emits: [
    "update:modelValue"
  ],
  watch: {
    currentCellAdress(nv,ov){
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
      selectionCopy: {
        from: null,
        to: null
      },
      currentCellAdress: null,
      currentCellFormula: "",
      editMode: 0 /**0: nichts wird editiert, 1: currentCellValue wird editiert, 2: ausgewählte Zelle wird editiert */,
      currentPointerCell: null
    };
  },
  mounted(){
    // this.createCellData();
    for(let i=0;i<this.rowCount;i++){
      for(let j=0;j<this.colCount;j++){
        this.modelValue[i][j].row=i;
        this.modelValue[i][j].col=j;
      }
    }
    this.updateAllCells();
    this.updateData();
    this.currentCellAdress="A1";
  },
  methods: {
    cancelCopySelection(){
      this.selectionCopy.from=null;
      this.selectionCopy.to=null;
    },
    copySelection(){
      this.selectionCopy.from={
        row: this.realSelection.from.row,
        col: this.realSelection.from.col
      };
      this.selectionCopy.to={
        row: this.realSelection.to.row,
        col: this.realSelection.to.col
      };
    },
    paste(){
      let offset={
        row: this.realSelection.from.row-this.selectionCopy.from.row,
        col: this.realSelection.from.col-this.selectionCopy.from.col
      };
      for(let i=this.selectionCopy.from.row;i<=this.selectionCopy.to.row;i++){
        for(let j=this.selectionCopy.from.col;j<=this.selectionCopy.to.col;j++){
          let dest=this.modelValue[i+offset.row][j+offset.col];
          if(dest){
            let src=this.modelValue[i][j];
            dest.f=src.f;
            dest.bezuege=src.bezuege;
            adaptBezuege(dest,offset.row,offset.col);
            this.updateCell(dest);
          }
        }
      }
      this.selection.from.row=this.selectionCopy.from.row+offset.row;
      this.selection.from.col=this.selectionCopy.from.col+offset.col;
      this.selection.to={
        row: this.selectionCopy.to.row+offset.row,
        col: this.selectionCopy.to.col+offset.col
      };
      this.cancelCopySelection();
      this.updateData();
    },
    handleMouseMove(event){
      if(event.buttons!==1) return;
      //get the mouse-over-cell
      let x=event.clientX;
      let y=event.clientY;
      if(this.currentPointerCell){
        let br=this.currentPointerCell.$el.getBoundingClientRect();
        if(x>=br.x && x<br.x+br.width){
          //gleiche spalte
          let col=this.currentPointerCell.col;
          if(y>=br.y && y<br.y+br.height){
            //gleiche zeile
            return;
          }
          for(let i=0;i<this.rowCount;i++){
            let c=this.$refs.cell[i*this.colCount+col];
            let br=c.$el.getBoundingClientRect();
            if(y>=br.y && y<br.y+br.height){
              this.currentPointerCell=c;
              this.mouseEntersCell(c);
              return;
            }
          }
        }else if(y>=br.y && y<br.y+br.height){
          //gleiche Zeile
          let row=this.currentPointerCell.row;
          for(let i=0;i<this.colCount;i++){
            let c=this.$refs.cell[row*this.colCount+i];
            let br=c.$el.getBoundingClientRect();
            if(x>=br.x && x<br.x+br.width){
              this.currentPointerCell=c;
              this.mouseEntersCell(c);
              return;
            }
          }
        }
      }
      //full search
      for(let i=0;i<this.$refs.cell.length;i++){
        let c=this.$refs.cell[i];
        let br=c.$el.getBoundingClientRect();
        if(x>=br.x && x<br.x+br.width && y>=br.y && y<br.y+br.height){
          this.currentPointerCell=c;
          this.mouseEntersCell(c);
          return;
        }
      }
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
      this.editMode=1;
      this.cancelCopySelection();
    },
    handleEnterCurrentCellFormula(){
      this.$refs.currentCellFormula.blur();
      // this.editMode=0;
      // this.changeFormulaOfCurrentCell();
    },
    handleBlurCurrentCellFormula(){
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
    isInSelectionCopy(row,col){
      let from=this.selectionCopy.from;
      if(!from) return false;
      let to=this.selectionCopy.to;
      return from.row<=row && row<=to.row && from.col<=col && col<=to.col;
    },
    isNeighbor(pos1,pos2){
      return Math.abs(pos1.row-pos2.row)===1 && pos1.col===pos2.col || Math.abs(pos1.col-pos2.col)===1 && pos1.row===pos2.row;
    },
    clickCell(pos){
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
      this.currentPointerCell=pos;
      this.selection.from={row: pos.row, col: pos.col};
      this.selection.to=this.selection.from;
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
      if(pos.row<this.rowCount-1) pos.row++;
      this.selection.from=pos;
      this.selection.to=pos;
      this.updateCurrentCellAdressFromSelection();
    },
    handleEndEditing(sourcePos){
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
      if(row.f!==undefined){
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
      if(f==="="){
        data.v=f;
        return;
      }
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
  delete data.error;
  data.bezuege=[];
  if(data.parsedFormula){
    let pf=getParseFunction(data.parsedFormula);
    let bezuege=[];
    try{
      let v=pf(data.parsedFormula,data.f,cellData,valid,bezuege);
      data.v=v;
      data.bezuege=bezuege;
      return v!==null;
    }catch(e){
      data.v=e;
      data.error=e;
      return true;
    }
  }
  return true;
}

/**
 * Passt in der Zelle alle relativen Bezuege an
 * @param cell 
 * @param dRow 
 * @param dCol 
 */
function adaptBezuege(cell,dRow,dCol){
  if(!cell.bezuege || cell.bezuege.length===0 || dRow===0 && dCol===0) return;
  let f=cell.f;
  let parts=[];
  let offset=0;
  for(let i=0;i<cell.bezuege.length;i++){
    let b=cell.bezuege[i];
    let pos=b.pos-offset;
    parts.push(f.substring(0,pos));
    let n=getRowAndCol(b.name);
    n.row+=dRow;
    n.col+=dCol;
    let neu=getCellName(n.row,n.col);
    parts.push(neu);
    f=f.substring(pos+b.name.length);
    offset+=pos+b.name.length;
  }
  parts.push(f);
  cell.f=parts.join("");
}
</script>


<style scoped>
  #table{
    touch-action: none;
    overflow: auto;
    background-color: lightgray;
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