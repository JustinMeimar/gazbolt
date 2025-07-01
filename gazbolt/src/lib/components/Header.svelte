<script>
  import { isServerConnected } from '../stores/codeStore.ts';
</script>

<header style="background-color: #222020; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);">  
  <!-- Connection warning banner --> 
  {#if !$isServerConnected}
    <div class="text-white px-4 py-1" style="background-color: #ff6b35;">
      ⚠️ Server is unreachable.
    </div>
  {/if}
  <div class="container mx-auto px-4 py-3">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <img src="/logo.png" alt="Gazbolt Logo" class="h-8 w-8 mr-2" />
        <h1 class="text-2xl font-bold" style="color: #01F1B3;">Gazbolt</h1>
      </div>   
    </div> 
  </div>
</header>

