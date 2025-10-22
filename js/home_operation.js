var home_page = (function() {
    var popular_radios = [];
    var country_stations = [];
    
    function init() {
        console.log('Home page initialized - loading real API data');
        var selectedCountry = API.getSelectedCountry();
        
        // Update country selector text
        var selectors = document.querySelectorAll('.location-text');
        for (var i = 0; i < selectors.length; i++) {
            selectors[i].textContent = selectedCountry;
        }
        
        loadStations(selectedCountry);
    }
    
    function loadStations(country) {
        var popularContainer = document.getElementById('home-page').querySelector('.radios-container');
        var countryContainer = document.getElementById('home-page').querySelectorAll('.radios-container')[1];
        
        if (popularContainer) {
            popularContainer.innerHTML = '<div style="color: white; padding: 40px; text-align: center;">Loading Popular Radios...</div>';
        }
        if (countryContainer) {
            countryContainer.innerHTML = '<div style="color: white; padding: 40px; text-align: center;">Loading ' + country + ' Stations...</div>';
        }
        
        // Load popular stations (globally popular, limit 14)
        API.getPopularStations(14)
            .then(function(stations) {
                popular_radios = stations;
                renderPopularRadios();
            })
            .catch(function(error) {
                console.error('Failed to load popular stations:', error);
                if (popularContainer) {
                    popularContainer.innerHTML = '<div style="color: white; padding: 40px; text-align: center;">Failed to load stations</div>';
                }
            });
        
        // Load stations by selected country (limit 14)
        API.getStationsByCountry(country, 14)
            .then(function(stations) {
                country_stations = stations;
                renderCountryStations();
            })
            .catch(function(error) {
                console.error('Failed to load country stations:', error);
                if (countryContainer) {
                    countryContainer.innerHTML = '<div style="color: white; padding: 40px; text-align: center;">Failed to load stations</div>';
                }
            });
    }
    
    function renderPopularRadios() {
        var container = document.getElementById('home-page').querySelector('.radios-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        // Row 1: 7 cards
        for (var i = 0; i < Math.min(7, popular_radios.length); i++) {
            var card = createStationCard(popular_radios[i], i, i);
            container.appendChild(card);
        }
        
        // Row 2: 7 cards
        for (var j = 7; j < Math.min(14, popular_radios.length); j++) {
            var card = createStationCard(popular_radios[j], j, j);
            container.appendChild(card);
        }
    }
    
    function renderCountryStations() {
        var containers = document.getElementById('home-page').querySelectorAll('.radios-container');
        var container = containers[1];
        if (!container) return;
        
        container.innerHTML = '';
        
        // 14 cards total (2 rows of 7)
        for (var i = 0; i < Math.min(14, country_stations.length); i++) {
            var card = createStationCard(country_stations[i], i, i);
            container.appendChild(card);
        }
    }
    
    function createStationCard(station, index, position) {
        var positions = [
            {left: 236, top: 539},
            {left: 466, top: 539},
            {left: 696, top: 539},
            {left: 926, top: 539},
            {left: 1156, top: 539},
            {left: 1386, top: 539},
            {left: 1616, top: 539},
            {left: 236, top: 833},
            {left: 466, top: 833},
            {left: 696, top: 833},
            {left: 926, top: 833},
            {left: 1156, top: 833},
            {left: 1386, top: 833},
            {left: 1616, top: 833}
        ];
        
        var pos = positions[position] || {left: 236, top: 539};
        
        var card = document.createElement('div');
        card.className = 'radio-card';
        card.style.left = pos.left + 'px';
        card.style.top = pos.top + 'px';
        card.style.cursor = 'pointer';
        
        var tags = station.tags || [];
        var genre = tags.length > 0 ? tags[0] : (station.genre || 'Music');
        
        card.innerHTML = 
            '<div class="radio-logo">' +
                '<img src="' + station.favicon + '" alt="' + station.name + '">' +
            '</div>' +
            '<div class="radio-name">' + station.name + '</div>' +
            '<div class="radio-genre">' + genre + '</div>';
        
        card.onclick = function() {
            showPage('player', {
                name: station.name,
                song: 'Now Playing',
                logo: station.favicon,
                genre: genre,
                tags: [station.bitrate + 'kb', station.codec, station.country, genre],
                url: station.url_resolved,
                stationId: station._id
            });
        };
        
        return card;
    }
    
    return {
        init: init
    };
})();
