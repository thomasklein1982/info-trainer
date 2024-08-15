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
import { boolArrayToInt, intToBoolArray } from './other/bool-array';
import { registerSW } from 'virtual:pwa-register';
import AppPreview from './components/app-preview.vue';
import JFrame from './components/j-frame.vue';
import JLabel from './components/j-label.vue';
import JButton from './components/j-button.vue';
import JPanel from './components/j-panel.vue';
import JTextField from './components/j-text-field.vue';

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


app.component('Button', Button);
app.component('InputText', InputText);
app.component('Card',Card);
app.component('Dialog',Dialog);
app.component('Select',Select);
app.component('Code',Code);
app.component('ConsoleOutput',ConsoleOutput)
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
app.component("JPanel",JPanel);

for(let a in exercises){
  let m=exercises[a];
  app.component(m.data.id,m.default);
}


console.log("fertig");
app.mount('#app');


let array=[true,true,false,false,false,true,false];
let n=boolArrayToInt(array);
let array2=intToBoolArray(n);
let n2=boolArrayToInt(array2);
console.log(array,n,array2,n2);