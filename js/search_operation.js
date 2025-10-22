var search_page = {
    current_suggestion_index: 0,
    current_station_index: 0,
    focus_area: 'search_bar',
    stations_cols: 2,
    stations_rows: 3,
    
    init: function() {
        console.log('Search page initialized');
        this.current_suggestion_index = 0;
        this.current_station_index = 0;
        this.focus_area = 'search_bar';
        this.setActiveSuggestion();
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
