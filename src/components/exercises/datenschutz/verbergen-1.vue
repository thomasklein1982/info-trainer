<template>
  <ExerciseBody :exercise="$data" no-random ref="body">
    <template #outerintro>
      Caro ist beim Shoppen, als sie Thomas begegnet.
    </template>
    <template #exercise>
      <Stepper :value="pos+1" linear style="flex: 1">
        <StepList>
          <Step v-for="(t,i) in steps" :value="i+1">{{ t }}</Step>
        </StepList>
        <StepPanels>
          <StepPanel :value="1">
            Schaue Dir den <strong>Kurzfilm Profil</strong> (7 min) auf YouTube an:
            <div class="flex justify-center padding">
              <Button label="Film anschauen" text @click="dialogVisible=true"/>
            </div>
            <Dialog header="Warnung" v-model:visible="dialogVisible">
              <Message icon="pi pi-exclamation-triangle" severity="warn">Dieser Film enthält verstörende Inhalte.</Message>
              <div class="flex justify-center padding-3x">
                <a href="https://www.youtube.com/embed/hy2WCO9Fv00?si=vOnnc5jWUVOucf_y" target="_blank">Film auf YouTube aufrufen</a>
              </div>
              <div style="margin: auto; text-align: center; max-width: 400px; font-size: small; font-style: italic">
                Sobald Du auf den Link klickst, gelangst du zu www.youtube-nocookie.com. Trotz datenschutzfreundlicher Einbindung kann es sein, dass YouTube Cookies verwendet. Bitte beachte dafür die <a href="https://policies.google.com/privacy?hl=de&gl=de" target="_blank">Datenschutzerklärung</a> von YouTube bzw. Google.“
              </div>
              
            </Dialog>
          </StepPanel>
          <StepPanel :value="2">
            <ol class="teilaufgaben">
              <li>Fasse die Handlung in Stichpunkten zusammen.</li>
              <li>Caro ist anfangs misstrauisch.
                <ol>
                  <li>Wie überzeugt "Thomas" sie, dass sie ihm vertrauen kann?</li>
                  <li>Was ist dabei das wichtigste Argument?</li>
                </ol>
              </li>
              <li>Aus welchen Quellen scheint "Thomas" Caros Daten zu haben? Notiere so viele wie möglich!</li>
              <li>Was denkst du: Hätte Caro <strong>vor dem Film</strong> gesagt: "Wer nichts zu verbergen hat, hat auch nichts zu befürchten"?<br>Was würde sie <strong>nach dem Film</strong> dazu sagen?</li>
            </ol>
          </StepPanel>
          <StepPanel :value="3">
            Erstelle eine kurze Präsentation über den Film und die vorangegangenen Aufgaben.
          </StepPanel>
        </StepPanels>
      </Stepper>
      <div class="flex justify-between">
        <Button v-if="pos>0" severity="secondary" label="Zurück" icon="pi pi-arrow-left" @click="step(-1)" /><span v-else></span>
        <Button v-if="pos<steps.length-1" label="Weiter" icon="pi pi-arrow-right" iconPos="right" @click="step(1)" />
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
  id: "verbergen-1",
  title: "Kurzfilm Profil",
  pos: 0,
  dialogVisible: false,
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