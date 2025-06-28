<script>
  import Controls from './Controls.svelte';
  import { code, selectedToolchain, runCode, clearOutputs } from '$lib/stores/codeStore';
  import CodeMirror from "svelte-codemirror-editor";
  import { javascript } from "@codemirror/lang-javascript";
  import { oneDark } from "@codemirror/theme-one-dark";
  
  $: langExtension = javascript();

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
    
    <!-- Action Buttons -->
    <div class="flex space-x-2">
      <button 
        on:click={runCode}
        class="py-2 px-4 flex items-center"
        style="background-color: #01F1B3; color: #131312; hover:opacity-90;"
      >
        Run
      </button>
      <button 
        on:click={clearOutputs}
        class="py-2 px-4 flex items-center"
        style="background-color: #222020; color: #01F1B3; border: 1px solid #01F1B3; hover:opacity-90;"
      >
        <img src="clear-icon.png" alt="Clear" class="h-5 w-5 mr-1" />
        Clear
      </button>
    </div>
  </div>
  
  <!-- Code Editor Header -->
  <div class="text-xs py-1 px-3 flex justify-between border-b border-gray-700"
       style="background-color: #1e1e1e; color: #888;">
    <span>Editor</span>
    <span>{$selectedToolchain}</span>
  </div>
  
  <div style="background-color: #131312;
              flex: 1;
              overflow: hidden;
              position: relative;">
    <div style="position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;">
        <textarea
      bind:value={$code}
      style="position: absolute;
             top: 0;
             left: 0;
             right: 0;
             bottom: 0;
             width: 100%;
             height: 100%;
             background-color: #222020;
             color: #ffffff;
             border: none;
             outline: none;
             resize: none;
             padding: 12px;
             font-family: 'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace;
             font-size: 14px;
             line-height: 1.5;
             tab-size: 2;
             overflow: auto;"
      placeholder="Enter your code here..."
      spellcheck="false"
    />
    </div>
  </div>
</div>
