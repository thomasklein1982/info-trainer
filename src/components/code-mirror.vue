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

import {syntaxTree} from "@codemirror/language"
import {linter,lintGutter} from "@codemirror/lint"

function walkTree(node, enter, isFirstChild){
  if(!node) return;
  let goOn=enter(node);
  if(!goOn) return;
  if(node.firstChild){
    walkTree(node.firstChild,enter,true);
  }
  if(isFirstChild){
    while(node.nextSibling){
      node=node.nextSibling;
      walkTree(node,enter,false);
    }
  }
}

const registerLinter = linter(view => {
  let diagnostics=[];
  let tree=syntaxTree(view.state);
  let node=tree.topNode;
  walkTree(node, (node)=>{
    if (node.type.isError){
      let from=node.from;
      let to=node.to;
      let msg="Syntax-Fehler";
      let p=node.parent;
      if(p.name==="Programm"){
        msg="Anweisung erwartet";
      }else if(p.name.startsWith("CMD")){
        msg="Anweisung erwartet";
        p=node.parent.parent;
        from=p.from;
        to=p.to;
      }else if(p.name==="Anweisung"){
        let cmd=p.firstChild;
        if(cmd.name==="CMD_VALUE"){
          msg="Konstante, Register oder Pointer erwartet";
        }else if(cmd.name==="CMD_ZIEL"){
          msg="Sprungmarke erwartet";
        }else if(cmd.name==="CMD_STORE"){
          msg="Register oder Pointer erwartet";
        }
      }else if(node.prevSibling?.name==="Marke"){
        msg="Anweisung erwartet";
      }
      diagnostics.push({
        from: from,
        to: to,
        severity: "warning",
        message: msg
      });
      return false;
    }
    return true;
  },true);
  return diagnostics
})

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
    highlightedLineNumber: Number,
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
        //console.log(v.state.tree.toString());
        this.$emit('update:modelValue', this.getValue());
        this.$emit('update-tree',v.state.tree);
      }),
    ];
    if(this.language==="register"){
      extensions.push(registerLanguageSupport());
      extensions.push(registerLinter);
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