<template>
  <table>
    <table style="overflow-x: auto; text-align: center">
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
  </table>
</template>

<script>
import InputText from 'primevue/inputtext';
import ToggleButton from 'primevue/togglebutton';

export default{
  components: {
    InputText, ToggleButton
  },
  props: {
    task: Object,
  },
  data(){
    return {
      captions: [""],
      rows: [[""]],
      edit: false
    };
  },
  mounted(){
    this.task.input=this;
  },
  methods: {
    getRelation(){
      return {
        columns: this.captions,
        values: this.rows
      };
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
    check(){
      console.log(this.task)
    }
  }
}
</script>