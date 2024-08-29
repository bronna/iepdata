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
  <Logo color={colors.colorInclusive} textColor={colors.colorWhite} />

  <button
    on:click={() => menuOpen = !menuOpen}
    class="menu-toggle"
    aria-label="Toggle navigation menu"
  >
    {menuOpen ? 'x' : '☰'}
  </button>

  {#if menuOpen}
    <nav class="mobile-nav" transition:slideAndFade>
      <NavLinks direction="vertical" />
    </nav>
  {/if}

  <nav class="nav-links">
    <NavLinks direction="horizontal" />
  </nav>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 2rem;
    background-color: var(--colorBackgroundLightGray);
    position: relative;
  }

  @media (max-width: 768px) {
    header {
      padding: 2rem 1rem;
    }
  }

  .menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: var(--colorText);
    z-index: 20;
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

  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }

    .menu-toggle {
      display: block;
    }
  }
</style>