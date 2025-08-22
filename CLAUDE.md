# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build with static generation
- `npm run preview` - Preview production build locally

## Architecture Overview

### Application Type
SvelteKit educational data visualization application analyzing special education inclusion rates across Oregon school districts. Uses D3.js for interactive visualizations with scrollytelling narrative structure.

### Data Architecture
- **Primary Dataset**: `src/lib/data/oregon_data_24.json` - TopoJSON format with district boundaries and special education metrics
- **Data Processing**: `src/lib/data/processData.js` handles weighted inclusion scoring, quartile calculations, and neighbor district identification
- **Key Metrics**: LRE (Least Restrictive Environment) percentages, weighted inclusion scores (0-100), average separation time

### State Management
Uses Svelte store pattern with centralized state in `src/lib/stores/stores.js`:
- `data` - Main dataset (readable)
- `selectedDistricts` - Selected district IDs (writable)  
- `primaryDistrictData` - Single district focus (derived)
- `selectedDistrictsData` - Multi-district comparison (derived)

### Component Architecture

**Core Visualization Components:**
- `DistrictsBeeswarm.svelte` - Main scatter plot using D3 force simulation
- `BubbleMap.svelte` - Geographic visualization with TopoJSON district boundaries
- `VisualizationToggle.svelte` - Switches between abstract and geographic views
- `SelectDistricts.svelte` - Multi-select dropdown for district comparison

**Layout Components:**
- `Scroller.svelte` - Scrollytelling implementation using @sveltejs/svelte-scroller
- `ScrollyCard.svelte` - Content cards with scroll-triggered animations
- `SideHeader.svelte` - Navigation and district selection interface

### Data Flow Pattern
1. TopoJSON data processed on application load through `getData()` function
2. District selection updates `selectedDistricts` store
3. Derived stores automatically recalculate based on selection changes
4. Reactive statements (`$:`) trigger D3 visualization updates
5. Scrollytelling drives narrative progression through index-based state

### Routing Structure
- `/` - Main comparison tool with scrollytelling
- `/[districtID]` - Individual district detail pages
- `/funding` - Special education funding analysis
- `/smallschools` - Small schools-specific analysis
- `/api/feedback` - User feedback collection endpoint

### Styling System
- **Colors**: Centralized in `src/lib/styles/colorConfig.js` with semantic naming
- **CSS Variables**: Dynamic color injection through layout component
- **Responsive**: Mobile-first design with 768px breakpoint
- **Typography**: Bitter serif for headings, Source Sans 3 for body text

### Performance Considerations
- Static generation enabled (`export const prerender = true`)
- Complex data calculations performed once during build
- D3 force simulations cached and only recalculated when necessary
- Route-based code splitting through SvelteKit

### Development Patterns
- Heavy use of Svelte reactive statements for real-time data updates
- Derived stores for complex calculations and filtering
- Component composition with reusable visualization primitives
- Progressive enhancement approach (works without JavaScript for basic content)