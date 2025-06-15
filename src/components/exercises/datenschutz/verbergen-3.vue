<template>
  <ExerciseBody :exercise="$data" maximized no-random ref="body">
    <template #outerintro>
      Die Bewohner der Stadt Amsterdam wurden bereits im 19. Jahrhundert systematisch registriert. Zum Wohle aller?
    </template>
    <template #exercise>
      <Stepper :value="pos+1" linear style="flex: 1">
        <StepList>
          <Step v-for="(t,i) in steps" :value="i+1">{{ t }}</Step>
        </StepList>
        <StepPanels>
          <StepPanel :value="1">
            Der folgende Text stammt von der Seite <a href="https://archief.amsterdam/uitleg/bronnen/96-bevolkingsregistratie">Gemeente Amsterdam Stadsarchief</a> der Stadt Amsterdam, aus dem Niederländischen übersetzt von Google Translator.

            <ol class="teilaufgaben">
              <li>Lies den Text.</li>
              <li>Beantworte folgende Fragen zum Text:
                <ol>
                  <li>Was ist eine "Familienkarte"?</li>
                  <li>Welche Daten wurden auf den Familienkarten festgehalten?</li>
                </ol>
              </li>
              <li>Was denkst du: Welcher Sinn steckt hinter der Registrierung der Einwohner? Warum wurden die Familienkarten angelegt?</li>
            </ol>

            <Card>
              <template #title>Bevölkerungsregistrierung 1851-1994</template>
              <template #content>
              Ab 1893 erfasste die Gemeinde die Bevölkerung Amsterdams nicht mehr nach Adresse in dicken Büchern, sondern in einem Kartensystem pro Familie: den Familienkarten. Ein neuer Zugang nach Adresse kam wenig später über Wohnungsbücher und dann Wohnungskarten hinzu. 

<p>Jede Amsterdamer Familie wurde zwischen 1893 und 1939 auf einer Karte registriert, die auf den Namen des Familienoberhaupts ausgestellt war, normalerweise des Vaters oder Ehemanns. Wenn die Karte voll war, wurde eine Folgekarte hinzugefügt.</p>
<p>Auf einer solchen Familienkarte finden sich die Angaben zum Familienoberhaupt mit Wohnadresse und zu den Familienmitgliedern mit Angabe ihrer Beziehung zum Familienoberhaupt: Ehefrau, Sohn, Tochter - aber auch beispielsweise Schwiegermutter, Tante, Cousin, Pflegekind. Außerdem ist vermerkt, wann sie umgezogen sind und wohin. Beruf, Religion und Staatsangehörigkeit wurden ebenfalls auf der Familienkarte vermerkt. Wenn ein Familienmitglied das Elternhaus verließ und eine eigene Karte bekam, wird dies ebenfalls vermerkt.</p>
<p>Die Gemeinde führte separate Register für Waisenhäuser und Altenheime sowie beispielsweise für Höfe, Feuerwachen und Wohnwagen.</p>

<h4>Beispiel einer Registrierung</h4>

<a style="float: right" href="https://archief.amsterdam/images/images/Handleidingen/Bevolkingsregistratie/5422-0380-4830.png" target="_blank"><img style="width: 500px; max-width: 100%" src="https://archief.amsterdam/images/images/Handleidingen/Bevolkingsregistratie/5422-0380-4830.png"></img></a>
<p>Dies ist die Familienkarte von Johannes van Essen, geboren am 14. Juli 1890.</p> 
<p>Familienkarten bestehen aus einer Vorder- und einer Rückseite, die separat gescannt wurden. Auf der Vorderseite ist das Familienoberhaupt Johannes abgebildet, darunter die Familienmitglieder. Seine Frau Hendrika Anna Vermaat und vier Kinder sind zu sehen: Johannes, Cornelis Johannes, Jacoba Hendrika und Josephus Stefanus Maria. Auch ein Schwager, Hendrikas Bruder Jacobus Petrus, war unter ihrer Adresse registriert.</p>

<p>Man kann häufiger auf der Familienkarte erscheinen, wenn man umgezogen ist und später wieder das Familienoberhaupt wird. Hinter jeder Person sind Geburtsdatum und -ort aufgeführt. Auch Religion, Familienstand und Beruf sind aufgeführt. Auf der rechten Seite sieht man, woher man kam und wohin man ging, mit dem Datum, an dem dies geschah. So sieht man beispielsweise, dass Johannes am 30. August 1924 aus New York kam. Die vorletzte Spalte kann das Sterbedatum enthalten.</p>
</template>
            </Card>
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
              <li>Was denkst du: Hätten die Synchronsprecher vor 5 Jahren gesagt: "Ich habe doch nichts zu verbergen"?<br>Was würden sie heute dazu sagen?</li>
            </ol>
          </StepPanel>
          <StepPanel :value="3">
            Erstelle eine kurze Präsentation über den Film und die vorangegangenen Aufgaben.
          </StepPanel>
        </StepPanels>
      </Stepper>
      <div class="flex justify-between">
        <Button v-if="pos>0" severity="secondary" icon="pi pi-arrow-left" @click="step(-1)" /><span v-else></span>
        <Button v-if="pos<steps.length-1" icon="pi pi-arrow-right" iconPos="right" @click="step(1)" />
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
import Card from 'primevue/card';

export const data={
  id: "verbergen-3",
  title: "Synchronsprecher gegen KI",
  pos: 0,
  steps: ["Text","","Präsentation"],
  tasks: [
    {
      
    }
  ]
}

export default{
  components: {
    Stepper,StepPanels,StepItem,Step,StepPanel,StepList,Message,Dialog, Card
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