// Splash Page Controller
var splash_page = (function() {
    var splashTimer = null;
    
    function init() {
        console.log('Splash page initialized');
        
        // Auto-transition to home after 3 seconds
        clearTimeout(splashTimer);
        splashTimer = setTimeout(function() {
            console.log('Splash timeout - showing home page');
            showPage('home');
        }, 3000);
    }
    
    function keyDown(e) {
        // Skip splash on any key press
        if (e.keyCode === keys.ENTER || e.keyCode === keys.RETURN) {
            clearTimeout(splashTimer);
            showPage('home');
        }
    }
    
    return {
        init: init,
        keyDown: keyDown
    };
})();
