<template>
  <ExerciseBody :exercise="$data" inline>
    Gib jeweils eine einzelne Java-Anweisung an.
    <template #exercise>
      <span class="float-right" v-if="tasks[0]">
        <UmlClazz
          :clazz="tasks[0].uml"
        />
      </span>
      <ol class="teilaufgaben">
        <li v-for="(t,i) in tasks"><span v-html="t.aufgabe"/>
          <p class="no-print"><InputCheck :auto-check="false" code width="100%" ref="input" :task="t"/>
          </p>
        </li>
      </ol>
    </template>
  </ExerciseBody>
</template>

<script>
import { generateNomen, generateVerb } from '../../../other/generateWord.js';
import { checkOneliner, createOnelinerTasks, getVariableFromScope } from '../../java-interpreter.vue';
import UmlClazz from '../../UmlClazz.vue';

const clazzes=[
  {
    name: "Auto",
    attributes: [
      {name: "kilometerstand", type: "double"},
      {name: "tankstand", type: "double"},
      {name: "besitzer", type: "String"}
    ],
    constructorArgs: ["marke"],
    methods: [
      {name: "getKilometerstand", type: "double"},
      {name: "tanken", args: [{name: "liter", type: "double"}]},
      {name: "fahren", args: [{name: "kilometer", type: "double"}]},
      {name: "uebernehmeBesitzerVon", args: [{name: "a", type: "Auto"}]}
    ],
    tasks: [
      {
        aufgabe: "Es soll ein neues Auto erzeugt und in der Variablen §l0§ gespeichert werden. Der Besitzer des Autos heißt §replace1§.",
        solution: '§l0§ = new Auto( "§replace1§" );',
        preCode: "Auto §l0§"
      },
      {
        aufgabe: "Das Auto, das in der Variablen §l0§ gespeichert ist, soll um §I0§ Liter aufgetankt werden.",
        solution: '§l0§.tanken( §I0§ );',
        preCode: "Auto §l0§=new Auto('');"
      },
      {
        aufgabe: "Der Kilometerstand des Autos, das in der Variablen §l0§ gespeichert ist, soll in einer neu deklarierten Variable §l1§ gespeichert werden.",
        solution: 'double §l1§=§l0§.getKilometerstand();',
        preCode: "Auto §l0§=new Auto('');"
      },
      {
        aufgabe: "Das Auto, das in der Variablen §l0§ gespeichert ist, wird an den Besitzer des Autos verkauft, das in der Variablen §l1§ gespeichert ist.",
        solution: '§l0§.uebernehmeBesitzerVon(§l1§);',
        preCode: "Auto §l0§=new Auto('Ben');Auto §l1§=new Auto('Ada');"
      }
    ]
  }
];

export const data={
  id: "oo-one",
  title: "Java-Oneliners: Objekte erzeugen und verwenden",
  tasks: [
    {}, {}, {}, {}
  ]
}

export default{
  components: {
    UmlClazz
  },
  data() {
    return data;
  },
  methods: {
    create(Random, resArray){
      let rand=Random.int(1000,10000);
      let randPos=Random.int(1,9);
      let nomen=[];
      while(nomen.length<10){
        let n=generateNomen(Random, 3);
        if(nomen.indexOf(n)<0) nomen.push(n);
      }
      let verben=[];
      while(verben.length<5){
        let v=generateVerb(Random,2);
        if(verben.indexOf(v)<0) verben.push(v);
      }
      let name=nomen.pop();
      let attributes=[];
      let attributeCount=Random.int(2,4);
      for(let i=0;i<attributeCount;i++){
        attributes.push(nomen.pop());
      }
      let getMethod="get"+attributes[0];
      let setMethod="set"+attributes[1];
      Random.mixArray(attributes,true);
      let methodCount=Random.int(1,2)
      let methods=Random.drawFrom(verben,methodCount);
      methods.push(setMethod);
      methods.push(getMethod);
      let attrs=[];
      for(let i=0;i<attributes.length;i++){
        let a=attributes[i];
        let type=Random.drawFrom(["int","double","boolean","String"])[0];
        attributes[i]={
          name: a,
          type
        };
        attrs.push("- "+a.toLowerCase()+": "+type);
      }
      let uml={
        name: name,
        attributes: attrs,
        methods
      };
      let tasks=[
        {
          aufgabe: `Es wird ein neues Objekt der Klasse <code>${uml.name}</code> erzeugt mit .`,
          check: (scope,vars)=>{
            let v=getVariableFromScope(vars.l[0],scope);
            if(!v.value) return false;
            if(!v.value.length===vars.i[0]) return false;
            return true;
          },
          solution: "§l0§ = new §Aint;double;String;boolean§[ §i0§ ];",
          preCode: "§Aint;double;String;boolean§[] §l0§;"
        },
        {
          aufgabe: 'Es wird eine Variable namens §l0§ deklariert, die ein Array mit §Aganzen Zahlen;Kommazahlen;Zeichenketten;Wahrheitswerten§ speichern kann.',
          check: (scope,vars)=>{
            let v=getVariableFromScope(vars.l[0],scope);
            if(!v) return false;
            let shouldType=vars.Arrays.A[1];
            if(v.type!==shouldType || v.dimension!==1) return false;
            return true;
          },
          solution: '§Aint;double;String;boolean§[] §l0§;',
          preCode: ""
        },
        {
          aufgabe: "Der Wert von §l0§ wird in das Array §l1§ an der Position des Wertes von §l2§ gespeichert.",
          check: (scope,vars)=>{
            let v=getVariableFromScope(vars.l[1],scope);
            if(!v.value) return false;
            return (v.value[randPos]===rand);
          },
          solution: '§Aint;double;String;boolean§ §w0§;',
          preCode: "int[] §l1§=new int[10]; int §l0§="+rand+"; int §l2§="+randPos+";"
        },
        {
          aufgabe: "Der Wert des Arrays §l1§ an Position §l2§ wird in der Variablen §l0§ gespeichert.",
          check: (scope,vars)=>{
            let v=getVariableFromScope(vars.l[0],scope);
            return (v.value===rand);
          },
          solution: '§l0§ = §l1§[ §l2§ ];',
          preCode: `int[] §l1§=new int[10]; §l1§[${randPos}]=${rand};int §l0§; int §l2§=${randPos};`
        },
      ];
      createOnelinerTasks(Random,resArray,this.tasks,tasks);
      this.tasks[0].uml=uml;
    },
    async check(){
      return await checkOneliner(this);
    }
  }
}
</script>