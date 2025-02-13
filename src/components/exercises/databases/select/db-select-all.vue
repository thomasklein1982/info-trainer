<template>
    <ExerciseBody :exercise="$data" :code="code" :database="database">
      Gib alle Daten der Haustier-Tabelle aus.
    </ExerciseBody>
  </template>
  
  <script>
  
  
  export const data={
    id: "db-select-all",
    title: "Alle Daten abfragen",
    database: null,
    check: {
      input: ()=>{
        return "";
      },
      testcases: [
        {
          check: (input, output)=>{
            //if(input.length!==output.length) return false;
            return output.trim()==="Hi!";
          },
          info: 'Es wird "Hi!" auf das Band geschrieben.'
        }
      ]
    },
    code: ""
  };
  
  export default{
    components: {
      
    },
    data() {
      return data;
    },
  }
  </script>