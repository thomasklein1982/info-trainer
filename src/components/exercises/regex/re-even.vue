<template>
  <ExerciseBody :exercise="$data" :regexp="regexp">
    Formuliere einen regulären Ausdruck, der genau die Zeichenketten matcht, die eine gerade Anzahl <code class="code">a</code> enthält, die direkt aufeinander folgen (z. B. <code class="code">Haaaallo</code>).
  </ExerciseBody>
</template>

<script>


export const data={
  id: "re-even",
  title: "Gerade Anzahl",
  regexp: {
    solution: /(^|[^a])(aa)+([^a]|$)/,
    match: [
      /(aa)+/,
      /[b-z]?(aa)+[b-z]?/,
      /[b-z]+(aa)+[b-z]+(aa)+[b-z]+/,
    ],
    skip: [
      /[b-z]?a(aa)+[b-z]?/,
      /[b-z]+a(aa)+[b-z]+a(aa)+[b-z]+/,
      /[b-z]+a[b-z]+a(aa)*[b-z]+/,
      /a(aa)+/,
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