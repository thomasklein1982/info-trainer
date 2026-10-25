<template>
  <ExerciseBody :exercise="$data" inline>
    Gegeben ist das folgende UML-Klassendiagramm.
    <p>Gib jeweils eine einzelne Java-Anweisung an.</p>
    <template #exercise>
      <span class="float-right" v-if="tasks[0]">
        <UmlClazz
          :clazz="tasks[0].uml"
          style="width: 400px"
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

function replaceVariables(text,variables){
  for(let a in variables){
    let v=variables[a];
    text=text.replace(new RegExp("§"+a+"§","g"),v);
  }
  return text;
}

const clazzes=[
  {
    name: "Auto",
    src: `class Auto{
      private String besitzer;
      private double kilometerstand, tankstand;
      Auto(String besitzer){
        this.besitzer=besitzer;
        kilometerstand=0;
        tankstand=0;
      }
      void fahren(double kilometer){
      }
      double getKilometerstand(){
        return kilometerstand;
      }
      void setKilometerstand(double k){
        kilometerstand=k;
      }
      void tanken(double liter){
        tankstand+=liter;

      }
      void uebernehmeBesitzerVon(Auto a){
        besitzer=a.besitzer;
      }
    }`,
    attributes: [
      {name: "besitzer", type: "String"},
      {name: "kilometerstand", type: "double"},
      {name: "tankstand", type: "double"},
      
    ],
    constructorArgs: ["besitzer"],
    methods: [
      {name: "fahren", args: [{name: "kilometer", type: "double"}]},
      {name: "getKilometerstand", type: "double"},
      {name: "tanken", args: [{name: "liter", type: "double"}]},
      {name: "uebernehmeBesitzerVon", args: [{name: "a", type: "Auto"}]}
    ],
    variables: [
      {name: "name", values: ["Alan", "Donald", "John", "Konrad"]},
      {name: "kmStand", values: [5,7,3,10,57,4]},
      {name: "besitzer2", values: ["fo43t4", "58ijg", "welöjjdff", "54utjfg", "dfdff", "fddal"]},
    ],
    tasks: [
      {
        aufgabe: "Es soll ein neues Auto erzeugt und in der Variablen §l0§ gespeichert werden. Der Besitzer des Autos heißt §name§.",
        solution: '§l0§ = new Auto( "§name§" );',
        check: function(variables){
          return (scope,vars)=>{
            let v=getVariableFromScope(vars.l[0],scope);
            if(v.value.besitzer!==variables.name) return false;
            return true;
          };
        },
        preCode: "Auto §l0§;"
      },
      {
        aufgabe: "Das Auto, das in der Variablen §l0§ gespeichert ist, soll um §I0§ Liter aufgetankt werden.",
        solution: '§l0§.tanken( §I0§ );',
        preCode: 'Auto §l0§=new Auto("");',
        check: function(variables){
          return (scope,vars)=>{
            let v=getVariableFromScope(vars.l[0],scope);
            if(Math.abs(v.value.tankstand-vars.I[0])>0.0000001) return false;
            return true;
          };
        }
      },
      {
        aufgabe: "Der Kilometerstand des Autos, das in der Variablen §l0§ gespeichert ist, soll in einer neuen lokalen Variable §l1§ gespeichert werden.",
        solution: 'double §l1§=§l0§.getKilometerstand();',
        check: function(variables){
          return (scope,vars)=>{
            let auto=getVariableFromScope(vars.l[0],scope);
            let v=getVariableFromScope(vars.l[1],scope);
            if(Math.abs(v.value-variables.kmStand)>0.0000001) return false;
            return true;
          };
        },
        preCode: 'Auto §l0§=new Auto("");§l0§.setKilometerstand(§kmStand§);'
      },
      {
        aufgabe: "Das Auto, das in der Variablen §l0§ gespeichert ist, wird an den Besitzer des Autos verkauft, das in der Variablen §l1§ gespeichert ist.",
        solution: '§l0§.uebernehmeBesitzerVon(§l1§);',
        check: function(variables){
          return (scope,vars)=>{
            console.log("uebernehme")
            let auto1=getVariableFromScope(vars.l[0],scope);
            let auto2=getVariableFromScope(vars.l[1],scope);
            let backup=getVariableFromScope("backup",scope);
            if(auto1.value.besitzer!==auto2.value.besitzer) return false;
            return true;
          };
        },
        preCode: 'Auto §l0§=new Auto("Ben");Auto §l1§=new Auto("§besitzer2§");Auto backup=§l1§;'
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
      let rand=Random;
      let clazz=Random.drawFrom(clazzes,1)[0];
      let variables={};
      if(clazz.variables){
        for(let i=0;i<clazz.variables.length;i++){
          let v=clazz.variables[i];
          variables[v.name]=Random.drawFrom(v.values)[0];
        }
      }
      let constructor={
        name: clazz.name,
      };
      if(clazz.constructorArgs){
        constructor.args=[];
        for(let i=0;i<clazz.constructorArgs.length;i++){
          let a=clazz.constructorArgs[i];
          for(let j=0;j<clazz.attributes.length;j++){
            let att=clazz.attributes[j];
            if(att.name===a){
              constructor.args.push(att);
              break;
            }
          }
        }
      }
      let methods=[
        constructor
      ];
      for(let i=0;i<clazz.methods.length;i++){
        let m=clazz.methods[i];
        methods.push(m);
      }
      let uml={
        name: clazz.name,
        attributes: clazz.attributes,
        methods
      };
      let additionalClazzes=[{
        name: clazz.name,
        src: clazz.src
      }];
      let tasks=[];
      for(let i=0;i<this.tasks.length;i++){
        let src=clazz.tasks[i];
        let task={
          aufgabe: replaceVariables(src.aufgabe,variables),
          check: src.check(variables),
          solution: replaceVariables(src.solution,variables),
          preCode: replaceVariables(src.preCode,variables),
          additionalClazzes
        }
        tasks.push(task);
      }
      //   {
      //     aufgabe: `Es wird ein neues Objekt der Klasse <code>${uml.name}</code> erzeugt mit .`,
      //     check: (scope,vars)=>{
      //       let v=getVariableFromScope(vars.l[0],scope);
      //       if(!v.value) return false;
      //       if(!v.value.length===vars.i[0]) return false;
      //       return true;
      //     },
      //     solution: "§l0§ = new §Aint;double;String;boolean§[ §i0§ ];",
      //     preCode: "§Aint;double;String;boolean§[] §l0§;"
      //   },
        
      // ];

      //TODO: Additionalclazzes!
      createOnelinerTasks(Random,resArray,this.tasks,tasks);
      this.tasks[0].uml=uml;
    },
    async check(){
      return await checkOneliner(this);
    }
  }
}
</script>