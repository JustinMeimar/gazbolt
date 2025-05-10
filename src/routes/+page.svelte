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
  
  // Available options
  const configs = ['Default', 'Debug', 'Release', 'Performance'];
  const toolchains = ['TypeScript', 'JavaScript', 'Rust', 'Python', 'Go'];
  const programs = ['Main', 'Test', 'Benchmark', 'Example'];
  
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

<main class="flex flex-col min-h-screen bg-gray-50">
  <!-- Header/Navigation -->
  <header class="bg-indigo-600 text-white shadow-md">
    <div class="container mx-auto px-4 py-3">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h1 class="text-2xl font-bold">Gazbolt</h1>
        </div>
        <nav>
          <ul class="flex space-x-4">
            <li><a href="#" class="hover:text-indigo-200">Home</a></li>
            <li><a href="#" class="hover:text-indigo-200">Docs</a></li>
            <li><a href="#" class="hover:text-indigo-200">Examples</a></li>
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
        <div class="bg-white p-4 rounded-lg shadow-md">
          <!-- Controls -->
          <div class="flex flex-wrap gap-2 mb-4">
            <!-- Config Dropdown -->
            <div class="flex-1 min-w-[150px]">
              <label for="config" class="block text-sm font-medium text-gray-700 mb-1">Config</label>
              <select 
                id="config" 
                bind:value={selectedConfig}
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
              >
                {#each configs as config}
                  <option value={config}>{config}</option>
                {/each}
              </select>
            </div>
            
            <!-- Toolchain Dropdown -->
            <div class="flex-1 min-w-[150px]">
              <label for="toolchain" class="block text-sm font-medium text-gray-700 mb-1">Toolchain</label>
              <select 
                id="toolchain" 
                bind:value={selectedToolchain}
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
              >
                {#each toolchains as toolchain}
                  <option value={toolchain}>{toolchain}</option>
                {/each}
              </select>
            </div>
            
            <!-- Program Dropdown -->
            <div class="flex-1 min-w-[150px]">
              <label for="program" class="block text-sm font-medium text-gray-700 mb-1">Program</label>
              <select 
                id="program" 
                bind:value={selectedProgram}
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
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
              class="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
              </svg>
              Run
            </button>
            <button 
              on:click={clearOutputs}
              class="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011-1h10a1 1 0 011 1v1H4V2zm1 3a1 1 0 00-1 1v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 00-1-1H5zm9 6a1 1 0 11-2 0 1 1 0 012 0zm-3 1a1 1 0 100 2 1 1 0 000-2zm-3-1a1 1 0 11-2 0 1 1 0 012 0zm-3 1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd" />
              </svg>
              Clear
            </button>
          </div>
          
          <!-- Code Editor -->
          <div class="border rounded-md overflow-hidden">
            <div class="bg-gray-800 text-xs text-gray-400 py-1 px-3 flex justify-between">
              <span>Editor</span>
              <span>{selectedToolchain}</span>
            </div>
            <textarea
              bind:value={code}
              class="font-mono w-full h-80 p-3 text-sm bg-gray-900 text-gray-100 focus:outline-none"
              spellcheck="false"
            ></textarea>
          </div>
        </div>
      </div>
      
      <!-- Output Section - Takes up 3 columns on large screens -->
      <div class="lg:col-span-3 space-y-4">
        <!-- Stdout -->
        <div class="bg-white p-4 rounded-lg shadow-md">
          <h3 class="text-sm font-medium text-gray-700 mb-2">Standard Output</h3>
          <div class="border rounded-md overflow-hidden">
            <div class="bg-gray-800 text-xs text-gray-400 py-1 px-3">stdout</div>
            <pre class="font-mono w-full h-40 p-3 text-sm bg-gray-100 overflow-auto">{stdout}</pre>
          </div>
        </div>
        
        <!-- Stderr -->
        <div class="bg-white p-4 rounded-lg shadow-md">
          <h3 class="text-sm font-medium text-gray-700 mb-2">Standard Error</h3>
          <div class="border rounded-md overflow-hidden">
            <div class="bg-gray-800 text-xs text-gray-400 py-1 px-3">stderr</div>
            <pre class="font-mono w-full h-20 p-3 text-sm bg-gray-100 overflow-auto {stderr ? 'text-red-600' : ''}">{stderr}</pre>
          </div>
        </div>
        
        <!-- Stdin -->
        <div class="bg-white p-4 rounded-lg shadow-md">
          <h3 class="text-sm font-medium text-gray-700 mb-2">Standard Input</h3>
          <div class="border rounded-md overflow-hidden">
            <div class="bg-gray-800 text-xs text-gray-400 py-1 px-3">stdin</div>
            <textarea
              bind:value={stdin}
              placeholder="Enter input data here..."
              class="font-mono w-full h-20 p-3 text-sm bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="bg-gray-800 text-white py-6 mt-8">
    <div class="container mx-auto px-4">
      <div class="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Gazbolt. All rights reserved.</p>
      </div>
    </div>
  </footer>
</main>

