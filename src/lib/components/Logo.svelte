<script>
    export let color
    export let textColor
</script>

<div class="logo">
    <a href="/">
        <!-- <svg width="166" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 166 100">
            <circle cx="50" cy="50" r="45" fill={color} />
            <text 
                x="51" 
                y="43" 
                font-family="Bitter" 
                font-size="17" 
                font-weight="700"
                fill={textColor} 
                text-anchor="middle"
                letter-spacing="0.04rem"
                alignment-baseline="hanging">
                    inclusion
            </text>
            <text 
                x="92" 
                y="95" 
                font-family="Bitter" 
                font-size="32" 
                font-weight="800"
                fill={color} 
                text-anchor="start" 
                alignment-baseline="alphabetic">
                    Data
            </text>
        </svg> -->
        Disability +<br>Education<br><span class="subtitle">Data</span>
    </a>
</div>

<style>
    .logo {
        height: 60px; /* Adjust this value if needed */
    }

    .logo a {
        text-decoration: none;
        font-weight: 800;
        font-size: 1.8rem;
        line-height: 1.8rem;
        display: inline-block;
        transform: scale(0.7);
        transform-origin: top left;
        color: var(--colorInclusive);
    }

    .logo a .subtitle {
        font-weight: 300;
    }

    svg {
        display: block;
    }
</style>