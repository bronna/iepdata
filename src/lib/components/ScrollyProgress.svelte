<script>
    export let currentIndex = 0;
    export let totalSteps = 0;
    export let onSkip = () => {}; // Function to call when Skip is clicked
  </script>
  
  <div class="scrolly-progress-container">
    <div class="dots-container">
      {#each Array(totalSteps) as _, i}
        <div 
          class="progress-dot {i === currentIndex ? 'active' : ''} {i < currentIndex ? 'completed' : ''}"
          aria-label="Step {i + 1} of {totalSteps}"
        ></div>
      {/each}
    </div>
    
    <button class="skip-button" on:click={onSkip}>
      Skip
    </button>
  </div>
  
  <style>
    .scrolly-progress-container {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      z-index: 200;
      pointer-events: auto;
    }
  
    .dots-container {
      display: flex;
      gap: 0.5rem;
    }
  
    .progress-dot {
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 50%;
      background-color: var(--colorLightGray);
      transition: all 0.3s ease;
    }
  
    .progress-dot.active {
      background-color: var(--colorInclusive);
      transform: scale(1.2);
    }
  
    .progress-dot.completed {
      background-color: var(--colorInclusiveGray);
    }
  
    .skip-button {
      background-color: var(--colorText);
      color: var(--colorWhite);
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  
    .skip-button:hover {
      background-color: var(--colorDarkGray);
    }
  </style>