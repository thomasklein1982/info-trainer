<template>
  <div ref="wrapper" style="width: 100%; height: 100%">
    <iframe ref="iframe" :src="src" style="width: 100%; height: 100%"></iframe>
  </div>
</template>

<script>

export default{
  props: {
    project: Object,
    options: Object
  },
  computed: {
    src(){
      let src;
      if(location.origin.startsWith("http://localhost:")){
        let port=+location.origin.substring(17);
        src="http://localhost:"+(port+1)+"/";
      }else{
        src="https://thomaskl.uber.space/Apps/java-app/";
      }
      src+="#exercise-mode;hard";
      console.log(src);
      return src;
    }
  },
  data(){
    return {
      
    };
  },
  mounted() {
    window.addEventListener("message",this.listener);
    //let frame=this.$refs.iframe as HTMLIFrameElement;
  },
  unmounted() {
    console.log("remove listener");
    window.removeEventListener("message",this.listener);
  },
  methods: {
    listener(message){
      console.log("received",message);
      let type=message.data.type;
      let data=message.data.data;
      if(type==='submit-exercise'){
        console.log("submitted",data);
        this.$emit("exercise-submit",data);
      }else if(type==='LOADING-COMPLETE'){
        this.sendMessage("setup-exercise",this.project);
      }
    },
    sendMessage(type,data){
      data=JSON.parse(JSON.stringify(data));
      let frame=this.$refs.iframe;
      if(frame && frame.contentWindow){
        console.log("send");
        frame.contentWindow.postMessage({
          type,
          data: data
        },"*");
      }
      
    }
  }
}
</script>