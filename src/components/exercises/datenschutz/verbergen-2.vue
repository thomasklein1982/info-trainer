<template>
  <ExerciseBody :exercise="$data" no-random ref="body">
    <template #outerintro>
      Synchronsprecher*innen fühlen sich von KI in ihrer Existenz bedroht.
    </template>
    <template #exercise>
      <Stepper :value="pos+1" linear style="flex: 1">
        <StepList>
          <Step v-for="(t,i) in steps" :value="i+1">{{ t }}</Step>
        </StepList>
        <StepPanels>
          <StepPanel :value="1">
            Schaue Dir den Clip <strong>Synchronsprecher und ihre Angst vor der KI</strong> (3 min) an:
            <div class="flex justify-center padding">
              <a href="https://www.arte.tv/de/videos/127210-000-A/synchronsprecher-und-ihre-angst-vor-der-ki/" target="_blank">Film auf ARTE.tv anschauen</a>
            </div>
          </StepPanel>
          <StepPanel :value="2">
            <ol class="teilaufgaben">
              <li>Fasse die Aussagen des Films in Stichpunkten zusammen.</li>
              <li>Bewerte die Aussagen des Films anhand deines Wissens über Datenschutz:
                <ol>
                  <li>Werden hier personenbezogene Daten verarbeitet?</li>
                  <li>Wer ist Betroffener? Wer ist Verantwortlicher?</li>
                  <li>Ist die Verarbeitung rechtmäßig?</li>
                </ol>
              </li>
              <li>Aufgrund von KI hat sich die Bedeutung von Daten grundlegend geändert. Viele sprechen sogar davon, dass Daten die Währung des 21. Jahrhunderts sind.<br>Was meinst du zu diesen Aussagen?</li>
              <li>Was denkst du: Hätten die Synchronsprecher <strong>vor 5 Jahren</strong> gesagt: "Wer nichts zu verbergen hat, hat auch nichts zu befürchten"?<br>Was würden sie <strong>heute</strong> dazu sagen?</li>
            </ol>
          </StepPanel>
          <StepPanel :value="3">
            Erstelle eine kurze Präsentation über den Film und die vorangegangenen Aufgaben.
          </StepPanel>
        </StepPanels>
      </Stepper>
      <div class="flex justify-between">
        <Button v-if="pos>0" severity="secondary" label="Zurück" icon="pi pi-arrow-left" @click="step(-1)" /><span v-else></span>
        <Button v-if="pos<steps.length-1" icon="pi pi-arrow-right" label="Weiter" iconPos="right" @click="step(1)" />
        <template v-else>
          <Button v-if="$refs.body.exerciseData.correct[0]===false" icon="pi pi-check" label="Erledigt" @click="done()"/>
          <Button v-else icon="pi pi-cross" label="Nicht erledigt" @click="notDone()"/>
        </template> 
      </div>
    </template>
  </ExerciseBody>
</template>

<script>
import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import StepItem from 'primevue/stepitem';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
import Message from 'primevue/message';
import Dialog from 'primevue/dialog';

export const data={
  id: "verbergen-2",
  title: "Synchronsprecher gegen KI",
  pos: 0,
  steps: ["Film","Aufgaben","Präsentation"],
  tasks: [
    {
      
    }
  ]
}

export default{
  components: {
    Stepper,StepPanels,StepItem,Step,StepPanel,StepList,Message,Dialog
  },
  computed: {
    
  },
  data() {
    return data;
  },
  methods: {
    step(ds){
      this.pos+=ds;
    },
    done(){
      this.$refs.body.setCorrect(0,true);
    },
    notDone(){
      this.$refs.body.setCorrect(0,false);
    }
  }
}
</script>