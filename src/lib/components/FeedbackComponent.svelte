<script>
    import { fade } from 'svelte/transition';
    import { MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-svelte';
  
    let isOpen = false;
    let feedbackType = null;
    let feedbackText = '';
    let showThankYou = false;
  
    async function handleSubmit() {
      try {
          const formData = new FormData();
          formData.append('form-name', 'site-feedback');
          formData.append('feedback-type', feedbackType);
          formData.append('message', feedbackText);
          formData.append('page', window.location.pathname);
  
          const response = await fetch('/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams(formData).toString()
          });
          
          if (response.ok) {
              showThankYou = true;
              setTimeout(() => {
                  showThankYou = false;
                  isOpen = false;
                  feedbackText = '';
                  feedbackType = null;
              }, 2000);
          } else {
              throw new Error('Failed to submit feedback');
          }
      } catch (error) {
          console.error('Error:', error);
      }
    }
  </script>
  
  <!-- Hidden form for Netlify to detect -->
  <form name="site-feedback" data-netlify="true" hidden>
    <input type="text" name="feedback-type" />
    <textarea name="message"></textarea>
    <input type="text" name="page" />
  </form>
  
  <div class="feedback">
    <button
      class="feedback__trigger"
      on:click={() => isOpen = true}
    >
      <MessageSquare class="feedback__trigger-icon" />
      Give Feedback
    </button>
  
    {#if isOpen}
      <div
        class="feedback__overlay"
        on:click|self={() => isOpen = false}
        transition:fade
      >
        <div 
          class="feedback__modal"
          role="dialog"
          aria-labelledby="feedback-title"
        >
          <div class="feedback__header">
            <h2 
              id="feedback-title"
              class="feedback__title"
            >
              {showThankYou ? "Thank you!" : "Share Your Feedback"}
            </h2>
            <p class="feedback__description">
              {showThankYou
                ? "Your feedback helps make this tool better for everyone."
                : "How was your experience using this tool? Your feedback helps us improve."}
            </p>
          </div>
  
          {#if !showThankYou}
            <div class="feedback__buttons">
              <button
                class="feedback__type-button {feedbackType === 'positive' ? 'feedback__type-button--selected' : ''}"
                on:click={() => feedbackType = 'positive'}
              >
                <ThumbsUp class="feedback__button-icon" />
                Helpful
              </button>
              <button
                class="feedback__type-button {feedbackType === 'negative' ? 'feedback__type-button--selected' : ''}"
                on:click={() => feedbackType = 'negative'}
              >
                <ThumbsDown class="feedback__button-icon" />
                Needs Work
              </button>
            </div>
  
            <textarea
              bind:value={feedbackText}
              placeholder="Tell us more about your experience..."
              class="feedback__textarea"
            ></textarea>
  
            <div class="feedback__actions">
              <button
                class="feedback__action-button feedback__action-button--secondary"
                on:click={() => isOpen = false}
              >
                Cancel
              </button>
              <button
                class="feedback__action-button feedback__action-button--primary"
                on:click={handleSubmit}
                disabled={!feedbackType}
              >
                Submit Feedback
              </button>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
  

  <style>
    .feedback {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      z-index: 50;
    }
  
    .feedback__trigger {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background-color: var(--colorInclusiveDark);
      color: white;
      border: none;
      border-radius: 9999px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: background-color 0.2s;
    }
  
    .feedback__trigger:hover {
      background-color: var(--colorInclusive);
    }
  
    .feedback__trigger-icon {
      width: 1.25rem;
      height: 1.25rem;
    }
  
    .feedback__overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      z-index: 100;
    }
  
    .feedback__modal {
      background-color: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      width: 100%;
      max-width: 28rem;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }
  
    .feedback__header {
      margin-bottom: 1rem;
    }
  
    .feedback__title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
  
    .feedback__description {
      color: #4b5563;
      font-size: 0.875rem;
    }
  
    .feedback__buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin: 1rem 0;
    }
  
    .feedback__type-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.375rem;
      background-color: white;
      cursor: pointer;
      transition: all 0.2s;
    }
  
    .feedback__type-button:hover:not(.feedback__type-button--selected) {
      background-color: #f9fafb;
    }
  
    .feedback__type-button--selected {
      background-color: var(--colorInclusive);
      color: white;
      border-color: var(--colorInclusive);
    }
  
    .feedback__button-icon {
      width: 1rem;
      height: 1rem;
    }
  
    .feedback__textarea {
      width: 100%;
      min-height: 100px;
      padding: 0.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.375rem;
      resize: vertical;
      font-family: inherit;
    }
  
    .feedback__textarea:focus {
      outline: none;
      border-color: var(--colorInclusive);
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
    }
  
    .feedback__actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-top: 1rem;
    }
  
    .feedback__action-button {
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.2s;
    }
  
    .feedback__action-button--secondary {
      background-color: white;
      border: 1px solid #e5e7eb;
    }
  
    .feedback__action-button--secondary:hover {
      background-color: #f9fafb;
    }
  
    .feedback__action-button--primary {
      background-color: var(--colorInclusive);
      color: white;
      border: none;
    }
  
    .feedback__action-button--primary:hover:not([disabled]) {
      background-color: var(--colorInclusiveDark);
    }
  
    .feedback__action-button--primary[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  
    /* Focus styles for accessibility */
    .feedback__trigger:focus,
    .feedback__type-button:focus,
    .feedback__textarea:focus,
    .feedback__action-button:focus {
      outline: 2px solid var(--colorInclusive);
      outline-offset: 2px;
    }
  
    /* Add some basic responsive adjustments */
    @media (max-width: 640px) {
      .feedback__modal {
        margin: 1rem;
        padding: 1rem;
      }
  
      .feedback__buttons {
        flex-direction: column;
      }
    }
  </style>