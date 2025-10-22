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
3. **Player Screen** - Radio streaming (to be implemented)

## Features
- ✅ SPA architecture with page-based navigation
- ✅ Platform detection (Samsung/LG/Web)
- ✅ Remote control key handling (arrows, OK, RETURN, media keys)
- ✅ Focus management for TV navigation
- ✅ Home page with Figma design (disco background, left menu, 6-column station grid)
- ✅ Station grid display with white cards (200x264px)
- ✅ LocalStorage persistence
- ✅ Menu-based navigation (Discover, Genres, Search, Favorites, Records, Settings)
- ⏳ M3U playlist parsing
- ⏳ Audio streaming
- ⏳ Favorites functionality

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
**Current**: Home page Figma design implemented with exact 1:1 layout
**Next**: 
1. Implement audio player
2. Add M3U playlist loading
3. Implement favorites functionality
4. Match Figma design for splash screen (if different from current)

## Recent Changes
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
