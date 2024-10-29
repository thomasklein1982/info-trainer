<template>
  <div style="width: 100%; height: 100%; display: flex; flex-direction: column">
    <Menubar style="margin-bottom: 0.3rem" v-if="screen!=='intro'">
      <template #start>
        {{ person.icon }} {{ person.name }}
      </template>  
    </Menubar>
    <div class="screen" v-if="screen==='intro'">
      <span class="portrait" style="float-left">
        
      </span>
      <h2>{{ person.icon }} {{ person.name }}, {{ person.title }}</h2>
      <div>
        {{ person.teaser }}
      </div>
      <h3>Deine Aufgaben</h3>
      <ul>
        <li v-for="(t,i) in person.tasks">{{ t }}</li>
      </ul>
      Es ist egal, in welcher Reihenfolge du die Aufgaben erledigst.
      <div>
        <Button :label="person.losgehts" @click="screen='internet'"/>
      </div>
    </div>
    <div class="screen" v-else-if="screen==='internet'">
      <p>Hier siehst du einen Teil des Internets. Das Internet besteht aus vielen Computern, die <strong>Server</strong> genannt werden. {{person.name}}s {{ person.geraet }} ist ein <strong>Client</strong>. Klicke einen Server an, um eine <strong>Anfrage</strong> an ihn zu stellen.</p>
      <p>Das <strong>DNS (Domain Name System)</strong> und die <strong>Suchmaschine Goggle</strong> sind besondere Server. Klicke sie an, um mehr zu erfahren.</p>
      <Button v-for="(s,i) in server" text @click="clickServer(s)">
        🖥️ {{ s.ip.join(".") }}
      </Button>
      <Button label="🖥️ DNS" @click="screen='dns'"/>
      <Button label="🖥️ Goggle" @click="screen='goggle'"/>
    </div>
    <div class="screen" v-else-if="screen==='dns'">
      <h2>Willkommen beim <strong>Domain Name System (DNS)</strong></h2> 
      <p>Wir sind die Auskunft im Internet und kennen alle <strong>IP-Adressen</strong> aller Server.</p>
      <p>Nennen Sie einen Domain-Namen und wir geben Ihnen die zugehörige IP-Adresse.</p>
      <InputGroup>
        <InputText type="search" v-model="dns.search" fluid placeholder="Geben Sie den Domain-Namen ein, z. B. mathe-info.com"/>
        <Button @click="searchDNS(dns.search)" icon="pi pi-search"/>  
      </InputGroup>
      <p v-if="dns.searched">
        <template v-if="dns.result">
          Die IP-Adresse von {{ dns.result.name }} lautet <strong>{{ dns.result.ip.join(".") }}</strong>.
        </template>
        <template v-else>
          Ich kann die Domain <strong>{{ dns.search }}</strong> nicht finden.
        </template>
      </p>
      <p><Button fluid @click="screen='internet'" label="Zurück"/></p>
    </div>
    <div class="screen" v-else-if="screen==='goggle'">
      <h1 style="text-align: center; font-variant: small-caps"><span style="color: blue">G</span><span style="color: red">o</span><span style="color: yellow">g</span><span style="color: blue">g</span><span style="color: green">l</span><span style="color: red">e</span></h1> 
      <p style="text-align: center">Die beste Suchmaschine im Netz.</p>
      <InputGroup>
        <InputText type="search" v-model="goggle.search" fluid placeholder="Geben Sie einen Suchbegriff ein..."/>
        <Button @click="searchGoggle(goggle.search)" icon="pi pi-search"/>  
      </InputGroup>
      <p v-if="goggle.results">
        <template v-if="goggle.results.length>0">
          <p>Zum Suchbegriff <strong>{{ goggle.search }}</strong> habe folgende Domains gefunden:</p>
          <ul>
            <li  v-for="(r,i) in goggle.results">
              {{ r.before }}<span style="color: orange; font-weight: bold">{{ r.hit }}</span>{{ r.after }}
            </li>
          </ul>
        </template>
        <template v-else>
          Keine Suchergebnisse gefunden.
        </template>
      </p>
      <p><Button fluid @click="screen='internet'" label="Zurück"/></p>
    </div>
    <div class="screen" v-else-if="screen==='domain'">
      <div style="font-family: monospace; font-size: 130%">
        Dies ist der Server {{domain.server.name}}.
        <p>Geben Sie an, welche Datei Sie anfordern möchten (z. B. <code>index.html</code> für die Startseite):</p>
      </div>
      <InputGroup>
        <InputText type="search" v-model="domain.search" fluid placeholder="Geben Sie den Namen der Datei ein, z. B. index.html"/>
        <Button @click="searchDomain(domain.search)" icon="pi pi-search"/>  
      </InputGroup>
      <p style="font-family: monospace; font-size: 130%" v-if="domain.notFound">
        Fehler <strong>404</strong>: Datei nicht gefunden.
      </p>
      <Card v-else-if="domain.file!==null">
        <template #title>
          [Datei <code>{{domain.file.name}}</code> auf dem Server <code>{{domain.server.name}}</code>]
        </template>
        <template #content>
          <template v-if="domainFileName==='programmierung.de/index.html'">
            <p>Willkommen, Coder!</p>
            <p>Hier findest du alle Infos rund ums Programmieren. Hast du Fragen? Dann schau doch mal im <Button @click="showLink('Forum.html')" label="Forum" icon="pi pi-external-link" text/> vorbei. Wenn du ein*e Anfänger*in bist, empfehlen wir dir unsere Unterseite zum <Button @click="showLink('Internet.html')" label="Internet" icon="pi pi-external-link" text/>.</p>
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
                <td>👩&nbsp;Ada&nbsp;L.</td><td>Hey Leute, ich habe da ein Problem bei der Programmierung meiner App. Vielleicht könnt ihr mir ja helfen?<br/>Wie schaffe ich es, dass meine App die aktuelle Uhrzeit anzeigt?</td>
              </tr>
              <tr>
                <td>👴&nbsp;Don&nbsp;K.</td><td>Uh, da habe ich keine Ahnung. Viel Erfolg weiterhin!</td>
              </tr>
              <tr>
                <td>👱🏼‍♂️&nbsp;Marc&nbsp;Z.</td><td>wenn du es rausgefunden hast, sag mir Bescheid. Ich brauche diese Info auch.</td>
              </tr>
              <tr>
                <td>👵&nbsp;Grace&nbsp;H.</td><td>Schau mal, es ist ganz einfach: Verwende folgenden Code:<br/><code>date d = new Date();</code></td>
              </tr>
              <tr v-if="antwortFix">
                <td>👩&nbsp;Ada&nbsp;L.</td><td>{{antwortFix}}</td>
              </tr>
            </table>
            
            <p v-if="!antwortFix">Antworten: <InputText v-model.trim="antwort"/> <Button :diabled="antwort.length===0" @click="antwortFix=antwort" label="Absenden" icon="pi pi-send"/> </p>
          </template>

          <template v-if="domainFileName==='wiki-wissen.de/index.html'">
            <p >WikiWissen bietet Informationen zu allen möglichen Bereichen. Hier eine kleine Auswahl:</p>
            <ul>
              <li><Button @click="showLink('enigma.html')" label="Enigma (Band)" icon="pi pi-external-link" text/></li>
              <li><Button @click="showLink('internet.html')" label="Internet" icon="pi pi-external-link" text/></li>
            </ul>
          </template>
          <template v-if="domainFileName==='wiki-wissen.de/enigma.html'">
            <p >The Enigma ist eine Band, die vor allem Rock und Pop spielt. Ihr letztes Album "Bletchley Park" erhielt einen Grammy. <Button @click="showLink('index.html','enigma-band.de')" label="Zur offiziellen Website" icon="pi pi-external-link" text/></p>
          </template>
          <template v-if="domainFileName==='wiki-wissen.de/internet.html'">
            <p >Das Internet entsteht durch den Zusammenschluss vieler Computer, die über die ganze Welt verteilt sind.</p>
            <p><Button @click="showLink('lee-foto.jpg')" label="Tim Berners-Lee" icon="pi pi-external-link" text/> entwickelte am CERN in der Schweiz im Jahr 1989 die Grundlagen des Internets.</p>
          </template>
          <template v-if="domainFileName==='wiki-wissen.de/lee-foto.jpg'">
            <p style="text-align: center"><img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Sir_Tim_Berners-Lee_%28cropped%29.jpg" style="width: 40%"></p>
          </template>
        </template>
      </Card>
      <p><Button fluid @click="screen='internet'" label="Zurück zum Internet"/></p>
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
  </div>
</template>

<script>
import Menubar from 'primevue/menubar';
import { RandomClazz } from '../../../../other/random';
import InputGroup from 'primevue/inputgroup';


export default{
  components: {
    Menubar, InputGroup
  },
  watch: {
    seed(nv,ov){
      this.random.seed=nv;
      this.dns.search="";
      this.randomizeServerIPs(this.server);
      screen="intro";
    }
  },
  props: {
    person: Object,
    seed: Number
  },
  computed: {
    domainFileName(){
      if(!this.domain.server || !this.domain.file) return null;
      return this.domain.server.name+"/"+this.domain.file.name;
    }
  },
  data(){
    return {
      screen: 'intro',
      random: null,
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
      antwortFix: null
    }
  },
  mounted(){
    this.random=new RandomClazz(this.seed);
    this.server=this.createServer();
  },
  methods: {
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
      text=text.trim();
      if(text.length===0){
        this.domain.file=null;
        
        return;
      }
      for(let i=0;i<this.domain.server.files.length;i++){
        let f=this.domain.server.files[i];
        if(f.name===this.domain.search){
          this.domain.file=f;
          return;
        }
      }
      this.domain.file=null;
      this.domain.notFound=true;
    },
    searchDNS(text){
      this.dns.result=null;
      text=text.trim();
      if(text.length===0){
        this.dns.searched=false;
        return;
      }
      this.dns.searched=true;
      for(let i=0;i<this.server.length;i++){
        let s=this.server[i];
        if(s.name && s.name===text){
          this.dns.result=s;
          return;
        }
      }
    },
    searchGoggle(text){
      this.goggle.results=null;
      text=text.trim();
      if(text.length===0){
        return;
      }
      this.goggle.results=[];
      for(let i=0;i<this.server.length;i++){
        let s=this.server[i];
        if(!s.name) continue;
        let pos=s.name.indexOf(text);
        if(pos>=0){
          this.goggle.results.push({
            server: s,
            before: s.name.substring(0,pos),
            hit: s.name.substring(pos,pos+text.length),
            after: s.name.substring(pos+text.length)
          });
        }
      }
    },
    clickServer(s){
      if(s.name){
        this.domain.server=s;
        this.screen="domain";
      }else{
        
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
          ip: 0,
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
      ];
      for(let i=0;i<12;i++){
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
      })
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