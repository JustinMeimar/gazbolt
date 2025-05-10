<script lang="ts">
  // State for code editor
  let code: string = '// Your code here\nconsole.log("Hello, Gazbolt!");';
  let stdout: string = '';
  let stderr: string = '';
  let stdin: string = '';
  
  // Dropdowns state
  let selectedConfig: string = 'Default';
  let selectedToolchain: string = 'TypeScript';
  let selectedProgram: string = 'Main';
  
  // Options will be fetched from API
  let configs: string[] = [];
  let toolchains: string[] = [];
  let programs: string[] = [];
  
  // Fetch options from backend API
  async function fetchOptions() {
    try {
      // Use environment variable for backend URI
      const backendUri = import.meta.env.BACKEND_URI || '';
      
      // Fetch configs
      const configsResponse = await fetch(`${backendUri}/configs`);
      configs = await configsResponse.json();
      
      // Fetch toolchains
      const toolchainsResponse = await fetch(`${backendUri}/toolchains`);
      toolchains = await toolchainsResponse.json();
      
      // Fetch programs
      const programsResponse = await fetch(`${backendUri}/programs`);
      programs = await programsResponse.json();
      
      // Set defaults if options are available
      if (configs.length > 0) selectedConfig = configs[0];
      if (toolchains.length > 0) selectedToolchain = toolchains[0];
      if (programs.length > 0) selectedProgram = programs[0];
      
    } catch (error) {
      console.error('Failed to fetch options from API:', error);
      // Fallback to defaults if API fails
      configs = ['Default', 'Debug', 'Release', 'Performance'];
      toolchains = ['TypeScript', 'JavaScript', 'Rust', 'Python', 'Go'];
      programs = ['Main', 'Test', 'Benchmark', 'Example'];
    }
  }
  
  // Call the fetch function when component mounts
  onMount(fetchOptions);
  
  import { onMount } from 'svelte';
  
  // Run code function (mock implementation)
  function runCode() {
    stdout = `Running ${selectedProgram} with ${selectedToolchain} (${selectedConfig})...\n`;
    
    try {
      // This is just a mock - in a real app you'd send the code to a backend
      stdout += `Output from execution:\n${code}\n\nStdin provided:\n${stdin || "None"}`;
      stderr = '';
    } catch (error) {
      stderr = `Error: ${error}`;
    }
  }
  
  // Clear outputs
  function clearOutputs() {
    stdout = '';
    stderr = '';
  }
</script>

<main class="flex flex-col min-h-screen" style="background-color: #131312;">
  <!-- Header/Navigation -->
  <header style="background-color: #222020; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);">
    <div class="container mx-auto px-4 py-3">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <img src="/static/logo.png" alt="Gazbolt Logo" class="h-8 w-8 mr-2" />
          <h1 class="text-2xl font-bold" style="color: #01F1B3;">Gazbolt</h1>
        </div>
        <nav>
          <ul class="flex space-x-4">
            <li><a href="#" style="color: #01F1B3; hover:opacity-80">Home</a></li>
            <li><a href="#" style="color: #01F1B3; hover:opacity-80">Docs</a></li>
            <li><a href="#" style="color: #01F1B3; hover:opacity-80">Examples</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>

  <!-- Main content -->
  <div class="container mx-auto px-4 py-6 flex-grow">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
      <!-- Code Editor Section - Takes up 3 columns on large screens -->
      <div class="lg:col-span-3 space-y-4">
        <div style="background-color: #222020; padding: 1rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);">
          <!-- Controls -->
          <div class="flex flex-wrap gap-2 mb-4">
            <!-- Config Dropdown -->
            <div class="flex-1 min-w-[150px]">
              <label for="config" class="block text-sm font-medium mb-1" style="color: #01F1B3;">Config</label>
              <select 
                id="config" 
                bind:value={selectedConfig}
                class="block w-full rounded-md shadow-sm text-sm"
                style="background-color: #131312; color: white; border: 1px solid #444; focus:border-color: #01F1B3;"
              >
                {#each configs as config}
                  <option value={config}>{config}</option>
                {/each}
              </select>
            </div>
            
            <!-- Toolchain Dropdown -->
            <div class="flex-1 min-w-[150px]">
              <label for="toolchain" class="block text-sm font-medium mb-1" style="color: #01F1B3;">Toolchain</label>
              <select 
                id="toolchain" 
                bind:value={selectedToolchain}
                class="block w-full rounded-md shadow-sm text-sm"
                style="background-color: #131312; color: white; border: 1px solid #444; focus:border-color: #01F1B3;"
              >
                {#each toolchains as toolchain}
                  <option value={toolchain}>{toolchain}</option>
                {/each}
              </select>
            </div>
            
            <!-- Program Dropdown -->
            <div class="flex-1 min-w-[150px]">
              <label for="program" class="block text-sm font-medium mb-1" style="color: #01F1B3;">Program</label>
              <select 
                id="program" 
                bind:value={selectedProgram}
                class="block w-full rounded-md shadow-sm text-sm"
                style="background-color: #131312; color: white; border: 1px solid #444; focus:border-color: #01F1B3;"
              >
                {#each programs as program}
                  <option value={program}>{program}</option>
                {/each}
              </select>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex space-x-2 mb-4">
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
          
          <!-- Code Editor -->
          <div class="border rounded-md overflow-hidden" style="border-color: #444;">
            <div class="text-xs py-1 px-3 flex justify-between" style="background-color: #131312; color: #01F1B3;">
              <span>Editor</span>
              <span>{selectedToolchain}</span>
            </div>
            <textarea
              bind:value={code}
              class="font-mono w-full h-80 p-3 text-sm focus:outline-none"
              style="background-color: #131312; color: #f8f8f8; border: none;"
              spellcheck="false"
            ></textarea>
          </div>
        </div>
      </div>
      
      <!-- Output Section - Takes up 3 columns on large screens -->
      <div class="lg:col-span-3 space-y-4">
        <!-- Stdout -->
        <div style="background-color: #222020; padding: 1rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);">
          <h3 class="text-sm font-medium mb-2" style="color: #01F1B3;">Standard Output</h3>
          <div class="border rounded-md overflow-hidden" style="border-color: #444;">
            <div class="text-xs py-1 px-3" style="background-color: #131312; color: #01F1B3;">stdout</div>
            <pre class="font-mono w-full h-40 p-3 text-sm overflow-auto" style="background-color: #131312; color: white;">{stdout}</pre>
          </div>
        </div>
        
        <!-- Stderr -->
        <div style="background-color: #222020; padding: 1rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);">
          <h3 class="text-sm font-medium mb-2" style="color: #01F1B3;">Standard Error</h3>
          <div class="border rounded-md overflow-hidden" style="border-color: #444;">
            <div class="text-xs py-1 px-3" style="background-color: #131312; color: #01F1B3;">stderr</div>
            <pre class="font-mono w-full h-20 p-3 text-sm overflow-auto" style="background-color: #131312; color: {stderr ? '#ff6b6b' : 'white'};">{stderr}</pre>
          </div>
        </div>
        
        <!-- Stdin -->
        <div style="background-color: #222020; padding: 1rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);">
          <h3 class="text-sm font-medium mb-2" style="color: #01F1B3;">Standard Input</h3>
          <div class="border rounded-md overflow-hidden" style="border-color: #444;">
            <div class="text-xs py-1 px-3" style="background-color: #131312; color: #01F1B3;">stdin</div>
            <textarea
              bind:value={stdin}
              placeholder="Enter input data here..."
              class="font-mono w-full h-20 p-3 text-sm focus:outline-none"
              style="background-color: #131312; color: white; border: none;"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer style="background-color: #222020; color: white; padding: 1.5rem 0; margin-top: 2rem;">
    <div class="container mx-auto px-4">
      <div class="mt-8 pt-6 border-t text-center text-sm" style="border-color: #444; color: #01F1B3;">
        <p>&copy; {new Date().getFullYear()} Gazbolt. All rights reserved.</p>
      </div>
    </div>
  </footer>
</main>

