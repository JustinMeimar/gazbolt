<script>
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import CodeEditor from './components/CodeEditor.svelte';
  import OutputPanel from './components/OutputPanel.svelte';
  import { code, stdout, stderr, stdin } from './stores/codeStore';
</script>

<main class="flex flex-col h-screen" style="background-color: #131312;">
  <Header />

  <!-- Main content - Fill all available space between header and footer -->
  <div class="flex flex-col flex-grow overflow-hidden">
    <div class="flex flex-col md:flex-row w-full h-full">
      <!-- Left panel - Code Editor -->
      <div id="code-editor-container" class="w-full md:w-1/2 h-full p-4">
        <CodeEditor />
      </div>
      
      <!-- Right panel - Output Section -->
      <div class="w-full md:w-1/2 h-full p-4 flex flex-col">
        
        <!-- Standard Input -->
        <div class="flex-1 flex flex-col" style="min-height: 0;">
          <OutputPanel 
            title="Standard Input" 
            panelType="stdin" 
            content={$stdin}
            isInput={true} 
          />
        </div>

        <!-- Standard Output -->
        <div class="flex-1 flex flex-col mb-4" style="min-height: 0;">
          abcbabcb 
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
        
      </div>
    </div>
  </div>

  <Footer />
</main>
