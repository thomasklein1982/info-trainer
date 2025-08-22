<template>
  <div ref="wrapper" style="width: 100%; height: 100%">
    <iframe ref="iframe" :src="src" style="width: 100%; height: 100%"></iframe>
  </div>
</template>

<script>
import { js_beautify } from 'js-beautify';
import stringifyTestcases from '../other/stringifyTestcases';
import { prettify } from '../other/prettify';


export default{
  props: {
    project: Object,
    userProject: Object,
    options: Object,
    check: Object
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
      src+="#exercise-mode";
      let diff=this.$root.settings.javaAppDifficulty.toLowerCase();
      src+=";"+diff;
      console.log(src);
      return src;
    },
    extraSourceCode(){
      if(!this.check) return "";
      let initFunc,testcases,applyTestFunc;
      if(this.check.init){
        initFunc=this.check.init.toString();
      }else{
        initFunc="null";
      }
      testcases=stringifyTestcases(this.check.testcases);
      applyTestFunc=this.check.test.toString();
      let src=`let init=await (${initFunc})();
            $Exercise.checkTestCases(init,${testcases},${applyTestFunc});`;
      return src;
    },
    checkerCode(){
      if(!this.check) return null;
      return this.extraSourceCode;
    },
    realProject(){
      //return this.project;
      //if(!this.check) return this.project;
      let rp;
      let project=JSON.parse(JSON.stringify(this.project));
      if(this.userProject) rp=JSON.parse(JSON.stringify(this.userProject));
      else rp=project;
      rp.constraints=this.project.constraints;
      let diff=this.$root.settings.javaAppDifficulty.toLowerCase();
      for(let i=0;i<project.clazzes.length;i++){
        let c=project.clazzes[i];
        if(this.userProject){
          if(c.isHidden){
            rp.clazzes.push(c);
          }else{
            rp.clazzes[i].hiddenAttributes=c.hiddenAttributes;
            rp.clazzes[i].hiddenMethods=c.hiddenMethods;
            continue;
          }
        }
        if(c.type==="UI"){
          project.clazzes[i]=c.code;
          continue;
        }
        if(c.type==="html" || c.type==="css" || c.type==="js"){
          project.clazzes[i]={
            name: c.name,
            fileType: c.type,
            src: c.src
          };
          //c.code=JSON.parse(c.code);
          continue;
        }
        if(c.substring) continue;
        let src=c.src;
        if(diff==="easy"){
          src=src.replace(/\$void /g,"");
        }else{
          src=src.replace(/\$void /g,"void ");
        }
        //   if(c.main){
        //     src+="\n\npublic static void main(String[] args){\n";
        //     if(diff==="normal"){
        //       src+="new "+c.name+"();";
        //     }else{
        //       src+=c.main;
        //     }
        //     src+="\n}";
        //   }
        //   let pre="class "+c.name;
        //   src=pre+"{\n"+src+"\n}"
        // }
        if(i>0){
          let lines=src.split("\n");
          for(let j=0;j<lines.length;j++){
            lines[j]="  "+lines[j];
          }
          src=lines.join("\n");
          src="class "+c.name+"{\n"+src+"\n}";
        }
        c.src=src;//prettify(src);
      }
      return rp;
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
    window.removeEventListener("message",this.listener);
  },
  methods: {
    listener(message){
      let type=message.data.type;
      let data=message.data.data;
      if(type==='submit-exercise'){
        console.log("submitted",data);
        this.$emit("exercise-submit",data);
      }else if(type==='LOADING-COMPLETE'){
        this.sendMessage("setup-exercise",{project: this.realProject, checker: this.checkerCode});
        console.log("send setup exercise",this.realProject);
      }else if(type==="send-exercise-data"){
        this.$emit("close-dialog",data);
      }
    },
    sendMessage(type,data){
      data=JSON.parse(JSON.stringify(data));
      let frame=this.$refs.iframe;
      if(frame && frame.contentWindow){
        frame.contentWindow.postMessage({
          type,
          data: data
        },"*");
      }
      
    }
  }
}
</script>