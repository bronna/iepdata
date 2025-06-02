<!-- src/lib/components/SelectDistricts.svelte -->

<script>
    import { data, selectedDistricts, hideSmallDistricts } from '$lib/stores/stores.js'
    import Svelecte from 'svelecte'

    // Create array of objects with id and name value for each item in the data array
    let districtNames = $data.map((district) => {
        return { value: district.properties.GEOID, label: district.properties["Institution Name"] }
    })

    function toggleHideSmallDistricts() {
        hideSmallDistricts.update(value => !value)
    }
</script>

<div class="search text-width">
    <h2 class="search-description text-width">
        Select a school district
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

<style>
    .search h2 {
        margin: 1rem 0;
    }

    .search-description {
        color: var(--colorInclusive);
        font-size: 1.4rem;
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
        gap: 1rem;
    }

    .action-button {
        padding: 0.25rem 0.5rem;
        border-radius: 20px;
        cursor: pointer;
        color: var(--colorText);
        transition: background-color 0.3s, border-color 0.3s;
        border: 1.5px solid var(--colorText);
        background-color: white;
        font-size: 0.9rem;
        white-space: nowrap;
        font-weight: 700;
        letter-spacing: 0.02rem;
        opacity: 0.85;
        margin: 0;
    }

    .action-button:hover {
        background-color: whitesmoke;
    }

    .primary-district-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: var(--colorDarkGray);
    }
    
    .info-text {
        font-style: italic;
        font-weight: 600;
    }

    .district-pills {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .district-pill {
        background-color: var(--colorLightGray);
        border: 1px solid var(--colorMediumGray);
        border-radius: 12px;
        padding: 0.25rem 0.5rem;
        font-size: 0.8rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .district-pill:hover {
        background-color: var(--colorMediumGray);
        color: white;
    }

    @media (max-width: 768px) {
        .filters {
            width: 100%;
            flex-direction: column;
        }
        
        .primary-district-info {
            margin: 0.5rem 0 0 0;
        }
        
        .district-pills {
            justify-content: center;
        }
    }
</style>