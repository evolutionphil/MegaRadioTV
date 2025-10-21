// Platform detection
var platform = 'samsung';
var current_route = 'splash'; // Current active page

// Detect platform
if (typeof webOS !== 'undefined') {
    platform = 'lg';
} else if (typeof tizen !== 'undefined') {
    platform = 'samsung';
}

console.log('Platform detected: ' + platform);

// Initialize app
window.onload = function() {
    console.log('MegaRadioTV initialized');
    init();
};

function init() {
    console.log('init() called - platform: ' + platform);
    
    // Show splash screen
    showPage('splash');
    
    // Auto-transition to home after 3 seconds
    setTimeout(function() {
        showPage('home');
    }, 3000);
    
    // Setup key handlers
    document.addEventListener('keydown', function(e) {
        console.log('Key code: ' + e.keyCode);
        routeKeyEvent(e);
    });
    
    // Handle visibility changes
    document.addEventListener('visibilitychange', function() {
        if(document.hidden){
            // App hidden/paused
            console.log('App hidden');
        } else {
            // App resumed
            console.log('App resumed');
        }
    });
}

// Route key events to active page
function routeKeyEvent(e) {
    if (current_route === 'splash' && typeof splash_page !== 'undefined') {
        splash_page.keyDown(e);
    } else if (current_route === 'home' && typeof home_page !== 'undefined') {
        home_page.keyDown(e);
    } else if (current_route === 'player' && typeof player_page !== 'undefined') {
        player_page.keyDown(e);
    }
    
    // Global back button (Samsung RETURN button)
    if (e.keyCode === 10009) {
        handleBackButton();
    }
}

// Page navigation
function showPage(pageName) {
    console.log('Showing page: ' + pageName);
    
    // Hide all pages
    var pages = document.querySelectorAll('[id$="-page"]');
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }
    
    // Show requested page
    var page = document.getElementById(pageName + '-page');
    if (page) {
        page.style.display = 'block';
        current_route = pageName;
    }
}

// Handle back button
function handleBackButton() {
    console.log('Back button pressed from: ' + current_route);
    
    if (current_route === 'home') {
        // Exit app or show exit confirmation
        if (platform === 'samsung' && typeof tizen !== 'undefined') {
            tizen.application.getCurrentApplication().exit();
        }
    } else if (current_route === 'player') {
        showPage('home');
    } else {
        showPage('home');
    }
}
