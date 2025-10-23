<script lang="ts">
  import { onMount } from 'svelte';
  
  export let rightPanels: any[] = [];
  
  let containerRef: HTMLElement;
  let isDragging = false;
  let dragType = '';
  let startY = 0;
  let startX = 0;
  let initialSizes: any = {};
  
  // Default sizes
  let leftPaneWidth = 50; // percentage
  let rightPanelHeights = [50, 50]; // percentages for 2 panels

  // Reactively adjust panel heights when rightPanels array changes
  $: if (rightPanels.length > 0 && rightPanelHeights.length !== rightPanels.length) {
    const equalHeight = 100 / rightPanels.length;
    rightPanelHeights = Array(rightPanels.length).fill(equalHeight);
  }
  
  function startDrag(event: MouseEvent, type: string) {
    isDragging = true;
    dragType = type;
    
    if (type === 'vertical') {
      startX = event.clientX;
      initialSizes.leftWidth = leftPaneWidth;
    } else {
      startY = event.clientY;
      initialSizes.panelHeights = [...rightPanelHeights];
    }
    
    event.preventDefault();
  }
  
  function handleMouseMove(event: MouseEvent) {
    if (!isDragging) return;
    
    if (dragType === 'vertical') {
      const containerWidth = containerRef?.clientWidth || 0;
      const deltaX = event.clientX - startX;
      const deltaPercent = (deltaX / containerWidth) * 100;
      leftPaneWidth = Math.max(20, Math.min(80, initialSizes.leftWidth + deltaPercent));
    } else if (dragType.startsWith('horizontal-')) {
      const panelIndex = parseInt(dragType.split('-')[1]);
      const containerHeight = containerRef?.querySelector('.right-panels')?.clientHeight || 0;
      const deltaY = event.clientY - startY;
      const deltaPercent = (deltaY / containerHeight) * 100;
      
      // Adjust the two panels involved in the resize
      if (panelIndex < rightPanelHeights.length - 1) {
        const newHeight1 = Math.max(10, initialSizes.panelHeights[panelIndex] + deltaPercent);
        const newHeight2 = Math.max(10, initialSizes.panelHeights[panelIndex + 1] - deltaPercent);
        
        // Ensure we don't go below minimum or create negative heights
        if (newHeight1 >= 10 && newHeight2 >= 10) {
          rightPanelHeights[panelIndex] = newHeight1;
          rightPanelHeights[panelIndex + 1] = newHeight2;
        }
      }
    }
  }
  
  function handleMouseUp() {
    isDragging = false;
    dragType = '';
  }
  
  onMount(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  });
</script>

<div bind:this={containerRef} class="flex h-full resize-container">
  <!-- Left Pane (Editor) -->
  <div class="flex flex-col" style="width: {leftPaneWidth}%;">
    <slot name="left" />
  </div>
  
  <!-- Vertical Resize Handle -->
  <div 
    class="resize-handle vertical-handle"
    role="button"
    tabindex="0"
    aria-label="Resize vertical split"
    on:mousedown={(e) => startDrag(e, 'vertical')}
  ></div>
  
  <!-- Right Panes (Output panels) -->
  <div class="right-panels flex flex-col" style="width: {100 - leftPaneWidth}%;">
    {#each rightPanels as panel, index}
      <div class="flex flex-col" style="height: {rightPanelHeights[index]}%;">
        {#if index === 0}
          <slot name="right-0" {panel} />
        {:else if index === 1}
          <slot name="right-1" {panel} />
        {:else if index === 2}
          <slot name="right-2" {panel} />
        {:else if index === 3}
          <slot name="right-3" {panel} />
        {/if}
      </div>
      
      {#if index < rightPanels.length - 1}
        <!-- Horizontal Resize Handle -->
        <div 
          class="resize-handle horizontal-handle"
          role="button"
          tabindex="0"
          aria-label="Resize horizontal split"
          on:mousedown={(e) => startDrag(e, `horizontal-${index}`)}
        ></div>
      {/if}
    {/each}
  </div>
</div>

<style>
  .resize-handle {
    background-color: #444;
    transition: background-color 0.15s ease;
    position: relative;
    z-index: 10;
  }
  
  .resize-handle:hover {
    background-color: #01F1B3;
  }
  
  .resize-handle:active {
    background-color: #01F1B3;
  }
  
  .vertical-handle {
    width: 1px;
    cursor: col-resize;
    min-height: 100%;
  }
  
  .horizontal-handle {
    height: 1px;
    cursor: row-resize;
    min-width: 100%;
  }
  
  /* Invisible hit area for easier dragging */
  .resize-handle::before {
    content: '';
    position: absolute;
    background-color: transparent;
    z-index: 11;
  }
  
  .vertical-handle::before {
    top: 0;
    left: -3px;
    right: -3px;
    bottom: 0;
    width: 7px;
  }
  
  .horizontal-handle::before {
    left: 0;
    top: -3px;
    right: 0;
    bottom: -3px;
    height: 7px;
  }
  
  /* Remove any default margins/padding */
  .right-panels {
    margin: 0;
    padding: 0;
  }
  
  /* Ensure flush borders */
  :global(.resize-container) {
    border-radius: 0 !important;
  }
  
  :global(.resize-container > *) {
    border-radius: 0 !important;
  }
</style>
