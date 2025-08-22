<template>
  <ExerciseBody :exercise="$data" :regexp="regexp">
    Formuliere einen regulären Ausdruck, der alle korrekten Datumsangaben in der Form <code class="code">tt.mm.</code> erkennt. <Hint>
      "Korrekt" heißt dabei, dass nur Datumsangaben erlaubt sind, die tatsächlich existieren (also z. B. <code class="code">07.02.</code> oder <code class="code">31.12.</code>, nicht aber <code class="code">30.02.</code> oder <code class="code">31.04.</code>). Da es in Schaltjahren den 29. Februar gibt, ist <code class="code">29.02.</code> auch eine korrekte Datumsangabe.
    </Hint>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "re-date",
  title: "Datumsangaben erkennen",
  regexp: {
    solution: /^(0[1-9]|[1-2][0-9])\.(0[1-9]|1[0-2])\.|30\.(0[13-9]|1[0-2])\.|31\.(0[13578]|10|12)\.$/,
    match: [
      /29\.02\./,
      /(0[1-9])\.(0[1-9]|1[0-2])\./,
      /([1-2][0-9])\.(0[1-9]|1[0-2])\./,
      /30\.(0[13-9]|1[0-2])\./,
      /31\.(0[13578]|10|12)\./,
      /(0[1-9]|[1-2][0-9])\.(0[1-9])\./
    ],
    skip: [
      /30\.02\./,
      /31\.(0[2469]|11)\./,
      /[4-9][0-9]\.([0-9]|1[0-2])\./,
      /0[1-9]\.(1[3-9])\./,
      /\d{3}/,
      /[1-2][0-9]\.0[1-9]/,
    ]
  },
  error: false,
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