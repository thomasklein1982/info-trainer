import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
//import Aura from '@primevue/themes/lara';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import Code from './components/code.vue';
import JavaApp from './components/java-app.vue';
import JavaAppLauncher from "./components/java-app-launcher.vue";
import Exercise from './components/exercise.vue';
import 'prismjs/themes/prism-coy.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs';
import 'primeicons/primeicons.css'

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});


app.component('Button', Button);
app.component('InputText', InputText);
app.component('Card',Card);
app.component('Dialog',Dialog);
app.component('Code',Code);
app.component("Exercise",Exercise);
app.component("JavaApp",JavaApp);
app.component("JavaAppLauncher",JavaAppLauncher);

console.log("fertig");
app.mount('#app');

// window.onmessage=function(message){
//   let data=message.data;

// }