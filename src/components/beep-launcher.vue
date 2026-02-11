<template>
  
  <Button @click="openDialog" label="BeeP-Editor öffnen"/>
  <Dialog ref="dialog" header="BeeP-Editor" v-model:visible="show" :closable="true" maximizable :close-on-escape="false" class="p-dialog-maximized">
    <div id="controls">
      <Select v-model="width" :options="[1,2,3,4,5,6,7,8,9,10]"/> &times; <Select v-model="height" :options="[1,2,3,4,5,6,7,8,9,10]"/> <Button label="Eintragungen übernehmen" @click="updateInputs()"/>
    </div>
    <BeepEditor
      ref="beepEditor"
      :beep="beep"
      v-if="showEditor"
      writable
    />
  </Dialog>
</template>

<script>
import { nextTick } from 'vue';
import BeepEditor from './beep-editor/beep-editor.vue';
import {Bee} from './exercises/bee-python/Bee';

export default{
  components: {
    BeepEditor
  },
  emits: [
    "show-feedback"
  ],
  watch: {
    width(){
      this.updateWorld();
    },
    height(){
      this.updateWorld();
    }

  },
  computed: {
  },
  props: {
    
  },
  data(){
    return {
      show: false,
      width: 4,
      height: 4,
      showEditor: true,
      beep: {
        world: [
          "."
        ],
        worldWidth: "40vw",
        code: "",
        setupFunc: function(gameworld){
          
          return {
            bee: new Bee("B","Lisa",gameworld)
          };
        },
        resetFunc: function(gameworld, data){
          for(let i=0;i<10;i++){
            let f=gameworld.getNamedField(i+"");
            if(!f) continue;
            f.text=i;
          }
        },
      }
    }
  },
  mounted(){
    this.updateWorld();
  },
  methods: {
    updateInputs(){
      let inputs=this.$refs.beepEditor.$refs.gameworld.values;
      let beePos=null;
      for(let a in inputs){
        let v=inputs[a];
        if(v.length>0){
          v=v.toUpperCase();
          let s=a.split(",");
          let x=s[0]*1-1;
          let y=this.height-s[1]*1;
          if(v==="B") beePos={x,y};
          let line=this.beep.world[y];
          line=line.substring(0,x)+v+line.substring(x+1);
          this.beep.world[y]=line;
        }
      }
      if(beePos){
        let bee=this.$refs.beepEditor.$refs.gameworld.gameworld.objects.bee;
        let x=bee.x-1;
        let y=this.height-bee.y;
        let line=this.beep.world[y];
        line=line.substring(0,x)+"."+line.substring(x+1);
        this.beep.world[y]=line;
        x=beePos.x;
        y=beePos.y;
        line=this.beep.world[y];
        line=line.substring(0,x)+"B"+line.substring(x+1);
        this.beep.world[y]=line;
      }
      this.reloadEditor();
    },
    reloadEditor(){
      let code=this.$refs.beepEditor?.code;
      this.showEditor=false;
      if(code) this.beep.code=code;
      nextTick(()=>{
        this.showEditor=true;

      });
    },
    updateWorld(){
      let world=[];
      for(let i=0;i<this.height;i++){
        let l="";
        for(let j=0;j<this.width;j++){
          l+=".";
        }
        world.push(l);
      }
      this.beep.world=world;
      this.reloadEditor();
    },
    closeDialog(){
      let a=confirm("Dein Programm wird nicht gespeichert.\n\nTrotzem beenden?");
      if(!a) return;
      this.show=false;
    },
    openDialog(){
      this.show=true;
      
    }
  }
}
</script>