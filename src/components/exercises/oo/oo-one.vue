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
  },
  {
    name: "Pokemon",
    src: `class Pokemon{
      private String name;
      private int leben;
      Pokemon(String name, int leben){
        this.name=name;
        this.leben=leben;
      }
      void heilen(int menge){
        leben+=menge;
      }
      int getLeben(){
        return leben;
      }
      void setLeben(int k){
        leben=k;
      }
      void greifeAn(Pokemon ziel){
        ziel.leben--;
      }
    }`,
    attributes: [
      {name: "name", type: "String"},
      {name: "leben", type: "int"}
      
    ],
    constructorArgs: ["name","leben"],
    methods: [
      {name: "getLeben", type: "int"},
      {name: "greifeAn", args: [{name: "ziel", type: "Pokemon"}]},
      {name: "heilen", args: [{name: "leben", type: "int"}]},
    ],
    variables: [
      {name: "pokemon", values: ["Schiggy", "Glumanda", "Bisasam", "Pikachu"]},
      {name: "leben", values: [20,25,30,35,40,45,50,55,60,65]}
    ],
    tasks: [
      {
        aufgabe: "Es soll ein neues Pokemon namens §pokemon§ erzeugt und in der Variablen §l0§ gespeichert werden. §pokemon§ hat §leben§ Leben.",
        solution: '§l0§ = new Pokemon( "§pokemon§", §leben§ );',
        check: function(variables){
          return (scope,vars)=>{
            let v=getVariableFromScope(vars.l[0],scope);
            if(v.value.name!==variables.pokemon || v.value.leben!==variables.leben) return false;
            return true;
          };
        },
        preCode: "Pokemon §l0§;"
      },
      {
        aufgabe: "Das Pokemon, das in der Variablen §l0§ gespeichert ist, soll sich um §I0§ Leben heilen.",
        solution: '§l0§.heilen( §I0§ );',
        preCode: 'Pokemon §l0§=new Pokemon("", 100);',
        check: function(variables){
          return (scope,vars)=>{
            let v=getVariableFromScope(vars.l[0],scope);
            if(v.value.leben!==100+vars.I[0]) return false;
            return true;
          };
        }
      },
      {
        aufgabe: "In der neu deklarierten Variable §l1§ sollen die Leben des Pokemon gespeichert werden, das in der Variablen §l0§ gespeichert ist.",
        solution: 'double §l1§=§l0§.getKilometerstand();',
        check: function(variables){
          return (scope,vars)=>{
            let p=getVariableFromScope(vars.l[0],scope);
            let v=getVariableFromScope(vars.l[1],scope);
            if(v.value!=variables.leben) return false;
            return true;
          };
        },
        preCode: 'Pokemon §l0§=new Pokemon("",§leben§);'
      },
      {
        aufgabe: "Das Pokemon, das in der Variablen §l0§ gespeichert ist, wird von dem Pokemon, das in der Variablen §l1§ gespeichert ist, angegriffen.",
        solution: '§l1§.greifeAn(§l0§);',
        check: function(variables){
          return (scope,vars)=>{
            let ziel=getVariableFromScope(vars.l[0],scope);
            let p2=getVariableFromScope(vars.l[1],scope);
            if(ziel.value.leben!==99) return false;
            return true;
          };
        },
        preCode: 'Pokemon §l0§=new Pokemon("A",100);Pokemon §l1§=new Pokemon("B", 100);'
      }
    ]
  },
  {
    name: "Person",
    src: `class Person{
      private String name;
      private Person freund;
      private int alter;
      Person(String name, int alter){
        this.name=name;
        this.alter=alter;
      }
      void setAlter(int menge){
        alter+=menge;
      }
      int getAlter(){
        return alter;
      }
      void altereUm(int jahre){
        alter+=jahre;
      }
      void freundeDichAnMit(Person p){
        freund=p;
      }
    }`,
    attributes: [
      {name: "name", type: "String"},
      {name: "alter", type: "int"}
      
    ],
    constructorArgs: ["name","alter"],
    methods: [
      {name: "altereUm", args: [{name: "jahre", type: "int"}]},
      {name: "freundeDichAnMit", args: [{name: "ziel", type: "Person"}]},
      {name: "getAlter", type: "int"},
    ],
    variables: [
      {name: "name", values: ["Ada", "Grace", "Adele", "Jean"]},
      {name: "alter", values: [20,25,30,35,40,45,50,55,60,65]},
      {name: "alter2", values: [20,25,30,35,40,45,50,55,60,65]},
      {name: "name2", values: ["Ada123", "Grace1323", "Adele565", "Jean4dff"]},
    ],
    tasks: [
      {
        aufgabe: "Die §alter§-jährige §name§ soll als neue Person in der Variablen §l0§ gespeichert werden.",
        solution: '§l0§ = new Person( "§name§", §alter§ );',
        check: function(variables){
          return (scope,vars)=>{
            let v=getVariableFromScope(vars.l[0],scope);
            if(v.value.name!==variables.name || v.value.alter!==variables.alter) return false;
            return true;
          };
        },
        preCode: "Person §l0§;"
      },
      {
        aufgabe: "Die Person, die in der Variablen §l0§ gespeichert ist, wird um §I0§ Jahre älter.",
        solution: '§l0§.altereUm( §I0§ );',
        preCode: 'Person §l0§=new Person("", 0);',
        check: function(variables){
          return (scope,vars)=>{
            let v=getVariableFromScope(vars.l[0],scope);
            if(v.value.alter!==vars.I[0]) return false;
            return true;
          };
        }
      },
      {
        aufgabe: "In der Variable §l1§ soll das Alter der Person gespeichert werden, die in der Variablen §l0§ gespeichert ist. Die Variable §l1§ soll neu deklariert werden.",
        solution: 'double §l1§=§l0§.getAlter();',
        check: function(variables){
          return (scope,vars)=>{
            let p=getVariableFromScope(vars.l[0],scope);
            let v=getVariableFromScope(vars.l[1],scope);
            if(v.value!=variables.alter2) return false;
            return true;
          };
        },
        preCode: 'Person §l0§=new Person("",§alter2§);'
      },
      {
        aufgabe: "Die Person, die in der Variablen §l0§ gespeichert ist, freundet sich mit der Person an, die in der Variablen §l1§ gespeichert ist.",
        solution: '§l0§.freundeDichAnMit(§l1§);',
        check: function(variables){
          return (scope,vars)=>{
            let ziel=getVariableFromScope(vars.l[1],scope);
            let p=getVariableFromScope(vars.l[0],scope);
            if(p.value.freund.name!==ziel.value.name) return false;
            return true;
          };
        },
        preCode: 'Person §l0§=new Person("A",100);Person §l1§=new Person("§name2§", 100);'
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