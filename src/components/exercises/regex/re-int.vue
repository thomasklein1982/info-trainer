<template>
  <ExerciseBody :exercise="$data" :regexp="regexp">
    Formuliere einen regulären Ausdruck, der ganze Zahlen erkennt.
    <p>
      Beispiele: <code class="code">23</code>, <code class="code">-302890</code>, <code class="code">0</code>, <code class="code">-0</code>.
    </p>
    <Hint>Ganze Zahlen sind positive und negative Zahlen ohne Komma. Führende Nullen sind nicht erlaubt, z. B.  ist <code class="code">007</code> keine syntaktisch korrekte ganze Zahl.</Hint>
  </ExerciseBody>
</template>

<script>


export const data={
  id: "re-int",
  title: "Ganze Zahlen",
  regexp: {
    solution: /^-?(0|[1-9]\d*)$/,
    match: [
      /-?0/,
      /-?[1-9]/,
      /[1-9]\d+/,
      /-?[1-9]\d+/,
      /-?[1-9]\d{3,5}/,
    ],
    skip: [
      /--[1-9][0-9]*/,
      /[^-0-9]/,
      /[1-9]*[^0-9][1-9]*/,
      /-0/,
      /0\d+/,
      /0{2,5}\d?/,
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