<template>
  <ExerciseBody :exercise="$data" :java="project">
    In dieser Aufgabe soll der MergeSort-Algorithmus Schritt für Schritt implementiert werden.
    <ol class="teilaufgaben">
      <li>
        Die Methode <Code no-numbers>void merge ( Person[] array, Person[] hilfsarray, int von, int von2, int bis )</Code> geht davon aus, dass das Array <Code inline>array</Code> innerhalb der beiden Bereiche 
        <ul>
          <li>Index <Code inline>von</Code> bis Index <Code inline>von2</Code> - 1</li>
          <li>Index <Code inline>von2</Code> bis Index <Code inline>bis</Code></li>
        </ul>
        aufsteigend nach dem Alter sortiert ist.
        <p>Die Methode soll nun bewirken, dass diese beiden Bereiche so zusammengeführt werden, dass der komplette Bereich von Index <Code inline>von</Code> bis Index <Code inline>bis</Code> aufsteigend nach dem Alter der Personen sortiert ist (siehe Beispiel).</p>
        <p>Das Array <Code inline>hilfsarray</Code> darf dazu als Zwischenspeicher verwendet werden. Es hat dieselbe Länge wie <Code inline>array</Code>.</p>
        <p>Außerhalb des Bereichs von Index <Code inline>von</Code> bis Index <Code inline>bis</Code> darf das Array <Code inline>array</Code> nicht verändert werden.</p>
        <Example>
          Gegeben ist das Array
          <p style="font-size: 130%"><code>
            <div>0: {"Tom",41},</div> 
            <div>1: {"Jan",13},</div>
            <div>2: {"Zora",25},</div>
            <div>3: {"Ada",30},</div>
            <div>4: {"Tim",8},</div>
            <div>5: {"Lea",17}</div>
          </code></p>
          Hier sind die beiden Bereiche 
          <p><span style="color: red">Index 1 bis Index 3</span> und <span style="color: yellow">Index 4 bis Index 5</span></p>
          bereits nach dem Alter sortiert:
          <p style="font-size: 130%"><code>
            <div>0: {"Tom",41},</div> 
            <div style="color: red">
              <div>1: {"Jan",13},</div>
              <div>2: {"Zora",25},</div>
              <div>3: {"Ada",30},</div>
            </div>
            <div style="color: yellow">
              <div>4: {"Tim",8},</div>
              <div>5: {"Lea",17}</div>
            </div>
          </code></p>
          Der Aufruf <Code no-numbers>merge ( array, hilfsarray, 1, 4, 5 )</Code> soll also bewirken, dass diese beiden Bereiche unter Beibehaltung der Sortierung zusammengeführt werden. Das Ergebnis soll also so aussehen:
          <p style="font-size: 130%"><code>
            <div>0: {"Tom",41},</div> 
            <div style="color: orange">
              <div>1: {"Tim",8},</div>
              <div>2: {"Jan",13},</div>
              <div>3: {"Lea",17}</div>
              <div>4: {"Zora",25},</div>
              <div>5: {"Ada",30},</div>
            </div>
          </code></p>
        </Example>
        Implementiere diese Methode.
        <Hint>Wichtig: die beiden Bereiche sind immer direkt miteinander benachbart.</Hint>
      </li>
      <li>
        Die Methode <Code>void doMergeSort(Person[] array, Person[] hilfsarray, int von, int bis)</Code> soll das Array <Code inline>array</Code> im Bereich von Index <Code inline>von</Code> bis Index <Code inline>bis</Code> aufsteigend nach dem Alter sortieren. Die Laufzeit der Methode muss schneller als quadratisch sein.
        <p>Das Array <Code inline>hilfsarray</Code> darf dazu als Zwischenspeicher verwendet werden. Es hat dieselbe Länge wie <Code inline>array</Code>.</p>
        <p>Außerhalb des Bereichs von Index <Code inline>von</Code> bis Index <Code inline>bis</Code> darf das Array <Code inline>array</Code> nicht verändert werden.</p>
        <p>Implementiere diese Methode.</p>
      </li>
      <li>Erkläre den Code der Methode <Code inline>mergeSort</Code>:
        <Code>public void mergeSort ( Person[] array) {
  doMergeSort ( array, new Person[array.length], 0, array.length - 1 );
}</Code>
      </li>
    </ol>
    <Hint></Hint>
  </ExerciseBody>
</template>

<script>

export const data={
  id: "merge",
  title: "MergeSort",
  check: {
    init: async ()=>{
      return {
        ok: true
      }
    },
    testcases: [
      {
        data: ()=>{
          return {
            test: async (personen,hilfsarray)=>{
              let von=$Exercise.random(0,personen.length-5);
              let von2=$Exercise.random(von+1,personen.length-3);
              let bis=$Exercise.random(von2+1,personen.length-1);
              let a=$Exercise.random(0,100);
              for(let i=von;i<von2;i++){
                personen[i].alter=a;
                a+=$Exercise.random(1,10);
              }
              a=$Exercise.random(0,100);
              for(let i=von2;i<=bis;i++){
                personen[i].alter=a;
                a+=$Exercise.random(1,10);
              }
              let soll=[];
              for(let i=von;i<=bis;i++){
                soll.push(personen[i]);
              }
              soll.sort((a,b)=>{
                return a.alter-b.alter;
              });
              await $main.merge(personen,hilfsarray,von,von2,bis);
              for(let i=von;i<=bis;i++){
                if(soll[i-von]!==personen[i]) return false;
              }
              return true;
            }
          }
        },
        info: "Die Methode <code class='code'>merge</code> funktioniert.",
        count: 15,
        points: 1
      },
      {
        data: ()=>{
          return {
            test: async (personen,hilfsarray)=>{
              console.log("mergesort",JSON.parse(JSON.stringify(personen)));
              
              let von=$Exercise.random(0,2);
              let bis=$Exercise.random(personen.length-3,personen.length-1);
              console.log(von,bis);
              let sorted=[];
              for(let i=von;i<=bis;i++){
                sorted.push(personen[i]);
              }
              console.log(JSON.parse(JSON.stringify(sorted)));
              sorted=sorted.sort((a,b)=>{
                return a.alter-b.alter;
              });
              console.log("sortiert",JSON.parse(JSON.stringify(sorted)));
              for(let i=0;i<von;i++){
                sorted.splice(i,0,personen[i]);
              }
              console.log("ohne ende",JSON.parse(JSON.stringify(sorted)));
              for(let i=bis+1;i<personen.length;i++){
                sorted.push(personen[i]);
              }
              console.log("komplett",JSON.parse(JSON.stringify(sorted)));
              await $main.doMergeSort(personen,hilfsarray,von,bis);
              console.log(personen);
              for(let i=0;i<sorted.length;i++){
                if(sorted[i]!==personen[i]) return false;
              }
              return true;
            }
          }
        },
        info: "Die Methode <code class='code'>doMergeSort</code> sortiert die Personen im angegebenen Bereich (und lässt alles andere unverändert).",
        count: 10,
        points: 1
      },
      {
        data: ()=>{
          return {
            createSelf: true,
            test: async ()=>{
              await System.out.println("PRÜFE LAUFZEIT, DAS KANN EINIGE SEKUNDEN DAUERN!");
              await $Exercise.sleep(100);
              let n=50;
              let timeThreshold=500;
              let time,lastTime=-1;
              do{
                if(lastTime>timeThreshold){
                  n*=3;
                }else{
                  n*=2;
                }
                let array=$Exercise.getRandomIntArray(n,{forbidMultiple: true});
                let personen=[];
                for(let i=0;i<array.length;i++){
                  personen.push(new Person("",array[i]));
                }
                let ha=new Array(n);
                let start=Date.now();
                // if(lastTime>timeThreshold){
                //   let maxTime=lastTime*6;
                //   console.log(maxTime);
                //   let p1=new Promise(async (res,rej)=>{
                //     setTimeout(()=>{
                //       console.log("too slow");
                //       res(false);
                //     },maxTime);
                //   });
                //   let p2=new Promise(async (res,rej)=>{
                //     $main.doMergeSort(personen,ha,0,n-1).then(()=>{
                //       console.log("fast enough");
                //       res(true);
                //     });
                //   });

                //   Promise.race([p1, p2]).then((value) => {
                //     console.log(value);
                //     return value;
                //   });
                  
                // } 
                await $main.doMergeSort(personen,ha,0,n-1);
                let stop=Date.now();
                time=stop-start;
                if(lastTime>timeThreshold){
                  return time<lastTime*4
                }
                lastTime=time;
                
              }while(n<1000000);
              return true;
            }
          }
        },
        info: "Die Laufzeit von <code class='code'>doMergeSort</code> ist schneller als quadratisch."
      }
    ],
    test: async (tc,init)=>{
      console.log("tc",tc,tc.createSelf,init);
      if(tc.createSelf){
        if(!init.ok) throw "nicht getestet";
        console.log("teste laufzeit");
        return tc.test();
      }
      let array=$Exercise.getRandomObjectArray({
        name: ["Ahmad","Konrad","Elisabeth","Felicitas","Justus","Valerie","Kenan","Fatima","Ayla","Nikolas","Theresa","Ben","Mia","Frauke","Gerd","Thomas","Maria","Frank","Meltem","Hannes","Berta","Ramon"],//22 Namen
        alter: $Exercise.getRange(5,99)
      },$Exercise.random(15,20));
      let personen=[];
      for(let i=1;i<array.length;i++){
        let p=new Person();
        p.name=array[i].name;
        p.alter=array[i].alter;
        personen.push(p);
      }
      let res=tc.test(personen,new Array(personen.length));
      if(!res){
        init.ok=false;
      }
      return res;
    },
  },
  project: {
    clazzes: [
      {
        name: "Main",
        src: `void merge ( Person[] array, Person[] hilfsarray, int von, int von2, int bis){
  
}

void doMergeSort ( Person[] array, Person[] hilfsarray, int von, int bis ){
  
}

$void main(){
  Person[] personen = new Person[]{
    new Person("Tom",41),
    new Person("Jan",13),
    new Person("Zora",25),
    new Person("Ada",30),
    new Person("Tim",8),
    new Person("Lea",17)
  };
  Person[] hilfsarray = new Person[personen.length];
  merge ( personen, hilfsarray, 1, 4, 5 );
  System.out.println( JSON.stringify(personen) );
  doMergeSort ( personen, hilfsarray, 0, 5 );
  System.out.println( JSON.stringify(personen) );
}`
      },
      {
        name: "Person",
        src: `String name;
        int alter;

        Person(String name, int alter){
          this.name=name;
          this.alter=alter;
        }`
      }
    ]
  }
};

export default{
  components: {
    
  },
  data() {
      return data;
  },
}
</script>