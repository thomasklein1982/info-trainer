import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
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
app.component('Code',Code);
app.component("ExerciseBody",ExerciseBody);
app.component("ExercisePath",ExercisePath);
app.component("JavaApp",JavaApp);
app.component("JavaAppLauncher",JavaAppLauncher);
app.component("ConfirmPopup",ConfirmPopup);


for(let a in exercises){
  let m=exercises[a];
  app.component(m.data.id,m.default);
}


console.log("fertig");
app.mount('#app');
