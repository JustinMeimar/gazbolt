<script>
  import { stdin, exitStatus } from '$lib/stores/codeStore';
  
  export let title = "";
  export let panelType = ""; // stdout, stderr, or stdin
  export let content = "";
  export let isError = false;
  export let isInput = false;

  let showRaw = false;
  let inputValue = "";
  let isValidRawStr = true;
   
  $: if (inputValue) {
    if (showRaw) {
      if (!setRawBytes(inputValue)) {
        isValidRawStr = false;
      } else {
        isValidRawStr = true;
      }
    } else {
      $stdin = inputValue; 
    }
  }

  const toRawBytes = (str) => {
    if (!str) return "";
    const escaped = JSON.stringify(str);
    return "b'" + escaped.slice(1, -1) + "'";
  }
  
  const setRawBytes = () => { 
    try {
      const match = inputValue.match(/^b'(.*)'$/s);
      if (!match) {
        $stdin = '' // Null value for invalid parse of bytes string.
        return false;
      }
      $stdin = JSON.parse('"' + match[1] + '"');
    } catch(error) {
      // parse can fail for partial strings like b'\'
      $stdin = ''
    }
    return true;
  }
  $: displayContent = showRaw ? toRawBytes(content) : content;
</script>

<div style="background-color: #222020;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            height: 100%;
            display: flex;
            flex-direction: column;"
>
  <div class="flex items-center justify-between p-3">
    <h3 class="text-base font-medium" style="color: #01F1B3;">
      {title}
    </h3>
    <label class="flex items-center gap-2 text-xs cursor-pointer" style="color: #01F1B3;">
      <input
        type="checkbox"
        bind:checked={showRaw}
        class="w-3 h-3"
      />
      Raw
    </label>
  </div>
  
  <div class="flex-grow flex flex-col overflow-hidden" style="min-height: 0;">
    <div class="text-xs py-1 px-3" style="background-color: #131312; color: #01F1B3;">
      Bytes: 1
      {panelType == "stderr" ? `Exit Status: ${$exitStatus}` : "None" }
    </div>
    {#if isInput}
      <textarea
        bind:value={inputValue}
        placeholder={showRaw ? "Enter raw input: b'hello\\nworld'" : "Enter input here..."}
        class="font-mono w-full p-3 text-sm focus:outline-none flex-grow"
        style="background-color: #131312; color: {isValidRawStr ? 'white' : '#ff6b6b'}; border: none; resize: none; min-height: 0; tab-size: 2;"
        spellcheck="false"
        on:keydown={(e) => e.key === 'Tab' && e.preventDefault()}
      ></textarea>
    {:else}
      <pre 
        class="font-mono w-full p-3 text-sm overflow-auto flex-grow" 
        style="background-color: #131312; color: {isError && content ? '#ff6b6b' : 'white'}; min-height: 0;"
      >{displayContent}</pre>
    {/if}
  </div>
</div>

