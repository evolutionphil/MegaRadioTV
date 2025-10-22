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
    
    // Start with splash screen
    showPage('splash');
    
    // Setup key handlers
    document.addEventListener('keydown', function(e) {
        console.log('Key code: ' + e.keyCode);
        routeKeyEvent(e);
    });
    
    // Setup sidebar navigation click handlers
    setupSidebarNavigation();
    
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

// Setup sidebar navigation click handlers
function setupSidebarNavigation() {
    var navItems = document.querySelectorAll('.nav-item');
    for (var i = 0; i < navItems.length; i++) {
        (function(item) {
            var menu = item.getAttribute('data-menu');
            item.addEventListener('click', function() {
                if (menu) {
                    showPage(menu);
                }
            });
            item.style.cursor = 'pointer';
        })(navItems[i]);
    }
}

// Route key events to active page
function routeKeyEvent(e) {
    var modal = document.getElementById('country-modal');
    if (modal && modal.classList.contains('active')) {
        country_modal.handleKey(e.keyCode);
        return;
    }
    
    if (current_route === 'splash' && typeof splash_page !== 'undefined') {
        splash_page.keyDown(e);
    } else if (current_route === 'home' && typeof home_page !== 'undefined') {
        home_page.keyDown(e);
    } else if (current_route === 'genres' && typeof genres_page !== 'undefined') {
        genres_page.handleKey(e.keyCode);
    } else if (current_route === 'search' && typeof search_page !== 'undefined') {
        search_page.handleKey(e.keyCode);
    } else if (current_route === 'genre-detail' && typeof genre_detail_page !== 'undefined') {
        genre_detail_page.handleKey(e.keyCode);
    } else if (current_route === 'favorites' && typeof favorites_page !== 'undefined') {
        favorites_page.handleKey(e.keyCode);
    } else if (current_route === 'settings' && typeof settings_page !== 'undefined') {
        settings_page.handleKey(e.keyCode);
    } else if (current_route === 'player' && typeof player_page !== 'undefined') {
        player_page.handleKey(e.keyCode);
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
        
        // Initialize the page after showing it
        console.log('Checking page initialization for: ' + pageName);
        console.log('home_page defined:', typeof home_page !== 'undefined');
        console.log('splash_page defined:', typeof splash_page !== 'undefined');
        console.log('genres_page defined:', typeof genres_page !== 'undefined');
        console.log('search_page defined:', typeof search_page !== 'undefined');
        console.log('genre_detail_page defined:', typeof genre_detail_page !== 'undefined');
        console.log('favorites_page defined:', typeof favorites_page !== 'undefined');
        
        if (pageName === 'home' && typeof home_page !== 'undefined') {
            console.log('Initializing home page...');
            home_page.init();
        } else if (pageName === 'splash' && typeof splash_page !== 'undefined') {
            console.log('Initializing splash page...');
            splash_page.init();
        } else if (pageName === 'genres' && typeof genres_page !== 'undefined') {
            console.log('Initializing genres page...');
            genres_page.init();
        } else if (pageName === 'search' && typeof search_page !== 'undefined') {
            console.log('Initializing search page...');
            search_page.init();
        } else if (pageName === 'genre-detail' && typeof genre_detail_page !== 'undefined') {
            console.log('Initializing genre detail page...');
            var genreName = arguments[1] || 'Pop';
            genre_detail_page.init(genreName);
        } else if (pageName === 'favorites' && typeof favorites_page !== 'undefined') {
            console.log('Initializing favorites page...');
            favorites_page.init();
        } else if (pageName === 'settings' && typeof settings_page !== 'undefined') {
            console.log('Initializing settings page...');
            settings_page.init();
        } else if (pageName === 'player' && typeof player_page !== 'undefined') {
            console.log('Initializing player page...');
            var station = arguments[1] || null;
            player_page.init(station);
        } else {
            console.log('ERROR: Could not initialize page ' + pageName);
        }
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
    } else if (current_route === 'genres') {
        showPage('home');
    } else if (current_route === 'search') {
        showPage('home');
    } else if (current_route === 'genre-detail') {
        showPage('genres');
    } else if (current_route === 'favorites') {
        showPage('home');
    } else if (current_route === 'settings') {
        showPage('home');
    } else if (current_route === 'player') {
        showPage('home');
    } else {
        showPage('home');
    }
}
