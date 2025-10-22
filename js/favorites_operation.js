var favorites_page = {
    current_station_index: 0,
    grid_cols: 6,
    grid_rows: 3,
    favorites: [],
    
    init: function() {
        console.log('Favorites page initialized');
        this.current_station_index = 0;
        this.loadFavorites();
        this.updateFocus();
    },
    
    loadFavorites: function() {
        var gridContainer = document.getElementById('favorites-grid');
        if (!gridContainer) return;
        
        gridContainer.innerHTML = '';
        
        this.favorites = loadFromStorage('favorites') || [];
        
        if (this.favorites.length === 0) {
            this.favorites = [
                {name: 'Power Türk FM', category: 'Türkçe Pop', logo: 'images/station_powerturk_tv_logosu_1_1691_10798.png'},
                {name: 'Alem FM', category: 'World Music', logo: 'images/station_alem_fm_1_1691_10876.png'},
                {name: 'Radio Mega', category: 'Top Hits', logo: 'images/station_0b75jzrr_400x400_1_1691_10820.png'},
                {name: 'Smooth Jazz', category: 'Jazz', logo: 'images/station_android_default_logo_1_1691_10844.png'},
                {name: 'Classic Hits', category: 'Oldies', logo: 'images/station_meta_image_1_1_1691_10934.png'},
                {name: 'Rock Nation', category: 'Rock', logo: 'images/station_austria_1_1691_11039.png'},
                {name: 'Electronic Beats', category: 'Electronic', logo: 'images/station_powerturk_tv_logosu_1_1691_10798.png'},
                {name: 'Jazz Lounge', category: 'Jazz', logo: 'images/station_alem_fm_1_1691_10876.png'},
                {name: 'Hip Hop Central', category: 'Hip Hop', logo: 'images/station_0b75jzrr_400x400_1_1691_10820.png'},
                {name: 'Country Roads', category: 'Country', logo: 'images/station_android_default_logo_1_1691_10844.png'},
                {name: 'Pop Hits 24/7', category: 'Pop', logo: 'images/station_meta_image_1_1_1691_10934.png'},
                {name: 'Indie Vibes', category: 'Indie', logo: 'images/station_austria_1_1691_11039.png'},
                {name: 'Austria FM', category: 'Austrian Pop', logo: 'images/station_austria_1_1691_11039.png'},
                {name: 'Vienna Classics', category: 'Classical', logo: 'images/station_powerturk_tv_logosu_1_1691_10798.png'},
                {name: 'Alpine Radio', category: 'Folk', logo: 'images/station_alem_fm_1_1691_10876.png'},
                {name: 'Salzburg Sounds', category: 'Variety', logo: 'images/station_0b75jzrr_400x400_1_1691_10820.png'},
                {name: 'Innsbruck Mix', category: 'Top 40', logo: 'images/station_android_default_logo_1_1691_10844.png'},
                {name: 'Graz Grooves', category: 'Dance', logo: 'images/station_meta_image_1_1_1691_10934.png'}
            ];
            saveToStorage('favorites', this.favorites);
        }
        
        var positions = [
            {x: 236, y: 316}, {x: 466, y: 316}, {x: 696, y: 316}, {x: 926, y: 316}, {x: 1156, y: 316}, {x: 1386, y: 316},
            {x: 236, y: 610}, {x: 466, y: 610}, {x: 696, y: 610}, {x: 926, y: 610}, {x: 1156, y: 610}, {x: 1386, y: 610},
            {x: 236, y: 904}, {x: 466, y: 904}, {x: 696, y: 904}, {x: 926, y: 904}, {x: 1156, y: 904}, {x: 1386, y: 904}
        ];
        
        for (var i = 0; i < Math.min(this.favorites.length, 18); i++) {
            var station = this.favorites[i];
            var card = document.createElement('div');
            card.className = 'radio-card';
            card.style.left = positions[i].x + 'px';
            card.style.top = positions[i].y + 'px';
            card.setAttribute('data-index', i);
            
            var logo = document.createElement('div');
            logo.className = 'radio-logo';
            var img = document.createElement('img');
            img.src = station.logo || 'images/def_image.jpg';
            img.alt = station.name;
            logo.appendChild(img);
            
            var name = document.createElement('p');
            name.className = 'radio-name';
            name.textContent = station.name;
            
            var genre = document.createElement('p');
            genre.className = 'radio-genre';
            genre.textContent = station.category;
            
            card.appendChild(logo);
            card.appendChild(name);
            card.appendChild(genre);
            
            gridContainer.appendChild(card);
        }
    },
    
    updateFocus: function() {
        var cards = document.querySelectorAll('.favorites-grid .radio-card');
        for (var i = 0; i < cards.length; i++) {
            cards[i].classList.remove('active');
        }
        
        if (cards[this.current_station_index]) {
            cards[this.current_station_index].classList.add('active');
        }
    },
    
    handleKey: function(keyCode) {
        var totalStations = Math.min(this.favorites.length, 18);
        
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
                console.log('Favorite station selected');
                break;
                
            case KEY_BACK:
                showPage('home');
                break;
        }
    }
};
