<template>
  <ExerciseBody :exercise="$data" :beep="beep">
    <p>Implementiere ein Python-Programm, das das folgende Problem löst:</p>
    <p>Hier gibt es zwei Blumen und eine der beiden liefert mehr Nektar als die andere. Zum Glück haben Lisas Bienen-Kolleginnen auf das gelbe Feld geschrieben, welche der beiden Blumen die bessere ist.</p>
    <p>Auf dem gelben Feld steht entweder <strong>oben</strong> oder <strong>unten</strong>. Je nachdem, was dort steht, soll Lisa zur oberen oder zu unteren Biene fliegen und dort stehen bleiben.</p>
  </ExerciseBody>
</template>

<script>
import { random } from '../../../other/random';


import { Bee } from './Bee';
import { Flower } from './Flower';



export const data={
  id: "beep-target-8",
  cheats: ["beep"],
  title: "Wohin soll Lisa fliegen?",
  beep: {
    world: [
      ".WWO",
      "W...",
      "B.G.",
      ".W..",
      "WWWU"
    ],
    worldWidth: "13rem",
    setupFunc: function(gameworld){
      return {
        oben: new Flower("O","",gameworld),
        unten: new Flower("U","",gameworld,"red"),
        bee: new Bee("B","Lisa",gameworld)
      };
    },
    resetFunc: function(gameworld, data){
      let f=gameworld.getNamedField("G");
      f.text=data.richtung;
      f.style.backgroundColor="yellow";
    },
    testdata: {
      create: function(index){
        let richtung=["oben","unten"][index%2];
        return {
          richtung
        }
      },
      count: 2
    },
    src: ``
  },
  check: {
    testcases: [
      {
        info: "Wenn auf dem gelben Feld <strong>oben</strong> steht, fliegt Lisa zur oberen Blume.",
        check: function(gameworld,data, isProgramOver, scope){
          if(!isProgramOver) return false;
          if(data.richtung!=="oben") return true;
          let bee=gameworld.objects.bee;
          let f=gameworld.objects.oben;
          return bee.isOnSameField(f);
        }
      },
      {
        info: "Wenn auf dem gelben Feld <strong>unten</strong> steht, fliegt Lisa zur unteren Blume.",
        check: function(gameworld,data, isProgramOver, scope){
          if(!isProgramOver) return false;
          if(data.richtung!=="unten") return true;
          let bee=gameworld.objects.bee;
          let f=gameworld.objects.unten;
          return bee.isOnSameField(f);
        }
      },
    ]
  },
};

export default{
  components: {
    
  },
  data() {
      return data;
  }
}
</script>