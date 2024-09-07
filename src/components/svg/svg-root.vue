<template>
  <div ref="wrapper" style="display: inline-block; position:relative" :style="{'user-select': 'none', width: size.w, height: size.h}">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" :style="{'font-size': fontSize, stroke: 'black', 'stroke-width': strokeWidth}" style="width: 100%; height: 100%; overflow: hidden; font-family: Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica,Arial,sans-serif;" :viewBox="viewBox">
      <defs>
        <filter x="0" y="0" width="1" height="1" id="white0.5">
          <feFlood flood-color="white" flood-opacity="0.5" result="bg" />
          <feMerge>
            <feMergeNode in="bg"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g :transform="transformation">
        <slot></slot>
      </g>
    </svg>
  </div>
</template>

<script>

export default{
  props: {
    minX: {
      type: Number,
      default: 0
    },
    maxX: {
      type: Number,
      default: 10
    },
    minY: {
      type: Number,
      default: 0
    },
    maxY: {
      type: Number,
      default: 10
    },
    width: {
      type: String,
      default: "auto"
    },
    height: {
      type: String,
      default: "auto"
    },
    scale: {
      type: Number,
      default: 1
    },
    fontScale: {
      type: Number,
      default: 1
    },
    ratioXY: {
      type: Number,
      default: 1
    }
  },
  computed: {
    strokeWidth: function(){
      return 0.2*this.scale;
    },
    fontSize: function(){
      return (this.scale*this.fontScale)+"px";
    },
    size: function(){
      var w=this.width;
      var h=this.height;
      var mathW=this.maxX-this.minX;
      var mathH=this.maxY-this.minY;
      var ratio=mathW/mathH;
      ratio*=this.ratioXY;
      var scaleX=10;
      var scaleY=scaleX*this.ratioXY;
      var customScale=0.8/80*this.scale+0.2;
      var factorCMREM=2.4;
      if(w==="auto"){
        if(h==="auto"){
          /*beides auto*/
          throw "diagram-frame: You must specify exactly one of 'width' and 'height'";
        }else{
          /*w gleich skalieren*/
          var hn=parseFloat(h);
          var unit=h.match(/[^0-9\.]+/)[0];
          if(unit==="cm"){
            hn*=factorCMREM;
            unit="rem";
          }
          h=hn*customScale+unit;
          w=hn*ratio*customScale;
          w=w+unit;
        }
      }else{
        if(h==="auto"){
          /*h gleich skalieren*/
          var wn=parseFloat(w);
          var unit=w.match(/[^0-9\.]+/)[0];
          if(unit==="cm"){
            wn*=factorCMREM;
            unit="rem";
          }
          w=wn*customScale+unit;
          h=wn/ratio*customScale;
          h=h+unit;
        }else{
          /*beides spezifiziert*/
          var scaleX=10;
          var scaleY=scaleX*this.ratioXY;
        }
      }
      return {
        w: w,
        h: h,
        ratio: ratio,
        scaleX: scaleX,
        scaleY: scaleY,
        canvasWidth: (this.maxX-this.minX)*scaleX*20,
        canvasHeight: (this.maxY-this.minY)*scaleY*20
      };
    },
    transformation: function(){
      /*
        a c e
        b d f
        0 0 1
      */
      return "matrix("+(this.size.scaleX)+",0,0,"+(-this.size.scaleY)+","+(-this.minX*this.size.scaleX)+","+(this.maxY*this.size.scaleY)+")";
    },
    viewBox: function(){
      var x=0;
      var y=0;
      var x2=(this.maxX-this.minX)*this.size.scaleX;
      var y2=(this.maxY-this.minY)*this.size.scaleY;
      return x+" "+y+" "+x2+" "+y2;
    }
  }
};
</script>