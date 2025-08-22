<script>
    // Props for the card
    export let active = false; // Whether this card is currently active
  </script>
  
  <div class="scrolly-card {active ? 'active' : ''}">
    <slot></slot>
  </div>
  
  <style>
    .scrolly-card {
      display: inline-block;
      padding: 1rem;
      color: var(--colorWhite);
      background-color: var(--colorText);
      background-color: color-mix(in srgb, var(--colorText) 90%, transparent);
      border-radius: 0.25rem;
      font-size: 1.3rem;
      text-align: center;
      box-shadow: var(--shadow);
      max-width: 90%;
      position: relative;
      z-index: 100;     
      pointer-events: auto;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
  
    .scrolly-card.active {
      opacity: 1;
      transform: translateY(0);
    }
  
    .scrolly-card:not(.active) {
      opacity: 0.7;
      transform: translateY(10px);
    }
  
    /* Ensure all content within the card has pointer events */
    .scrolly-card :global(*) {
      pointer-events: auto;
    }
  </style>