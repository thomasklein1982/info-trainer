<template>
  <template v-if="checked">
    <RelationTable v-if="relation" :relation="relation"/>
    <Message v-if="correct" severity="success">Korrekte Antwort.</Message>
    <Message v-else severity="error">Das ist falsch. Die korrekte Lösung ist
      <RelationTable v-if="task.result" :relation="task.result.relation"/>
    </Message>
  </template>
  <table v-else style="overflow-x: auto; text-align: center">
    <tr>
      <td v-for="(c,i) in captions"><Button v-if="edit" rounded @click="removeColumn(i)" text size="small" icon="pi pi-trash"/><Button v-if="edit" text size="small" icon="pi pi-caret-left" @click="moveColumn(i,true)" :disabled="i===0"/><Button v-if="edit" :disabled="i===captions.length-1" text size="small" icon="pi pi-caret-right" @click="moveColumn(i,false)"/></td>
      <td><ToggleButton v-model="edit" rounded on-label=" " off-label=" " text size="small" on-icon="pi pi-pencil" off-icon="pi pi-pencil"/></td>
    </tr>
    <tr>
      <th v-for="(c,i) in captions"><InputText fluid v-model="captions[i]"/></th>
      <td><Button icon="pi pi-plus" label="Spalte" text size="small" @click="addColumn()" fluid/></td>
    </tr>
    <tr v-for="(r,j) in rows">
      <td v-for="(c,i) in captions"><InputText fluid v-model="rows[j][i]"/></td>
      <td><Button v-if="edit" icon="pi pi-trash" text size="small" @click="removeRow(j)"/><Button v-if="edit" text size="small" icon="pi pi-caret-up" @click="moveRow(j,true)" :disabled="j===0"/><Button v-if="edit" :disabled="j===rows.length-1" text size="small" icon="pi pi-caret-down" @click="moveRow(j,false)"/></td>
    </tr>
    <tr>
      <td :colSpan="captions.length"><Button icon="pi pi-plus" @click="addRow()" fluid label="Zeile" text size="small"/></td>
    </tr>
    
  </table>
</template>

<script>
import InputText from 'primevue/inputtext';
import ToggleButton from 'primevue/togglebutton';
import RelationTable from './relation-table.vue';
import Message from 'primevue/message';
import { areResultsEqual, areResultsEqualIgnoreOrder } from './exercises/databases/databases/database';

export default{
  components: {
    InputText, ToggleButton, RelationTable, Message
  },
  props: {
    task: Object,
  },
  computed: {
    correct(){
      return this.task.correct;
    },
    checked(){
      return this.task.checked;
    },
    captions(){
      return this.relation.columns;
    },
    rows(){
      return this.relation.values;
    }
  },
  data(){
    return {
      relation: {
        columns: [""],
        values: [[""]],
      },
      edit: false
    };
  },
  mounted(){
    this.task.input=this;
  },
  methods: {
    getRelation(){
      return this.relation;
    },
    columnLeft(index){
      if(index===0) return;
      this.captions.splice(index-1,2,this.captions[index],this.captions[index-1]);
      for(let i=0;i<this.rows.length;i++){
        this.rows[i].splice(index,1);
      }
    },
    moveColumn(index,left){
      if(left && index===0 || !left && index===this.captions.length-1) return;
      if(!left){
        this.moveColumn(index+1,!left);
        return;
      }
      this.captions.splice(index-1,2,this.captions[index],this.captions[index-1]);
      for(let i=0;i<this.rows.length;i++){
        this.rows[i].splice(index-1,2,this.rows[i][index],this.rows[i][index-1]);
      }
    },
    moveRow(index,down){
      if(down && index===0 || !down && index===this.rows.length-1) return;
      if(!down){
        this.moveRow(index+1,!down);
        return;
      }
      this.rows.splice(index-1,2,this.rows[index],this.rows[index-1]);
    },
    removeRow(index){
      this.rows.splice(index,1);
    },
    addRow(){
      let r=[];
      for(let i=0;i<this.captions.length;i++){
        r.push("");
      }
      this.rows.push(r);
    },
    removeColumn(index){
      this.captions.splice(index,1);
      for(let i=0;i<this.rows.length;i++){
        this.rows[i].splice(index,1);
      }
      if(this.captions.length===0){
        this.addColumn();
      }
    },
    addColumn(){
      this.captions.push("");
      for(let i=0;i<this.rows.length;i++){
        this.rows[i].push("");
      }
    },
    reset(){
      this.relation.columns=[""];
      this.relation.values=[[""]];
    },
    check(options){
      let ignoreRowOrder=false;
      let ignoreColumnOrder=false;
      if(options){
        ignoreColumnOrder=options.ignoreColumnOrder;
        ignoreRowOrder=options.ignoreRowOrder;
      }
      if(ignoreRowOrder){
        return areResultsEqualIgnoreOrder(this.relation,this.task.result.relation,true,!ignoreColumnOrder);
      }else{
        return areResultsEqual(this.relation,this.task.result.relation,true,true);
      }
      console.log(this.task)
    }
  }
}
</script>