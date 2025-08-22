<template>
  <ExerciseBody :exercise="$data" :regexp="regexp">
    Die COOL-Sprache bestehe aus allen Zeichenketten über dem Alphabet <code class="code">{ C, O, L }</code>, die mit einem <code class="code">C</code> beginnen, mit einem <code class="code">L</code> enden und dazwischen mindestens zwei <code class="code">O</code> besitzen (<code class="code">CL</code> und <code class="code">COL</code> sind einfach uncool).
    <p>Formuliere einen regulären Ausdruck, der die COOL-Sprache erkennt.</p>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "re-cool",
  title: "Cool",
  regexp: {
    solution: /^COO+L$/,
    match: [
      /COOL/,
      /COOOL/,
      /COOOOL/,
      /CO{10,15}L/,
    ],
    skip: [
      /CL/,
      /COL/,
      /[FGHJKLMNPQRSTVWXZ]OO+L/,
      /COO+[BCFGHJKMNPQRSTVWXZ]/,
      /COO+L[A-Z]+/,
      /[A-Z]+COO+L/,
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