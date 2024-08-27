<template>
  <div style="padding: 0.5rem; width: 100%; height: 100%; overflow: auto">
    <h1>Willkommen beim Info-Trainer</h1>
    <p>Der Info-Trainer soll dabei helfen, Programmieren und andere Informatik-Themen zu lernen.</p>
    <h2>Aufgabenpfade</h2>
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
      <template #title>Turing-Maschinen-Simulator</template>
      <template #content>
        Der Simulator erlaubt es dir, Turingmaschinen zu programmieren und zu testen.
      </template>
      <template #footer>
        <div style="text-align: right">
          <TuringMachineLauncher/>
        </div>
      </template>
    </Card>
    
  </div>
</template>

<script>
import ClassDiagram from './ClassDiagram.vue';
import TuringMachineLauncher from './turing-machine-launcher.vue';

export default{
  components: {
    TuringMachineLauncher, ClassDiagram
  }
}
</script>