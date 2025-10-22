var genre_detail_page = {
    stations: [],
    current_station_index: 0,
    grid_cols: 6,
    grid_rows: 3,
    current_genre: 'Pop',
    
    init: function(genreName) {
        console.log('Genre detail page initialized for:', genreName);
        this.current_genre = genreName || 'Pop';
        this.current_station_index = 0;
        
        var title = document.getElementById('genre-detail-page').querySelector('.genre-title');
        if (title) {
            title.textContent = genreName || 'Pop';
        }
        
        this.loadGenreStations();
    },
    
    loadGenreStations: function() {
        var self = this;
        var gridContainer = document.getElementById('genre-detail-grid');
        var selectedCountry = API.getSelectedCountry();
        
        if (!gridContainer) return;
        
        gridContainer.innerHTML = '<div style="color: white; padding: 40px; text-align: center;">Loading ' + this.current_genre + ' stations...</div>';
        
        API.getStationsByGenre(this.current_genre, 18, selectedCountry)
            .then(function(stations) {
                self.stations = stations;
                self.renderStations();
            })
            .catch(function(error) {
                console.error('Failed to load genre stations:', error);
                gridContainer.innerHTML = '<div style="color: white; padding: 40px; text-align: center;">Failed to load stations</div>';
            });
    },
    
    renderStations: function() {
        var gridContainer = document.getElementById('genre-detail-grid');
        if (!gridContainer) return;
        
        gridContainer.innerHTML = '';
        
        var positions = [
            {x: 236, y: 316}, {x: 466, y: 316}, {x: 696, y: 316}, {x: 926, y: 316}, {x: 1156, y: 316}, {x: 1386, y: 316},
            {x: 236, y: 610}, {x: 466, y: 610}, {x: 696, y: 610}, {x: 926, y: 610}, {x: 1156, y: 610}, {x: 1386, y: 610},
            {x: 236, y: 904}, {x: 466, y: 904}, {x: 696, y: 904}, {x: 926, y: 904}, {x: 1156, y: 904}, {x: 1386, y: 904}
        ];
        
        for (var i = 0; i < Math.min(18, this.stations.length); i++) {
            var station = this.stations[i];
            var pos = positions[i];
            
            var card = document.createElement('div');
            card.className = 'radio-card';
            card.style.left = pos.x + 'px';
            card.style.top = pos.y + 'px';
            card.style.cursor = 'pointer';
            card.setAttribute('data-index', i);
            
            var tags = station.tags || [];
            var genre = tags.length > 0 ? tags[0] : this.current_genre;
            
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
            
            gridContainer.appendChild(card);
        }
    },
    
    updateFocus: function() {
        var cards = document.querySelectorAll('.genre-detail-grid .radio-card');
        for (var i = 0; i < cards.length; i++) {
            cards[i].classList.remove('active');
        }
        
        if (cards[this.current_station_index]) {
            cards[this.current_station_index].classList.add('active');
        }
    },
    
    handleKey: function(keyCode) {
        var totalStations = 18;
        
        switch(keyCode) {
            case KEY_LEFT:
                if (this.current_station_index % this.grid_cols > 0) {
                    this.current_station_index--;
                    this.updateFocus();
                }
                break;
                
            case KEY_RIGHT:
                if (this.current_station_index % this.grid_cols < this.grid_cols - 1 && 
                    this.current_station_index < totalStations - 1) {
                    this.current_station_index++;
                    this.updateFocus();
                }
                break;
                
            case KEY_UP:
                if (this.current_station_index >= this.grid_cols) {
                    this.current_station_index -= this.grid_cols;
                    this.updateFocus();
                }
                break;
                
            case KEY_DOWN:
                if (this.current_station_index + this.grid_cols < totalStations) {
                    this.current_station_index += this.grid_cols;
                    this.updateFocus();
                }
                break;
                
            case KEY_ENTER:
                console.log('Station selected');
                break;
                
            case KEY_BACK:
                showPage('genres');
                break;
        }
    }
};

// Add click handlers to station cards on genre detail page
document.addEventListener('DOMContentLoaded', function() {
    var radioCards = document.querySelectorAll('#genre-detail-page .radio-card');
    radioCards.forEach(function(card) {
        card.addEventListener('click', function() {
            var station = {
                name: card.querySelector('.radio-name')?.textContent || 'Unknown Station',
                song: 'Now Playing',
                logo: card.querySelector('.radio-logo img')?.src || 'images/def_image.jpg',
                genre: card.querySelector('.radio-genre')?.textContent || 'Music',
                tags: ['128kb', 'MP3', 'AT', 'Pop']
            };
            showPage('player', station);
        });
    });
});
