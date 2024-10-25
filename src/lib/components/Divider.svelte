<script>
    import { colors } from "$lib/styles/colorConfig"
  
    export let color = colors.colorText
    export let width = "65%"
    export let iconSize = 24
    export let iconStrokeWidth = 2.5
  </script>
  
  <div 
    class="divider" 
    style="
        --color: {color}; 
        --width: {width}; 
        --icon-size: {iconSize}px; 
        --icon-stroke-width: {iconStrokeWidth};
        opacity: 0.25;
    "
  >
    <hr />
    <div class="icon">
      <slot>
        <!-- Default icon or placeholder can go here if needed -->
      </slot>
    </div>
    <hr />
  </div>
  
  <style>
    .divider {
      padding-top: 1rem;
      display: flex;
      align-items: center;
      width: var(--width);
      margin: auto;
    }
  
    hr {
      flex-grow: 1;
      border: none;
      border-top: 2.5px solid var(--color);
      margin: 0;
    }
  
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
      color: var(--color);
    }
  
    .icon :global(svg) {
      width: var(--icon-size);
      height: var(--icon-size);
      stroke-width: var(--icon-stroke-width);
    }
  </style>