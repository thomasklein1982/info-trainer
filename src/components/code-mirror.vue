<template>
  <div style="width: 100%; height: 100%; overflow: auto" ref="wrapper"></div>
</template>

<script>
import {EditorView, basicSetup} from "codemirror";
import {Compartment,EditorState} from '@codemirror/state';
import {keymap} from '@codemirror/view';
import {indentWithTab, undo, redo} from '@codemirror/commands';

//import {javascript} from "@codemirror/lang-javascript"
let editor;

const insertTabFunc = ({ state, dispatch }) => {
    if (state.readOnly) return false;
    const range = state.selection.ranges[0];
    dispatch({
      changes: {
        from: range.from,
        to: range.to,
        insert: "\t"
      },
      selection: {anchor: range.from + 1}
    });
    return true;
};
const insertTab={ key: "Tab", run: insertTabFunc };

export default{
  components: {

  },
  props: {
    modelValue: String,
    insertTab: {
      type: Boolean,
      default: false
    }
  },
  mounted(){
    editor = new EditorView({
      state: EditorState.create(
        {
          doc: this.modelValue,
          extensions: [
            basicSetup,
            keymap.of(this.insertTab? insertTab:indentWithTab),
            EditorView.updateListener.of((v) => {
              if(!v.docChanged) return;
              this.$emit('update:modelValue', this.getValue());
            }),
          ],
        },
      ),
      
      parent: this.$refs.wrapper,
      
    })
  },
  methods: {
    undo(){
      undo();
    },
    redo(){
      redo();
    },
    setValue(code){
      editor.dispatch({
        changes: {from: 0, to: editor.state.doc.length, insert: code}
      });
    },
    getValue(){
      return editor.state.doc.toString();
    },
    lineCount(){
      return editor.state.doc.lines;
    },
    getLine(n){
      return editor.state.doc.line(n+1);
    }
  }
}
</script>

<style>
.cm-editor{
  height: 100%;
}
</style>