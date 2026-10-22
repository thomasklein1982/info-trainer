<template>
  <h1>Challenge abgeschlossen</h1>
  <p>Du hast die Challenge abgeschlossen. <a ref="link"><Button>Lade dein Zertifikat herunter</Button></a> oder <Button @click="restart">Starte die Challenge noch einmal</Button>.</p>
  <div style="text-align: center">
    <canvas style="max-width: 100%" ref="zertifikat"/>
  </div>
</template>

<script>

import QRCode from "qrcode";



export default {
  components: {

  },
  emits: [
    "restart"
  ],
  props: {
    title: String,
    exercises: Array,
    name: String,
    startDate: Object
  },
  computed: {
    statistics(){
      let points=0;
      let max=0;
      let exercises=[];
      for(let i=0;i<this.exercises.length;i++){
        let e=this.exercises[i];
        let ed=this.$root.getExerciseData(e.id);
        points+=ed.points;
        max+=ed.total;
        exercises.push({
          text: (i+1)+". "+ed.data.title+" ("+ed.points+"/"+ed.total+")",
          color: ed.points===ed.total? "green" :"red",
          points: ed.points,
          total: ed.total
        });
      }
      return {
        points, max, exercises
      }
    }
  },
  async mounted(){
    let endDate=new Date();
    let t=this.name+","+this.title+"\n"+this.statistics.points+"/"+this.statistics.max+"\n"+this.startDate.toLocaleString()+"-"+endDate.toLocaleString();
    for(let i=0;i<this.statistics.exercises.length;i++){
      let e=this.statistics.exercises[i];
      t+="\n"+(i+1)+":"+e.points+"/"+e.total;
    }
    let qrcode=await QRCode.toCanvas(t);
    console.log(qrcode);
    let canvas=this.$refs.zertifikat;
    let lineHeight=15;
    let fontSize=12;
    let width=400;
    let qrWidth=qrcode.width;
    let height=Math.max((this.exercises.length+10)*lineHeight,qrWidth+lineHeight);
    canvas.width=width+qrWidth;
    canvas.height=height;
    let ctx=canvas.getContext("2d");
    ctx.fillStyle="white";
    ctx.fillRect(0,0,width+qrWidth,height);
    ctx.fillStyle="#121212";
    ctx.textBaseline="top";
    let left=10;
    let y=lineHeight;
    let maxWidth=width-2*left;
    ctx.textAlign="center";
    ctx.font=(fontSize*3)+"px sans-serif";
    ctx.fillText("ZERTIFIKAT",width/2,y,maxWidth);
    y+=3*lineHeight;
    ctx.font=(fontSize)+"px sans-serif";
    ctx.textAlign="left";
    ctx.fillText("Challenge: "+this.title,left,y,maxWidth);
    y+=lineHeight;
    ctx.fillText("Name: "+this.name,left,y,maxWidth);
    y+=lineHeight;
    ctx.fillText("Zeit: von "+this.startDate.toLocaleString()+" bis "+endDate.toLocaleString(),left,y,maxWidth);
    y+=lineHeight;
    ctx.fillText("Punkte: "+this.statistics.points+" von "+this.statistics.max,left,y,maxWidth);
    y+=lineHeight;
    ctx.textAlign="center";
    ctx.font=(fontSize*2)+"px sans-serif";
    ctx.fillText("Ergebnisse der Aufgaben",width/2,y,maxWidth);
    y+=lineHeight*2;
    ctx.font=(fontSize)+"px sans-serif";
    ctx.textAlign="left";
    for(let i=0;i<this.statistics.exercises.length;i++){
      let e=this.statistics.exercises[i];
      ctx.fillStyle=e.color;
      ctx.fillText(e.text,left,y,maxWidth);
      y+=lineHeight;
    }
    ctx.drawImage(qrcode,width,lineHeight,qrWidth,qrWidth);
    canvas.toBlob((blob)=>{
      const url = URL.createObjectURL(blob);
      this.$refs.link.setAttribute("href",url);
      this.$refs.link.setAttribute("download","IT-"+this.title+"-"+this.name+".png");
    },"image/png",1);
    
  },
  methods: {
    restart(){
      this.$emit("restart");
    }
  }
}
</script>