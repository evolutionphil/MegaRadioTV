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
│   └── def_image.jpg             # Default station image
│
├── webOSTVjs-1.2.0/              # LG webOS SDK
│   └── webOSTV.js
│
└── tools/                        # Build scripts (to be added)
```

## Application Flow
1. **Splash Screen** - Auto-displays for 3 seconds on app start
2. **Home Screen** - Main interface with category sidebar and station grid
3. **Player Screen** - Radio streaming (to be implemented)

## Features
- ✅ SPA architecture with page-based navigation
- ✅ Platform detection (Samsung/LG/Web)
- ✅ Remote control key handling (arrows, OK, RETURN, media keys)
- ✅ Focus management for TV navigation
- ✅ Category filtering
- ✅ Station grid display
- ✅ LocalStorage persistence
- ⏳ M3U playlist parsing
- ⏳ Audio streaming
- ⏳ Favorites management

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
**Current**: Base structure complete, matching FLIX-IPTV architecture
**Next**: 
1. Match Figma design for splash screen
2. Implement audio player
3. Add M3U playlist loading
4. Implement favorites functionality

## Recent Changes
- 2025-10-21: Restructured to match FLIX-IPTV technology stack
- 2025-10-21: Downloaded and vendored all libraries locally (jQuery, Bootstrap, Font Awesome)
- 2025-10-21: Created SPA structure with splash, home, and player pages
- 2025-10-21: Implemented platform detection and key handling
- 2025-10-21: Created config files for both LG webOS and Samsung Tizen
- 2025-10-21: Set up build scripts in package.json
