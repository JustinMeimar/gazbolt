<script>
  import { stdin } from '$lib/stores/codeStore';
  
  export let title = "";
  export let panelType = ""; // stdout, stderr, or stdin
  export let content = "";
  export let isError = false;
  export let isInput = false;
</script>

<div style="background-color: #222020; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); height: 100%; display: flex; flex-direction: column;">
  <h3 class="text-base font-medium p-3" style="color: #01F1B3;">{title}</h3>
  <div class="flex-grow flex flex-col overflow-hidden" style="min-height: 0;">
    <div class="text-xs py-1 px-3" style="background-color: #131312; color: #01F1B3;">{panelType}</div>
    
    {#if isInput}
      <textarea
        bind:value={$stdin}
        placeholder="Enter input data here..."
        class="font-mono w-full p-3 text-sm focus:outline-none flex-grow"
        style="background-color: #131312; color: white; border: none; resize: none; min-height: 0;"
      ></textarea>
    {:else}
      <pre 
        class="font-mono w-full p-3 text-sm overflow-auto flex-grow" 
        style="background-color: #131312; color: {isError && content ? '#ff6b6b' : 'white'}; min-height: 0;"
      >{content}</pre>
    {/if}
  </div>
</div>
