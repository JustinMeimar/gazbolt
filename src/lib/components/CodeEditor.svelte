<script>
  import Controls from './Controls.svelte';
  import { code, selectedToolchain, runCode, clearOutputs } from '$lib/stores/codeStore';
  
  // Import svelte-codemirror-editor
  import CodeMirror from "svelte-codemirror-editor";
  
  // Import language support
  import { javascript } from "@codemirror/lang-javascript";
  
  // Import theme
  import { oneDark } from "@codemirror/theme-one-dark";
  
  // Map toolchain to language extension
  $: langExtension = getLangExtension($selectedToolchain);
  
  function getLangExtension(toolchain) {
    switch(toolchain) {
      case 'TypeScript':
      case 'JavaScript':
        return javascript();
      // case 'Python':
      //   return python();
      // case 'Rust':
      //   return rust();
      // case 'Go':
      //   return go();
      default:
        return javascript();
    }
  }
</script>

<div style="background-color: #222020; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); height: 100%; display: flex; flex-direction: column;">
  <!-- Controls section -->
  <div class="p-4 border-b" style="border-color: #444;">
    <Controls />
    
    <!-- Action Buttons -->
    <div class="flex space-x-2">
      <button 
        on:click={runCode}
        class="py-2 px-4 rounded-md flex items-center"
        style="background-color: #01F1B3; color: #131312; hover:opacity-90;"
      >
        <img src="/static/play-icon.png" alt="Run" class="h-5 w-5 mr-1" />
        Run
      </button>
      <button 
        on:click={clearOutputs}
        class="py-2 px-4 rounded-md flex items-center"
        style="background-color: #222020; color: #01F1B3; border: 1px solid #01F1B3; hover:opacity-90;"
      >
        <img src="/static/clear-icon.png" alt="Clear" class="h-5 w-5 mr-1" />
        Clear
      </button>
    </div>
  </div>
  
  <!-- Code Editor -->
  <div class="flex flex-col flex-grow overflow-hidden">
    <div class="text-xs py-1 px-3 flex justify-between" style="background-color: #131312; color: #01F1B3;">
      <span>Editor</span>
      <span>{$selectedToolchain}</span>
    </div>
    
    <div class="flex-grow" style="background-color: #131312;">
      <CodeMirror
        bind:value={$code}
        lang={langExtension}
        theme={oneDark}
        styles={{
          "&": {
            height: "100%",
            fontSize: "14px"
          },
          ".cm-scroller": {
            overflow: "auto"
          }
        }}
        tabSize={2}
        basicSetup={true}
      />
    </div>
  </div>
</div>
