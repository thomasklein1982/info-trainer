<template>
  <div style="width: 100%; height: 100%; display: flex; flex-direction: column">
    <Menubar style="width: 100%; visibility: hidden; margin-bottom: 0.3rem" v-if="screen!=='intro'">
      <template #start>
        <strong>Client:</strong>&nbsp;{{person.geraet}} von {{ person.icon }} {{ person.name }}
      </template>
      <template #end>
        <div style="display: flex">
          <Knob rangeColor="green" valueColor="red" :textColor="danger*2<maxDanger? 'green':'red'" :size="50" v-model="danger" :max="maxDanger"/>
          <Button icon="pi pi-list" label="Aufgaben" @click="showTasks=true"/>
          <Button icon="pi pi-times" text @click="backToInternet()"/>
        </div>
      </template>
    </Menubar>
    <Menubar style="position: fixed; width: calc( 100% - 50px ); z-index: 1;" v-if="screen!=='intro'">
      <template #start>
        <strong>Client:</strong>&nbsp;{{person.geraet}} von {{ person.icon }} {{ person.name }}
      </template>
      <template #end>
        <div style="display: flex">
          <Knob rangeColor="green" valueColor="red" :textColor="danger*2<maxDanger? 'green':'red'" :size="50" v-model="danger" :max="maxDanger"/>
          <Button icon="pi pi-list" label="Aufgaben" @click="showTasks=true"/>
          <Button icon="pi pi-times" text @click="backToInternet()"/>
        </div>
      </template>
    </Menubar>
    <div class="screen" v-if="screen==='intro'">
      <h2>{{ person.icon }} {{ person.name }}, {{ person.title }}</h2>
      <div>
        {{ person.teaser }}
      </div>
      <h3>Deine Aufgaben</h3>
      <ul>
        <li v-for="(t,i) in tasks" :style="{color: t.correct? 'green': ''}">{{ t.info }}<span style="color: green; margin-left: 0.5rem" v-if="t.correct" class="pi pi-check"/></li>
      </ul>
      <div>
        <Button :label="person.losgehts" @click="setScreen('internet')"/>
      </div>
    </div>
    <div class="screen" v-else-if="screen==='internet'">
      <p>Hier siehst du einen Teil des Internets. Das Internet besteht aus vielen Computern, die <strong>Server</strong> genannt werden. Klicke einen Server an, um eine <strong>Anfrage</strong> an ihn zu stellen.</p>
      <p>Spezielle Server sind das <strong>DNS (Domain Name System)</strong> und die <strong>Suchmaschine Goggle</strong>.</p>
      <Button label="🖥️ DNS" @click="makeRequest('get',{name: 'dns'})"/>
      <Button label="🖥️ Goggle" @click="makeRequest('get',{name: 'goggle'})"/>
      <template v-for="(s,i) in server">
        <Button v-if="!s.unknown" :text="s.unknown!==false" @click="makeRequest('get',s)">
          🖥️ {{ s.ip.join(".") }}
        </Button>
      </template>
    </div>
    <div class="screen" v-else-if="screen==='dns'">
      <h2>Willkommen beim <strong>Domain Name System (DNS)</strong></h2> 
      <p>Wir sind die Auskunft im Internet und kennen alle <strong>IP-Adressen</strong> aller Server.</p>
      <p>Nennen Sie einen Domain-Namen und wir geben Ihnen die zugehörige IP-Adresse.</p>
      <InputGroup>
        <InputText @keyup.enter="makeRequest('get',{name: 'dns'},{query: dns.search})" type="search" v-model="dns.search" fluid placeholder="Geben Sie den Domain-Namen ein, z. B. mathe-info.com"/>
        <Button @click="makeRequest('get',{name: 'dns'},{query: dns.search})" icon="pi pi-search"/>  
      </InputGroup>
      <p v-if="dns.searched">
        <template v-if="dns.result">
          Die IP-Adresse von <strong>{{ dns.result.name }}</strong> lautet <strong>{{ dns.result.ip.join(".") }}</strong>.
        </template>
        <template v-else>
          Ich kann die Domain <strong>{{ dns.search }}</strong> nicht finden. Hast du den Namen richtig geschrieben?
        </template>
      </p>
    </div>
    
    <div class="screen" v-else-if="screen==='goggle'">
      <h1 style="text-align: center; font-variant: small-caps"><span style="color: blue">G</span><span style="color: red">o</span><span style="color: yellow">g</span><span style="color: blue">g</span><span style="color: green">l</span><span style="color: red">e</span></h1> 
      <p style="text-align: center">Die beste Suchmaschine im Netz.</p>
      <InputGroup>
        <InputText @keyup.enter="makeRequest('get',{name: 'goggle'},{query: goggle.search})" type="search" v-model="goggle.search" fluid placeholder="Geben Sie einen Suchbegriff ein..."/>
        <Button @click="makeRequest('get',{name: 'goggle'},{query: goggle.search})" icon="pi pi-search"/>  
      </InputGroup>
      <p v-if="goggle.results">
        <template v-if="goggle.results.length>0">
          <p>Zum Suchbegriff <strong>{{ goggle.search }}</strong> habe folgende Domains gefunden:</p>
          <ul>
            <li  v-for="(r,i) in goggle.results">
              {{ r.server.name }}
              <!-- {{ r.before }}<span style="color: orange; font-weight: bold">{{ r.hit }}</span>{{ r.after }} -->
            </li>
          </ul>
        </template>
        <template v-else>
          Keine Suchergebnisse gefunden.
        </template>
      </p>
    </div>

    <div class="screen" v-else-if="screen==='darknet'" style="text-align: center">
      <p>Es ist gefährlich, einfach auf irgendeine unbekannte Seite zu surfen. Du bist im <strong>Darknet</strong> gelandet. {{person.name}}s {{person.geraet}} wird von <strong>Viren</strong>, <strong>Trojanern</strong> und anderer <strong>Malware</strong> infiziert.</p>
      <p>Die Gefährdung beträgt insgesamt</p>
      <div><Knob rangeColor="green" valueColor="red" :textColor="danger*2<maxDanger? 'green':'red'" v-model="danger" :max="maxDanger"/></div>
      <p v-if="danger===maxDanger">{{person.name}}s {{person.geraet}} kann leider nicht mehr verwendet werden. Du musst die Aufgabe neu starten.</p>
    </div>

    <div class="screen" v-else-if="screen==='domain'">
      <div style="font-family: monospace; font-size: 130%; margin-bottom: 0.8rem;">
        Dies ist der Server {{domain.server.name}}.
        <p>Geben Sie an, welche Datei Sie anfordern möchten (z. B. <code>index.html</code> für die Startseite):</p>
        <InputGroup>
          <InputText @keyup.enter="searchDomain(domain.search)" type="search" v-model="domain.search" fluid placeholder="Geben Sie den Namen der Datei ein, z. B. index.html"/>
          <Button @click="searchDomain(domain.search)" icon="pi pi-search"/>  
        </InputGroup>
      </div>
      
      <Card style="background-color: white; color: black;">
        <template #title>
          <template v-if="domain.file===null">
            Fehler <strong>404</strong>: Datei nicht gefunden.
          </template>
          <template v-else>
            [Datei <code>{{domain.file.name}}</code> auf dem Server <code>{{domain.server.name}}</code>]
          </template>
        </template>
        <template #content>
          <template v-if="domainFileName==='programmierung.de/index.html'">
            <p>Willkommen, Coder!</p>
            <p>Hier findest du alle Infos rund ums Programmieren. Hast du Fragen? Dann schau doch mal im <Button @click="showLink('forum.html')" label="Forum" icon="pi pi-external-link" text/> vorbei. Wenn du ein*e Anfänger*in bist, empfehlen wir dir unsere Unterseite zum <Button @click="showLink('internet.html')" label="Internet" icon="pi pi-external-link" text/>.</p>
          </template>
          <template v-if="domainFileName==='programmierung.de/internet.html'">
            <p>Web-Programmierung</p>
            <p>Bevor du mit dem Programmieren anfängst, solltest du zunächst die Sprache erlernen, mit der Webseiten geschrieben werden: HTML (Hyper-Text-Markup-Language).</p>
          </template>
          <template v-if="domainFileName==='programmierung.de/forum.html'">
            <p>Unser Forum wird bei <Button @click="showLink('index.html','easy-forums.de')" label="Easy-Forums" icon="pi pi-external-link" text/> gehostet.</p>
            <p>Hier sind die aktuellen Diskussionen:</p>
            <ul>
              <li>Umfrage: Die beliebteste Programmiersprache</li>
              <li>Neue Version verfügbar!</li>
              <li><Button @click="showLink('diskussion204.php','easy-forums.de')" label="Kann mir jemand helfen?" icon="pi pi-external-link" text/></li>
            </ul>
          </template>

          <template v-if="domainFileName==='enigma-band.de/index.html'">
            <p>Jetzt neu: Unser Album "Bletchley Park"!</p>
            <p>Wir spielen alles, was uns vor die Instrumente kommt: Rock, Pop Blues, ...</p>
            <p>Erfahre mehr <Button @click="showLink('ueberuns.html')" label="über uns" icon="pi pi-external-link" text/> oder schau dir unsere <Button @click="showLink('galerie.html')" label="Galerie" icon="pi pi-external-link" text/> an.</p>
          </template>
          <template v-if="domainFileName==='enigma-band.de/ueberuns.html'">
            <p><b>Lead-Gitarre:</b> Edsger Dijkstra</p>
            <p style="text-align: right"><b>Rythmus-Gitarre:</b> John von Neumann</p>
            <p><b>Drums:</b> Konrad Zuse</p>
          </template>
          <template v-if="domainFileName==='enigma-band.de/galerie.html'">
            <p style="text-align: center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Egal_%28Band%29_ZMF2015_jm18293.jpg/640px-Egal_%28Band%29_ZMF2015_jm18293.jpg" style="width: 80%"></p>
          </template>

          <template v-if="domainFileName==='easy-forums.de/index.html'">
            <p>Herzlich willkommen bei easy-forums.de. Für nur monatlich 4,99 € kannst du bei uns ein Forum für deine Website mieten.</p>
          </template>
          <template v-if="domainFileName==='easy-forums.de/diskussion204.php'">
            <table class="forum">
              <tr>
                <td style="vertical-align: baseline">👩&nbsp;Ada&nbsp;L.</td><td>Hey Leute, ich habe da ein Problem bei der Programmierung meiner App. Vielleicht könnt ihr mir ja helfen?<br/>Wie schaffe ich es, dass meine App die aktuelle Uhrzeit anzeigt?</td>
              </tr>
              <tr>
                <td style="vertical-align: baseline">👴&nbsp;Don&nbsp;K.</td><td>Uh, da habe ich keine Ahnung. Viel Erfolg weiterhin!</td>
              </tr>
              <tr>
                <td style="vertical-align: baseline">👱🏼‍♂️&nbsp;Marc&nbsp;Z.</td><td>Wenn du es rausgefunden hast, sag mir Bescheid. Ich brauche diese Info auch.</td>
              </tr>
              <tr>
                <td style="vertical-align: baseline">👵&nbsp;Grace&nbsp;H.</td><td>Schau mal, es ist ganz einfach: Verwende folgenden Code:<br/><code>date d = new Date();</code></td>
              </tr>
              <tr v-if="antwortFix">
                <td style="vertical-align: baseline">👩&nbsp;Ada&nbsp;L.</td><td>{{antwortFix}}</td>
              </tr>
            </table>
            
            <p v-if="person.name==='Ada' && !antwortFix">Antworten: <InputText v-model.trim="antwort"/> <Button :diabled="antwort.length===0" @click="postAnswer(antwort)" label="Absenden" icon="pi pi-send"/> </p>
          </template>

          <template v-if="domainFileName==='wiki-wissen.de/index.html'">
            <p >WikiWissen bietet Informationen zu allen möglichen Bereichen. Hier eine kleine Auswahl:</p>
            <ul>
              <li><Button @click="showLink('enigma.html')" label="Enigma (Band)" icon="pi pi-external-link" text/></li>
              <li><Button @click="showLink('internet.html')" label="Internet" icon="pi pi-external-link" text/></li>
            </ul>
          </template>
          <template v-if="domainFileName==='wiki-wissen.de/enigma.html'">
            <p >The Enigma ist eine Band, die vor allem Rock und Pop spielt. Ihr aktuelles Album "Bletchley Park" erhielt einen Grammy. <Button @click="showLink('index.html','enigma-band.de')" label="Zur offiziellen Website" icon="pi pi-external-link" text/></p>
          </template>
          <template v-if="domainFileName==='wiki-wissen.de/internet.html'">
            <p >Das Internet entsteht durch den Zusammenschluss vieler Computer, die über die ganze Welt verteilt sind.</p>
            <p><Button @click="showLink('lee-foto.jpg')" label="Tim Berners-Lee" icon="pi pi-external-link" text/> entwickelte am CERN in der Schweiz im Jahr 1989 die Grundlagen des Internets.</p>
          </template>
          <template v-if="domainFileName==='wiki-wissen.de/lee-foto.jpg'">
            <p style="text-align: center"><img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Sir_Tim_Berners-Lee_%28cropped%29.jpg" style="width: 40%"></p>
          </template>

          <template v-if="domainFileName==='mathe-info.com/index.html'">
            <p>Die Hausaufgaben in Mathe sind: Buch Seite 37, Aufgabe 3 a) und b)</p>
          </template>
        </template>
      </Card>
    </div>
    <div class="screen" v-else-if="screen==='programmierung.de/index.html'">
      
    </div>
    <Dialog modal v-model:visible="link.show" header="Link zu einer Datei">
      <template v-if="link.servername===null">
        Dieser Link führt zur Datei <strong>{{link.filename}}</strong>. Du kannst sie auf diesem Server anfordern.
      </template>
      <template v-else>
        Dieser Link führt zur Datei <strong>{{link.filename}}</strong> auf dem Server <strong>{{link.servername}}</strong>. Um diese Datei anzufordern, musst du zuerst auf den Server <strong>{{link.servername}}</strong> wechseln.
      </template>
    </Dialog>
    <Dialog modal v-model:visible="showTasks" header="Deine Aufgaben">
      <h2>{{ person.icon }} {{ person.name }}, {{ person.title }}</h2>
      <div>
        {{ person.teaser }}
      </div>
      <h3>Deine Aufgaben</h3>
      <ul>
        <li v-for="(t,i) in tasks" :style="{color: t.correct? 'green': ''}">{{ t.info }}<span style="color: green; margin-left: 0.5rem" v-if="t.correct" class="pi pi-check"/></li>
      </ul>
    </Dialog>
  </div>
</template>

<script>
import Menubar from 'primevue/menubar';
import { RandomClazz } from '../../../../other/random';
import InputGroup from 'primevue/inputgroup';
import { calcPoints } from '../../../../App.vue';
import Knob from 'primevue/knob';
import { sleep } from '../../../../other/sleep';


export default{
  components: {
    Menubar, InputGroup, Knob
  },
  watch: {
    random(nv){
      this.seed=nv.seed;
    }
    // seed(nv,ov){
    //   //this.random.seed=nv;
    //   this.dns.search="";
    //   this.randomizeServerIPs(this.server);
    //   screen="intro";
    // }
  },
  props: {
    person: Object,
    random: Object,
    tasks: Array,
    exerciseId: String
  },
  computed: {
    closable(){
      return (this.screen==='intro');
    },
    domainFileName(){
      if(!this.domain.server || !this.domain.file) return null;
      return this.domain.server.name+"/"+this.domain.file.name;
    },
    exerciseData(){
      return this.$root.getExerciseData(this.exerciseId);
    },
  },
  data(){
    return {
      screen: 'intro',
      server: null,
      dns: {
        search: "",
        result: null,
        searched: false
      },
      goggle: {
        search: "",
        results: null
      },
      domain: {
        search: "",
        server: null,
        file: null,
        notFound: false
      },
      link: {
        filename: "",
        show: false,
        servername: null
      },
      antwort: "",
      antwortFix: null,
      showTasks: false,
      danger: 0,
      maxDanger: 3,
      seed: -1
    }
  },
  mounted(){
    
    this.server=this.createServer();
  },
  methods: {
    setScreen(screen){
      let dialog=this.$parent.$parent.$parent;
      if(this.danger>=this.maxDanger){
        dialog.close();
        return;
      }
      let isIntro=screen==='intro';
      dialog.$parent.closable=isIntro;
      if(!dialog.maximized && !isIntro || dialog.maximized && isIntro){
        dialog.maximize();
      }
      this.screen=screen;
      console.log("!set screen");
    },
    backToInternet(){
      
      if(this.screen==='internet'){
        this.setScreen('intro');
      }else{
        this.setScreen('internet');
      }
    },
    postAnswer(antwort){
      console.log("post answer",antwort);
      if(antwort.toLowerCase().indexOf("danke")<0){
        alert("Ada soll sich für die Hilfe bedanken!");
        return;
      }
      this.makeRequest('post',this.domain.server,{data:antwort},this.domain.file)
    },
    async makeRequest(method,server,data,file){
      console.log("request",method,server,data,file);
      this.$emit("check-request",{
        method,server,data,file
      });
      // this.$parent.check({
      //   method,server,data,path
      // });
      if(server.name==="goggle"){
        if(data){
          this.searchGoggle(data.query);
        }else{
          this.setScreen("goggle");
        }
        return this.finishRequest();
      }
      if(server.name==="dns"){
        if(data){
          this.searchDNS(data.query);
        }else{
          this.setScreen("dns");
        }
        return this.finishRequest();
      }
      if(!file && server.files){
        console.log("redirect");
        this.makeRequest(method,server,data,server.files[0]);
        return this.finishRequest();
      }
      this.domain.file=file;
      await this.clickServer(server);
      if(data){
        // if(data.path!==undefined){
        //   this.searchDomain(data.path);
          
        // }
        if(data.data!==undefined){
          this.antwortFix=data.data;
          this.antwort="";
          return this.finishRequest();
        }
      }
      this.finishRequest();
    },
    finishRequest(){
      let resArray=[];
      for(let i=0;i<this.tasks.length;i++){
        let t=this.tasks[i];
        if(t.correct){
          resArray.push(true);
        }else{
          resArray.push(false);
        }
      }
      this.exerciseData.correct=resArray;
      this.exerciseData.userProject=this.seed;
      calcPoints(this.exerciseData);
      this.$root.save(this.exerciseData);
    },
    loseGame(){
      let resArray=[];
      for(let i=0;i<this.tasks.length;i++){
        resArray.push(false);
      }
      this.exerciseData.correct=resArray;
      this.seed=Math.round(Math.random()*100000);
      delete this.exerciseData.userProject;
      this.random.setSeed(this.seed);
      calcPoints(this.exerciseData);
      this.$root.save(this.exerciseData);
      this.randomizeServerIPs(this.server);
    },
    showLink(filename,servername){
      this.link.filename=filename;
      this.link.show=true;
      if(servername){
        this.link.servername=servername;
      }else{
        this.link.servername=null;
      }
    },
    searchDomain(text){
      this.domain.notFound=false;
      if(!this.domain.server) return;
      text=text.trim().toLowerCase();
      if(text.length===0){
        this.domain.file=null;
        
        return;
      }
      for(let i=0;i<this.domain.server.files.length;i++){
        let f=this.domain.server.files[i];
        if(f.name===text){
          this.domain.file=f;
          this.makeRequest('get',this.domain.server,null,f);
          return;
        }
      }
      this.domain.file=null;
      this.domain.notFound=true;
    },
    searchDNS(text){
      this.dns.result=null;
      text=text.trim().toLowerCase();
      if(text.length===0){
        this.dns.searched=false;
        return;
      }
      this.dns.searched=true;
      for(let i=0;i<this.server.length;i++){
        let s=this.server[i];
        if(s.name && s.name===text){
          this.dns.result=s;
          s.unknown=false;
          return;
        }
      }
    },
    searchGoggle(text){
      this.goggle.results=null;
      text=text.toLowerCase().trim();
      if(text.length===0){
        return;
      }
      this.goggle.results=[];
      for(let i=0;i<this.server.length;i++){
        let s=this.server[i];
        if(!s.name) continue;
        let hit=false;
        if(s.goggle && s.goggle(text)){
          hit=true;
        }
        if(!hit){
          if(s.name.indexOf(text)>=0){
            hit=true;
          }
        }
        if(hit){
          this.goggle.results.push({
            server: s,
            // before: s.name.substring(0,pos),
            // hit: s.name.substring(pos,pos+text.length),
            // after: s.name.substring(pos+text.length)
          });
        }
      }
    },
    async clickServer(s){
      if(s.name){
        this.domain.server=s;
        this.setScreen("domain");
      }else{
        this.setScreen("darknet");
        this.danger++;
        if(this.danger===this.maxDanger){
          this.loseGame();
        }
      }
    },

    createServer(){
      let array=[
        {
          name: "enigma-band.de",
          ip: 0,
          files: [
            {
              name: "index.html",
              content: `Index`,
              
            },
            {
              name: "ueberuns.html",
              content: `Über uns`
            },
            {
              name: "galerie.html",
              content: `Galerie`
            },
          ]
        },
        {
          name: "easy-forums.de",
          info: "",
          ip: 0,
          files: [
            {
              name: "index.html",
              content: `Index`,
              
            },
            {
              name: "diskussion204.php",
              content: `Chat`
            },
            {
              name: "antwort.php",
              content: `Antwort`
            },
          ]
        },
        {
          name: "wiki-wissen.de",
          info: "Hier findet man die Antworten auf viele Fragen.",
          ip: 0,
          goggle: (text)=>{
            if(text.indexOf(" ")>0) return true;
            let tags=["html","internet","wikipedia","musik"];
            for(let i=0;i<tags.length;i++){
              let s=tags[i];
              if(s.indexOf(text)>=0) return true;
              if(text.indexOf(s)>=0) return true;
            }
          },
          files: [
            {
              name: "index.html",
              content: `Index`,
              
            },
            {
              name: "enigma.html",
              content: `Enigma`
            },
            {
              name: "internet.html",
              content: `Internet`
            },
            {
              name: "lee-foto.jpg",
              content: `Foto`
            },
          ]
        },
        {
          name: "programmierung.de",
          ip: 0,
          goggle: (text)=>{
            let tags=["html","web","java","code","program"];
            for(let i=0;i<tags.length;i++){
              let s=tags[i];
              if(s.indexOf(text)>=0) return true;
              if(text.indexOf(s)>=0) return true;
            }
          },
          files: [
            {
              name: "index.html",
              content: `Index`,
              
            },
            {
              name: "forum.html",
              content: `Enigma`
            },
            {
              name: "internet.html",
              content: `Internet`
            },
          ]
        },
        {
          name: "mathe-info.com",
          ip: 0,
          files: [
            {
              name: "index.html",
              content: `Index`,
              
            }
          ]
        },
      ];
      for(let i=0;i<array.length;i++){
        array[i].unknown=true;
      }
      for(let i=0;i<65;i++){
        array.push({
          ip: 0
        });
      }
      this.randomizeServerIPs(array);
      
      return array;
    },
    randomizeServerIPs(server){
      for(let i=0;i<server.length;i++){
        server[i].ip=[this.random.int(0,255),this.random.int(0,255),this.random.int(0,255),this.random.int(0,255)];
      }
      server.sort((a,b)=>{
        for(let i=0;i<4;i++){
          let d=a.ip[i]-b.ip[i];
          if(d>0) return 1;
          if(d<0) return -1;
        }
        return 1;
      });
    }
  }
}
</script>

<style scoped>
  .header{
    border-bottom: 1pt solid white;
  }
  .screen{
    flex: 1;
    width: 100%;
    overflow: auto;
  }

  table.forum{
    border-collapse: collapse;
  }

  table.forum td{
    border: 1pt solid white;
  }

  table.forum::nth-child(even){
    background-color: gray;
  }
</style>