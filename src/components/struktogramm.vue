<template>
<div style="background: white; color: black">
  <template v-for="(s,i) in pythonProgram">
    <template v-if="s.type==='IfStatement'">
      <div class="if-block-header">
        <div class="line diagonal-down"/>
        <div class="line diagonal-up"/>
        <div class="if-block-condition">
          {{ s.branches[0].condition.fullCode }}?
        </div>
        <div class="if-header-yes">
          Ja
        </div>
        <div class="if-header-no">
          Nein
        </div>
      </div>
      <div class="if-block-body">
        <div class="if-body-yes block">
          <Struktogramm :python-program="s.branches[0].program"/>
        </div>
        <div class="if-body-no block">
          <Struktogramm :python-program="s.else?.program"/>
        </div>
      </div>
    </template>
    <template v-else-if="s.type==='WhileStatement'">
      <div class="while-block">
        <div class="while-block-condition">
          Solange {{ s.condition.fullCode }}
        </div>
        <div class="while-block-left"/>
        <div class="while-block-program">
          <Struktogramm :python-program="s.program"/>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="block">
        {{ s.fullCode }}
      </div>
    </template>
  </template>
</div>
</template>

<script>
import { parsePython } from './beep-editor/parsePython';

export default {
  components: {

  },
  props: {
    pythonProgram: Array,
    scope: Object
  },
  computed: {
    blocks(){
      console.log(this.pythonProgram)
      return 1;
    }
  }
}
</script>

<style scoped>
.block{
  border: 1pt solid black;
  text-align: center;
}
.if-block-header{
  height: 4rem;
}
.if-block-body{
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.if-block-header{
  display: grid;
  position: relative;
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  border: 1pt solid black;
}
.if-block-condition{
  grid-row: 1;
  grid-column: 2/4;
  justify-self: center;
}
.if-header-yes{
  grid-row: 2;
  grid-column: 1;
}
.if-header-no{
  grid-row: 2;
  grid-column: 4;
  justify-self: end;
}
.if-block-header-lines{
  display: relative;
  grid-row: 1/5;
  grid-column: 1/3;
  place-self: center;
}
.line{
  height: 1pt;
  grid-row: 1/3;
  width: 100%;
  height: 100%;
}
.diagonal-down{
  background: linear-gradient(to top right, white, white 49.3%, black 49.3%, black 50.7%, white 50.7%, white);
  grid-column: 1/3;
}
.diagonal-up{
  background: linear-gradient(to bottom right, white, white 49.3%, black 49.3%, black 50.7%, white 50.7%, white);
  grid-column: 3/5;
}
.while-block{
  display: grid;
  border: 1pt solid black;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1rem 1fr;
}
.while-block-condition{
  grid-row: 1;
  grid-column: 1/3;
}
.while-block-left{
  grid-row: 2;
  grid-column: 1;
}
.while-block-program{
  grid-row: 2;
  grid-column: 2;
}
</style>