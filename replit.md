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
│   ├── splash_operation.js       # Splash screen controller
│   └── home_operation.js         # Homepage controller
│
├── images/                       # All image assets
│   ├── app_launcher.png          # TV launcher icon
│   ├── logo.png                  # App logo
│   ├── bg_disco.png              # Home page background (from Figma)
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
- ⏳ M3U playlist parsing
- ⏳ Audio streaming backend
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
**Current**: All 8 pages complete with exact Figma 1:1 designs
**Next**: 
1. Implement audio streaming backend (HLS/MP3)
2. Add M3U playlist parsing and loading
3. Implement favorites save/load to LocalStorage
4. Add search functionality
5. Connect genre filtering

## User Preferences
- **NO LOGIN BUTTONS** - User requested all login buttons removed (except logout in settings)
- **CLEAN SEARCH** - Search page should have minimal UI (no country selector, equalizer, or login)
- **COUNTRY MODAL** - Must be accessible from location selector on all pages
- **EXACT FIGMA MATCH** - All layouts use absolute positioning at 1920x1080px resolution

## Recent Changes
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
