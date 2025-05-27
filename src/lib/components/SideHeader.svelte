<script>
    import NavLinks from "./NavLinks.svelte";
    import Logo from "./Logo.svelte"
    import { colors } from "$lib/styles/colorConfig.js"
  
    let menuOpen = false
    let windowWidth = 0;
  
    function slideAndFade(node, { delay = 0, duration = 300 }) {
      return {
        delay,
        duration,
        css: t => `
          transform: translateX(${(1 - t) * 100}%);
          opacity: ${t};
        `
      };
    }
  </script>
  
  <svelte:window bind:innerWidth={windowWidth} />
  
  <header class="side-header">
    <div class="header-content">
      <div class="logo-container">
        <Logo color={colors.colorInclusiveGray} textColor={colors.colorBackgroundWhite} />
      </div>
  
      <div class="menu-container">
        <button
          on:click={() => menuOpen = !menuOpen}
          class="menu-toggle"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </div>
  
    {#if menuOpen}
      <nav class="mobile-nav" transition:slideAndFade>
        <NavLinks direction="vertical" />
      </nav>
    {/if}
  </header>
  
  <style>
    .side-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-top: 2rem 3rem;
      padding: 2rem 2rem;
      background-color: var(--colorBackgroundWhite);
      position: relative;
      z-index: 100;
    }
  
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding-top: 0.4rem;
    }
  
    .logo-container {
      display: flex;
      align-items: center;
      padding-top: 0.4rem;
    }
  
    .menu-container {
      display: flex;
      align-items: center;
      margin-top: -2.4rem
    }
  
    .menu-toggle {
      display: block;
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      color: var(--colorInclusive);
      z-index: 20;
      padding: 0;
      margin: 0;
      line-height: 1;
    }
  
    .mobile-nav {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 80%;
      max-width: 300px;
      background-color: rgba(244, 241, 240, 0.94);
      padding: 5rem 1rem 1rem;
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
      z-index: 10;
      display: flex;
      flex-direction: column;
    }
  
    /* Mobile view adjustments */
    @media (max-width: 768px) {
      .side-header {
        padding: 1rem 1rem;
        width: 100%;
      }
    }
  </style>