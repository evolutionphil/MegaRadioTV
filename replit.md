# MegaRadioTV - Samsung Tizen TV Application

## Overview
This is a basic Samsung Tizen TV application template originally created with the Tizen Web IDE. It's a static HTML/CSS/JavaScript web application designed for Samsung Smart TVs. The app demonstrates basic Tizen TV functionality including remote control key handling and a simple clock feature.

## Project Type
- **Platform**: Samsung Tizen TV
- **Technology**: Static HTML/CSS/JavaScript
- **Server**: Python HTTP Server (for development)

## Project Structure
```
.
├── index.html          # Main HTML page
├── config.xml          # Tizen app configuration
├── icon.png            # App icon
├── MegaRadioTV.wgt    # Tizen widget package (pre-built)
├── css/
│   └── style.css       # Application styles
├── js/
│   └── main.js         # Main JavaScript logic
└── images/
    └── tizen_32.png    # Tizen logo
```

## Features
- Basic Tizen TV template with navigation
- Remote control key event handling (arrows, OK, RETURN buttons)
- Clock display functionality
- Responsive layout optimized for TV screens (1080x1920)
- TV-specific event handling (visibility changes, hardware keys)

## Development Setup
The app runs on a simple Python HTTP server:
- **Port**: 5000
- **Host**: 0.0.0.0 (accessible from anywhere)
- **Server**: Python's built-in HTTP server

## Running the App
The workflow is already configured and runs automatically. The server serves static files from the project root.

## Deployment
Configured for autoscale deployment using Python's HTTP server. The app is a static website with no backend requirements.

## Key Technologies
- **HTML5**: Semantic markup
- **CSS3**: Custom styling for TV screens
- **JavaScript**: Vanilla JS for interactivity
- **Tizen Web APIs**: TV-specific functionality (requires actual Tizen TV environment)

## Notes
- The app includes Tizen-specific APIs (like `tizen.application`) that will only work on actual Tizen TV devices
- For web preview, these APIs are inactive but the core HTML/CSS/JS functionality works
- The `.wgt` file is a pre-packaged Tizen widget for deployment to Samsung TVs
- Remote control key codes are mapped in `main.js` for TV navigation

## Recent Changes
- 2025-10-21: Imported from GitHub and configured for Replit environment
- 2025-10-21: Set up Python HTTP server workflow on port 5000
- 2025-10-21: Configured autoscale deployment
