var player_page = {
    current_station: null,
    is_playing: false,
    current_btn_index: 1,
    similar_stations: [],
    
    init: function(station) {
        console.log('Player page initialized', station);
        this.current_station = station || {
            name: 'Metro FM',
            song: 'Starboy - The Weeknd',
            logo: 'images/fallback-favicon.png',
            tags: ['128kb', 'MP3', 'AT', 'Rock', 'Classic']
        };
        this.is_playing = true;
        this.current_btn_index = 1;
        this.updateDisplay();
        this.updateFocus();
        
        if (station && station.stationId) {
            this.loadSimilarStations(station.stationId);
        }
    },
    
    loadSimilarStations: function(stationId) {
        var self = this;
        var container = document.getElementById('player-page').querySelector('.similar-radios-container');
        
        if (container) {
            container.innerHTML = '<div style="color: white; padding: 40px; text-align: center;">Loading similar stations...</div>';
        }
        
        API.getSimilarStations(stationId, 12)
            .then(function(stations) {
                self.similar_stations = stations;
                self.renderSimilarStations();
            })
            .catch(function(error) {
                console.error('Failed to load similar stations:', error);
                if (container) {
                    container.innerHTML = '<div style="color: white; padding: 40px; text-align: center;">No similar stations found</div>';
                }
            });
    },
    
    renderSimilarStations: function() {
        var container = document.getElementById('player-page').querySelector('.similar-radios-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        var positions = [
            {left: 236, top: 733}, {left: 466, top: 733}, {left: 696, top: 733}, {left: 926, top: 733}, {left: 1156, top: 733}, {left: 1386, top: 733},
            {left: 236, top: 1027}, {left: 466, top: 1027}, {left: 696, top: 1027}, {left: 926, top: 1027}, {left: 1156, top: 1027}, {left: 1386, top: 1027}
        ];
        
        for (var i = 0; i < Math.min(12, this.similar_stations.length); i++) {
            var station = this.similar_stations[i];
            var pos = positions[i];
            
            var card = document.createElement('div');
            card.className = 'radio-card';
            card.style.left = pos.left + 'px';
            card.style.top = pos.top + 'px';
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
            
            container.appendChild(card);
        }
    },
    
    updateDisplay: function() {
        var nameEl = document.getElementById('player-station-name');
        var songEl = document.getElementById('player-song-info');
        var imageEl = document.getElementById('player-station-image');
        
        if (nameEl) nameEl.textContent = this.current_station.name;
        if (songEl) songEl.textContent = this.current_station.song;
        if (imageEl) imageEl.src = this.current_station.logo;
        
        var playBtn = document.getElementById('btn-play');
        if (playBtn) {
            var icon = playBtn.querySelector('.btn-icon');
            if (this.is_playing) {
                icon.textContent = '❚❚';
                playBtn.classList.add('active');
            } else {
                icon.textContent = '▶';
                playBtn.classList.remove('active');
            }
        }
    },
    
    updateFocus: function() {
        var buttons = [
            document.getElementById('btn-prev'),
            document.getElementById('btn-play'),
            document.getElementById('btn-next'),
            document.getElementById('btn-fav')
        ];
        
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i]) {
                buttons[i].classList.remove('active');
            }
        }
        
        if (buttons[this.current_btn_index]) {
            buttons[this.current_btn_index].classList.add('active');
        }
    },
    
    togglePlay: function() {
        this.is_playing = !this.is_playing;
        this.updateDisplay();
        this.updateFocus();
        console.log(this.is_playing ? 'Playing' : 'Paused');
    },
    
    nextStation: function() {
        console.log('Next station');
    },
    
    previousStation: function() {
        console.log('Previous station');
    },
    
    toggleFavorite: function() {
        var favBtn = document.getElementById('btn-fav');
        if (favBtn) {
            favBtn.classList.toggle('favorited');
        }
        console.log('Favorite toggled');
    },
    
    handleKey: function(keyCode) {
        switch(keyCode) {
            case KEY_LEFT:
                if (this.current_btn_index > 0) {
                    this.current_btn_index--;
                    this.updateFocus();
                }
                break;
                
            case KEY_RIGHT:
                if (this.current_btn_index < 3) {
                    this.current_btn_index++;
                    this.updateFocus();
                }
                break;
                
            case KEY_ENTER:
                if (this.current_btn_index === 0) {
                    this.previousStation();
                } else if (this.current_btn_index === 1) {
                    this.togglePlay();
                } else if (this.current_btn_index === 2) {
                    this.nextStation();
                } else if (this.current_btn_index === 3) {
                    this.toggleFavorite();
                }
                break;
                
            case KEY_BACK:
                showPage('home');
                break;
        }
    }
};

// Add click handlers to similar radio cards on player page
document.addEventListener('DOMContentLoaded', function() {
    var similarRadioCards = document.querySelectorAll('#player-page .radio-card');
    similarRadioCards.forEach(function(card) {
        card.addEventListener('click', function() {
            var station = {
                name: card.querySelector('.radio-name')?.textContent || 'Unknown Station',
                song: 'Now Playing',
                logo: card.querySelector('.radio-logo img')?.src || 'images/def_image.jpg',
                genre: card.querySelector('.radio-genre')?.textContent || 'Music',
                tags: ['128kb', 'MP3', 'AT', 'Pop']
            };
            player_page.init(station);
            window.scrollTo(0, 0);
        });
    });
});
