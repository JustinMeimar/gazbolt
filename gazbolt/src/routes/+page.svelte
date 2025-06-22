<script>
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import CodeEditor from '$lib/components/CodeEditor.svelte';
  import OutputPanel from '$lib/components/OutputPanel.svelte';
  import { code, stdout, stderr, stdin } from '$lib/stores/codeStore';
</script>

<div class="flex flex-col h-screen" style="background-color: #131312;">
  <Header />

  <!-- Main content - Fill all available space between header and footer -->
  <div class="flex flex-col flex-grow overflow-hidden">
    <div class="flex flex-col md:flex-row w-full h-full">
      <!-- Left panel - Code Editor -->
      <div class="w-full md:w-1/2 h-full p-4">
        <CodeEditor />
      </div>
      
      <!-- Right panel - Output Section -->
      <div class="w-full md:w-1/2 h-full p-4 flex flex-col">
        <!-- Standard Output -->
        <div class="flex-1 flex flex-col mb-4" style="min-height: 0;">
          <OutputPanel 
            title="Standard Output" 
            panelType="stdout" 
            content={$stdout} 
          />
        </div>
        
        <!-- Standard Error -->
        <div class="flex-1 flex flex-col mb-4" style="min-height: 0;">
          <OutputPanel 
            title="Standard Error" 
            panelType="stderr" 
            content={$stderr}
            isError={true} 
          />
        </div>
        
        <!-- Standard Input -->
        <div class="flex-1 flex flex-col" style="min-height: 0;">
          <OutputPanel 
            title="Standard Input" 
            panelType="stdin" 
            content={$stdin}
            isInput={true} 
          />
        </div>
      </div>
    </div>
  </div>

  <Footer />
</div>

