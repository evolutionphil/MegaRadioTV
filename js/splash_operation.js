// Splash Page Controller
var splash_page = (function() {
    
    function init() {
        console.log('Splash page initialized');
    }
    
    function keyDown(e) {
        // Skip splash on any key press
        if (e.keyCode === keys.ENTER || e.keyCode === keys.RETURN) {
            showPage('home');
        }
    }
    
    return {
        init: init,
        keyDown: keyDown
    };
})();
