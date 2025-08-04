<script>
  import { onMount } from 'svelte';
  import { fetchConfigs, fetchToolChains, fetchTests } from '../api/optionsApi';
  import { selectedConfig, selectedToolchain, selectedProgram, code,
           stdout, stderr, stdin, exitStatus, clearOutputs, runCode,
           stringToB64, b64ToString, hideStdin, checkServerConnection } from '$lib/stores/codeStore';

  // Options for dropdowns
  export let configs = [];
  export let toolchains = [];
  export let programs = [];

  // Initialize options on component mount
  onMount(async () => {

    // Check server connection before proceeding
    const connected = await checkServerConnection();
    if (!connected) {
      return;
    }
    try {
      configs = await fetchConfigs(); 
      const configName = configs[0].name.toString();
      toolchains = await fetchToolChains(configName);
      programs = await fetchTests(configName);
      
      $selectedToolchain = toolchains[0]; 
      $selectedProgram = programs[0];
      $selectedConfig = configs[0];

    } catch (error) {
      console.error('Failed to fetch options:', error);
    }
  });
  
  $: if ($selectedConfig && $selectedConfig.name) {
    updateDependentDropdowns($selectedConfig.name.toString());
  }

  $: if ($selectedProgram && $selectedProgram.content) {
    const decodedContent = b64ToString($selectedProgram.content);
    clearOutputs();
    code.set(decodedContent);
  } 

  async function updateDependentDropdowns(configName) {
    try {
      toolchains = await fetchToolChains(configName);
      programs = await fetchTests(configName);
      
      $selectedToolchain = toolchains[0] || null;
      $selectedProgram = programs[0] || null;
    } catch (error) {
      console.error('Failed to update dependent dropdowns:', error); 
    }
  }
</script>

<div class="flex items-center gap-3 mb-3 p-2" style="background-color: #1a1a1a; border-radius: 6px;">
  <!-- Config Dropdown -->
  <div class="flex flex-col min-w-0 flex-1">
    <label for="config" class="text-xs font-medium mb-1" style="color: #01F1B3;">
      Config
    </label>
    <select 
      id="config" 
      bind:value={$selectedConfig}
      class="w-full rounded text-xs transition-all duration-200 cursor-pointer"
      style="background-color: #131312; color: white; border: 1px solid #444; padding: 0.375rem 0.5rem;"
       >
      {#each configs as config}
        <option value={config}>{config.name.toString()}</option>
      {/each}
    </select>
  </div>
  
  <!-- Toolchain Dropdown -->
  <div class="flex flex-col min-w-0 flex-1">
    <label for="toolchain" class="text-xs font-medium mb-1" style="color: #01F1B3;">
      Toolchain
    </label>
    <select 
      id="toolchain" 
      bind:value={$selectedToolchain}
      class="w-full rounded text-xs transition-all duration-200 cursor-pointer"
      style="background-color: #131312; color: white; border: 1px solid #444; padding: 0.375rem 0.5rem;"
      on:mouseenter={(e) => {e.target.style.borderColor = '#01F1B3'}}
      on:mouseleave={(e) => {e.target.style.borderColor = '#444'}}
      on:focus={(e) => {e.target.style.borderColor = '#01F1B3'}}
      on:blur={(e) => {e.target.style.borderColor = '#444'}}
    >
      {#each toolchains as tc}
        <option value={tc}>{Object.keys(tc)[0]}</option>
      {/each}
    </select>
  </div>
  
  <!-- Program Dropdown -->
  <div class="flex flex-col min-w-0 flex-1">
    <label for="program" class="text-xs font-medium mb-1" style="color: #01F1B3;">Program</label>
    <select 
      id="program" 
      bind:value={$selectedProgram}
      class="w-full rounded text-xs transition-all duration-200 cursor-pointer"
      style="background-color: #131312; color: white; border: 1px solid #444; padding: 0.375rem 0.5rem;"
      on:mouseenter={(e) => {e.target.style.borderColor = '#01F1B3'}}
      on:mouseleave={(e) => {e.target.style.borderColor = '#444'}}
      on:focus={(e) => {e.target.style.borderColor = '#01F1B3'}}
      on:blur={(e) => {e.target.style.borderColor = '#444'}}
    >
      {#each programs as program}
        <option value={program}>{program.name}</option>
      {/each}
    </select>
  </div>
 
  <!-- Action Buttons -->
  <div class="flex items-center gap-2 ml-2 mt-4">
    <button 
      on:click={runCode}
      class="px-3 py-1.5 text-sm font-medium rounded transition-all duration-200 cursor-pointer"
      style="background-color: #01F1B3; color: #131312;"
      on:mouseenter={(e) => {e.target.style.backgroundColor = '#00d49e'}}
      on:mouseleave={(e) => {e.target.style.backgroundColor = '#01F1B3'}}
    >
      Run
    </button>
    <button 
      on:click={clearOutputs}
      class="px-2 py-1.5 text-sm font-medium rounded transition-all duration-200 cursor-pointer flex items-center"
      style="background-color: #222020; color: #01F1B3; border: 1px solid #01F1B3;"
      on:mouseenter={(e) => {e.target.style.backgroundColor = '#2a2a28'; e.target.style.borderColor = '#00d49e'; e.target.style.color = '#00d49e';}}
      on:mouseleave={(e) => {e.target.style.backgroundColor = '#222020'; e.target.style.borderColor = '#01F1B3'; e.target.style.color = '#01F1B3';}}
    >
      <img src="clear-icon.png" alt="Clear" class="h-3 w-3 mr-1" />
      Clear
    </button>
    <label class="flex items-center gap-1 text-xs cursor-pointer whitespace-nowrap" style="color: #01F1B3;">
      <input
        type="checkbox"
        bind:checked={$hideStdin}
        class="w-3 h-3"
      />
      stdin
    </label>
  </div>
</div>
