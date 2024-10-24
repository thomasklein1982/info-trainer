<template>
  <div style="padding: 0.5rem; width: 100%; height: 100%; overflow: auto">
    <h1>Willkommen beim Info-Trainer</h1>
    <template v-if="$root.mode.type==='normal'">
      <Card>
        <template #title>Du bist im <strong>Fortschritts-Modus</strong></template>
        <template #content>
          <p>Jede Aufgabe, die du machst, wird gespeichert.</p>
          <h3>Errungenschaften</h3>
          <div><template v-for="(a,i) in achievements"><span v-tooltip="a.name" :style="{border: '2pt solid '+(a.achieved? 'orange':'black')}" style="overflow: hidden; position: relative; border-radius: 1rem; display: inline-block"><img  :src="a.icon+'.svg'" style="height: 3em; width: 3em;"><div v-if="!a.achieved" style="position: absolute; left: 0; top: 0;bottom: 0; right: 0; background-color: black; opacity: 0.9"/></span></template></div>
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
    <!-- <h2>Aufgabenpfade</h2>
    <p>Klicke auf den Button <Button class="nopointer" text rounded icon="pi pi-bars"/> oben links, um die Aufgabenpfade anzuzeigen und auszuwählen.</p>
    <h2>Zum freien Üben</h2>
    <p>Falls du die Programmierumgebungen unabhängig von den Aufgaben verwenden willst, klicke einfach die jeweilige Software an.</p>
    <Card>
      <template #title>JavaApp</template>
      <template #content>
        Mit JavaApp kannst du Web-Apps mit der Programmiersprache Java entwickeln.
      </template>
      <template #footer>
        <div style="text-align: right">
          <a href="https://thomaskl.uber.space/Apps/java-app/" target="_blank"><Button label="Zu JavaApp"/></a>
        </div>
      </template>
    </Card>
    <Card>
      <template #title>Web-Editor</template>
      <template #content>
        Ein Editor für HTML, CSS und JavaScript.
      </template>
      <template #footer>
        <div style="text-align: right">
          <WebEditorLauncher/>
        </div>
      </template>
    </Card>
    <Card>
      <template #title>Simulator für endliche Automaten</template>
      <template #content>
        Der Simulator erlaubt es dir, endliche Automaten zu programmieren und zu testen.
      </template>
      <template #footer>
        <div style="text-align: right">
          <TuringMachineLauncher
            type="fsm"
          />
        </div>
      </template>
    </Card>
    <Card>
      <template #title>Turing-Maschinen-Simulator</template>
      <template #content>
        Der Simulator erlaubt es dir, Turingmaschinen zu programmieren und zu testen.
      </template>
      <template #footer>
        <div style="text-align: right">
          <TuringMachineLauncher/>
        </div>
      </template>
    </Card> -->
    
  </div>
</template>

<script>
import paths from '../other/exercisePathDefinitions';
import ClassDiagram from './UmlClazz.vue';
import TuringMachineLauncher from './turing-machine-launcher.vue';
import WebEditorLauncher from './web-editor-launcher.vue';
import { isCompletelyTrue } from '../other/bool-array';

export default{
  components: {
    TuringMachineLauncher, ClassDiagram, WebEditorLauncher
  },
  computed: {
    achievements(){
      let achievements=[];
      for(let j=0;j<paths.length;j++){
        let cat=paths[j];
        for(let i=0;i<cat.paths.length;i++){
          let path=cat.paths[i];
          let p={
            name: path.label,
            icon: path.icon,
            achieved: true
          };
          achievements.push(p);
          for(let k=0;k<path.exercises.length;k++){
            let id=path.exercises[k];
            let ed=this.$root.getExerciseData(id);
            if(!ed || !isCompletelyTrue(ed.correct)){
              p.achieved=false;
              break;
            }
          }
        }
      }
      return achievements;
    }
  },
  methods: {
    changeModeToNormal(){
      location.hash="";
      location.reload();
    },
    changeModeToPractise(){
      location.hash="practise";
      location.reload();
    }
  }
}
</script>