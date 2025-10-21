// Remote control key codes
var keys = {
    // Navigation
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    ENTER: 13,
    RETURN: 10009,      // Samsung back button
    
    // Media controls
    PLAY: 415,
    PAUSE: 19,
    STOP: 413,
    PLAYPAUSE: 10252,
    REWIND: 412,
    FASTFORWARD: 417,
    
    // Color buttons
    RED: 403,
    GREEN: 404,
    YELLOW: 405,
    BLUE: 406,
    
    // Number keys
    NUM_0: 48,
    NUM_1: 49,
    NUM_2: 50,
    NUM_3: 51,
    NUM_4: 52,
    NUM_5: 53,
    NUM_6: 54,
    NUM_7: 55,
    NUM_8: 56,
    NUM_9: 57,
    
    // Additional
    INFO: 457,
    EXIT: 10182,
    MENU: 18,
    TOOLS: 10135,
    CHLIST: 10073,
    PRECH: 10190,
    SOURCE: 10072,
    CHUP: 427,
    CHDOWN: 428,
    VOLUP: 447,
    VOLDOWN: 448,
    MUTE: 449
};

// Register Samsung TV keys
function registerSamsungKeys() {
    if (typeof tizen !== 'undefined') {
        try {
            var supportedKeys = [
                'MediaPlay', 'MediaPause', 'MediaStop', 'MediaPlayPause',
                'MediaRewind', 'MediaFastForward',
                'MediaTrackPrevious', 'MediaTrackNext',
                'ColorF0Red', 'ColorF1Green', 'ColorF2Yellow', 'ColorF3Blue',
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'ChannelUp', 'ChannelDown',
                'VolumeUp', 'VolumeDown', 'VolumeMute',
                'Info', 'Exit', 'Tools'
            ];
            
            for (var i = 0; i < supportedKeys.length; i++) {
                tizen.tvinputdevice.registerKey(supportedKeys[i]);
            }
            
            console.log('Samsung TV keys registered');
        } catch (e) {
            console.error('Failed to register Samsung keys:', e);
        }
    }
}

// Register keys on initialization
if (typeof window !== 'undefined') {
    window.addEventListener('load', function() {
        registerSamsungKeys();
    });
}
