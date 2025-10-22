// Mega Radio API Service
// CRITICAL: All Smart TV requests MUST include ?tv=1 query parameter

var API = (function() {
    var BASE_URL = 'https://themegaradio.com';
    var FALLBACK_FAVICON = 'images/fallback-favicon.png';
    
    // Get current selected country from storage
    function getSelectedCountry() {
        return loadFromStorage('selected_country') || 'Austria';
    }
    
    // Set selected country
    function setSelectedCountry(country) {
        saveToStorage('selected_country', country);
    }
    
    // Helper to build URL with tv=1 parameter
    function buildUrl(endpoint, params) {
        params = params || {};
        params.tv = '1'; // REQUIRED for Smart TV
        
        var url = BASE_URL + endpoint;
        var queryString = Object.keys(params)
            .map(function(key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
            })
            .join('&');
        
        return url + '?' + queryString;
    }
    
    // Generic fetch wrapper
    function fetchAPI(endpoint, params) {
        var url = buildUrl(endpoint, params);
        
        return fetch(url, {
            headers: {
                'User-Agent': 'Tizen/6.0 Samsung TV',
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('API Error: ' + response.status);
            }
            return response.json();
        })
        .catch(function(error) {
            console.error('API request failed:', error);
            throw error;
        });
    }
    
    // Normalize station data to ensure favicon
    function normalizeStation(station) {
        if (!station) return station;
        
        // Use fallback favicon if not available
        if (!station.favicon || station.favicon === '') {
            station.favicon = FALLBACK_FAVICON;
        }
        
        // Ensure we have url_resolved for streaming
        if (!station.url_resolved && station.url) {
            station.url_resolved = station.url;
        }
        
        return station;
    }
    
    // Normalize array of stations
    function normalizeStations(stations) {
        if (!Array.isArray(stations)) return [];
        return stations.map(normalizeStation);
    }
    
    return {
        // Country management
        getSelectedCountry: getSelectedCountry,
        setSelectedCountry: setSelectedCountry,
        
        // Get all countries
        getCountries: function() {
            return fetchAPI('/api/countries', {});
        },
        
        // Get all genres
        getGenres: function() {
            return fetchAPI('/api/genres', {})
                .then(function(response) {
                    return response.data || response.genres || [];
                });
        },
        
        // Get discoverable genres
        getDiscoverableGenres: function() {
            return fetchAPI('/api/genres/discoverable', {})
                .then(function(response) {
                    return response.data || response.genres || [];
                });
        },
        
        // Get popular stations
        getPopularStations: function(limit, country) {
            var params = { limit: limit || 50 };
            if (country && country !== 'all') {
                params.country = country;
            }
            return fetchAPI('/api/stations/popular', params)
                .then(function(stations) {
                    return normalizeStations(Array.isArray(stations) ? stations : stations.stations || []);
                });
        },
        
        // Get stations by country
        getStationsByCountry: function(country, limit) {
            var params = {
                country: country || 'all',
                limit: limit || 50
            };
            return fetchAPI('/api/stations', params)
                .then(function(response) {
                    return normalizeStations(response.stations || []);
                });
        },
        
        // Get stations by genre
        getStationsByGenre: function(genreSlug, limit, country) {
            var params = { limit: limit || 50 };
            if (country && country !== 'all') {
                params.country = country;
            }
            
            return fetchAPI('/api/genres/' + genreSlug + '/stations', params)
                .then(function(response) {
                    return normalizeStations(response.stations || []);
                });
        },
        
        // Search stations
        searchStations: function(query, limit, country) {
            var params = {
                search: query,
                limit: limit || 50
            };
            if (country && country !== 'all') {
                params.country = country;
            }
            
            return fetchAPI('/api/stations', params)
                .then(function(response) {
                    return normalizeStations(response.stations || []);
                });
        },
        
        // Get similar stations
        getSimilarStations: function(stationId, limit) {
            return fetchAPI('/api/stations/similar/' + stationId, { limit: limit || 12 })
                .then(function(response) {
                    return normalizeStations(response.stations || []);
                });
        },
        
        // Get station by ID
        getStation: function(stationId) {
            return fetchAPI('/api/station/' + stationId, {})
                .then(function(response) {
                    return normalizeStation(response.station);
                });
        },
        
        // Normalize helpers (exposed for external use)
        normalizeStation: normalizeStation,
        normalizeStations: normalizeStations,
        FALLBACK_FAVICON: FALLBACK_FAVICON
    };
})();
