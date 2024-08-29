<script>
    import { colors } from '$lib/styles/colorConfig.js'
    
    export let color
    export let textColor
</script>

<div class="logo">
    <a href="/">
        <svg width="166" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 166 25">
            <!-- <circle cx="50" cy="50" r="45" fill={color} /> -->
            <!-- <text 
                x="51" 
                y="43" 
                font-family="Bitter" 
                font-size="17" 
                font-weight="800"
                fill={textColor} 
                text-anchor="middle"
                letter-spacing="0.04rem"
                alignment-baseline="hanging">
                    IEP
            </text> -->
            <text 
                x="0" 
                y="23" 
                font-family="Bitter" 
                font-size="32" 
                font-weight="800"
                fill={colors.colorDarkGray} 
                text-anchor="start" 
                alignment-baseline="alphabetic">
                    IEP
            </text>
            <text 
                x="52" 
                y="23" 
                font-family="Bitter" 
                font-size="32" 
                font-weight="600"
                fill={colors.colorDarkGray} 
                text-anchor="start" 
                alignment-baseline="alphabetic">
                    Data
            </text>
        </svg>
    </a>
</div>

<style>
    .logo {
        height: 80px; /* Adjust this value if needed */
    }

    .logo a {
        text-decoration: none;
        font-weight: 800;
        font-size: 1.5rem;
        line-height: 1.2rem;
        display: inline-block;
        transform: scale(0.8);
        transform-origin: top left;
    }

    svg {
        display: block;
    }
</style>