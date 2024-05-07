<script>
    import { selectedDistricts, hideSmallDistricts } from '$lib/stores/stores.js'
    import Svelecte from 'svelecte'

    export let data

    // create array of objects with id and name value for each item in the data array
	let districtNames = data.map((district) => {
		return { value: district.properties.GEOID, label: district.properties["Institution Name"] }
	})

    function toggleHideSmallDistricts() {
		hideSmallDistricts.update(value => !value)
	}

    function clearSelectedDistricts() {
		selectedDistricts.set([])
		minSize = 0;
		maxSize = 9000
		values = [minSize, maxSize]
	}
</script>

<div class="search text-width">
    <h2 class="search-description text-width">
        Find a school district
    </h2>

    <div class="search-container text-width">
        <Svelecte 
            options={districtNames} 
            bind:value={$selectedDistricts} 
            multiple={true} 
            placeholder={"find a school district"}
            closeAfterSelect={true}
        />
    </div>
</div>

<div class="filters">
    <!-- Hide/show small districts -->
    <div class="hide-small-button">
        <button on:click={toggleHideSmallDistricts} class="action-button" id="hide-button">
            {$hideSmallDistricts ? 'show small districts' : 'hide small districts'}
        </button>
        <p class="asterisk">* small districts don't have as accurate of an inclusion score</p>
    </div>

    <!-- Select none -->
    <button on:click={clearSelectedDistricts} class="action-button" id="select-none-button">
        clear selected
    </button>
</div>


<style>
    .search h2 {
        margin: 1rem 0;
    }

    .search-description {
        color: var(--color-text);
        font-size: 1.8rem;
        letter-spacing: 0.01rem;
        font-weight: 700;
        font-family: 'Bitter', serif;
    }

    .search {
        width: 100%;
        padding: 1.5rem 0 2rem 0;
    }

    .filters {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin: 2rem 0 2rem 0;
        width: 100%;
        max-width: 72rem;
        /* gap: 1rem; */
    }

    /* Fallback for older browsers */
	.filters > *:not(:last-child) {
		margin-right: 1rem; /* Horizontal spacing */
	}

	@supports (gap: 1rem) {
		.filters {
			gap: 1rem;
		}
		/* With gap supported, we no longer need the extra margin on buttons */
		.filters > * {
			margin: 0;
		}
	}

    @media (max-width: 768px) {
        .filters {
            width: 100%;
        }
    }

    .action-button {
        padding: 0.25rem 0.5rem;
        /* margin: 0; */
        border-radius: 20px;
        cursor: pointer;
        color: var(--color-text);
        transition: background-color 0.3s, border-color 0.3s;
        border: 1.5px solid var(--color-text);
        background-color: white;
        font-size: 0.9rem;
        white-space: nowrap;
        font-weight: 700;
        letter-spacing: 0.02rem;
        opacity: 0.85;
        /* Added margin for fallback, will be overridden if gap is supported */
        margin: 0; /* Resets any additional margin for the feature query to work properly */
    }

    .action-button:hover {
        background-color: whitesmoke;
    }

    #hide-button {
        margin-bottom: -1rem;
        width: 12rem;
    }

    .hide-small-button {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.asterisk {
        font-size: 0.9rem;
        color: var(--dark-gray);
        margin-top: 1.8rem;
        line-height: 1.2rem;
        margin-left: 1rem;
    }
</style>