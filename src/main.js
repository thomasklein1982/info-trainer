import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import Select from 'primevue/select';
import Code from './components/code.vue';
import JavaApp from './components/java-app.vue';
import JavaAppLauncher from "./components/java-app-launcher.vue";
import ExercisePath from './components/exercise-path.vue';
import 'prismjs/themes/prism-coy.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs';
import 'primeicons/primeicons.css'
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmPopup from 'primevue/confirmpopup';
import * as exercises from './components/exercises/index';
import ExerciseBody from './components/exercise-body.vue';
import ConsoleOutput from './components/console-output.vue';
import { registerSW } from 'virtual:pwa-register';
import AppPreview from './components/app-preview.vue';
import JFrame from './components/j-frame.vue';
import JLabel from './components/j-label.vue';
import JButton from './components/j-button.vue';
import JPanel from './components/j-panel.vue';
import JTextArea from './components/j-text-area.vue';
import JTextField from './components/j-text-field.vue';
import Hint from './components/hint.vue';
import Example from './components/example.vue';
import OverlayBadge from 'primevue/overlaybadge';
import Check from './components/Check.vue';
import InputCheck from './components/InputCheck.vue';
import JImage from './components/j-image.vue';
import ClipboardJS from 'clipboard';
import ConsoleInputCheck from './components/console-input-check.vue';
import Tooltip from 'primevue/tooltip';
import ToggleButton from 'primevue/togglebutton';
import SelectButton from 'primevue/selectbutton';
import { parseTerm } from './other/parse-term';

const updateSW=registerSW({
  onNeedRefresh(){
    let a=confirm("Eine neue Version ist verfügbar. Willst du aktualisieren (empfohlen!)?");
    if(a){
      updateSW();
    }
  },
  onOfflineReady(){
    console.log("offline ready");
  }
});
export const updateServiceWorker=updateSW;

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: '.my-app-dark',
      }
    }
});
app.use(ConfirmationService);
app.directive('tooltip', Tooltip);

app.component('Button', Button);
app.component('InputText', InputText);
app.component('Card',Card);
app.component('Dialog',Dialog);
app.component('Select',Select);
app.component('Code',Code);
app.component('Hint',Hint);
app.component('Example',Example);
app.component('ConsoleOutput',ConsoleOutput)
app.component('ConsoleInputCheck',ConsoleInputCheck)
app.component("ExerciseBody",ExerciseBody);
app.component("ExercisePath",ExercisePath);
app.component("AppPreview",AppPreview);
app.component("JavaApp",JavaApp);
app.component("JavaAppLauncher",JavaAppLauncher);
app.component("ConfirmPopup",ConfirmPopup);
app.component("JFrame",JFrame);
app.component("JButton", JButton);
app.component("JLabel",JLabel);
app.component("JTextField",JTextField);
app.component("JImage",JImage);
app.component("JPanel",JPanel);
app.component("JTextArea",JTextArea);
app.component("OverlayBatch",OverlayBadge);
app.component("Check",Check);
app.component("InputCheck",InputCheck);
app.component("ToggleButton",ToggleButton);
app.component("SelectButton", SelectButton);

for(let a in exercises){
  let m=exercises[a];
  app.component(m.data.id,m.default);
}

new ClipboardJS(".clipboard");

app.mount('#app');

// console.log(parseTerm("C n (A n B)"));
// console.log(parseTerm("(A n B)"));
// console.log(parseTerm("A n B"));
// console.log(parseTerm("A n B u C n D"));
// console.log(parseTerm("A n (B u C) n D"));
//console.log(parseTerm('s[Name="Thomas"](A n p[Name](B))'));
//console.log(parseTerm("(r[Name>Bla](Abla) n (A n B) ixi[Name=Mieter] C) x Durch"));
