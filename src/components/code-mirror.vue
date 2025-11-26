<template>
  <div style="width: 100%; height: 100%; overflow: auto" ref="wrapper"></div>
</template>

<script>
import {EditorView, basicSetup} from "codemirror";
import {Compartment,EditorState,StateEffect,StateField} from '@codemirror/state';
import {keymap, Decoration} from '@codemirror/view';
import {indentWithTab, undo, redo} from '@codemirror/commands';
import {LRLanguage,LanguageSupport,foldNodeProp, foldInside, indentNodeProp} from "@codemirror/language";
import {parser as registerParser} from "../parsers/register-parser/register-parser";
import {parser as whileParser } from "../parsers/while-parser/while-parser";
import { oneDark } from '@codemirror/theme-one-dark';

const addLineHighlight = StateEffect.define();

const lineHighlightField = StateField.define({
  create() {
    return Decoration.none;
  },
  update(lines, tr) {
    lines = lines.map(tr.changes);
    for (let e of tr.effects) {
      if (e.is(addLineHighlight)) {
        lines = Decoration.none;
        lines = lines.update({add: [lineHighlightMark.range(e.value)]});
      }
    }
    return lines;
  },
  provide: (f) => EditorView.decorations.from(f),
});

const lineHighlightMark = Decoration.line({
  attributes: {style: 'background-color: rgba(0,255,0,0.2)'},
});

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
        CMD_STORE: tags.keyword,
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
import {lintGutter} from "@codemirror/lint"

const whileLanguage = LRLanguage.define({
  parser: whileParser.configure({ 
    props: [
      styleTags({
        While: tags.keyword,
        Loop: tags.keyword,
        Do: tags.keyword,
        End: tags.keyword,
        Variable: tags.variableName,
        Constant: tags.number,
        Comment: tags.lineComment,
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


function whileLanguageSupport() {
  return new LanguageSupport(whileLanguage);
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

let updateTreeDebounceTimer=null;

export default{
  components: {

  },
  props: {
    modelValue: String,
    language: String,
    highlightedLineNumber: Number,
    linter: Object,
    insertTab: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    highlightedLineNumber(nv,ov){
      this.highlightLine(nv);
    },
    // modelValue(nv,ov){
    //   if(nv===ov) return;
    //   this.setValue(nv);
    // }
  },
  mounted(){
    let editorTheme=new Compartment();
    let extensions=[
      basicSetup,
      keymap.of(this.insertTab? insertTab:indentWithTab),
      editorTheme.of(oneDark),
      lineHighlightField,
      EditorView.updateListener.of((v) => {
        if(!v.docChanged) return;
        this.$emit('update:modelValue', this.getValue());
        clearTimeout(updateTreeDebounceTimer);
        updateTreeDebounceTimer=setTimeout(()=>{
          this.$emit('update-tree',v.state.tree);
        },300);
      }),
    ];
    if(this.language==="register"){
      extensions.push(registerLanguageSupport());
    }else if(this.language==="while"){
      extensions.push(whileLanguageSupport());
    }
    if(this.linter){
      extensions.push(this.linter);
      extensions.push(lintGutter());
    }
    editor = new EditorView({
      state: EditorState.create(
        {
          doc: this.modelValue,
          extensions: extensions
        },
      ),
      
      parent: this.$refs.wrapper,
      
    })
  },
  methods: {
    updateLinter(){
      if(this.linter){
        let lintPlugin=editor.plugin(this.linter[1]);
        if(lintPlugin){
          lintPlugin.set=true;
          lintPlugin.force();
        }
      }
    },
    highlightLine(lineNo) {
      try{
        if (lineNo <= 0) throw "";
        const docPosition = editor.state.doc.line(lineNo).from;
        editor.dispatch({effects: addLineHighlight.of(docPosition)});
      }catch(e){
        editor.dispatch({effects: addLineHighlight.of(-1)});
      }
    },
    undo(){
      undo(editor);
    },
    redo(){
      redo(editor);
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
      return editor.state.doc.lineAt(n);
    }
  }
}
</script>

<style>
.cm-editor{
  height: 100%;
}
</style>