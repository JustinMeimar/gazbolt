<script>
  import Controls from './Controls.svelte';
  import { code, selectedToolchain, runCode, clearOutputs, hideStdin } from '$lib/stores/codeStore';
  import CodeMirror from "svelte-codemirror-editor";
  import { javascript } from "@codemirror/lang-javascript";
  import { EditorView } from "@codemirror/view";
  import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
  import { tags } from "@lezer/highlight";
  
  $: langExtension = javascript();

  // Custom syntax highlighting styles
  const gazboltHighlight = HighlightStyle.define([
    { tag: tags.comment, color: '#6A9955' },
    { tag: tags.lineComment, color: '#6A9955' },
    { tag: tags.blockComment, color: '#6A9955' },
    { tag: tags.docComment, color: '#6A9955' },
    { tag: tags.string, color: '#CE9178' },
    { tag: tags.character, color: '#CE9178' },
    { tag: tags.number, color: '#B5CEA8' },
    { tag: tags.keyword, color: '#569CD6' },
    { tag: tags.operator, color: '#ffffff' },
    { tag: tags.punctuation, color: '#ffffff' },
    { tag: tags.bracket, color: '#ffffff' },
    { tag: tags.brace, color: '#ffffff' },
    { tag: tags.function(tags.variableName), color: '#DCDCAA' },
    { tag: tags.className, color: '#4EC9B0' },
    { tag: tags.variableName, color: '#9CDCFE' },
    { tag: tags.propertyName, color: '#9CDCFE' },
    { tag: tags.literal, color: '#569CD6' },
    { tag: tags.definition(tags.variableName), color: '#DCDCAA' },
    { tag: tags.typeName, color: '#4EC9B0' },
    { tag: tags.attributeName, color: '#92C5F8' },
    { tag: tags.invalid, color: '#ff6b6b' },
  ]);

  // Custom Gazbolt theme matching site colors
  const gazboltTheme = EditorView.theme({
    "&": {
      color: "#ffffff",
      backgroundColor: "#131312",
    },
    ".cm-content": {
      padding: "12px",
      caretColor: "#01F1B3",
    },
    ".cm-focused .cm-cursor": {
      borderLeftColor: "#01F1B3",
    },
    ".cm-focused .cm-selectionBackground, ::selection": {
      backgroundColor: "#01F1B3",
      color: "#131312",
    },
    ".cm-gutters": {
      backgroundColor: "#1a1a1a",
      color: "#888",
      border: "none",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "#2a2a28",
    },
    ".cm-activeLine": {
      backgroundColor: "#2a2a2820",
    },
    ".cm-selectionMatch": {
      backgroundColor: "#01F1B340",
    },
    ".cm-searchMatch": {
      backgroundColor: "#01F1B360",
      outline: "1px solid #01F1B3",
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#01F1B3",
      color: "#131312",
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "#01F1B320",
      border: "1px solid #01F1B380",
      color: "#01F1B3",
    }
  }, { dark: true });

</script>
<div id="editor-wrapper"
     style="background-color: #222020;
            border: none;
            border-right: 1px solid #333;
            height: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            border-radius: 0;">
  
  <!-- Controls section -->
  <div class="px-3 py-2 border-b border-gray-600" style="background-color: #1a1a1a;">
    <Controls /> 
  </div>
  
  <!-- Code Editor Header -->
  <div class="text-xs py-1 px-3 flex justify-between border-b border-gray-700"
       style="background-color: #1e1e1e; color: #888;">
    <span>Editor</span>
  </div>
  
  <div style="background-color: #131312;
              flex: 1;
              overflow: hidden;
              position: relative;
              display: flex;
              flex-direction: column;">
    <div style="flex: 1; position: relative; min-height: 0;">
      <CodeMirror
        bind:value={$code}
        extensions={[langExtension, syntaxHighlighting(gazboltHighlight)]}
        theme={gazboltTheme}
        placeholder="Enter your code here..."
        class="codemirror-container"
      />
    </div>
  </div>
</div>
