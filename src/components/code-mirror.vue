<template>
  <div style="width: 100%; height: 100%; overflow: auto" ref="wrapper"></div>
</template>

<script>
import {EditorView, basicSetup} from "codemirror";
import {Compartment,EditorState} from '@codemirror/state';
import {keymap} from '@codemirror/view';
import {indentWithTab, undo, redo} from '@codemirror/commands';
import {LRLanguage,LanguageSupport,foldNodeProp, foldInside, indentNodeProp} from "@codemirror/language";
import {parser as registerParser} from "../parsers/register-parser/register-parser";
import { oneDark } from '@codemirror/theme-one-dark';

//import {javascript} from "@codemirror/lang-javascript"
let editor;

import {styleTags, tags} from "@lezer/highlight";

const registerLanguage = LRLanguage.define({
  parser: registerParser.configure({ 
    props: [
      styleTags({
        LOAD: tags.keyword,
        STORE: tags.keyword,
        Ziel: tags.heading,
        CMD_VALUE: tags.keyword,
        CMD_ZIEL: tags.keyword,
        CMD_END: tags.keyword,
        Marke: tags.heading,
        Number: tags.number,
        Comment: tags.lineComment,
        KONSTANTE: tags.atom,
        DIREKT: tags.attributeValue,
        INDIREKT: tags.bool
      }),
      // indentNodeProp.add({
      //   Application: context => context.column(context.node.from) + context.unit
      // }),
      foldNodeProp.add({
        Application: foldInside
      })
    ]
  })
});


function registerLanguageSupport() {
  return new LanguageSupport(registerLanguage);
}
//import {javascript} from "@codemirror/lang-javascript"

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
    language: String,
    insertTab: {
      type: Boolean,
      default: false
    }
  },
  mounted(){
    let editorTheme=new Compartment();
    let extensions=[
      basicSetup,
      keymap.of(this.insertTab? insertTab:indentWithTab),
      editorTheme.of(oneDark),
      EditorView.updateListener.of((v) => {
        if(!v.docChanged) return;
        console.log(v.state.tree.toString());
        this.$emit('update:modelValue', this.getValue());
      }),
    ];
    if(this.language==="register"){
      extensions.push(registerLanguageSupport());
    }
    editor = new EditorView({
      state: EditorState.create(
        {
          doc: this.modelValue,
          extensions: extensions,
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