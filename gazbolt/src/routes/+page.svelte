<script>
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import CodeEditor from '$lib/components/CodeEditor.svelte';
  import OutputPanel from '$lib/components/OutputPanel.svelte';
  import ResizableLayout from '$lib/components/ResizableLayout.svelte';
  import { code, stdout, stderr, stdin } from '$lib/stores/codeStore';
  
  const rightPanels = [
    { title: 'Standard Output', type: 'stdout', content: stdout },
    { title: 'Standard Error', type: 'stderr', content: stderr },
    { title: 'Standard Input', type: 'stdin', content: stdin }
  ];
</script>

<div class="flex flex-col h-screen" style="background-color: #131312;">
  <Header />

  <!-- Main content - Fill all available space between header and footer -->
  <div class="flex-grow overflow-hidden" style="border-radius: 0;">
    <ResizableLayout {rightPanels}>
      <div slot="left" class="h-full">
        <CodeEditor />
      </div>
      
      <div slot="right-0" class="h-full">
        <OutputPanel 
          title="Standard Output" 
          panelType="stdout" 
          content={$stdout} 
        />
      </div>
      
      <div slot="right-1" class="h-full">
        <OutputPanel 
          title="Standard Error" 
          panelType="stderr" 
          content={$stderr}
          isError={true} 
        />
      </div>
      
      <div slot="right-2" class="h-full">
        <OutputPanel 
          title="Standard Input" 
          panelType="stdin" 
          content={$stdin}
          isInput={true} 
        />
      </div>
    </ResizableLayout>
  </div>

  <Footer />
</div>

<style>
  :global(*) {
    border-radius: 0 !important;
  }
  
  :global(.resize-container) {
    border-radius: 0 !important;
  }
  
  :global(.resize-container > *) {
    border-radius: 0 !important;
  }
  
  /* Ensure all panels are flush */
  :global(#editor-wrapper),
  :global(.output-panel) {
    border-radius: 0 !important;
  }
</style>

