var player_page = {
    current_station: null,
    is_playing: false,
    current_btn_index: 1,
    
    init: function(station) {
        console.log('Player page initialized', station);
        this.current_station = station || {
            name: 'Metro FM',
            song: 'Starboy - The Weeknd',
            logo: 'images/station_powerturk_tv_logosu_1_1691_10798.png',
            tags: ['128kb', 'MP3', 'AT', 'Rock', 'Classic']
        };
        this.is_playing = true;
        this.current_btn_index = 1;
        this.updateDisplay();
        this.updateFocus();
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
