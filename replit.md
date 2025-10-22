# MegaRadioTV - Samsung Tizen & LG webOS TV Application

## Overview
MegaRadioTV is a radio streaming application for Samsung Tizen and LG webOS Smart TVs. Built using the same technology stack and architecture as FLIX-IPTV, this is a Single Page Application (SPA) that provides radio station browsing and streaming capabilities optimized for TV remote control navigation.

## Project Type
- **Platforms**: Samsung Tizen TV & LG webOS TV
- **Architecture**: Single Page Application (SPA)
- **Technology**: HTML5, CSS3, JavaScript (ES5/ES6, browser-native, no transpilation)
- **Server**: Python HTTP Server (for development)

## Core Technologies
### Frontend Libraries (All Vendored Locally - NO CDN)
- **jQuery 3.4.1** - DOM manipulation & AJAX
- **Bootstrap 4.4.1** - CSS framework & grid system
- **Font Awesome 5.12.1** - Icons
- **Moment.js** - Date/time formatting

### Platform SDKs
- **webOSTVjs-1.2.0** - LG webOS JavaScript library
- **Samsung Tizen WebAPIs** - Built into Tizen environment
- **Samsung CAPH Framework** - TV UI helpers (to be added)

## Project Structure
```
.
├── index.html                    # Single entry point (all pages in one file)
├── appinfo.json                  # LG webOS config
├── config.xml                    # Samsung Tizen config
├── package.json                  # Node.js build scripts
│
├── css/
│   ├── libs/                     # Vendor CSS
│   │   ├── bootstrap4.4.1.min.css
│   │   └── fontawesome-all.min.css
│   ├── variables.css             # CSS custom properties (theme)
│   ├── style.css                 # Global styles
│   ├── splash.css                # Splash screen
│   ├── homepage.css              # Home page
│   └── responsive.css            # Media queries for different resolutions
│
├── js/
│   ├── libs/                     # Vendor JavaScript
│   │   ├── jquery-3.4.1.min.js
│   │   ├── bootstrap.min.js
│   │   └── moment.min.js
│   ├── main.js                   # App initialization & platform detection
│   ├── common.js                 # Shared utilities & M3U parser
│   ├── keyTizen.js               # Remote control key mapping
│   ├── api.js                    # API service module (Mega Radio API)
│   ├── country_modal.js          # Country selector modal
│   ├── splash_operation.js       # Splash screen controller
│   ├── home_operation.js         # Homepage controller
│   ├── genres_operation.js       # Genres page controller
│   ├── genre_detail_operation.js # Genre detail page controller
│   ├── search_operation.js       # Search page controller
│   ├── player_operation.js       # Player page controller
│   ├── favorites_operation.js    # Favorites page controller
│   └── settings_operation.js     # Settings page controller
│
├── images/                       # All image assets
│   ├── app_launcher.png          # TV launcher icon
│   ├── logo.png                  # App logo
│   ├── bg_disco.png              # Home page background (from Figma)
│   ├── fallback-favicon.png      # Fallback station logo (1024x1024px)
│   └── def_image.jpg             # Default station image
│
├── webOSTVjs-1.2.0/              # LG webOS SDK
│   └── webOSTV.js
│
└── tools/                        # Build scripts (to be added)
```

## Application Flow
1. **Splash Screen** - Auto-displays for 3 seconds on app start
2. **Home Screen** - Main interface with left icon menu and station grid (Figma design implemented)
3. **Genres/Search/Favorites/Settings** - All pages with Figma designs
4. **Player Screen** - Radio streaming interface with animated equalizer (Figma design implemented)

## Features
- ✅ SPA architecture with page-based navigation
- ✅ Platform detection (Samsung/LG/Web)
- ✅ Remote control key handling (arrows, OK, RETURN, media keys)
- ✅ Focus management for TV navigation
- ✅ All 8 pages with exact Figma designs (home, genres, search, genre-detail, favorites, settings, player, splash)
- ✅ Station grid display with white cards (200x264px)
- ✅ LocalStorage persistence
- ✅ Menu-based navigation (Discover, Genres, Search, Favorites, Settings)
- ✅ Country selector modal (accessible from all pages)
- ✅ Player page with animated equalizer and controls
- ✅ **Mega Radio API Integration** (https://themegaradio.com)
  - All Smart TV requests include `?tv=1` query parameter
  - Real station data on all pages (home, genres, genre-detail, search, player)
  - Global country filtering with localStorage persistence
  - Search functionality with debounced input (500ms)
  - Fallback favicon for stations without logos
  - Dynamic genre loading and filtering
  - Similar stations on player page
- ⏳ Audio streaming backend (HLS/MP3)
- ⏳ Favorites save/load functionality

## Development Setup
**Server**: Python HTTP Server
- **Port**: 5000
- **Host**: 0.0.0.0 (accessible from network)

**Workflow**: Auto-starts on project load

## Key Patterns
### Single Page Application
All pages are hidden `<div>` elements in index.html. JavaScript shows/hides pages using `showPage()` function.

### Platform Detection
```javascript
var platform = 'samsung';  // or 'lg' or 'web'
if (typeof webOS !== 'undefined') platform = 'lg';
else if (typeof tizen !== 'undefined') platform = 'samsung';
```

### Remote Control Navigation
- Key codes mapped in `keyTizen.js`
- Focus management with `.active` class
- CSS transitions for visual feedback

### State Management
- Global variables in `common.js`
- LocalStorage with platform-specific prefix
- No external state management libraries

## Deployment
Configured for autoscale deployment.
**Build Scripts** (in package.json):
- `npm run lg:package` - Package for LG webOS
- `npm run sm:build` - Build for Samsung Tizen
- `npm run sm:pack` - Create .wgt package

## Development Status
**Current**: All 8 pages complete with exact Figma 1:1 designs + Full API integration
**Next**: 
1. Implement audio streaming backend (HLS/MP3 playback)
2. Implement favorites save/load to LocalStorage
3. Test on real Samsung Tizen and LG webOS hardware
4. Add error handling UI for API failures
5. Optimize performance for TV hardware

## User Preferences
- **NO LOGIN BUTTONS** - User requested all login buttons removed (except logout in settings)
- **CLEAN SEARCH** - Search page should have minimal UI (no country selector, equalizer, or login)
- **COUNTRY MODAL** - Must be accessible from location selector on all pages
- **EXACT FIGMA MATCH** - All layouts use absolute positioning at 1920x1080px resolution

## API Integration
**Base URL**: https://themegaradio.com (fallback: https://megaradio.live)
**Smart TV Parameter**: All requests MUST include `?tv=1`

### API Endpoints Used
- `GET /api/countries?tv=1` - List of all countries
- `GET /api/genres?tv=1` - List of all genres
- `GET /api/stations/popular?tv=1&limit=N` - Popular stations
- `GET /api/stations?tv=1&country=X&limit=N` - Stations by country
- `GET /api/genres/:slug/stations?tv=1` - Stations by genre
- `GET /api/stations?tv=1&search=query` - Search stations
- `GET /api/stations/similar/:id?tv=1` - Similar stations

### API Service (js/api.js)
Centralized API service module that:
- Adds `?tv=1` to all Smart TV requests
- Normalizes station data (favicon fallback, url_resolved)
- Handles errors with console logging
- Provides consistent fetch interface

## Recent Changes
- 2025-10-22: **BUG FIXES - NAVIGATION & UI ISSUES (ARCHITECT APPROVED)**
  - **Fixed sidebar navigation** - Added click handlers to all nav-items in main.js
    - setupSidebarNavigation() wires all sidebar menu clicks
    - Changed Discover button data-menu from "discover" to "home"
    - All menu items (Discover, Genres, Search, Favorites, Settings) now navigate correctly
  - **Fixed overlapping station names on home page**
    - home_operation.js already clears containers before rendering API data
    - Hardcoded static cards are replaced by dynamic API data
  - **Fixed similar stations on player page**
    - Added similar-radios-container wrapper in player page HTML
    - Similar stations now load from API and display correctly
- 2025-10-22: **COMPLETE MEGA RADIO API INTEGRATION (ARCHITECT APPROVED)**
  - **Created js/api.js** - Complete API service module with all endpoints
    - GET /api/countries, genres, stations/popular, stations (by country), genres/:slug/stations
    - GET /api/stations (search), stations/similar/:id
    - All Smart TV requests include `?tv=1` parameter
    - Station normalization: fallback favicon, url_resolved
  - **Updated all page operations** to use real API data:
    - home_operation.js: Popular stations + stations by selected country
    - genres_operation.js: Dynamic genre loading from API
    - genre_detail_operation.js: Stations by genre with country filtering
    - search_operation.js: Real search with debounced input (500ms)
    - player_operation.js: Similar stations from API
    - country_modal.js: Real countries from API
  - **Global country filtering**: Selected country persists across all pages via localStorage
  - **Fallback favicon**: images/fallback-favicon.png used when station.favicon missing
  - **HTML updates**: Added container IDs for dynamic content (search-results-grid, radios-container)
  - **NO mock data remaining** - All pages use live API responses
- 2025-10-22: **RADIO STATION DETAIL PAGE - SIMILAR RADIOS SECTION**
  - Added "Similar Radios" section to player page at y=659px
  - 12 station cards in two rows (6 per row at y=733 and y=1027)
  - Station cards: 200x264px at exact Figma positions
  - Player container now 1819px height with vertical scroll
  - Matches Figma node 1597:3968 exactly
- 2025-10-22: **PLAYER PAGE & UI CLEANUP (ARCHITECT APPROVED)**
  - **Player page implemented** (Figma node 1597-3968):
    - Full 1920x1080 layout with station logo (296x296px at 236,242)
    - Animated equalizer with 3 bars (CSS keyframe animations)
    - Station name (48px font) and song info (32px font)
    - Flag, tags display (128kb, MP3, AT, Rock, Classic)
    - 4 control buttons: Previous, Play/Pause, Next, Favorite
    - Proper focus handling with LEFT/RIGHT/ENTER key navigation
    - Play/pause toggle updates icon and maintains focus
  - **UI Cleanup across all pages**:
    - Removed all login buttons (home, genres, search, favorites, settings)
    - Kept logout button in settings user panel
    - Search page cleaned: removed country selector, login, equalizer
    - Added equalizer icon to home, genres, favorites headers (1281, 67)
    - Made country modal clickable from all pages via location selector
  - **JavaScript improvements**:
    - Created player_operation.js with full control logic
    - Fixed focus handling bugs (only one active button at a time)
    - Fixed play/pause toggle to maintain focus after state change
    - Proper key routing in main.js for player page
- 2025-10-22: **COMPLETE FIGMA REBUILD - EXACT 1:1 MATCH (ARCHITECT APPROVED)**
  - **Layout**: Pure absolute positioning matching Figma coordinates exactly
  - **Background**: Purple/magenta gradient (156deg: rgb(70,15,40) → rgb(14,14,14))
  - **Station cards**: Semi-transparent white (rgba(255,255,255,0.14)) with inset shadow
  - **Top bar**: Logo (164x57px), Austria selector (223px), Equalizer icon (51px), Login button (146px)
  - **Left sidebar**: 6 menu items (98x98px each, 108px vertical spacing)
  - **Genre buttons**: 8 buttons with 50px horizontal padding, positioned to fit 1920px width
  - **Popular Radios**: 2 rows (7 cards + 7 cards + See More tile = 15 total)
  - **More From Austria**: 2 rows (14 cards total)
  - **Station cards**: 200x264px at exact Figma coordinates (230px horizontal spacing, 294px vertical)
  - **See More tile**: Positioned at left:1720px (right edge exactly at 1920px)
  - **All images**: Loading successfully (200/304 status confirmed)
  - **File fixes**: Renamed powertürk image to remove Turkish character (URL encoding issue)
- 2025-10-22: **Initial Figma implementation attempt (incorrect)**
  - Fetched complete design specifications from Figma API (file: SdteT1OO7A2xSkvmIQABCF, node: 1691-10787)
  - Downloaded ALL assets from Figma: bg_disco.png (4.1MB), logo.png (164x57px), 6 station logos
  - **Exact layout measurements from Figma:**
    - Frame: 1920x1080px
    - Logo: 164x57px at (50px, 70px)
    - Sidebar: 98px wide at (50px, 167px), transparent background
    - Menu items: 98x98px white boxes, 11px border-radius, 10px gaps between
    - Gradient: linear 180deg from rgba(13,13,13,0) to rgba(13,13,13,1)
    - Station cards: 200x264px, 11px border-radius, 0 4px 16px rgba(0,0,0,0.2) shadow
    - Station logos: 132x132px centered
  - **Typography from Figma:**
    - Menu items: Ubuntu 500 18px rgba(13,13,13,1)
    - Station names: Ubuntu 300 18px rgba(255,255,255,1)
    - Station categories: Ubuntu 300 18px rgba(255,255,255,0.8)
  - Downloaded FontAwesome webfonts to prevent 404 errors
  - Grid layout: repeat(6, 200px) matching JavaScript navigation (grid_cols = 6)
- 2025-10-21: Restructured to match FLIX-IPTV technology stack
- 2025-10-21: Downloaded and vendored all libraries locally (jQuery, Bootstrap, Font Awesome)
- 2025-10-21: Created SPA structure with splash, home, and player pages
- 2025-10-21: Implemented platform detection and key handling
- 2025-10-21: Created config files for both LG webOS and Samsung Tizen
- 2025-10-21: Set up build scripts in package.json
