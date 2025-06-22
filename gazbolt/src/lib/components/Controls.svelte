<script>
  import { onMount } from 'svelte';
  import { fetchConfigs, fetchToolChains, fetchTests } from '../api/optionsApi';
  import { selectedConfig, selectedToolchain, selectedProgram, code,
          stdout, stderr, stdin, exitStatus, clearOutputs,
          stringToB64, b64ToString } from '$lib/stores/codeStore';

  // Options for dropdowns
  export let configs = [];
  export let toolchains = [];
  export let programs = [];

  // Initialize options on component mount
  onMount(async () => {
    try {
      configs = await fetchConfigs(); 
      const configName = configs[0].name.toString();
      toolchains = await fetchToolChains(configName);
      programs = await fetchTests(configName);
      
      $selectedToolchain = toolchains[0]; 
      $selectedProgram = programs[0];
      $selectedConfig = configs[0];

      console.log("CONFIGS: ", configs);
      console.log("TESTS: ", programs);
      console.log("TC: ", toolchains);
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

<div class="grid grid-cols-3 gap-4 mb-4">
  <!-- Config Dropdown -->
  <div>
    <label for="config" class="block text-base font-medium mb-2" style="color: #01F1B3;">
      Config
    </label>
    <select 
      id="config" 
      bind:value={$selectedConfig}
      class="block w-full rounded-md shadow-sm text-sm"
      style="background-color: #131312; color: white; border: 1px solid #444; padding: 0.5rem 0.75rem;"
    >
      {#each configs as config}
        <option value={config}>{config.name.toString()}</option>
      {/each}
    </select>
  </div>
  
  <!-- Toolchain Dropdown -->
  <div>
    <label for="toolchain" class="block text-base font-medium mb-2" style="color: #222020;">
      Toolchain
    </label>
    <select 
      id="toolchain" 
      bind:value={$selectedToolchain}
      class="block w-full rounded-md shadow-sm text-sm"
      style="background-color: #131312; color: white; border: 1px solid #444; padding: 0.5rem 0.75rem;"
    >
      {#each toolchains as tc}
        <option value={tc}>{Object.keys(tc)[0]}</option>
      {/each}
    </select>
  </div>
  
  <!-- Program Dropdown -->
  <div>
    <label for="program" class="block text-base font-medium mb-2" style="color: #01F1B3;">Program</label>
    <select 
      id="program" 
      bind:value={$selectedProgram}
      class="block w-full rounded-md shadow-sm text-sm"
      style="background-color: #131312; color: white; border: 1px solid #444; padding: 0.5rem 0.75rem;"
    >
      {#each programs as program}
        <option value={program}>{program.name}</option>
      {/each}
    </select>
  </div>
</div>
