<template>
  <ExerciseBody :exercise="$data" :java="project">
    <BeePreview :world="world" width="12rem" style="float: right">
      <GameObject image="bee" text="lisa" pos="B"/>
      <GameObject text="3" pos="A" align="center"/>
      <GameObject text="2" pos="a" align="center"/>
      <GameObject text=">" pos="1" align="center"/>
      <GameObject text="1" pos="C" align="center"/>
      <GameObject text="4" pos="c" align="center"/>
      <GameObject text=">" pos="2" align="center"/>
      <GameObject text="2" pos="D" align="center"/>
      <GameObject text="4" pos="d" align="center"/>
      <GameObject text=">" pos="3" align="center"/>
      <GameObject text="" pos="R" align="center" style="background-color: red"/>
    </BeePreview>
    <Hint>Diese Aufgabe entspricht der Aufgabe "Container" aus der <a href="https://bwinf.de/fileadmin/wettbewerbe/bundeswettbewerb/41/1_runde/Bundeswettbewerb_41_Aufgabenblatt_WEB.pdf" target="_blank">ersten Runde des 41. Bundeswettbewerbs Informatik</a>.</Hint>
    <p>Implementiere die Methode <Code inline>void program( Bee lisa )</Code>, die das folgende Problem löst:</p>
    <p>Unsere Biene Lisa soll herausfinden, welche Blume am meisten Nektar liefert. Diese Blume bezeichnen wir als die <strong>beste Blume</strong>.</p>
    <p>Dazu haben andere fleißige Bienen alle Blumen durchnummeriert mit 1, 2, 3, .... und mehrere Male jeweils zwei Blumen miteinander verglichen. Die Ergebnisse ihrer Vergleiche haben sie auf die Wiese geschrieben.</p>
    <p>Das Beispiel im Bild rechts bedeutet:
      <ul>
        <li>Blume Nr. 3 liefert mehr Nektar als Blume Nr. 2</li>
        <li>Blume Nr. 1 liefert mehr Nektar als Blume Nr. 4</li>
        <li>Blume Nr. 2 liefert mehr Nektar als Blume Nr. 4</li>
      </ul>
      (Die linke Blume liefert also immer mehr Nektar als die rechte Blume.)
    </p>
    <p>Die Biene Lisa soll nun herausfinden, welche Blume den meisten Nektar liefert und die Zahl der Blume auf das rote Feld schreiben. Falls Lisa nicht eindeutig bestimmen kann, welche Blume die beste ist, soll sie "?" auf das rote Feld schreiben.</p>
    <p>Im Beispiel könnten die Blumen Nr. 3 und Nr. 1 die besten sein. Die beste Blume lässt sich hier also nicht bestimmen und Lisa müsste ein '?' schreiben.</p>
    <Hint>Deine Programmierung muss für alle unterschiedlichen Anzahlen von Vergleichen funktionieren, nicht nur für drei Vergleiche wie im Beispiel. Auch die Anzahl der Blumen kann jedes Mal unterschiedlich sein.</Hint>
  </ExerciseBody>
</template>

<script>
import { createBeeClazz, GameObjectClazz, GameWorldClazz } from './clazzes';
import BeePreview from '../../bee-preview.vue';
import GameObject from '../../game-object.vue';

export const data={
  id: "bee-heaviest",
  cheats: ["bee"],
  title: "Welche Blume liefert am meisten Nektar?",
  world: [
    "BA1a",
    ".C2c",
    ".D3d",
    ".R.."
  ],
  check: {
    init: async ()=>{
      $Exercise.deleteMain();
      return {
        a: await $new(Main)
      }
    },
    testcases: [
        {
          info: "Am Ende steht die Nummer der besten Blume auf dem roten Feld, wenn es eine eindeutig beste Blume gibt.",
          data: {
            possible: true,
          },
          count: 2
        },
        {
          info: "Am Ende steht '?' auf dem roten Feld, wenn es keine eindeutig beste Blume gibt.",
          data: {
            possible: false
          },
          count: 2
        }
      ],
    test: async (tc,init)=>{
      let infos=await init.a.$appPreviewMethod({seed: $Exercise.random(1000,100000)},tc.possible);
      infos.bee.toMaxSpeed();
      await init.a.program(infos.bee,n);
      let ist=await infos.rot.getValue();
      return (ist===infos.solution);
    }
  },
  project: {
    name: "Bee",
    slowMode: true,
    exerciseData: {
      showAppPreviewWhenNotRunning: true,
      seed: 100,
      seedChange: 1,
    },
    clazzes: [
      {
        name: "Main",
        uml: false,
        hiddenMethods: [
          {
            name: "$realMainMethod",
            jsCode: `async $realMainMethod(exerciseData){
              let infos=await this.$appPreviewMethod(exerciseData);
              await this.program(infos.bee, infos.n);
            }`
          },
          {
            name: "$appPreviewMethod",
            jsCode: `async $appPreviewMethod(exerciseData, possible){
              let random=new Random();
              await random.$constructor(exerciseData.seed);
              let n=random.nextInt(10)+10;
              console.log("n",n);
              let blumen=[];
              let nektar=$Exercise.getRange(1,n);
              $Exercise.randomize(nektar,random);
              for(let i=0;i<n;i++){
                blumen.push({nr: i+1, nektar: nektar[i], kommtVor: false});
              }
              console.log("blumen",blumen);
              if(possible===undefined){
                possible=exerciseData.seed%2==0;
              }
              console.log("possible",possible);
              let solution="?";
              $Exercise.randomize(blumen,random);
              let anzahlGroesste;
              if(possible){
                anzahlGroesste=1;
                solution=blumen[0].nr;
              }else{
                anzahlGroesste=random.nextInt(3)+1;
              }
              for(let i=0;i<anzahlGroesste;i++){
                blumen[i].nektar=n+1;
              }
              //aufsteigend nach nektarmenge sortieren:
              blumen.sort((a,b)=>{ return a.nektar-b.nektar;});

              //rechte Seiten der Vergleiche:
              let vergleiche=[];
              for(let i=0;i<n-anzahlGroesste;i++){
                let bk=blumen[i];
                if(bk.kommtVor) continue;
                let l=$Exercise.random(i+1,n-1,random);
                let bl=blumen[l];
                vergleiche.push({l: bl, r: bk});
                bk.kommtVor=true;
                if(l>=n-anzahlGroesste) bl.kommtVor=true;
              }
              //die groessten noch auf den linken Seiten unterbringen:
              for(let i=n-anzahlGroesste;i<n;i++){
                let bk=blumen[i];
                if(bk.kommtVor) continue;
                let l=$Exercise.random(0,n-anzahlGroesste-1,random);
                let bl=blumen[l];
                vergleiche.push({l: bk, r: bl});
                bk.kommtVor=true;
              }
              console.log("vergleiche",vergleiche,solution);

              let defString=["B..."];
              for(let i=0;i<vergleiche.length-1;i++){
                defString.push("....");
              }
              defString.push(".R..");
              let g=await GameWorld.createFromDefString(defString, 4, 6);
              
              for(let i=0;i<vergleiche.length;i++){
                let v=vergleiche[i];
                let f=await g.getField(1,i+1);
                await f.setValue(v.l.nr+"");
                f=await g.getField(2,i+1);
                await f.setValue(">");
                f=await g.getField(3,i+1);
                await f.setValue(v.r.nr+"");
              }

              let rot=await g.getField(1,0);
              await rot.setStyle("background-color","red");
              
              let bee=await $App.asyncFunctionCall(new Bee(),'$constructor',[null,"konrad",g]);
              await bee.insertAt("B");
              return {
                bee, gameworld: g, n, solution, rot
              };
            }`
          }
        ],
        src: `$void program( Bee lisa ){
  //hierhin kommt der Code
  
}`
      },
      createBeeClazz(),
      GameObjectClazz,
      GameWorldClazz  
    ]
  }
};

export default{
  components: {
    BeePreview, GameObject
  },
  data() {
      return data;
  },
}
</script>