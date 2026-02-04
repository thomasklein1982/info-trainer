import {snippetCompletion} from '@codemirror/autocomplete';

export const Methods={
  "move": {
    name: "move",
    args: [],
    run: (gameworld)=>{
      let bee=gameworld.objects.bee;
      bee.move();
    },
    snippet: {
      label: "move()",
      type: "function",
      info: "Bewegt die Biene um 1 Feld in Blickrichtung",
    }
  },
  "left": {
    name: "left",
    args: [],
    run: (gameworld)=>{
      let bee=gameworld.objects.bee;
      bee.turnLeft();
    },
    snippet: {
      label: "left()",
      type: "function",
      info: "Dreht die Biene um 90° nach links.",
    }
  },
  "right": {
    name: "right",
    args: [],
    run: (gameworld)=>{
      let bee=gameworld.objects.bee;
      bee.turnRight();
    },
    snippet: {
      label: "right()",
      type: "function",
      info: "Dreht die Biene um 90° nach rechts.",
    }
  },
  "print": {
    name: "print",
    args: [{name: "text"}],
    info: "Schreibt den text auf das Feld vor der Biene.",
    run: (gameworld,args)=>{
      let bee=gameworld.objects.bee;
      bee.print(args[0]);
    },
    snippet: snippetCompletion("print(${text})",{
      label: "print(text)",
      type: "function",
      info: "Schreibt den text auf das Feld vor der Biene."
    })
  },
  "read": {
    name: "read",
    args: [],
    returns: true,
    run: (gameworld)=>{
      let bee=gameworld.objects.bee;
      return bee.read();
    },
    snippet: {
      label: "read()",
      type: "function",
      info: "Liest den Text, der auf dem Feld vor der Biene steht.",
    }
  }
}