<template>
  <table class="database-relation">
    <template v-if="relation">
      <tr>
        <th v-for="(c,i) in relation.columns">{{ c }}</th>
      </tr>
      <tr v-for="(r,i) in relation.values">
        <td v-for="(c,j) in r">{{ (c===null||c===undefined)? 'NULL':c }}</td>
      </tr>
    </template>
  </table>
</template>

<script>

export default{
  components: {

  },
  props: {
    relation: Object
  }
}
</script>