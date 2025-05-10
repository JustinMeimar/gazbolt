<script>
  import { onMount } from 'svelte';
  import { fetchOptions } from '../api/optionsApi';
  import { selectedConfig, selectedToolchain, selectedProgram } from '$lib/stores/codeStore';

  // Options for dropdowns
  export let configs = [];
  export let toolchains = [];
  export let programs = [];

  // Initialize options on component mount
  onMount(async () => {
    try {
      const options = await fetchOptions();
      configs = options.configs;
      toolchains = options.toolchains;
      programs = options.programs;
      
      // Set defaults if options are available
      if (configs.length > 0) $selectedConfig = configs[0];
      if (toolchains.length > 0) $selectedToolchain = toolchains[0];
      if (programs.length > 0) $selectedProgram = programs[0];
    } catch (error) {
      console.error('Failed to fetch options:', error);
    }
  });
</script>

<div class="grid grid-cols-3 gap-4 mb-4">
  <!-- Config Dropdown -->
  <div>
    <label for="config" class="block text-base font-medium mb-2" style="color: #01F1B3;">Config</label>
    <select 
      id="config" 
      bind:value={$selectedConfig}
      class="block w-full rounded-md shadow-sm text-sm"
      style="background-color: #131312; color: white; border: 1px solid #444; padding: 0.5rem 0.75rem;"
    >
      {#each configs as config}
        <option value={config}>{config}</option>
      {/each}
    </select>
  </div>
  
  <!-- Toolchain Dropdown -->
  <div>
    <label for="toolchain" class="block text-base font-medium mb-2" style="color: #01F1B3;">Toolchain</label>
    <select 
      id="toolchain" 
      bind:value={$selectedToolchain}
      class="block w-full rounded-md shadow-sm text-sm"
      style="background-color: #131312; color: white; border: 1px solid #444; padding: 0.5rem 0.75rem;"
    >
      {#each toolchains as toolchain}
        <option value={toolchain}>{toolchain}</option>
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
        <option value={program}>{program}</option>
      {/each}
    </select>
  </div>
</div>
