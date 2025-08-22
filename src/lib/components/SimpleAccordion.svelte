<script>
    import { slide } from 'svelte/transition';
    
    export let title = "Learn more";
    let isOpen = false;
  
    function toggle() {
      isOpen = !isOpen;
    }
  </script>
  
  <div class="accordion-wrapper">
    <button 
      type="button"
      class="accordion-button" 
      on:click={toggle}
      aria-expanded={isOpen}
    >
      {title} {isOpen ? '↑' : '↓'}
    </button>
    
    {#if isOpen}
      <div 
        class="accordion-content"
        transition:slide={{duration: 300}}
      >
        <slot />
      </div>
    {/if}
  </div>
  
  <style>
    .accordion-wrapper {
      margin: 0.5rem 0;
      width: 100%;
      font-family: inherit;
    }
  
    .accordion-button {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer !important;
      padding: 0.5rem;
      text-decoration: underline;
      font-size: 0.9em;
      opacity: 1;
      transition: opacity 0.2s;
      display: inline-block;
      font-family: inherit;
    }
  
    .accordion-button:hover {
      opacity: 0.7;
    }
  
    .accordion-content {
      padding: 0.5rem;
      font-size: 0.9em;
      line-height: 1.4;
      background: inherit;
      font-family: inherit;
    }

    :global(.accordion-content ul) {
        list-style: none;
        padding-left: 0;
        margin: 0.5rem 0;
    }

    :global(.accordion-content li) {
        padding: 0.2rem 0;
    }
  </style>