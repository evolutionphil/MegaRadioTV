var search_page = {
    search_results: [],
    current_query: '',
    
    init: function() {
        console.log('Search page initialized');
        var searchInput = document.querySelector('#search-page .search-input');
        if (searchInput) {
            searchInput.value = '';
        }
        
        this.search_results = [];
        this.renderResults();
    },
    
    performSearch: function(query) {
        var self = this;
        this.current_query = query;
        var resultsContainer = document.getElementById('search-results-grid');
        var selectedCountry = API.getSelectedCountry();
        
        if (!resultsContainer) return;
        
        if (!query || query.trim() === '') {
            resultsContainer.innerHTML = '<div style="color: white; padding: 40px; text-align: center;">Enter a search term</div>';
            return;
        }
        
        resultsContainer.innerHTML = '<div style="color: white; padding: 40px; text-align: center;">Searching for "' + query + '"...</div>';
        
        API.searchStations(query, 18, selectedCountry)
            .then(function(stations) {
                self.search_results = stations;
                self.renderResults();
            })
            .catch(function(error) {
                console.error('Search failed:', error);
                resultsContainer.innerHTML = '<div style="color: white; padding: 40px; text-align: center;">Search failed</div>';
            });
    },
    
    renderResults: function() {
        var resultsContainer = document.getElementById('search-results-grid');
        if (!resultsContainer) return;
        
        if (this.search_results.length === 0) {
            resultsContainer.innerHTML = '<div style="color: white; padding: 40px; text-align: center;">No results found</div>';
            return;
        }
        
        resultsContainer.innerHTML = '';
        
        var positions = [
            {x: 236, y: 316}, {x: 466, y: 316}, {x: 696, y: 316}, {x: 926, y: 316}, {x: 1156, y: 316}, {x: 1386, y: 316},
            {x: 236, y: 610}, {x: 466, y: 610}, {x: 696, y: 610}, {x: 926, y: 610}, {x: 1156, y: 610}, {x: 1386, y: 610},
            {x: 236, y: 904}, {x: 466, y: 904}, {x: 696, y: 904}, {x: 926, y: 904}, {x: 1156, y: 904}, {x: 1386, y: 904}
        ];
        
        for (var i = 0; i < Math.min(18, this.search_results.length); i++) {
            var station = this.search_results[i];
            var pos = positions[i];
            
            var card = document.createElement('div');
            card.className = 'radio-card';
            card.style.left = pos.x + 'px';
            card.style.top = pos.y + 'px';
            card.style.cursor = 'pointer';
            
            var tags = station.tags || [];
            var genre = tags.length > 0 ? tags[0] : 'Music';
            
            card.innerHTML =
                '<div class="radio-logo">' +
                    '<img src="' + station.favicon + '" alt="' + station.name + '">' +
                '</div>' +
                '<p class="radio-name">' + station.name + '</p>' +
                '<p class="radio-genre">' + genre + '</p>';
            
            (function(stationData) {
                card.onclick = function() {
                    showPage('player', {
                        name: stationData.name,
                        song: 'Now Playing',
                        logo: stationData.favicon,
                        genre: genre,
                        tags: [stationData.bitrate + 'kb', stationData.codec, stationData.country, genre],
                        url: stationData.url_resolved,
                        stationId: stationData._id
                    });
                };
            })(station);
            
            resultsContainer.appendChild(card);
        }
    },
    
    setActiveSuggestion: function() {
        $('.suggestion-item').removeClass('active');
        
        if (this.focus_area === 'suggestions') {
            $('.suggestion-item').eq(this.current_suggestion_index).addClass('active');
        }
    },
    
    setActiveStation: function() {
        $('.recently-played-grid .radio-card').removeClass('active');
        
        if (this.focus_area === 'stations') {
            $('.recently-played-grid .radio-card').eq(this.current_station_index).addClass('active');
        }
    },
    
    handleKey: function(keyCode) {
        console.log('Search page handling key:', keyCode);
        
        if (this.focus_area === 'search_bar') {
            this.handleSearchBarKeys(keyCode);
        } else if (this.focus_area === 'suggestions') {
            this.handleSuggestionsKeys(keyCode);
        } else if (this.focus_area === 'stations') {
            this.handleStationsKeys(keyCode);
        }
    },
    
    handleSearchBarKeys: function(keyCode) {
        switch(keyCode) {
            case KEY_DOWN:
                this.focus_area = 'suggestions';
                this.current_suggestion_index = 0;
                this.setActiveSuggestion();
                break;
                
            case KEY_RIGHT:
                this.focus_area = 'stations';
                this.current_station_index = 0;
                this.setActiveStation();
                break;
                
            case KEY_BACK:
                showPage('home');
                break;
        }
    },
    
    handleSuggestionsKeys: function(keyCode) {
        switch(keyCode) {
            case KEY_UP:
                if (this.current_suggestion_index > 0) {
                    this.current_suggestion_index--;
                    this.setActiveSuggestion();
                } else {
                    this.focus_area = 'search_bar';
                    $('.suggestion-item').removeClass('active');
                }
                break;
                
            case KEY_DOWN:
                if (this.current_suggestion_index < 3) {
                    this.current_suggestion_index++;
                    this.setActiveSuggestion();
                }
                break;
                
            case KEY_RIGHT:
                this.focus_area = 'stations';
                this.current_station_index = 0;
                this.setActiveStation();
                break;
                
            case KEY_ENTER:
                console.log('Suggestion selected');
                break;
                
            case KEY_BACK:
                showPage('home');
                break;
        }
    },
    
    handleStationsKeys: function(keyCode) {
        var totalStations = 6;
        
        switch(keyCode) {
            case KEY_LEFT:
                if (this.current_station_index % this.stations_cols === 0) {
                    this.focus_area = 'suggestions';
                    this.setActiveSuggestion();
                    $('.recently-played-grid .radio-card').removeClass('active');
                } else {
                    this.current_station_index--;
                    this.setActiveStation();
                }
                break;
                
            case KEY_RIGHT:
                if (this.current_station_index % this.stations_cols < this.stations_cols - 1 && 
                    this.current_station_index < totalStations - 1) {
                    this.current_station_index++;
                    this.setActiveStation();
                }
                break;
                
            case KEY_UP:
                if (this.current_station_index >= this.stations_cols) {
                    this.current_station_index -= this.stations_cols;
                    this.setActiveStation();
                }
                break;
                
            case KEY_DOWN:
                if (this.current_station_index + this.stations_cols < totalStations) {
                    this.current_station_index += this.stations_cols;
                    this.setActiveStation();
                }
                break;
                
            case KEY_ENTER:
                console.log('Station selected');
                break;
                
            case KEY_BACK:
                showPage('home');
                break;
        }
    }
};
