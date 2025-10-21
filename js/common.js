// Global state variables
var stations = [];  // Radio stations
var favorites = [];
var settings = {};
var current_station = null;

// Storage prefix based on platform
var storage_id = 'megaradiotv_' + (typeof platform !== 'undefined' ? platform : 'web');

// Save to localStorage
function saveToStorage(key, value) {
    try {
        localStorage.setItem(storage_id + '_' + key, JSON.stringify(value));
    } catch (e) {
        console.error('Failed to save to storage:', e);
    }
}

// Load from localStorage
function loadFromStorage(key) {
    try {
        var item = localStorage.getItem(storage_id + '_' + key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error('Failed to load from storage:', e);
        return null;
    }
}

// Remove from localStorage
function removeFromStorage(key) {
    try {
        localStorage.removeItem(storage_id + '_' + key);
    } catch (e) {
        console.error('Failed to remove from storage:', e);
    }
}

// Utility: Show loader
function showLoader() {
    var loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'block';
    }
}

// Utility: Hide loader
function hideLoader() {
    var loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
}

// Utility: Show message
function showMessage(message, type) {
    console.log('[' + (type || 'INFO') + '] ' + message);
    // TODO: Implement on-screen message display
}

// Parse M3U playlist (for radio streams)
function parseM3uPlaylist(text_response) {
    var entries = text_response.split(/#EXTINF:-{0,1}[0-9]{1,} {0,},{0,}/gm);
    var parsed_stations = [];
    
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        if (!entry || entry.trim() === '') continue;
        
        var lines = entry.split("\n");
        var metadata = lines[0] || '';
        var url = (lines[1] || '').trim();
        
        if (!url) continue;
        
        var station = {
            name: '',
            url: url,
            logo: '',
            category: 'General'
        };
        
        // Extract station name (text after last comma)
        var nameMatch = metadata.match(/,(.+)$/);
        if (nameMatch) {
            station.name = nameMatch[1].trim();
        }
        
        // Extract logo URL
        var logoMatch = metadata.match(/tvg-logo="([^"]+)"/i);
        if (logoMatch) {
            station.logo = logoMatch[1];
        }
        
        // Extract category
        var categoryMatch = metadata.match(/group-title="([^"]+)"/i);
        if (categoryMatch) {
            station.category = categoryMatch[1];
        }
        
        parsed_stations.push(station);
    }
    
    return parsed_stations;
}

// Load initial data
function loadInitialData() {
    // Load saved favorites
    favorites = loadFromStorage('favorites') || [];
    settings = loadFromStorage('settings') || {
        volume: 70,
        theme: 'dark'
    };
}

// Initialize on load
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', function() {
        loadInitialData();
    });
}
