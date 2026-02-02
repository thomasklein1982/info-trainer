<template>
  <div>
    <slot name="preview"></slot>
    <slot></slot>
    <slot name="outerintro"></slot>
    <template v-if="isRandomStandardExercise">
      <template v-if="inline">
        <template v-if="showExerciseDialog">
          <div style="height: 100%; width: 100%; display: flex; flex-direction: column">
            <div style="position: relative; width: 100%; flex: 1; height: 100%; display: flex; flex-direction: column">
              <slot name="exercise"></slot>
            </div>
          </div>
          <slot name="footer">
            <template v-if="!noRandom && !noFooter">
              <Button v-if="!exerciseChecked" icon="pi pi-list-check" label="Überprüfen" @click="checkExercise()"/>
              <Button v-else icon="pi pi-refresh" label="Neue Aufgabe" @click="refreshExercise()"/>
            </template>
          </slot>
        </template>
      </template>
      <template v-else>
        <div style="display: grid; place-content: end;">
          <Button label="Aufgabe bearbeiten" @click="showExercise()"/>
          <Dialog modal v-model:visible="showExerciseDialog" :header="title" :class="maximized? 'p-dialog-maximized':''" :maximizable="maximized?false:true" :closable="closable" pt:mask:class="background-black">
            <template #header>
              {{ title }} <ExerciseProgress style="flex: 1" :exercise-data="exerciseData"/>
            </template>
            <div style="height: 100%; width: 100%; display: flex; flex-direction: column">
              <slot></slot>
              <div style="position: relative; width: 100%; flex: 1; height: 100%; display: flex; flex-direction: column">
                <slot name="exercise"></slot>
              </div>
            </div>
            <template #footer>
              <slot name="footer">
                <template v-if="!noRandom && !noFooter">
                  <Button v-if="!exerciseChecked" icon="pi pi-list-check" label="Überprüfen" @click="checkExercise()"/>
                  <Button v-else icon="pi pi-refresh" label="Neue Aufgabe" @click="refreshExercise()"/>
                </template>
              </slot>
            </template>
          </Dialog>
        </div>
      </template>
    </template>
    <template v-else-if="beep">
      <BeepEditor
        :beep="beep"
        :exercise-data="exerciseData"
      />
    </template>
    <div v-else style="display: grid; place-content: end;">
      <template v-if="java">
        <JavaAppLauncher
          :project="project"
          :user-project="userProject"
          :check="exercise.check"
          :exercise-data="exerciseData"
          @exercise-submit="exerciseSubmitted"
          @show-feedback="$refs.dialogFeedback.open()"
        />
      </template>
      <template v-else-if="turingMachine||finiteStateMachine">
        <TuringMachineLauncher
          :exercise-data="exerciseData"
          :machine="machine"
          :type="machineType"
          @show-feedback="$refs.dialogFeedback.open()"
        />
      </template>
      <template v-else-if="registerMachine">
        <RmLauncher
          :exercise-data="exerciseData"
          :machine="registerMachine"
          @show-feedback="$refs.dialogFeedback.open()"
        />
      </template>
      <template v-else-if="regexp">
        <RegexpLauncher
          :exercise-data="exerciseData"
          :regexp="regexp"
        >
          <slot></slot>
        </RegexpLauncher>
      </template>
      <template v-else-if="database">
        <DatabaseLauncher
          :exercise-data="exerciseData"
          :code="code"
          :database="database"
          :mode="dbMode"
        >
          <slot></slot>
        </DatabaseLauncher>
      </template>
    </div>
    <DialogFeedback ref="dialogFeedback" :exercise-data="exerciseData">
      <slot></slot>  
    </DialogFeedback>
  </div>
</template>

<script>
import { calcPoints, difficulty } from "../App.vue";
import { isCompletelyTrue, setArrayToValue } from "../other/bool-array";
import { Random, random } from "../other/random";
import DialogFeedback from "./dialog-feedback.vue";
import ExerciseProgress from "./exercise-progress.vue";
import JavaApp from "./java-app.vue";
import RegexpLauncher from "./regexp-launcher.vue";
import TuringMachineLauncher from "./turing-machine-launcher.vue";

import DatabaseLauncher from "./database-launcher.vue";
import Message from "primevue/message";
import RmLauncher from "./rm-launcher.vue";
import BeepEditor from "./beep-editor/beep-editor.vue";

export default {
  components: {
    JavaApp, DialogFeedback,ExerciseProgress, TuringMachineLauncher, Message, RegexpLauncher, DatabaseLauncher, RmLauncher, BeepEditor
  },
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    exercise: Object,
    showOnlyExercise: {
      type: Boolean,
      default: false
    },
    turingMachine: Object,
    finiteStateMachine: Object,
    registerMachine: Object,
    java: Object,
    regexp: Object,
    database: Object,
    beep: Object,
    dbMode: {
      type: String,
      default: "sql"
    },
    code: String,
    maximized: {
      type: Boolean,
      default: false
    },
    noRandom: {
      type: Boolean,
      default: false
    },
    noFooter: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isRandomStandardExercise(){
      if(this.java || this.turingMachine || this.finiteStateMachine || this.registerMachine || this.regexp || this.database || this.beep) return false;
      return true;
    },
    machine(){
      if(this.finiteStateMachine) return this.finiteStateMachine;
      if(this.turingMachine) return this.turingMachine;
    },
    machineType(){
      if(this.finiteStateMachine) return "fsm";
      if(this.turingMachine) return "tm";
    },
    exerciseChecked(){
      return this.exerciseData?.userProject!==undefined;
    },
    title(){
      return this.exercise.title;
    },
    testCaseCount(){
      return this.exerciseData.data.check.testcases.length;
    },
    project(){
      if(!this.java) return null;
      let p=JSON.parse(JSON.stringify(this.java));
      let mode=difficulty;
      if(p.clazzes){
        for(let i=0;i<p.clazzes.length;i++){
          let c=p.clazzes[i];
          if(c.modes && c.modes.indexOf(mode)<0){
            p.clazzes.splice(i,1);
            i--;
          }
        }
      }
      return p;
    },
    userProject(){
      if(this.exerciseData.userProject){
        return this.exerciseData.userProject;
      }else{
        return null;
      }
    },
    id(){
      return this.exercise.id;
    },
    exerciseData(){
      let root;
      root=this.$root;
      if(this.id===undefined) return;
      let ed=root.getExerciseData(this.id,this.exercise);
      return ed;
      //return root.setExerciseData(this.exercise);
    }
  },
  data(){
    return {
      showExerciseDialog: false,
      seed: 0,
      closable: true
    };
  },
  async mounted(){
    if(this.isRandomStandardExercise && this.inline){
      await this.showExercise();
    }
  },
  methods: {
    async showExercise(){
      console.log("show exercise",this.id);
      if(this.noRandom){
        this.showExerciseDialog=true;
        return;
      }
      let resArray;
      if(this.exerciseData?.userProject!==undefined){
        this.seed=this.exerciseData.userProject;
        resArray=this.exerciseData.correct;
      }else{
        this.seed=random(1000,99999999);
        resArray=undefined;
      }
      Random.setSeed(this.seed);
      await this.$parent.create(Random,resArray);
      this.showExerciseDialog=true;
      this.$root.save();
    },
    exerciseSubmitted(data){
      //this.exerciseData.count=data.testCaseCount;
      if(data.resArray){
        if(data.resArray.length===0 && this.exerciseData.data.check.testcases.length>0){
          data.resArray=[];
          for(let i=0;i<this.exerciseData.data.check.testcases.length;i++){
            data.resArray.push(false);
          }
        }
        this.exerciseData.correct=data.resArray;
        calcPoints(this.exerciseData);
      }
      if(data.project){
        let clazzes=[];
        for(let i=0;i<data.project.clazzes.length;i++){
          let c=data.project.clazzes[i];
          if(!c.isHidden){
            clazzes.push(c);
          }
        }
        data.project.clazzes=clazzes;
        this.exerciseData.userProject=data.project;
      }
      this.$root.save(this.exerciseData);
    },
    async checkExercise(){
      let resArray=await this.$parent.check();
      this.exerciseData.correct=resArray;
      this.exerciseData.userProject=this.seed;
      calcPoints(this.exerciseData);
      this.$root.save(this.exerciseData);
    },
    setCorrect(index,value){
      this.exerciseData.correct[index]=value;
      calcPoints(this.exerciseData);
      this.$root.save(this.exerciseData);
    },
    getCorrect(index){
      return this.exerciseData.correct[index];
    },
    refreshExercise(){
      this.seed=random(1000,99999999);
      Random.setSeed(this.seed);
      this.$parent.create(Random);
      delete this.exerciseData.userProject;
      setArrayToValue(this.exerciseData.correct,false);
      calcPoints(this.exerciseData);
      this.$root.save();
    }
  }
}
</script>