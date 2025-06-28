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
  
  // Calculate byte length of the content
  $: byteLength = new TextEncoder().encode(content || "").length;
</script>

<div style="background-color: #222020;
            border: none;
            border-top: 1px solid #333;
            height: 100%;
            display: flex;
            flex-direction: column;
            border-radius: 0;"
>
  <div class="flex items-center justify-between px-3 py-2 border-b border-gray-600" style="background-color: #1a1a1a;">
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
    <div class="text-xs py-1 px-3 border-b border-gray-700" style="background-color: #1e1e1e; color: #888;">
      Bytes: {byteLength}
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

