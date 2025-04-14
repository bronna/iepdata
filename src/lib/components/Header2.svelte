<script>
  import NavLinks from "./NavLinks.svelte";
  import Logo from "./Logo.svelte"
  import { colors } from "$lib/styles/colorConfig.js"

  let menuOpen = false

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

<header>
  <div class="spacer"></div>

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

  {#if menuOpen}
    <nav class="mobile-nav" transition:slideAndFade>
      <NavLinks direction="vertical" />
    </nav>
  {/if}
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start; /* Changed from center to align at the top */
    padding: 2rem 2rem;
    background-color: var(--colorBackgroundWhite);
    position: relative;
  }

  @media (max-width: 768px) {
    header {
      padding: 1rem 1rem;
    }
  }

  .spacer {
    flex: 1;
  }

  .menu-container {
    display: flex;
    align-items: flex-start;
  }

  .menu-toggle {
    display: block; /* Always show the menu toggle */
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: var(--colorText);
    z-index: 20;
    padding: 0;
    margin: 0;
    line-height: 1;
  }

  .mobile-nav {
    position: fixed;
    top: 0;
    right: 0; /* Changed back to right side */
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

  /* Removed desktop navigation styles since we want to always use the mobile menu */
  .nav-links {
    display: none;
  }
</style>