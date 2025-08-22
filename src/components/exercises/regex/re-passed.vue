<template>
  <ExerciseBody :exercise="$data" :regexp="regexp">
    Aus Prüfungsunterlagen soll herausgelesen werden, ob der Prüfling bestanden hat oder nicht. Daher ist ein regulärer Ausdruck gesucht, der genau die Zeichenketten erkennt, die <code class="code">hat bestanden</code> enthalten.
    
    <p>Formuliere einen geeigneten regulären Ausdruck.</p>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "re-passed",
  title: "Bestanden?",
  regexp: {
    solution: /hat bestanden/,
    match: [
      /(Markus|Jasmin|Geralt|Felicitas|Konrad|Fatima|Tarek|Der Prüfling) hat bestanden\./,
      /Am [0-2][1-9]\.0[1-9]\. hat bestanden: (Markus|Jasmin|Geralt|Felicitas|Konrad|Fatima|Tarek)\./,
      /Wer hat bestanden\?/,
    ],
    skip: [
      /(Markus|Jasmin|Geralt|Felicitas|Konrad|Fatima|Tarek|Der Prüfling) hat (nicht|mit gutem Erfolg|mit Erfolg|mit Note [1-6]|herausragend) bestanden\./,
      /(Markus|Jasmin|Geralt|Felicitas|Konrad|Fatima|Tarek|Der Prüfling) hat (Kopfweh|Erfolg|eine Freundin|einen Freund)\./,
      /Die (Teilnehmer|Kinder|Prüflinge) haben bestanden\./,
      /Wer bestanden hat: (Markus|Jasmin|Geralt|Felicitas|Konrad|Fatima|Tarek|Der Prüfling)/,
      /hat bestande[^n]/
    ]
  },
  check: {
    testcases: [
      {}
    ]
  }
}

export default{
  data() {
    return data;
  }
}
</script>