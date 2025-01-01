<script>
  import Logo from "./Logo.svelte";
  import NavLinks from "./NavLinks.svelte";
  import { colors } from "$lib/styles/colorConfig.js";
</script>

<footer>
  <div class="footer-content">
    <div class="footer-column">
      <div class="logo">
        <Logo color={colors.colorInclusive} textColor={colors.colorText} />
      </div>
    </div>
    <div class="footer-column">
      <NavLinks direction="vertical" colorTheme="dark" />
    </div>
    <div class="footer-column">
      <span class="label">
        created by Brianna Wilson
      </span> 
      <span class="label" id="copyright">
        &copy; 2025
      </span>
    </div>
  </div>
</footer>

<style>
  footer {
    background-color: var(--colorText);
    color: white;
    padding: 4rem 0;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .footer-column {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  footer a {
    font-weight: bold;
    color: white;
  }

  .label {
    font-size: 0.95rem;
    letter-spacing: 0.025rem;
  }

  #email {
    margin-top: 0.4rem;
  }

  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 0 1rem;
    }

    .footer-column {
      width: 100%;
      margin-bottom: 2rem;
    }

    .footer-column:last-child {
      margin-bottom: 0;
    }
  }
</style>