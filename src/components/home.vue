<template>
  <div style="padding: 0.5rem; width: 100%; height: 100%; overflow: auto">
    <h1>Willkommen beim Info-Trainer</h1>
    
    <template v-if="$root.mode.type==='normal'">
      <Card>
        <template #title>Du bist im <strong>Fortschritts-Modus</strong></template>
        <template #content>
          <p>Jede Aufgabe, die du machst, wird gespeichert. Schließe Aufgabenpfade ab, um Achievements zu erhalten.</p>
          <h3>Achievements</h3>
          <div><template v-for="(a,i) in achievements"><span class="achievement" v-tooltip="a.name" @click="openPath(a)" :style="{border: '2pt solid '+(a.solved===a.count? 'orange':'black')}" style="overflow: hidden; position: relative; border-radius: 1rem; display: inline-block"><img :src="a.icon+'.svg'" style="height: 3em; width: 3em;"><div style="position: absolute; left: 0; top: 0; right: 0; background-color: black; opacity: 0.9" :style="{height: ((a.count-a.solved)*100/a.count)+'%'}"/></span></template></div>
        </template>
      </Card>
      <Card>
        <template #title>Modus wechseln</template>
        <template #content>
          Wenn du Aufgaben wiederholen willst, kannst du in den <strong>Wiederholungs-Modus</strong> wechseln: In diesem Modus kannst du Aufgaben, die du bereits gelöst hast, noch einmal neu lösen, ohne dass die alte Lösung verloren geht.
          <div style="text-align: right">
            <Button label="In den Wiederholungs-Modus wechseln" @click="changeModeToPractise()"/>
          </div>
        </template>
      </Card>
    </template>
    <template v-else-if="$root.mode.type==='practise'">
      <Card>
        <template #title>Du bist im <strong>Wiederholungs-Modus</strong></template>
        <template #content>Alle Aufgaben können neu bearbeitet werden. Die neue Lösung wird nur dann gespeichert, wenn sie besser ist als die alte Lösung.</template>
      </Card>
      <Card>
        <template #title>Modus wechseln</template>
        <template #content>
          Wenn du nicht mehr wiederholen willst, kannst du in den <strong>Fortschritts-Modus</strong> wechseln: In diesem Modus werden alle Aufgaben, die du bearbeitest, gespeichert.
          <div style="text-align: right">
            <Button label="In den Fortschritts-Modus wechseln" @click="changeModeToNormal()"/>
          </div>
        </template>
      </Card>
    </template>
    <Card>
      <template #title>Gespeicherte Daten</template>
      <template #content>
        Im lokalen Speicher deines Browsers werden deine Lösungen zu den Aufgaben gespeichert. Aktuell sind etwa <strong>{{ $root.userDataSizeDisplay }}</strong> gespeichert.
        <p style="text-align: left">
          <SpeedDial :model="savedDataActions" direction="right"/>
        </p>
      </template>
    </Card>
    <Card>
      <template #title>Aufgabenblatt erstellen</template>
      <template #content>
        Du kannst beliebige Aufgaben zu einem <strong>Aufgabenblatt (AB)</strong> zusammenfassen. Dieses AB kannst du dann per Link teilen.
        <div style="text-align: right">
          <template v-if="ab===null">
            <Button label="AB importieren" @click="importAB.show=true"/>
            <Button label="AB erstellen" @click="createAB()"/>
          </template>
          <Button v-else label="AB entfernen" @click="removeAB()"/>
        </div>
        <div v-if="ab">
          <p style="text-align: center"><template v-if="linkToAB"><a :href="linkToAB" target="_blank">Link zum AB</a> <Button class="clipboard" size="small" text :data-clipboard-text="linkToAB" icon="pi pi-copy" label="Kopieren"/></template><template v-else>Füge Aufgaben hinzu, damit der Link erzeugt wird.</template></p> 
          Titel: <InputText v-model="ab.label"/>
          JavaApp-Schwierigkeit: <Select v-model="ab.diff" option-label="label" option-value="value" :options="difficultyOptions"/>
          <ExercisePath :path="ab" disabled/>
        </div>
      </template>
    </Card>
    <Card>
      <template #title>Playgrounds</template>
      <template #content>
        Hier kannst du die verschiedenen Editoren des Info-Trainers nutzen für andere Zwecke als die Aufgaben.
      </template>
      <template #footer>
        <div style="text-align: right">
          <a href="https://thomaskl.uber.space/Apps/java-app/" target="_blank"><Button label="Zu JavaApp"/></a>
          <TuringMachineLauncher
            type="fsm"
          />
          <TuringMachineLauncher/>
          <RmLauncher/>
          <WhileLauncher/>
          <DatabaseLauncher :database="database" allow-choose-database allow-choose-mode/>
        </div>
      </template>
    </Card>
    <Dialog ref="importABDialog" header="AB importieren" v-model:visible="importAB.show" :closable="true" maximizable>
      Geben Sie einen Link zu einem Arbeitsblatt ein, um das Arbeitsblatt zu importieren:
      <p>
        <InputText v-model="importAB.link" placeholder="Link zum Arbeitsblatt"/>
        
      </p>
      <template #footer>
        <Button icon="pi pi-check" label="Importieren" @click="importABFromLink(importAB.link)"/>
      </template>
    </Dialog>
  </div>
</template>

<script>
import paths from '../other/exercisePathDefinitions';
import ClassDiagram from './UmlClazz.vue';
import TuringMachineLauncher from './turing-machine-launcher.vue';
import WebEditorLauncher from './web-editor-launcher.vue';
import { isCompletelyTrue } from '../other/bool-array';
import ExercisePath from './exercise-path.vue';
import SpeedDial from 'primevue/speeddial';
import Select from 'primevue/select';
import DatabaseLauncher from './database-launcher.vue';
import empty from './exercises/databases/databases/empty';
import RmLauncher from './rm-launcher.vue';
import Dialog from 'primevue/dialog';
import { parseABLink } from '../other/parseABLink';
import WhileLauncher from './while-launcher.vue';

export default{
  components: {
    TuringMachineLauncher, ClassDiagram, WebEditorLauncher, ExercisePath, SpeedDial, Select, DatabaseLauncher, RmLauncher, Dialog, WhileLauncher
  },
  props: {
    ab: Object
  },
  computed: {
    linkToAB(){
      if(!this.ab || this.ab.exercises.length===0) return null;
      let hash=this.ab.label+"[";
      for(let i=0;i<this.ab.exercises.length;i++){
        if(i>0) hash+=",";
        let ex=this.ab.exercises[i];
        let path=this.ab.paths[ex]?.trim();
        let t=ex;
        if(path){
          t+="{"+path+"}";
        }
        hash+=t;
      }
      hash+="]"+this.ab.diff;
      hash=encodeURI(hash);
      return location.origin+location.pathname+"#ab="+hash;
    },
    achievements(){
      let achievements=[];
      for(let j=0;j<paths.length;j++){
        let cat=paths[j];
        for(let i=0;i<cat.paths.length;i++){
          let path=cat.paths[i];
          let p={
            name: path.label,
            icon: path.icon,
            solved: 0,
            count: 0,
            path
          };
          achievements.push(p);
          for(let k=0;k<path.exercises.length;k++){
            let id=path.exercises[k];
            let ed=this.$root.getExerciseData(id);
            if(!ed) continue;
            p.count++;
            if(isCompletelyTrue(ed.correct)){
              p.solved++;
            }
          }
        }
      }
      return achievements;
    }
  },
  methods: {
    openPath(achievement){
      this.$emit("open-exercise-path", achievement.path);
    },
    importABFromLink(link){
      let ok=this.$root.importABFromLink(link);
      if(!ok){
        alert("Ungültiger Link");
      }
      this.importAB.show=false;
    },
    removeSavedData(){
      let a=confirm("Bist du wirklich sicher, dass du alle Lösungen und deinen gesamten Fortschritt löschen willst?\n\nDies kann nicht rückgängig gemacht werden!");
      if(!a) return;
      this.$root.removeSavedUserData();
    },
    downloadSavedData(){
      this.$root.downloadSavedData();
    },
    uploadSavedData(){
      this.$root.uploadSavedData();
    },
    changeModeToNormal(){
      location.hash="";
      location.reload();
    },
    changeModeToPractise(){
      location.hash="practise";
      location.reload();
    },
    createAB(){
      this.$root.createAB();
    },
    removeAB(){
      this.$root.removeAB();
    }
  },
  data(){
    return {
      database: empty,
      importAB: {
        show: false,
        link: ""
      },
      difficultyOptions: [
        {
          label: "keine Festlegung",
          value: "n"
        },
        {
          label: "Easy",
          value: "Easy"
        },
        {
          label: "Normal",
          value: "Normal"
        },
        {
          label: "Hard",
          value: "Hard"
        }
      ],
      savedDataActions: [
        {
          label: "Herunterladen",
          icon: "pi pi-download",
          command: (ev)=>{
            this.downloadSavedData();
          }
        },
        {
          label: "Hochladen",
          icon: "pi pi-upload",
          command: (ev)=>{
            this.uploadSavedData();
          }
        },
        {
          label: "Löschen",
          icon: "pi pi-trash",
          command: (ev)=>{
            this.removeSavedData();
          }
        },
      ]
    }
  }
}
</script>

<style scoped>
  .achievement:hover{
    transform: scale(1.2);
  }
  .achievement{
    cursor: pointer;
    transition: transform 0.4s;
  }
</style>